import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import LeadTypes "../types/lead";
import Common "../types/common";

module {
  public type UserMonthlyCount = { month : Text; count : Nat };

  public func inquiryToPublic(self : LeadTypes.Inquiry) : LeadTypes.InquiryPublic {
    {
      id = self.id;
      propertyId = self.propertyId;
      name = self.name;
      phone = self.phone;
      email = self.email;
      message = self.message;
      createdAt = self.createdAt;
      isRead = self.isRead;
    };
  };

  public func visitRequestToPublic(self : LeadTypes.VisitRequest) : LeadTypes.VisitRequestPublic {
    {
      id = self.id;
      propertyId = self.propertyId;
      customerPrincipal = self.customerPrincipal;
      name = self.name;
      phone = self.phone;
      email = self.email;
      preferredDate = self.preferredDate;
      preferredTime = self.preferredTime;
      message = self.message;
      status = self.status;
      createdAt = self.createdAt;
    };
  };

  public func submitInquiry(
    inquiries : List.List<LeadTypes.Inquiry>,
    nextId : Nat,
    input : LeadTypes.InquiryInput,
  ) : LeadTypes.InquiryPublic {
    let inquiry : LeadTypes.Inquiry = {
      id = nextId;
      propertyId = input.propertyId;
      name = input.name;
      phone = input.phone;
      email = input.email;
      message = input.message;
      createdAt = Time.now();
      var isRead = false;
    };
    inquiries.add(inquiry);
    inquiryToPublic(inquiry);
  };

  public func listInquiries(
    inquiries : List.List<LeadTypes.Inquiry>,
  ) : [LeadTypes.InquiryPublic] {
    inquiries.map<LeadTypes.Inquiry, LeadTypes.InquiryPublic>(inquiryToPublic).toArray();
  };

  public func listInquiriesForProperty(
    inquiries : List.List<LeadTypes.Inquiry>,
    propertyId : Common.PropertyId,
  ) : [LeadTypes.InquiryPublic] {
    inquiries
      .filter(func(i) { i.propertyId == propertyId })
      .map<LeadTypes.Inquiry, LeadTypes.InquiryPublic>(inquiryToPublic)
      .toArray();
  };

  public func getInquiry(
    inquiries : List.List<LeadTypes.Inquiry>,
    id : Common.InquiryId,
  ) : ?LeadTypes.InquiryPublic {
    switch (inquiries.find(func(i) { i.id == id })) {
      case (?i) ?inquiryToPublic(i);
      case null null;
    };
  };

  public func markInquiryRead(
    inquiries : List.List<LeadTypes.Inquiry>,
    id : Common.InquiryId,
  ) : Bool {
    switch (inquiries.find(func(i) { i.id == id })) {
      case (?i) {
        i.isRead := true;
        true;
      };
      case null false;
    };
  };

  public func submitVisitRequest(
    visitRequests : List.List<LeadTypes.VisitRequest>,
    nextId : Nat,
    caller : Principal,
    input : LeadTypes.VisitRequestInput,
  ) : LeadTypes.VisitRequestPublic {
    let req : LeadTypes.VisitRequest = {
      id = nextId;
      propertyId = input.propertyId;
      customerPrincipal = caller;
      name = input.name;
      phone = input.phone;
      email = input.email;
      preferredDate = input.preferredDate;
      preferredTime = input.preferredTime;
      message = input.message;
      var status = #pending;
      createdAt = Time.now();
    };
    visitRequests.add(req);
    visitRequestToPublic(req);
  };

  public func listVisitRequests(
    visitRequests : List.List<LeadTypes.VisitRequest>,
  ) : [LeadTypes.VisitRequestPublic] {
    visitRequests.map<LeadTypes.VisitRequest, LeadTypes.VisitRequestPublic>(visitRequestToPublic).toArray();
  };

  public func listVisitRequestsForCustomer(
    visitRequests : List.List<LeadTypes.VisitRequest>,
    customer : Principal,
  ) : [LeadTypes.VisitRequestPublic] {
    visitRequests
      .filter(func(r) { Principal.equal(r.customerPrincipal, customer) })
      .map<LeadTypes.VisitRequest, LeadTypes.VisitRequestPublic>(visitRequestToPublic)
      .toArray();
  };

  public func updateVisitStatus(
    visitRequests : List.List<LeadTypes.VisitRequest>,
    id : Common.VisitRequestId,
    status : Common.VisitStatus,
  ) : Bool {
    switch (visitRequests.find(func(r) { r.id == id })) {
      case (?r) {
        r.status := status;
        true;
      };
      case null false;
    };
  };

  // Compute "YYYY-MM" from a nanosecond Int timestamp
  func monthKey(tsNanos : Int) : Text {
    // Convert nanoseconds to seconds
    let secs = tsNanos / 1_000_000_000;
    let secsNat : Nat = if (secs < 0) { 0 } else { secs.toNat() };
    let secsPerDay : Nat = 86400;
    var days : Nat = secsNat / secsPerDay;

    // Walk from year 1970 upward
    var year : Nat = 1970;
    var cont = true;
    while (cont) {
      let leap = (year % 4 == 0) and ((year % 100 != 0) or (year % 400 == 0));
      let diy : Nat = if (leap) { 366 } else { 365 };
      if (days < diy) {
        cont := false;
      } else {
        days -= diy;
        year += 1;
      };
    };

    let leap2 = (year % 4 == 0) and ((year % 100 != 0) or (year % 400 == 0));
    let monthLengths : [Nat] = if (leap2) {
      [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    } else {
      [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    };

    var month : Nat = 1;
    var cont2 = true;
    var daysLeft = days;
    while (cont2 and month <= 12) {
      let ml = monthLengths[month - 1];
      if (daysLeft < ml) {
        cont2 := false;
      } else {
        daysLeft -= ml;
        month += 1;
      };
    };

    let yStr = year.toText();
    let mStr = if (month < 10) { "0" # month.toText() } else { month.toText() };
    yStr # "-" # mStr;
  };

  public func getMonthlyInquiryCounts(
    inquiries : List.List<LeadTypes.Inquiry>,
  ) : [UserMonthlyCount] {
    // Group by month using a simple list of (month, count) pairs
    let buckets = List.empty<UserMonthlyCount>();
    inquiries.forEach(func(inq) {
      let key = monthKey(inq.createdAt);
      switch (buckets.findIndex(func(b) { b.month == key })) {
        case (?idx) {
          let b = buckets.at(idx);
          buckets.put(idx, { month = b.month; count = b.count + 1 });
        };
        case null {
          buckets.add({ month = key; count = 1 });
        };
      };
    });
    let sorted = buckets.sort(func(a, b) { Text.compare(a.month, b.month) });
    sorted.toArray();
  };
};
