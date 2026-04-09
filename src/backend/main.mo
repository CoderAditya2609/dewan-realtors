import Map "mo:core/Map";
import Set "mo:core/Set";
import List "mo:core/List";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import PropertyTypes "types/property";
import LeadTypes "types/lead";
import UserTypes "types/user";
import Common "types/common";
import PropertyMixin "mixins/property-api";
import LeadMixin "mixins/lead-api";
import UserMixin "mixins/user-api";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Authorization state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage infrastructure
  include MixinObjectStorage();

  // Property state
  let properties = List.empty<PropertyTypes.Property>();
  let nextPropertyId : Common.Counter = { var value = 1 };

  // Lead state
  let inquiries = List.empty<LeadTypes.Inquiry>();
  let visitRequests = List.empty<LeadTypes.VisitRequest>();
  let nextInquiryId : Common.Counter = { var value = 1 };
  let nextVisitRequestId : Common.Counter = { var value = 1 };

  // User / bookmark state
  let userProfiles = Map.empty<Principal, UserTypes.UserProfile>();
  let bookmarks = Map.empty<Principal, Set.Set<Common.PropertyId>>();

  // Mixin inclusions
  include PropertyMixin(accessControlState, properties, nextPropertyId);
  include LeadMixin(accessControlState, inquiries, visitRequests, nextInquiryId, nextVisitRequestId);
  include UserMixin(accessControlState, userProfiles, bookmarks, properties, inquiries);
};
