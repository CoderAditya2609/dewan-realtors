import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import PropertyTypes "../types/property";
import Common "../types/common";

module {
  public func toPublic(self : PropertyTypes.Property) : PropertyTypes.PropertyPublic {
    {
      id = self.id;
      title = self.title;
      city = self.city;
      price = self.price;
      sizeSqft = self.sizeSqft;
      facing = self.facing;
      propertyType = self.propertyType;
      description = self.description;
      amenities = self.amenities;
      images = self.images;
      featured = self.featured;
      sold = self.sold;
      published = self.published;
      listerId = self.listerId;
      createdAt = self.createdAt;
      viewCount = self.viewCount;
    };
  };

  public func listProperties(
    properties : List.List<PropertyTypes.Property>,
    filter : PropertyTypes.PropertyFilter,
  ) : [PropertyTypes.PropertyPublic] {
    let filtered = properties.filter(func(p) {
      if (not p.published) return false;
      switch (filter.city) {
        case (?c) {
          if (not p.city.toLower().contains(#text (c.toLower()))) return false;
        };
        case null {};
      };
      switch (filter.minPrice) {
        case (?min) { if (p.price < min) return false };
        case null {};
      };
      switch (filter.maxPrice) {
        case (?max) { if (p.price > max) return false };
        case null {};
      };
      switch (filter.minSize) {
        case (?min) { if (p.sizeSqft < min) return false };
        case null {};
      };
      switch (filter.maxSize) {
        case (?max) { if (p.sizeSqft > max) return false };
        case null {};
      };
      switch (filter.propertyType) {
        case (?pt) {
          if (p.propertyType != pt) return false;
        };
        case null {};
      };
      switch (filter.facing) {
        case (?f) {
          if (p.facing != f) return false;
        };
        case null {};
      };
      switch (filter.featured) {
        case (?feat) {
          if (p.featured != feat) return false;
        };
        case null {};
      };
      switch (filter.sold) {
        case (?s) {
          if (p.sold != s) return false;
        };
        case null {};
      };
      true;
    });
    filtered.map<PropertyTypes.Property, PropertyTypes.PropertyPublic>(func(p) { toPublic(p) }).toArray();
  };

  public func listEmployeeProperties(
    properties : List.List<PropertyTypes.Property>,
    employeeId : Principal,
  ) : [PropertyTypes.PropertyPublic] {
    properties
      .filter(func(p) { Principal.equal(p.listerId, employeeId) })
      .map<PropertyTypes.Property, PropertyTypes.PropertyPublic>(func(p) { toPublic(p) })
      .toArray();
  };

  public func getProperty(
    properties : List.List<PropertyTypes.Property>,
    id : Common.PropertyId,
  ) : ?PropertyTypes.PropertyPublic {
    switch (properties.find(func(p) { p.id == id })) {
      case (?p) { ?toPublic(p) };
      case null { null };
    };
  };

  public func addProperty(
    properties : List.List<PropertyTypes.Property>,
    nextId : Nat,
    input : PropertyTypes.PropertyInput,
    listerId : Principal,
  ) : PropertyTypes.PropertyPublic {
    let now = Time.now();
    let newProperty : PropertyTypes.Property = {
      id = nextId;
      title = input.title;
      city = input.city;
      price = input.price;
      sizeSqft = input.sizeSqft;
      facing = input.facing;
      propertyType = input.propertyType;
      description = input.description;
      amenities = input.amenities;
      images = input.images;
      featured = input.featured;
      sold = false;
      published = false;
      listerId = listerId;
      createdAt = now;
      var viewCount = 0;
    };
    properties.add(newProperty);
    toPublic(newProperty);
  };

  public func updateProperty(
    properties : List.List<PropertyTypes.Property>,
    id : Common.PropertyId,
    input : PropertyTypes.PropertyInput,
  ) : ?PropertyTypes.PropertyPublic {
    var result : ?PropertyTypes.PropertyPublic = null;
    properties.mapInPlace(func(p) {
      if (p.id == id) {
        let updated : PropertyTypes.Property = {
          id = p.id;
          title = input.title;
          city = input.city;
          price = input.price;
          sizeSqft = input.sizeSqft;
          facing = input.facing;
          propertyType = input.propertyType;
          description = input.description;
          amenities = input.amenities;
          images = input.images;
          featured = input.featured;
          sold = p.sold;
          published = p.published;
          listerId = p.listerId;
          createdAt = p.createdAt;
          var viewCount = p.viewCount;
        };
        result := ?toPublic(updated);
        updated;
      } else { p };
    });
    result;
  };

  public func deleteProperty(
    properties : List.List<PropertyTypes.Property>,
    id : Common.PropertyId,
  ) : Bool {
    let sizeBefore = properties.size();
    let remaining = properties.filter(func(p) { p.id != id });
    properties.clear();
    properties.append(remaining);
    properties.size() < sizeBefore;
  };

  public func markSold(
    properties : List.List<PropertyTypes.Property>,
    id : Common.PropertyId,
    sold : Bool,
  ) : Bool {
    var found = false;
    properties.mapInPlace(func(p) {
      if (p.id == id) {
        found := true;
        {
          id = p.id;
          title = p.title;
          city = p.city;
          price = p.price;
          sizeSqft = p.sizeSqft;
          facing = p.facing;
          propertyType = p.propertyType;
          description = p.description;
          amenities = p.amenities;
          images = p.images;
          featured = p.featured;
          sold = sold;
          published = p.published;
          listerId = p.listerId;
          createdAt = p.createdAt;
          var viewCount = p.viewCount;
        };
      } else { p };
    });
    found;
  };

  public func publishProperty(
    properties : List.List<PropertyTypes.Property>,
    id : Common.PropertyId,
    caller : Principal,
    isAdmin : Bool,
  ) : { #ok; #err : Text } {
    switch (properties.find(func(p) { p.id == id })) {
      case null { #err("Property not found") };
      case (?p) {
        if (not isAdmin and not Principal.equal(p.listerId, caller)) {
          return #err("Unauthorized: Only the listing agent or an admin can publish this property");
        };
        properties.mapInPlace(func(prop) {
          if (prop.id == id) {
            {
              id = prop.id;
              title = prop.title;
              city = prop.city;
              price = prop.price;
              sizeSqft = prop.sizeSqft;
              facing = prop.facing;
              propertyType = prop.propertyType;
              description = prop.description;
              amenities = prop.amenities;
              images = prop.images;
              featured = prop.featured;
              sold = prop.sold;
              published = true;
              listerId = prop.listerId;
              createdAt = prop.createdAt;
              var viewCount = prop.viewCount;
            };
          } else { prop };
        });
        #ok;
      };
    };
  };

  public func unpublishProperty(
    properties : List.List<PropertyTypes.Property>,
    id : Common.PropertyId,
    caller : Principal,
    isAdmin : Bool,
  ) : { #ok; #err : Text } {
    switch (properties.find(func(p) { p.id == id })) {
      case null { #err("Property not found") };
      case (?p) {
        if (not isAdmin and not Principal.equal(p.listerId, caller)) {
          return #err("Unauthorized: Only the listing agent or an admin can unpublish this property");
        };
        properties.mapInPlace(func(prop) {
          if (prop.id == id) {
            {
              id = prop.id;
              title = prop.title;
              city = prop.city;
              price = prop.price;
              sizeSqft = prop.sizeSqft;
              facing = prop.facing;
              propertyType = prop.propertyType;
              description = prop.description;
              amenities = prop.amenities;
              images = prop.images;
              featured = prop.featured;
              sold = prop.sold;
              published = false;
              listerId = prop.listerId;
              createdAt = prop.createdAt;
              var viewCount = prop.viewCount;
            };
          } else { prop };
        });
        #ok;
      };
    };
  };

  public func incrementViewCount(
    properties : List.List<PropertyTypes.Property>,
    id : Common.PropertyId,
  ) : () {
    switch (properties.find(func(p) { p.id == id })) {
      case (?p) { p.viewCount += 1 };
      case null {};
    };
  };

  public func seedSampleData(
    properties : List.List<PropertyTypes.Property>,
    startId : Nat,
  ) : Nat {
    let now = Time.now();
    let anonymous = Principal.anonymous();

    let samples : [(Text, Text, Nat, Nat, Common.FacingDirection, Common.PropertyType, Text, Bool, Bool)] = [
      ("Modern 3BHK Apartment in DHA", "Lahore", 18500000, 1800, #south, #flat, "Spacious 3-bedroom apartment in DHA Phase 6 with premium finishes, modular kitchen, and covered parking.", true, true),
      ("Luxury 5 Marla Villa", "Islamabad", 32000000, 2250, #east, #villa, "Brand new 5 marla villa in Bahria Town with top-grade construction, gas backup, and a lush front lawn.", false, true),
      ("Commercial Shop on Main Boulevard", "Lahore", 9500000, 650, #north, #commercial, "Prime location commercial shop on Main Boulevard Gulberg, ideal for retail or office use.", false, false),
      ("4-Marla Plot in Bahria Town", "Rawalpindi", 6200000, 900, #west, #plot, "Residential plot in Bahria Town Phase 8, all utilities available, ready for construction.", false, false),
      ("Penthouse with City View", "Karachi", 55000000, 4200, #northEast, #penthouse, "Exclusive penthouse on the 22nd floor in Clifton with panoramic sea and city views, private rooftop terrace, and smart home features.", true, true),
    ];

    var id = startId;
    for ((title, city, price, sizeSqft, facing, propertyType, description, featured, published) in samples.vals()) {
      let prop : PropertyTypes.Property = {
        id = id;
        title = title;
        city = city;
        price = price;
        sizeSqft = sizeSqft;
        facing = facing;
        propertyType = propertyType;
        description = description;
        amenities = [];
        images = [];
        featured = featured;
        sold = false;
        published = published;
        listerId = anonymous;
        createdAt = now;
        var viewCount = 0;
      };
      properties.add(prop);
      id += 1;
    };
    id;
  };
};
