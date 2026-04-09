import Storage "mo:caffeineai-object-storage/Storage";
import Principal "mo:core/Principal";
import Common "common";

module {
  public type Property = {
    id : Common.PropertyId;
    title : Text;
    city : Text;
    price : Nat;
    sizeSqft : Nat;
    facing : Common.FacingDirection;
    propertyType : Common.PropertyType;
    description : Text;
    amenities : [Text];
    images : [Storage.ExternalBlob];
    featured : Bool;
    sold : Bool;
    published : Bool;
    listerId : Principal;
    createdAt : Common.Timestamp;
    var viewCount : Nat;
  };

  public type PropertyPublic = {
    id : Common.PropertyId;
    title : Text;
    city : Text;
    price : Nat;
    sizeSqft : Nat;
    facing : Common.FacingDirection;
    propertyType : Common.PropertyType;
    description : Text;
    amenities : [Text];
    images : [Storage.ExternalBlob];
    featured : Bool;
    sold : Bool;
    published : Bool;
    listerId : Principal;
    createdAt : Common.Timestamp;
    viewCount : Nat;
  };

  public type PropertyInput = {
    title : Text;
    city : Text;
    price : Nat;
    sizeSqft : Nat;
    facing : Common.FacingDirection;
    propertyType : Common.PropertyType;
    description : Text;
    amenities : [Text];
    images : [Storage.ExternalBlob];
    featured : Bool;
  };

  public type PropertyFilter = {
    city : ?Text;
    minPrice : ?Nat;
    maxPrice : ?Nat;
    minSize : ?Nat;
    maxSize : ?Nat;
    propertyType : ?Common.PropertyType;
    facing : ?Common.FacingDirection;
    featured : ?Bool;
    sold : ?Bool;
  };
};
