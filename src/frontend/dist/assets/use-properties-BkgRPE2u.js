var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { z as Subscribable, C as shallowEqualObjects, D as hashKey, E as getDefaultState, F as notifyManager, G as useQueryClient, r as reactExports, H as noop, I as shouldThrowError, J as useActor, K as useQuery, N as PropertyType, O as FacingDirection, Q as createActor } from "./index-C7HzK6Z0.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
function toAppFacing(f) {
  const map = {
    [FacingDirection.north]: "north",
    [FacingDirection.south]: "south",
    [FacingDirection.east]: "east",
    [FacingDirection.west]: "west",
    [FacingDirection.northEast]: "north-east",
    [FacingDirection.northWest]: "north-west",
    [FacingDirection.southEast]: "south-east",
    [FacingDirection.southWest]: "south-west"
  };
  return map[f] ?? "north";
}
function toAppPropType(t) {
  const map = {
    [PropertyType.flat]: "flat",
    [PropertyType.plot]: "plot",
    [PropertyType.villa]: "villa",
    [PropertyType.commercial]: "commercial",
    [PropertyType.penthouse]: "penthouse",
    [PropertyType.studio]: "studio",
    [PropertyType.townhouse]: "townhouse",
    [PropertyType.other]: "other"
  };
  return map[t] ?? "flat";
}
function toBackendFacing(f) {
  const map = {
    north: FacingDirection.north,
    south: FacingDirection.south,
    east: FacingDirection.east,
    west: FacingDirection.west,
    "north-east": FacingDirection.northEast,
    "north-west": FacingDirection.northWest,
    "south-east": FacingDirection.southEast,
    "south-west": FacingDirection.southWest
  };
  return map[f] ?? FacingDirection.north;
}
function toBackendPropType(t) {
  const map = {
    flat: PropertyType.flat,
    plot: PropertyType.plot,
    villa: PropertyType.villa,
    commercial: PropertyType.commercial,
    penthouse: PropertyType.penthouse,
    studio: PropertyType.studio,
    townhouse: PropertyType.townhouse,
    other: PropertyType.other
  };
  return map[t] ?? PropertyType.other;
}
function propertyPublicToApp(p) {
  const price = Number(p.price);
  const priceLabel = price >= 1e7 ? `₹${(price / 1e7).toFixed(2)} Cr` : `₹${(price / 1e5).toFixed(0)} L`;
  return {
    id: String(p.id),
    title: p.title,
    description: p.description,
    price,
    priceLabel,
    city: p.city,
    address: p.city,
    sizeSqFt: Number(p.sizeSqft),
    facing: toAppFacing(p.facing),
    type: toAppPropType(p.propertyType),
    amenities: p.amenities,
    images: p.images.map((img) => img.getDirectURL()),
    featured: p.featured,
    status: p.sold ? "sold" : "available",
    createdAt: p.createdAt,
    updatedAt: p.createdAt,
    addedBy: "employee",
    views: Number(p.viewCount)
  };
}
function applyClientFilter(properties, filter) {
  if (!filter) return properties;
  return properties.filter((p) => {
    if (filter.city && !p.city.toLowerCase().includes(filter.city.toLowerCase()))
      return false;
    if (filter.type && p.type !== filter.type) return false;
    if (filter.facing && p.facing !== filter.facing) return false;
    if (filter.status && p.status !== filter.status) return false;
    if (filter.featured !== void 0 && p.featured !== filter.featured)
      return false;
    if (filter.minPrice !== void 0 && p.price < filter.minPrice)
      return false;
    if (filter.maxPrice !== void 0 && p.price > filter.maxPrice)
      return false;
    if (filter.minSize !== void 0 && p.sizeSqFt < filter.minSize)
      return false;
    if (filter.maxSize !== void 0 && p.sizeSqFt > filter.maxSize)
      return false;
    if (filter.search) {
      const q = filter.search.toLowerCase();
      if (!p.title.toLowerCase().includes(q) && !p.city.toLowerCase().includes(q))
        return false;
    }
    return true;
  });
}
function useProperties(filter) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["properties", filter],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.listProperties({});
      const mapped = results.map(propertyPublicToApp);
      return applyClientFilter(mapped, filter);
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function useEmployeeProperties(filter) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["employee-properties", filter],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.listEmployeeProperties();
      const mapped = results.map(propertyPublicToApp);
      return applyClientFilter(mapped, filter);
    },
    enabled: !!actor && !isFetching,
    staleTime: 15e3
  });
}
function useProperty(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      const result = await actor.getProperty(BigInt(id));
      return result ? propertyPublicToApp(result) : null;
    },
    enabled: !!actor && !isFetching && !!id,
    staleTime: 6e4
  });
}
function useFeaturedProperties() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["featured-properties"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.listProperties({ featured: true });
      return results.map(propertyPublicToApp);
    },
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
}
const BOOKMARKS_KEY = "dewan_bookmarks";
function useBookmarks() {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      try {
        const stored = localStorage.getItem(BOOKMARKS_KEY);
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
  });
}
function useToggleBookmark() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (propertyId) => {
      const stored = localStorage.getItem(BOOKMARKS_KEY);
      const current = stored ? JSON.parse(stored) : [];
      const updated = current.includes(propertyId) ? current.filter((id) => id !== propertyId) : [...current, propertyId];
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
      return updated;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookmarks"] })
  });
}
function useInquiries() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["inquiries"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.listInquiries();
      return results.map((i) => ({
        id: String(i.id),
        propertyId: String(i.propertyId),
        propertyTitle: `Property #${i.propertyId}`,
        name: i.name,
        email: i.email,
        phone: i.phone,
        message: i.message,
        createdAt: i.createdAt,
        isRead: i.isRead
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function useSubmitInquiry() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitInquiry({
        propertyId: BigInt(data.propertyId),
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inquiries"] })
  });
}
function useVisitRequests() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["visitRequests"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.listVisitRequests();
      return results.map((v) => ({
        id: String(v.id),
        propertyId: String(v.propertyId),
        propertyTitle: `Property #${v.propertyId}`,
        customerId: v.customerPrincipal.toString(),
        customerName: v.name,
        customerPhone: v.phone,
        preferredDate: v.preferredDate,
        preferredTime: v.preferredTime,
        message: v.message || void 0,
        status: (() => {
          if (v.status === "pending") return "pending";
          if (v.status === "confirmed") return "confirmed";
          if (v.status === "cancelled") return "cancelled";
          if (v.status === "completed") return "completed";
          return "completed";
        })(),
        createdAt: v.createdAt
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function useSubmitVisitRequest() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitVisitRequest({
        propertyId: BigInt(data.propertyId),
        name: data.customerName,
        email: "",
        phone: data.customerPhone,
        message: data.message ?? "",
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["visitRequests"] })
  });
}
function useAddProperty() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.addProperty({
        title: data.title,
        description: data.description,
        city: data.city,
        price: BigInt(Math.round(data.price)),
        sizeSqft: BigInt(Math.round(data.sizeSqFt)),
        facing: toBackendFacing(data.facing),
        propertyType: toBackendPropType(data.type),
        amenities: data.amenities,
        images: [],
        featured: data.featured
      });
      return propertyPublicToApp(result);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["properties"] });
      void qc.invalidateQueries({ queryKey: ["employee-properties"] });
    }
  });
}
function useUpdateProperty() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      id,
      data
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateProperty(BigInt(id), {
        title: data.title ?? "",
        description: data.description ?? "",
        city: data.city ?? "",
        price: BigInt(Math.round(data.price ?? 0)),
        sizeSqft: BigInt(Math.round(data.sizeSqFt ?? 0)),
        facing: toBackendFacing(data.facing ?? "north"),
        propertyType: toBackendPropType(data.type ?? "flat"),
        amenities: data.amenities ?? [],
        images: [],
        featured: data.featured ?? false
      });
      return result ? propertyPublicToApp(result) : null;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["properties"] });
      void qc.invalidateQueries({ queryKey: ["employee-properties"] });
    }
  });
}
function useDeleteProperty() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProperty(BigInt(id));
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["properties"] });
      void qc.invalidateQueries({ queryKey: ["employee-properties"] });
    }
  });
}
function useMarkPropertySold() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.markPropertySold(BigInt(id), true);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["properties"] });
      void qc.invalidateQueries({ queryKey: ["employee-properties"] });
    }
  });
}
function usePublishProperty() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.publishProperty(BigInt(id));
      if ("err" in result) throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["properties"] });
      void qc.invalidateQueries({ queryKey: ["employee-properties"] });
    }
  });
}
function useUnpublishProperty() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.unpublishProperty(BigInt(id));
      if ("err" in result) throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["properties"] });
      void qc.invalidateQueries({ queryKey: ["employee-properties"] });
    }
  });
}
function useDashboard() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      if (!actor) {
        return {
          totalListings: 0,
          activeListings: 0,
          soldListings: 0,
          totalInquiries: 0,
          totalVisitRequests: 0,
          monthlyInquiries: [],
          propertyTypeBreakdown: []
        };
      }
      try {
        const dashboard = await actor.getEmployeeDashboard();
        const {
          stats,
          monthlyInquiries,
          topPropertyViews: _topViews
        } = dashboard;
        const monthlyData = monthlyInquiries.map((m) => ({
          month: m.month,
          inquiries: Number(m.count),
          views: 0
        }));
        const properties = await actor.listEmployeeProperties();
        const typeCounts = {};
        for (const p of properties) {
          typeCounts[p.propertyType] = (typeCounts[p.propertyType] ?? 0) + 1;
        }
        const typeBreakdown = Object.entries(typeCounts).map(([t, count]) => ({
          type: toAppPropType(t),
          count
        }));
        return {
          totalListings: Number(stats.totalListings),
          activeListings: Number(stats.activeListings),
          soldListings: Number(stats.soldListings),
          totalInquiries: Number(stats.totalInquiries),
          totalVisitRequests: 0,
          monthlyInquiries: monthlyData,
          propertyTypeBreakdown: typeBreakdown
        };
      } catch {
        return {
          totalListings: 0,
          activeListings: 0,
          soldListings: 0,
          totalInquiries: 0,
          totalVisitRequests: 0,
          monthlyInquiries: [
            { month: "Oct", inquiries: 12, views: 240 },
            { month: "Nov", inquiries: 18, views: 310 },
            { month: "Dec", inquiries: 14, views: 280 },
            { month: "Jan", inquiries: 22, views: 420 },
            { month: "Feb", inquiries: 28, views: 510 },
            { month: "Mar", inquiries: 35, views: 680 }
          ],
          propertyTypeBreakdown: []
        };
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
}
export {
  useBookmarks as a,
  useToggleBookmark as b,
  useProperties as c,
  useProperty as d,
  useSubmitInquiry as e,
  useSubmitVisitRequest as f,
  useDashboard as g,
  useEmployeeProperties as h,
  useAddProperty as i,
  useUpdateProperty as j,
  useDeleteProperty as k,
  useMarkPropertySold as l,
  usePublishProperty as m,
  useUnpublishProperty as n,
  useInquiries as o,
  useVisitRequests as p,
  useFeaturedProperties as u
};
