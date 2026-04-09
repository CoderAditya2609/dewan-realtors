module {
  public type Timestamp = Int;
  public type PropertyId = Nat;
  public type InquiryId = Nat;
  public type VisitRequestId = Nat;

  /// Mutable counter — use to pass incrementable IDs into mixins
  public type Counter = { var value : Nat };

  public type FacingDirection = {
    #north;
    #south;
    #east;
    #west;
    #northEast;
    #northWest;
    #southEast;
    #southWest;
  };

  public type PropertyType = {
    #flat;
    #plot;
    #villa;
    #commercial;
    #penthouse;
    #studio;
    #townhouse;
    #other;
  };

  public type VisitStatus = {
    #pending;
    #reviewed;
    #confirmed;
    #cancelled;
    #completed;
  };
};
