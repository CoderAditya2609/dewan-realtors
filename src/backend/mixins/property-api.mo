import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import PropertyLib "../lib/property";
import PropertyTypes "../types/property";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  properties : List.List<PropertyTypes.Property>,
  nextPropertyId : Common.Counter,
) {
  /// Public: browse published properties only (no auth required)
  public query func listProperties(filter : PropertyTypes.PropertyFilter) : async [PropertyTypes.PropertyPublic] {
    PropertyLib.listProperties(properties, filter);
  };

  /// Employee: list ALL properties regardless of published status (auth required)
  public query ({ caller }) func listEmployeeProperties() : async [PropertyTypes.PropertyPublic] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Employee access required");
    };
    PropertyLib.listEmployeeProperties(properties, caller);
  };

  /// Public: get a single property and increment view count
  public shared func getProperty(id : Common.PropertyId) : async ?PropertyTypes.PropertyPublic {
    PropertyLib.incrementViewCount(properties, id);
    PropertyLib.getProperty(properties, id);
  };

  /// Employee: add a new property (sets listerId = caller, published = false)
  public shared ({ caller }) func addProperty(input : PropertyTypes.PropertyInput) : async PropertyTypes.PropertyPublic {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Employee access required to add a property");
    };
    let result = PropertyLib.addProperty(properties, nextPropertyId.value, input, caller);
    nextPropertyId.value += 1;
    result;
  };

  /// Employee: update an existing property
  public shared ({ caller }) func updateProperty(id : Common.PropertyId, input : PropertyTypes.PropertyInput) : async ?PropertyTypes.PropertyPublic {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Employee access required to update a property");
    };
    // Verify ownership or admin
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    switch (properties.find(func(p) { p.id == id })) {
      case null { null };
      case (?p) {
        if (not isAdmin and p.listerId != caller) {
          Runtime.trap("Unauthorized: You can only update your own listings");
        };
        PropertyLib.updateProperty(properties, id, input);
      };
    };
  };

  /// Employee: delete a property
  public shared ({ caller }) func deleteProperty(id : Common.PropertyId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Employee access required to delete a property");
    };
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    switch (properties.find(func(p) { p.id == id })) {
      case null { false };
      case (?p) {
        if (not isAdmin and p.listerId != caller) {
          Runtime.trap("Unauthorized: You can only delete your own listings");
        };
        PropertyLib.deleteProperty(properties, id);
      };
    };
  };

  /// Employee: mark property as sold or unsold
  public shared ({ caller }) func markPropertySold(id : Common.PropertyId, sold : Bool) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Employee access required to update a property");
    };
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    switch (properties.find(func(p) { p.id == id })) {
      case null { false };
      case (?p) {
        if (not isAdmin and p.listerId != caller) {
          Runtime.trap("Unauthorized: You can only update your own listings");
        };
        PropertyLib.markSold(properties, id, sold);
      };
    };
  };

  /// Employee: publish a property (only lister or admin)
  public shared ({ caller }) func publishProperty(id : Common.PropertyId) : async { #ok; #err : Text } {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Employee access required to publish a property");
    };
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    PropertyLib.publishProperty(properties, id, caller, isAdmin);
  };

  /// Employee: unpublish a property (only lister or admin)
  public shared ({ caller }) func unpublishProperty(id : Common.PropertyId) : async { #ok; #err : Text } {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Employee access required to unpublish a property");
    };
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    PropertyLib.unpublishProperty(properties, id, caller, isAdmin);
  };
};
