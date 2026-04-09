import List "mo:core/List";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import UserTypes "../types/user";
import LeadTypes "../types/lead";
import LeadLib "lead";
import PropertyTypes "../types/property";
import Common "../types/common";

module {
  public func getBookmarks(
    bookmarks : Map.Map<Principal, Set.Set<Common.PropertyId>>,
    customer : Principal,
  ) : [Common.PropertyId] {
    switch (bookmarks.get(customer)) {
      case (?s) s.toArray();
      case null [];
    };
  };

  public func addBookmark(
    bookmarks : Map.Map<Principal, Set.Set<Common.PropertyId>>,
    customer : Principal,
    propertyId : Common.PropertyId,
  ) : () {
    switch (bookmarks.get(customer)) {
      case (?s) { s.add(propertyId) };
      case null {
        let s = Set.empty<Common.PropertyId>();
        s.add(propertyId);
        bookmarks.add(customer, s);
      };
    };
  };

  public func removeBookmark(
    bookmarks : Map.Map<Principal, Set.Set<Common.PropertyId>>,
    customer : Principal,
    propertyId : Common.PropertyId,
  ) : () {
    switch (bookmarks.get(customer)) {
      case (?s) { s.remove(propertyId) };
      case null {};
    };
  };

  public func getDashboardStats(
    properties : List.List<PropertyTypes.Property>,
    inquiries : List.List<LeadTypes.Inquiry>,
  ) : UserTypes.DashboardStats {
    let totalListings = properties.size();
    let activeListings = properties.filter(func(p) { not p.sold }).size();
    let soldListings = properties.filter(func(p) { p.sold }).size();
    let totalInquiries = inquiries.size();
    { totalListings; activeListings; soldListings; totalInquiries };
  };

  public func getMonthlyInquiryCounts(
    inquiries : List.List<LeadTypes.Inquiry>,
  ) : [UserTypes.MonthlyInquiryCount] {
    let raw = LeadLib.getMonthlyInquiryCounts(inquiries);
    raw.map<LeadLib.UserMonthlyCount, UserTypes.MonthlyInquiryCount>(
      func(r) { { month = r.month; count = r.count } }
    );
  };

  public func getPropertyViewCounts(
    properties : List.List<PropertyTypes.Property>,
  ) : [UserTypes.PropertyViewCount] {
    // Sort descending by viewCount
    let sorted = properties.sort(func(a, b) {
      if (a.viewCount > b.viewCount) { #less }
      else if (a.viewCount < b.viewCount) { #greater }
      else { #equal };
    });
    sorted
      .map<PropertyTypes.Property, UserTypes.PropertyViewCount>(func(p) {
        { propertyId = p.id; title = p.title; viewCount = p.viewCount }
      })
      .toArray();
  };
};
