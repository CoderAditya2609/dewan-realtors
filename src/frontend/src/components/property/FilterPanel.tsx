import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import type { FacingDirection, PropertyFilter, PropertyType } from "@/types";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";

const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: "flat", label: "Flat / Apartment" },
  { value: "villa", label: "Villa / Bungalow" },
  { value: "plot", label: "Plot / Land" },
  { value: "commercial", label: "Commercial" },
  { value: "penthouse", label: "Penthouse" },
  { value: "studio", label: "Studio" },
  { value: "townhouse", label: "Townhouse" },
];

const FACING_DIRECTIONS: { value: FacingDirection; label: string }[] = [
  { value: "north", label: "North" },
  { value: "south", label: "South" },
  { value: "east", label: "East" },
  { value: "west", label: "West" },
  { value: "north-east", label: "North-East" },
  { value: "north-west", label: "North-West" },
  { value: "south-east", label: "South-East" },
  { value: "south-west", label: "South-West" },
];

const CITIES = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
];

const MIN_PRICE = 0;
const MAX_PRICE = 50_000_000;
const MIN_SIZE = 0;
const MAX_SIZE = 10_000;

function formatPrice(val: number): string {
  if (val >= 10_000_000) return `₹${(val / 10_000_000).toFixed(1)} Cr`;
  if (val >= 100_000) return `₹${(val / 100_000).toFixed(0)} L`;
  return `₹${val.toLocaleString()}`;
}

interface FilterPanelProps {
  filter: PropertyFilter;
  onChange: (f: PropertyFilter) => void;
  onReset: () => void;
  activeCount: number;
}

export function FilterPanel({
  filter,
  onChange,
  onReset,
  activeCount,
}: FilterPanelProps) {
  const [expanded, setExpanded] = useState(true);

  const update = useCallback(
    (
      key: keyof PropertyFilter,
      value: PropertyFilter[keyof PropertyFilter],
    ) => {
      onChange({ ...filter, [key]: value || undefined });
    },
    [filter, onChange],
  );

  const priceRange: [number, number] = [
    filter.minPrice ?? MIN_PRICE,
    filter.maxPrice ?? MAX_PRICE,
  ];

  const sizeRange: [number, number] = [
    filter.minSize ?? MIN_SIZE,
    filter.maxSize ?? MAX_SIZE,
  ];

  return (
    <div
      className="card-glass rounded-xl border border-border/30 overflow-hidden"
      data-ocid="filter-panel"
    >
      {/* Header */}
      <button
        type="button"
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/40 transition-smooth"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        data-ocid="filter-panel-toggle"
      >
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="w-4 h-4 text-accent" />
          <span className="font-semibold text-sm text-foreground">Filters</span>
          {activeCount > 0 && (
            <Badge className="bg-accent text-accent-foreground text-xs border-none h-5 px-1.5">
              {activeCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onReset();
              }}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
              data-ocid="btn-filter-reset"
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          )}
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Filter content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 space-y-5 border-t border-border/40">
              {/* Search */}
              <div className="space-y-1.5 pt-4">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Search
                </Label>
                <Input
                  placeholder="Title, city, location…"
                  value={filter.search ?? ""}
                  onChange={(e) => update("search", e.target.value)}
                  className="h-9 text-sm bg-background/60"
                  data-ocid="filter-search"
                />
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  City
                </Label>
                <Select
                  value={filter.city ?? "all"}
                  onValueChange={(v) =>
                    update("city", v === "all" ? undefined : v)
                  }
                >
                  <SelectTrigger
                    className="h-9 text-sm bg-background/60"
                    data-ocid="filter-city"
                  >
                    <SelectValue placeholder="All Cities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {CITIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Property Type */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Property Type
                </Label>
                <div className="flex flex-wrap gap-1.5">
                  {PROPERTY_TYPES.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        update(
                          "type",
                          filter.type === value ? undefined : value,
                        )
                      }
                      className={[
                        "text-xs px-3 py-1.5 rounded-full border transition-smooth font-medium",
                        filter.type === value
                          ? "bg-accent text-accent-foreground border-accent"
                          : "bg-background/60 text-muted-foreground border-border/60 hover:border-accent/40 hover:text-foreground",
                      ].join(" ")}
                      data-ocid={`filter-type-${value}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Price Range
                  </Label>
                  <span className="text-xs text-accent font-medium">
                    {formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}
                  </span>
                </div>
                <Slider
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                  step={500_000}
                  value={priceRange}
                  onValueChange={([min, max]) => {
                    onChange({
                      ...filter,
                      minPrice: min || undefined,
                      maxPrice: max >= MAX_PRICE ? undefined : max,
                    });
                  }}
                  className="w-full"
                  data-ocid="filter-price-range"
                />
              </div>

              {/* Size Range */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Size (sq.ft)
                  </Label>
                  <span className="text-xs text-accent font-medium">
                    {sizeRange[0].toLocaleString()} –{" "}
                    {sizeRange[1] >= MAX_SIZE
                      ? "Any"
                      : `${sizeRange[1].toLocaleString()}`}
                  </span>
                </div>
                <Slider
                  min={MIN_SIZE}
                  max={MAX_SIZE}
                  step={100}
                  value={sizeRange}
                  onValueChange={([min, max]) => {
                    onChange({
                      ...filter,
                      minSize: min || undefined,
                      maxSize: max >= MAX_SIZE ? undefined : max,
                    });
                  }}
                  className="w-full"
                  data-ocid="filter-size-range"
                />
              </div>

              {/* Facing Direction */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Facing Direction
                </Label>
                <Select
                  value={filter.facing ?? "all"}
                  onValueChange={(v) =>
                    update(
                      "facing",
                      v === "all" ? undefined : (v as FacingDirection),
                    )
                  }
                >
                  <SelectTrigger
                    className="h-9 text-sm bg-background/60"
                    data-ocid="filter-facing"
                  >
                    <SelectValue placeholder="Any Direction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Direction</SelectItem>
                    {FACING_DIRECTIONS.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Apply / Reset */}
              <Button
                variant="outline"
                size="sm"
                onClick={onReset}
                className="w-full text-sm border-border/60 hover:bg-destructive/10 hover:border-destructive/40 hover:text-destructive"
                disabled={activeCount === 0}
                data-ocid="btn-filter-reset-bottom"
              >
                Reset All Filters
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
