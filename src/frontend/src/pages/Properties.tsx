import { FilterPanel } from "@/components/property/FilterPanel";
import { MapView } from "@/components/property/MapView";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyListRow } from "@/components/property/PropertyListRow";
import { PropertyCardSkeleton } from "@/components/ui/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePropertyComparison } from "@/hooks/use-comparison";
import { useProperties } from "@/hooks/use-properties";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import type {
  FacingDirection,
  Property,
  PropertyFilter,
  PropertyType,
} from "@/types";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Building2,
  ChevronRight,
  Grid3X3,
  LayoutList,
  MapIcon,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type ViewMode = "grid" | "list" | "map";
type SortKey = "featured" | "price-asc" | "price-desc" | "newest";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured First" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "newest", label: "Newest" },
];

const VIEW_ICONS: Record<ViewMode, React.ReactNode> = {
  grid: <Grid3X3 className="w-4 h-4" />,
  list: <LayoutList className="w-4 h-4" />,
  map: <MapIcon className="w-4 h-4" />,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sortProperties(properties: Property[], key: SortKey): Property[] {
  const arr = [...properties];
  switch (key) {
    case "featured":
      return arr.sort((a, b) => Number(b.featured) - Number(a.featured));
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    case "newest":
      return arr.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
  }
}

function countActiveFilters(f: PropertyFilter): number {
  return [
    f.city,
    f.type,
    f.facing,
    f.search,
    f.minPrice,
    f.maxPrice,
    f.minSize,
    f.maxSize,
  ].filter((v) => v !== undefined && v !== "" && v !== 0).length;
}

function filterFromSearch(raw: Record<string, string>): PropertyFilter {
  return {
    city: raw.city || undefined,
    type: (raw.type as PropertyType) || undefined,
    facing: (raw.facing as FacingDirection) || undefined,
    minPrice: raw.minPrice ? Number(raw.minPrice) : undefined,
    maxPrice: raw.maxPrice ? Number(raw.maxPrice) : undefined,
    minSize: raw.minSize ? Number(raw.minSize) : undefined,
    maxSize: raw.maxSize ? Number(raw.maxSize) : undefined,
    search: raw.q || undefined,
  };
}

function filterToSearch(f: PropertyFilter): Record<string, string> {
  const out: Record<string, string> = {};
  if (f.city) out.city = f.city;
  if (f.type) out.type = f.type;
  if (f.facing) out.facing = f.facing;
  if (f.minPrice) out.minPrice = String(f.minPrice);
  if (f.maxPrice) out.maxPrice = String(f.maxPrice);
  if (f.minSize) out.minSize = String(f.minSize);
  if (f.maxSize) out.maxSize = String(f.maxSize);
  if (f.search) out.q = f.search;
  return out;
}

// ─── Static skeleton IDs ──────────────────────────────────────────────────────
const SKELETON_IDS = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e", "sk-f"];

// ─── Page ─────────────────────────────────────────────────────────────────────

export function PropertiesPage() {
  const rawSearch = useSearch({ strict: false }) as Record<string, string>;
  const navigate = useNavigate();

  const [filter, setFilter] = useState<PropertyFilter>(() =>
    filterFromSearch(rawSearch),
  );
  const [sort, setSort] = useState<SortKey>("featured");
  const [view, setView] = useState<ViewMode>("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const { data: properties = [], isLoading } = useProperties(filter);
  const { data: allProperties = [] } = useProperties();
  const { viewedIds } = useRecentlyViewed();
  const {
    toggleCompare,
    isInCompare,
    canAddMore,
    count: compareCount,
  } = usePropertyComparison();

  // Sync filter → URL params
  useEffect(() => {
    void navigate({ search: filterToSearch(filter) as never, replace: true });
  }, [filter, navigate]);

  const handleFilterChange = useCallback(
    (f: PropertyFilter) => setFilter(f),
    [],
  );
  const handleFilterReset = useCallback(() => setFilter({}), []);

  const handleCompare = useCallback(
    (id: string) => {
      if (!isInCompare(id) && !canAddMore) {
        toast.error("You can compare up to 4 properties. Remove one first.");
        return;
      }
      toggleCompare(id);
      toast.success(
        isInCompare(id) ? "Removed from comparison" : "Added to comparison",
      );
    },
    [isInCompare, canAddMore, toggleCompare],
  );

  const sorted = useMemo(
    () => sortProperties(properties, sort),
    [properties, sort],
  );
  const activeFilterCount = useMemo(() => countActiveFilters(filter), [filter]);

  const recentlyViewed = useMemo<Property[]>(() => {
    if (!viewedIds.length) return [];
    return viewedIds
      .map((id) => allProperties.find((p) => p.id === id))
      .filter((p): p is Property => !!p);
  }, [viewedIds, allProperties]);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Page header ────────────────────────────────────── */}
      <section className="bg-card border-b border-border/40 py-8 md:py-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-1"
          >
            <nav
              className="flex items-center gap-1 text-xs text-muted-foreground"
              aria-label="Breadcrumb"
            >
              <span>Home</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">Properties</span>
            </nav>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Browse Properties
            </h1>
            <p className="text-sm text-muted-foreground max-w-lg">
              Discover premium residential and commercial spaces across India's
              top cities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Sticky toolbar ─────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-card/95 backdrop-blur-sm border-b border-border/30 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3 flex-wrap">
          {/* Mobile filter sheet */}
          <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden border-border/60 gap-2 h-8"
                data-ocid="btn-mobile-filter"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge className="bg-accent text-accent-foreground text-xs h-4 px-1.5 border-none">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[310px] p-0 overflow-y-auto">
              <div className="p-4 border-b border-border/40">
                <h2 className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-accent" />
                  Filters
                </h2>
              </div>
              <div className="p-4">
                <FilterPanel
                  filter={filter}
                  onChange={handleFilterChange}
                  onReset={handleFilterReset}
                  activeCount={activeFilterCount}
                />
              </div>
            </SheetContent>
          </Sheet>

          {/* Results count */}
          <p
            className="text-sm text-muted-foreground"
            data-ocid="results-count"
          >
            {isLoading ? (
              <span className="inline-block w-36 h-4 bg-muted rounded animate-pulse" />
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {sorted.length}
                </span>{" "}
                {sorted.length === 1 ? "property" : "properties"}
              </>
            )}
          </p>

          <div className="flex items-center gap-2 ml-auto">
            {/* Sort */}
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger
                className="h-8 text-xs w-44 bg-background border-border/60"
                data-ocid="sort-select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value} className="text-xs">
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View toggle */}
            <div className="flex rounded-lg border border-border/60 overflow-hidden bg-background">
              {(["grid", "list", "map"] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setView(mode)}
                  className={[
                    "w-8 h-8 flex items-center justify-center transition-smooth",
                    view === mode
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                  ].join(" ")}
                  aria-label={`${mode} view`}
                  aria-pressed={view === mode}
                  data-ocid={`btn-view-${mode}`}
                >
                  {VIEW_ICONS[mode]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ───────────────────────────────────── */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6 items-start">
          {/* Desktop filter sidebar */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-24">
            <FilterPanel
              filter={filter}
              onChange={handleFilterChange}
              onReset={handleFilterReset}
              activeCount={activeFilterCount}
            />
          </aside>

          {/* Content area */}
          <main className="flex-1 min-w-0">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {SKELETON_IDS.map((id) => (
                  <PropertyCardSkeleton key={id} />
                ))}
              </div>
            ) : sorted.length === 0 ? (
              <EmptyState
                onReset={handleFilterReset}
                hasActiveFilters={activeFilterCount > 0}
              />
            ) : (
              <AnimatePresence mode="wait">
                {view === "grid" && (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                    data-ocid="properties-grid"
                  >
                    {sorted.map((p, i) => (
                      <PropertyCard
                        key={p.id}
                        property={p}
                        index={i}
                        showCompare
                        onCompare={handleCompare}
                        inCompare={isInCompare(p.id)}
                      />
                    ))}
                  </motion.div>
                )}

                {view === "list" && (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                    data-ocid="properties-list"
                  >
                    {sorted.map((p, i) => (
                      <PropertyListRow
                        key={p.id}
                        property={p}
                        index={i}
                        onCompare={handleCompare}
                        inCompare={isInCompare(p.id)}
                      />
                    ))}
                  </motion.div>
                )}

                {view === "map" && (
                  <motion.div
                    key="map"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MapView
                      properties={sorted}
                      highlightedId={highlightedId}
                      onHighlight={setHighlightedId}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </main>
        </div>
      </div>

      {/* ── Compare float bar ──────────────────────────────── */}
      <AnimatePresence>
        {compareCount > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
            data-ocid="compare-bar"
          >
            <div className="card-glass rounded-full px-5 py-3 border border-accent/30 shadow-elevated flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">
                {compareCount} {compareCount === 1 ? "property" : "properties"}{" "}
                selected
              </span>
              <Button
                size="sm"
                className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 h-8 px-4 text-xs font-medium"
                onClick={() => {
                  window.location.href = "/compare";
                }}
                data-ocid="btn-go-compare"
              >
                Compare Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Recently Viewed ────────────────────────────────── */}
      {recentlyViewed.length > 0 && (
        <section className="bg-muted/30 border-t border-border/30 py-10 mt-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <Star className="w-4 h-4 text-accent" />
                Recently Viewed
              </h2>
              <span className="text-xs text-muted-foreground">
                {recentlyViewed.length} propert
                {recentlyViewed.length === 1 ? "y" : "ies"}
              </span>
            </div>
            <div
              className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1 snap-x snap-mandatory"
              data-ocid="recently-viewed-scroll"
            >
              {recentlyViewed.map((p, i) => (
                <div key={p.id} className="shrink-0 w-64 snap-start">
                  <PropertyCard property={p} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// ─── Empty state ───────────────────────────────────────────────────────────────

function EmptyState({
  onReset,
  hasActiveFilters,
}: {
  onReset: () => void;
  hasActiveFilters: boolean;
}) {
  if (!hasActiveFilters) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col items-center justify-center py-20 text-center"
        data-ocid="empty-state-no-properties"
      >
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.16 62 / 0.12) 0%, oklch(0.72 0.16 62 / 0.04) 100%)",
          }}
        >
          <Building2 className="w-11 h-11 text-accent/50" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
          No properties available yet
        </h3>
        <p className="text-base text-muted-foreground max-w-md mb-4 leading-relaxed">
          No properties have been published at this time. Check back soon — our
          team is curating exceptional listings for you.
        </p>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/8 border border-accent/20">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm text-accent font-medium">
            New listings coming soon
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center justify-center py-20 text-center"
      data-ocid="empty-state-properties"
    >
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-5 shadow-sm">
        <Building2 className="w-9 h-9 text-muted-foreground" />
      </div>
      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
        No properties found
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        We couldn't find any properties matching your current filters. Try
        adjusting your search criteria.
      </p>
      <Button
        onClick={onReset}
        variant="outline"
        className="border-accent/40 text-accent hover:bg-accent/10"
        data-ocid="btn-empty-reset"
      >
        Clear all filters
      </Button>
    </motion.div>
  );
}
