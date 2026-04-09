import Map "mo:core/Map";
import Set "mo:core/Set";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import UserLib "../lib/user";
import UserTypes "../types/user";
import PropertyTypes "../types/property";
import LeadTypes "../types/lead";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<Principal, UserTypes.UserProfile>,
  bookmarks : Map.Map<Principal, Set.Set<Common.PropertyId>>,
  properties : List.List<PropertyTypes.Property>,
  inquiries : List.List<LeadTypes.Inquiry>,
) {
  /// User: get own profile
  public query ({ caller }) func getCallerUserProfile() : async ?UserTypes.UserProfile {
    userProfiles.get(caller);
  };

  /// User: save own profile
  public shared ({ caller }) func saveCallerUserProfile(profile : UserTypes.UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to save profile");
    };
    userProfiles.add(caller, profile);
  };

  /// Admin: get another user's profile
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserTypes.UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  /// Customer: get bookmarked property IDs
  public query ({ caller }) func listBookmarks() : async [Common.PropertyId] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view bookmarks");
    };
    UserLib.getBookmarks(bookmarks, caller);
  };

  /// Customer: add a property bookmark
  public shared ({ caller }) func addBookmark(propertyId : Common.PropertyId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to bookmark properties");
    };
    UserLib.addBookmark(bookmarks, caller, propertyId);
  };

  /// Customer: remove a property bookmark
  public shared ({ caller }) func removeBookmark(propertyId : Common.PropertyId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to remove bookmarks");
    };
    UserLib.removeBookmark(bookmarks, caller, propertyId);
  };

  /// Employee: get dashboard stats + monthly inquiry counts + top property views
  public query ({ caller }) func getEmployeeDashboard() : async {
    stats : UserTypes.DashboardStats;
    monthlyInquiries : [UserTypes.MonthlyInquiryCount];
    topPropertyViews : [UserTypes.PropertyViewCount];
  } {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view the dashboard");
    };
    let stats = UserLib.getDashboardStats(properties, inquiries);
    let monthlyInquiries = UserLib.getMonthlyInquiryCounts(inquiries);
    let topPropertyViews = UserLib.getPropertyViewCounts(properties);
    { stats; monthlyInquiries; topPropertyViews };
  };

  /// Customer: get own dashboard (bookmarks count, visit requests count)
  public query ({ caller }) func getCustomerDashboard() : async {
    bookmarkCount : Nat;
  } {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view your dashboard");
    };
    let bookmarkCount = UserLib.getBookmarks(bookmarks, caller).size();
    { bookmarkCount };
  };
};
