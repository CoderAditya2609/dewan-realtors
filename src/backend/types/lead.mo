import Common "common";
import Principal "mo:core/Principal";

module {
  public type Inquiry = {
    id : Common.InquiryId;
    propertyId : Common.PropertyId;
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
    createdAt : Common.Timestamp;
    var isRead : Bool;
  };

  public type InquiryPublic = {
    id : Common.InquiryId;
    propertyId : Common.PropertyId;
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
    createdAt : Common.Timestamp;
    isRead : Bool;
  };

  public type InquiryInput = {
    propertyId : Common.PropertyId;
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
  };

  public type VisitRequest = {
    id : Common.VisitRequestId;
    propertyId : Common.PropertyId;
    customerPrincipal : Principal;
    name : Text;
    phone : Text;
    email : Text;
    preferredDate : Text;
    preferredTime : Text;
    message : Text;
    var status : Common.VisitStatus;
    createdAt : Common.Timestamp;
  };

  public type VisitRequestPublic = {
    id : Common.VisitRequestId;
    propertyId : Common.PropertyId;
    customerPrincipal : Principal;
    name : Text;
    phone : Text;
    email : Text;
    preferredDate : Text;
    preferredTime : Text;
    message : Text;
    status : Common.VisitStatus;
    createdAt : Common.Timestamp;
  };

  public type VisitRequestInput = {
    propertyId : Common.PropertyId;
    name : Text;
    phone : Text;
    email : Text;
    preferredDate : Text;
    preferredTime : Text;
    message : Text;
  };
};
