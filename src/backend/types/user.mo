import Principal "mo:core/Principal";
import Common "common";

module {
  public type UserProfile = {
    name : Text;
    role : Text;
  };

  public type Bookmarks = {
    customerPrincipal : Principal;
    propertyIds : [Common.PropertyId];
  };

  public type DashboardStats = {
    totalListings : Nat;
    activeListings : Nat;
    soldListings : Nat;
    totalInquiries : Nat;
  };

  public type MonthlyInquiryCount = {
    month : Text;
    count : Nat;
  };

  public type PropertyViewCount = {
    propertyId : Common.PropertyId;
    title : Text;
    viewCount : Nat;
  };
};
