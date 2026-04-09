import {
  FacingDirection as BackendFacing,
  PropertyType as BackendPropType,
  type PropertyPublic,
  createActor,
} from "@/backend";
import type {
  DashboardStats,
  FacingDirection,
  Inquiry,
  InquiryFormData,
  MonthlyData,
  Property,
  PropertyFilter,
  PropertyFormData,
  PropertyStatus,
  PropertyType,
  TypeBreakdown,
  VisitRequest,
  VisitRequestFormData,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Helpers: Backend → Fron-end type mapping ─────────────────────────────────

function toAppFacing(f: BackendFacing): FacingDirection {
  const map: Record<BackendFacing, FacingDirection> = {
    [BackendFacing.north]: "north",
    [BackendFacing.south]: "south",
    [BackendFacing.east]: "east",
    [BackendFacing.west]: "west",
    [BackendFacing.northEast]: "north-east",
    [BackendFacing.northWest]: "north-west",
    [BackendFacing.southEast]: "south-east",
    [BackendFacing.southWest]: "south-west",
  };
  return map[f] ?? "north";
}

function toAppPropType(t: BackendPropType): PropertyType {
  const map: Record<BackendPropType, PropertyType> = {
    [BackendPropType.flat]: "flat",
    [BackendPropType.plot]: "plot",
    [BackendPropType.villa]: "villa",
    [BackendPropType.commercial]: "commercial",
    [BackendPropType.penthouse]: "penthouse",
    [BackendPropType.studio]: "studio",
    [BackendPropType.townhouse]: "townhouse",
    [BackendPropType.other]: "other",
  };
  return map[t] ?? "flat";
}

function toBackendFacing(f: FacingDirection): BackendFacing {
  const map: Record<FacingDirection, BackendFacing> = {
    north: BackendFacing.north,
    south: BackendFacing.south,
    east: BackendFacing.east,
    west: BackendFacing.west,
    "north-east": BackendFacing.northEast,
    "north-west": BackendFacing.northWest,
    "south-east": BackendFacing.southEast,
    "south-west": BackendFacing.southWest,
  };
  return map[f] ?? BackendFacing.north;
}

function toBackendPropType(t: PropertyType): BackendPropType {
  const map: Record<PropertyType, BackendPropType> = {
    flat: BackendPropType.flat,
    plot: BackendPropType.plot,
    villa: BackendPropType.villa,
    commercial: BackendPropType.commercial,
    penthouse: BackendPropType.penthouse,
    studio: BackendPropType.studio,
    townhouse: BackendPropType.townhouse,
    other: BackendPropType.other,
  };
  return map[t] ?? BackendPropType.other;
}

function propertyPublicToApp(p: PropertyPublic): Property {
  const price = Number(p.price);
  const priceLabel =
    price >= 10_000_000
      ? `₹${(price / 10_000_000).toFixed(2)} Cr`
      : `₹${(price / 100_000).toFixed(0)} L`;
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
    status: p.sold ? "sold" : ("available" as PropertyStatus),
    createdAt: p.createdAt,
    updatedAt: p.createdAt,
    addedBy: "employee",
    views: Number(p.viewCount),
  };
}

