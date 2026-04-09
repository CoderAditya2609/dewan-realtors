import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import Storage "mo:caffeineai-object-storage/Storage";
import UserTypes "./types/user";
import Common "./types/common";
import PropertyTypes "./types/property";
import LeadTypes "./types/lead";

module {
  // ── Old types (inline from previous deployment) ─────────────────────────
  type OldFacingDirection = { #east; #north; #south; #west };
  type OldPropertyType = { #commercial; #flat; #other; #plot; #villa };
  type OldVisitStatus = { #pending; #reviewed };

  type OldProperty = {
    id : Nat;
    title : Text;
    city : Text;
    price : Nat;
    sizeSqft : Nat;
    facing : OldFacingDirection;
    propertyType : OldPropertyType;
    description : Text;
    amenities : [Text];
    images : [Storage.ExternalBlob];
    featured : Bool;
    sold : Bool;
    published : Bool;
    listerId : Principal;
    createdAt : Int;
    var viewCount : Nat;
  };

  type OldVisitRequest = {
    id : Nat;
    propertyId : Nat;
    customerPrincipal : Principal;
    name : Text;
    phone : Text;
    email : Text;
    preferredDate : Text;
    preferredTime : Text;
    message : Text;
    var status : OldVisitStatus;
    createdAt : Int;
  };

  type OldInquiry = {
    id : Nat;
    propertyId : Nat;
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
    createdAt : Int;
    var isRead : Bool;
  };

  type OldUserProfile = { name : Text; role : Text };

  type UserRole = { #admin; #guest; #user };

  type OldActor = {
    accessControlState : {
      var adminAssigned : Bool;
      userRoles : Map.Map<Principal, UserRole>;
    };
    bookmarks : Map.Map<Principal, Set.Set<Nat>>;
    inquiries : List.List<OldInquiry>;
    nextInquiryId : { var value : Nat };
    nextPropertyId : { var value : Nat };
    nextVisitRequestId : { var value : Nat };
    properties : List.List<OldProperty>;
    userProfiles : Map.Map<Principal, OldUserProfile>;
    visitRequests : List.List<OldVisitRequest>;
  };

  type NewActor = {
    accessControlState : {
      var adminAssigned : Bool;
      userRoles : Map.Map<Principal, UserRole>;
    };
    bookmarks : Map.Map<Principal, Set.Set<Nat>>;
    inquiries : List.List<LeadTypes.Inquiry>;
    nextInquiryId : { var value : Nat };
    nextPropertyId : { var value : Nat };
    nextVisitRequestId : { var value : Nat };
    properties : List.List<PropertyTypes.Property>;
    userProfiles : Map.Map<Principal, UserTypes.UserProfile>;
    visitRequests : List.List<LeadTypes.VisitRequest>;
  };

  // ── Migration helpers ────────────────────────────────────────────────────

  func migrateProperty(old : OldProperty) : PropertyTypes.Property {
    {
      id = old.id;
      title = old.title;
      city = old.city;
      price = old.price;
      sizeSqft = old.sizeSqft;
      facing = old.facing; // old variants are valid subset of new FacingDirection
      propertyType = old.propertyType; // old variants valid in new PropertyType
      description = old.description;
      amenities = old.amenities;
      images = old.images;
      featured = old.featured;
      sold = old.sold;
      published = old.published;
      listerId = old.listerId;
      createdAt = old.createdAt;
      var viewCount = old.viewCount;
    };
  };

  func migrateVisitRequest(old : OldVisitRequest) : LeadTypes.VisitRequest {
    {
      id = old.id;
      propertyId = old.propertyId;
      customerPrincipal = old.customerPrincipal;
      name = old.name;
      phone = old.phone;
      email = old.email;
      preferredDate = old.preferredDate;
      preferredTime = old.preferredTime;
      message = old.message;
      var status = old.status; // #pending and #reviewed are valid in new VisitStatus
      createdAt = old.createdAt;
    };
  };

  func migrateInquiry(old : OldInquiry) : LeadTypes.Inquiry {
    {
      id = old.id;
      propertyId = old.propertyId;
      name = old.name;
      phone = old.phone;
      email = old.email;
      message = old.message;
      createdAt = old.createdAt;
      var isRead = old.isRead;
    };
  };

  func migrateUserProfile(old : OldUserProfile) : UserTypes.UserProfile {
    { name = old.name; role = old.role };
  };

  // ── Migration entry point ────────────────────────────────────────────────

  public func run(old : OldActor) : NewActor {
    let properties = old.properties.map<OldProperty, PropertyTypes.Property>(
      func(p) { migrateProperty(p) }
    );
    let visitRequests = old.visitRequests.map<OldVisitRequest, LeadTypes.VisitRequest>(
      func(vr) { migrateVisitRequest(vr) }
    );
    let inquiries = old.inquiries.map<OldInquiry, LeadTypes.Inquiry>(
      func(i) { migrateInquiry(i) }
    );
    let userProfiles = old.userProfiles.map<Principal, OldUserProfile, UserTypes.UserProfile>(
      func(_k, up) { migrateUserProfile(up) }
    );
    {
      accessControlState = old.accessControlState;
      bookmarks = old.bookmarks;
      inquiries;
      nextInquiryId = old.nextInquiryId;
      nextPropertyId = old.nextPropertyId;
      nextVisitRequestId = old.nextVisitRequestId;
      properties;
      userProfiles;
      visitRequests;
    };
  };
};
