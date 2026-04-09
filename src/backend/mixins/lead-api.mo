import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import LeadLib "../lib/lead";
import LeadTypes "../types/lead";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  inquiries : List.List<LeadTypes.Inquiry>,
  visitRequests : List.List<LeadTypes.VisitRequest>,
  nextInquiryId : Common.Counter,
  nextVisitRequestId : Common.Counter,
) {
  /// Public: submit an inquiry for a property (no auth required)
  public shared func submitInquiry(input : LeadTypes.InquiryInput) : async LeadTypes.InquiryPublic {
    let result = LeadLib.submitInquiry(inquiries, nextInquiryId.value, input);
    nextInquiryId.value += 1;
    result;
  };

  /// Employee: list all inquiries
  public query ({ caller }) func listInquiries() : async [LeadTypes.InquiryPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to list inquiries");
    };
    LeadLib.listInquiries(inquiries);
  };

  /// Employee: list inquiries for a specific property
  public query ({ caller }) func listInquiriesForProperty(propertyId : Common.PropertyId) : async [LeadTypes.InquiryPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to list inquiries");
    };
    LeadLib.listInquiriesForProperty(inquiries, propertyId);
  };

  /// Employee: get a specific inquiry by ID
  public query ({ caller }) func getInquiry(id : Common.InquiryId) : async ?LeadTypes.InquiryPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to get an inquiry");
    };
    LeadLib.getInquiry(inquiries, id);
  };

  /// Employee: mark an inquiry as read
  public shared ({ caller }) func markInquiryRead(id : Common.InquiryId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to update inquiries");
    };
    LeadLib.markInquiryRead(inquiries, id);
  };

  /// Customer: submit a visit request (auth required)
  public shared ({ caller }) func submitVisitRequest(input : LeadTypes.VisitRequestInput) : async LeadTypes.VisitRequestPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to submit a visit request");
    };
    let result = LeadLib.submitVisitRequest(visitRequests, nextVisitRequestId.value, caller, input);
    nextVisitRequestId.value += 1;
    result;
  };

  /// Employee: list all visit requests
  public query ({ caller }) func listVisitRequests() : async [LeadTypes.VisitRequestPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to list visit requests");
    };
    LeadLib.listVisitRequests(visitRequests);
  };

  /// Customer: list own visit requests
  public query ({ caller }) func listVisitRequestsForCustomer() : async [LeadTypes.VisitRequestPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view your visit requests");
    };
    LeadLib.listVisitRequestsForCustomer(visitRequests, caller);
  };

  /// Employee: update visit request status
  public shared ({ caller }) func updateVisitRequestStatus(id : Common.VisitRequestId, status : Common.VisitStatus) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to update visit status");
    };
    LeadLib.updateVisitStatus(visitRequests, id, status);
  };
};