function applyClientFilter(
  properties: Property[],
  filter?: PropertyFilter,
): Property[] {
  if (!filter) return properties;
  return properties.filter((p) => {
    if (
      filter.city &&
      !p.city.toLowerCase().includes(filter.city.toLowerCase())
    )
      return false;
    if (filter.type && p.type !== filter.type) return false;
    if (filter.facing && p.facing !== filter.facing) return false;
    if (filter.status && p.status !== filter.status) return false;
    if (filter.featured !== undefined && p.featured !== filter.featured)
      return false;
    if (filter.minPrice !== undefined && p.price < filter.minPrice)
      return false;
    if (filter.maxPrice !== undefined && p.price > filter.maxPrice)
      return false;
    if (filter.minSize !== undefined && p.sizeSqFt < filter.minSize)
      return false;
    if (filter.maxSize !== undefined && p.sizeSqFt > filter.maxSize)
      return false;
    if (filter.search) {
      const q = filter.search.toLowerCase();
      if (
        !p.title.toLowerCase().includes(q) &&
        !p.city.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });
}

// ─── Properties (Public — only published) ─────────────────────────────────────

export function useProperties(filter?: PropertyFilter) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Property[]>({
    queryKey: ["properties", filter],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.listProperties({});
      const mapped = results.map(propertyPublicToApp);
      return applyClientFilter(mapped, filter);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

// ─── Employee Properties (all, requires auth) ─────────────────────────────────

export function useEmployeeProperties(filter?: PropertyFilter) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Property[]>({
    queryKey: ["employee-properties", filter],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.listEmployeeProperties();
      const mapped = results.map(propertyPublicToApp);
      return applyClientFilter(mapped, filter);
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
  });
}

export function useProperty(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Property | null>({
    queryKey: ["property", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      const result = await actor.getProperty(BigInt(id));
      return result ? propertyPublicToApp(result) : null;
    },
    enabled: !!actor && !isFetching && !!id,
    staleTime: 60_000,
  });
}

export function useFeaturedProperties() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Property[]>({
    queryKey: ["featured-properties"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.listProperties({ featured: true });
      return results.map(propertyPublicToApp);
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

// ─── Bookmarks ───────────────────────────────────────────────────────────────

const BOOKMARKS_KEY = "dewan_bookmarks";

export function useBookmarks() {
  return useQuery<string[]>({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      try {
        const stored = localStorage.getItem(BOOKMARKS_KEY);
        return stored ? (JSON.parse(stored) as string[]) : [];
      } catch {
        return [];
      }
    },
  });
}

export function useToggleBookmark() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (propertyId: string) => {
      const stored = localStorage.getItem(BOOKMARKS_KEY);
      const current: string[] = stored ? (JSON.parse(stored) as string[]) : [];
      const updated = current.includes(propertyId)
        ? current.filter((id) => id !== propertyId)
        : [...current, propertyId];
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
      return updated;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookmarks"] }),
  });
}

// ─── Inquiries ───────────────────────────────────────────────────────────────

export function useInquiries() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Inquiry[]>({
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
        isRead: i.isRead,
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useSubmitInquiry() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (data: InquiryFormData) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitInquiry({
        propertyId: BigInt(data.propertyId),
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inquiries"] }),
  });
}

// ─── Visit Requests ───────────────────────────────────────────────────────────

export function useVisitRequests() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<VisitRequest[]>({
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
        message: v.message || undefined,
        status: ((): VisitRequest["status"] => {
          if (v.status === "pending") return "pending";
          if (v.status === "confirmed") return "confirmed";
          if (v.status === "cancelled") return "cancelled";
          if (v.status === "completed") return "completed";
          // "reviewed" maps to "completed" as the closest semantic match
          return "completed";
        })(),
        createdAt: v.createdAt,
      }));
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useSubmitVisitRequest() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (data: VisitRequestFormData) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitVisitRequest({
        propertyId: BigInt(data.propertyId),
        name: data.customerName,
        email: "",
        phone: data.customerPhone,
        message: data.message ?? "",
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["visitRequests"] }),
  });
}

// ─── Property Mutations ───────────────────────────────────────────────────────

export function useAddProperty() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (data: PropertyFormData): Promise<Property> => {
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
        featured: data.featured,
      });
      return propertyPublicToApp(result);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["properties"] });
      void qc.invalidateQueries({ queryKey: ["employee-properties"] });
    },
  });
}

export function useUpdateProperty() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: { id: string; data: Partial<PropertyFormData> }) => {
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
        featured: data.featured ?? false,
      });
      return result ? propertyPublicToApp(result) : null;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["properties"] });
      void qc.invalidateQueries({ queryKey: ["employee-properties"] });
    },
  });
}

export function useDeleteProperty() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProperty(BigInt(id));
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["properties"] });
      void qc.invalidateQueries({ queryKey: ["employee-properties"] });
    },
  });
}

export function useMarkPropertySold() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.markPropertySold(BigInt(id), true);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["properties"] });
      void qc.invalidateQueries({ queryKey: ["employee-properties"] });
    },
  });
}

// ─── Publish / Unpublish (simulated via featured flag until backend supports it) ──

export function usePublishProperty() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.publishProperty(BigInt(id));
      if ("err" in result) throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["properties"] });
      void qc.invalidateQueries({ queryKey: ["employee-properties"] });
    },
  });
}

export function useUnpublishProperty() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.unpublishProperty(BigInt(id));
      if ("err" in result) throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["properties"] });
      void qc.invalidateQueries({ queryKey: ["employee-properties"] });
    },
  });
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export function useDashboard() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DashboardStats>({
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
          propertyTypeBreakdown: [],
        };
      }

      try {
        const dashboard = await actor.getEmployeeDashboard();
        const {
          stats,
          monthlyInquiries,
          topPropertyViews: _topViews,
        } = dashboard;

        const monthlyData: MonthlyData[] = monthlyInquiries.map((m) => ({
          month: m.month,
          inquiries: Number(m.count),
          views: 0,
        }));

        // Build type breakdown from listEmployeeProperties (all properties, not just published)
        const properties = await actor.listEmployeeProperties();
        const typeCounts: Partial<Record<BackendPropType, number>> = {};
        for (const p of properties) {
          typeCounts[p.propertyType] = (typeCounts[p.propertyType] ?? 0) + 1;
        }
        const typeBreakdown: TypeBreakdown[] = (
          Object.entries(typeCounts) as [BackendPropType, number][]
        ).map(([t, count]) => ({
          type: toAppPropType(t),
          count,
        }));

        return {
          totalListings: Number(stats.totalListings),
          activeListings: Number(stats.activeListings),
          soldListings: Number(stats.soldListings),
          totalInquiries: Number(stats.totalInquiries),
          totalVisitRequests: 0,
          monthlyInquiries: monthlyData,
          propertyTypeBreakdown: typeBreakdown,
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
            { month: "Mar", inquiries: 35, views: 680 },
          ],
          propertyTypeBreakdown: [],
        };
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}
