import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePropertyComparison } from "@/hooks/use-comparison";
import { useProperties } from "@/hooks/use-properties";
import type { Property } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle,
  MapPin,
  SlidersHorizontal,
  X,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TYPE_LABELS: Record<string, string> = {
  flat: "Flat",
  plot: "Plot",
  villa: "Villa",
  commercial: "Commercial",
  penthouse: "Penthouse",
  studio: "Studio",
  townhouse: "Townhouse",
};

const FACING_LABELS: Record<string, string> = {
  north: "North",
  south: "South",
  east: "East",
  west: "West",
  "north-east": "North-East",
  "north-west": "North-West",
  "south-east": "South-East",
  "south-west": "South-West",
};

// ─── CompareRow ───────────────────────────────────────────────────────────────

interface CompareRowProps {
  label: string;
  colCount: number;
  values: (string | number | boolean | undefined)[];
  /** numeric index into values that should be gold-highlighted */
  bestIndex?: number;
  isBooleanRow?: boolean;
}

function CompareRow({
  label,
  colCount,
  values,
  bestIndex,
  isBooleanRow,
}: CompareRowProps) {
  return (
    <div
      className="grid border-b border-border/30 last:border-0"
      style={{ gridTemplateColumns: `140px repeat(${colCount}, 1fr)` }}
    >
      {/* Row label */}
      <div className="px-4 py-3.5 bg-muted/20 text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center">
        {label}
      </div>

      {values.map((v, i) => {
        const key = `${label}-${i}`;
        const isHighlight = i === bestIndex;
        return (
          <div
            key={key}
            className={[
              "px-4 py-3.5 text-sm border-l border-border/30 flex items-center",
              isHighlight
                ? "text-accent font-bold bg-accent/5"
                : "text-foreground",
            ].join(" ")}
          >
            {isBooleanRow ? (
              v ? (
                <CheckCircle className="w-4 h-4 text-accent" />
              ) : (
                <XCircle className="w-4 h-4 text-muted-foreground/40" />
              )
            ) : (
              <span>{String(v ?? "—")}</span>
            )}
            {isHighlight && !isBooleanRow && (
              <span className="ml-1.5 text-[10px] font-medium bg-accent/15 text-accent px-1.5 py-0.5 rounded-full leading-none">
                Best
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── AmenitiesRow ─────────────────────────────────────────────────────────────

interface AmenitiesRowProps {
  properties: Property[];
}

function AmenitiesRow({ properties }: AmenitiesRowProps) {
  return (
    <div
      className="grid border-b border-border/30 last:border-0"
      style={{
        gridTemplateColumns: `140px repeat(${properties.length}, 1fr)`,
      }}
    >
      <div className="px-4 py-3.5 bg-muted/20 text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-start pt-4">
        Amenities
      </div>
      {properties.map((p) => (
        <div key={p.id} className="px-4 py-3.5 border-l border-border/30">
          <p className="text-sm text-foreground leading-relaxed">
            {p.amenities.join(", ") || "—"}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── ComparePage ──────────────────────────────────────────────────────────────

export function ComparePage() {
  const { compareIds, removeFromCompare, clearCompare } =
    usePropertyComparison();
  const { data: allProperties = [] } = useProperties();

  const compareProperties: Property[] = useMemo(
    () =>
      compareIds
        .slice(0, 4)
        .map((id) => allProperties.find((p) => p.id === id))
        .filter((p): p is Property => !!p),
    [compareIds, allProperties],
  );

  // Find best (lowest) price index
  const lowestPriceIndex = useMemo(() => {
    if (compareProperties.length === 0) return -1;
    let minIdx = 0;
    for (let i = 1; i < compareProperties.length; i++) {
      if (compareProperties[i].price < compareProperties[minIdx].price) {
        minIdx = i;
      }
    }
    return minIdx;
  }, [compareProperties]);

  // Find best (largest) size index
  const largestSizeIndex = useMemo(() => {
    if (compareProperties.length === 0) return -1;
    let maxIdx = 0;
    for (let i = 1; i < compareProperties.length; i++) {
      if (compareProperties[i].sizeSqFt > compareProperties[maxIdx].sizeSqFt) {
        maxIdx = i;
      }
    }
    return maxIdx;
  }, [compareProperties]);

  // Empty state
  if (compareIds.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center"
          data-ocid="empty-state-compare"
        >
          <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6">
            <SlidersHorizontal className="w-10 h-10 text-muted-foreground/40" />
          </div>
          <h2 className="text-heading text-foreground mb-3">
            No properties selected for comparison
          </h2>
          <p className="text-muted-foreground text-sm max-w-sm mb-8 leading-relaxed">
            Browse properties and click{" "}
            <span className="text-accent font-medium">Compare</span> to add
            them. You can compare up to 4 properties side by side.
          </p>
          <Link to="/properties">
            <Button
              className="btn-primary gap-2"
              data-ocid="btn-go-browse-compare"
            >
              Browse Properties
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="bg-card border-b border-border/50">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-heading text-foreground mb-1">
              Compare Properties
            </h1>
            <p className="text-muted-foreground text-sm">
              {compareProperties.length} of 4 properties selected
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Link to="/properties">
              <Button
                variant="outline"
                size="sm"
                className="border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground"
                data-ocid="btn-add-more-compare"
              >
                + Add More
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCompare}
              className="text-destructive hover:bg-destructive/10"
              data-ocid="btn-clear-compare"
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>

      {/* Comparison grid */}
      <div className="container mx-auto px-4 py-8 overflow-x-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          {/* Property header cards */}
          <div
            className="grid gap-4 mb-6 min-w-[500px]"
            style={{
              gridTemplateColumns: `140px repeat(${compareProperties.length}, 1fr)`,
            }}
          >
            {/* empty label cell */}
            <div />

            {compareProperties.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="card-glass rounded-xl border border-border/30 overflow-hidden"
                data-ocid={`compare-property-${p.id}`}
              >
                {/* Property image */}
                <div className="relative">
                  <img
                    src={p.images[0] ?? "/assets/images/placeholder.svg"}
                    alt={p.title}
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/assets/images/placeholder.svg";
                    }}
                  />
                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeFromCompare(p.id)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-card/95 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth shadow"
                    aria-label={`Remove ${p.title} from comparison`}
                    data-ocid={`btn-remove-compare-${p.id}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  {/* Featured badge */}
                  {p.featured && (
                    <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground border-none text-xs shadow">
                      ★ Featured
                    </Badge>
                  )}
                </div>

                {/* Card info */}
                <div className="p-3 space-y-1.5">
                  <h3 className="font-display font-semibold text-sm text-foreground line-clamp-2 leading-snug">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3 text-accent shrink-0" />
                    <span className="truncate">{p.city}</span>
                  </div>
                  <p className="font-display font-bold text-base text-accent">
                    {p.priceLabel}
                  </p>
                  <Link to="/properties/$id" params={{ id: p.id }}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs h-7 mt-1"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="card-glass rounded-xl border border-border/30 overflow-hidden min-w-[500px]">
            <div className="bg-muted/30 px-4 py-3 border-b border-border/40 flex items-center justify-between">
              <h3 className="font-semibold text-sm text-foreground">
                Side-by-Side Comparison
              </h3>
              <span className="text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent/60 inline-block" />
                  Gold = Best value
                </span>
              </span>
            </div>

            {/* Price */}
            <CompareRow
              label="Price"
              colCount={compareProperties.length}
              values={compareProperties.map((p) => p.priceLabel)}
              bestIndex={lowestPriceIndex}
            />

            {/* Size */}
            <CompareRow
              label="Size (sq.ft)"
              colCount={compareProperties.length}
              values={compareProperties.map(
                (p) => `${p.sizeSqFt.toLocaleString()} sq.ft`,
              )}
              bestIndex={largestSizeIndex}
            />

            {/* Type */}
            <CompareRow
              label="Type"
              colCount={compareProperties.length}
              values={compareProperties.map(
                (p) => TYPE_LABELS[p.type] ?? p.type,
              )}
            />

            {/* Facing */}
            <CompareRow
              label="Facing"
              colCount={compareProperties.length}
              values={compareProperties.map(
                (p) => FACING_LABELS[p.facing] ?? p.facing,
              )}
            />

            {/* City */}
            <CompareRow
              label="City"
              colCount={compareProperties.length}
              values={compareProperties.map((p) => p.city)}
            />

            {/* Status */}
            <CompareRow
              label="Status"
              colCount={compareProperties.length}
              values={compareProperties.map((p) =>
                p.status === "sold" ? "Sold" : "Active",
              )}
            />

            {/* Featured */}
            <CompareRow
              label="Featured"
              colCount={compareProperties.length}
              values={compareProperties.map((p) => p.featured)}
              isBooleanRow
            />

            {/* Amenities */}
            <AmenitiesRow properties={compareProperties} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
