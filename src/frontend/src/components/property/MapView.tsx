import { Badge } from "@/components/ui/badge";
import type { Property } from "@/types";
import { Link } from "@tanstack/react-router";
import { MapPin, Navigation } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";

// Convert lat/lng to percentage positions
function geoToPercent(
  lat: number,
  lng: number,
  bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number },
  padding = 8,
): { xPct: number; yPct: number } {
  const latRange = bounds.maxLat - bounds.minLat || 1;
  const lngRange = bounds.maxLng - bounds.minLng || 1;
  const inner = 100 - padding * 2;
  const xPct = padding + ((lng - bounds.minLng) / lngRange) * inner;
  const yPct = padding + ((bounds.maxLat - lat) / latRange) * inner;
  return { xPct, yPct };
}

interface MapViewProps {
  properties: Property[];
  highlightedId: string | null;
  onHighlight: (id: string | null) => void;
}

const GRID_ROWS = 5;
const GRID_COLS = 7;

export function MapView({
  properties,
  highlightedId,
  onHighlight,
}: MapViewProps) {
  const mappable = useMemo(
    () => properties.filter((p) => p.latitude && p.longitude),
    [properties],
  );

  const bounds = useMemo(() => {
    if (!mappable.length) {
      return { minLat: 8, maxLat: 32, minLng: 68, maxLng: 98 };
    }
    const lats = mappable.map((p) => p.latitude!);
    const lngs = mappable.map((p) => p.longitude!);
    const pad = 2;
    return {
      minLat: Math.min(...lats) - pad,
      maxLat: Math.max(...lats) + pad,
      minLng: Math.min(...lngs) - pad,
      maxLng: Math.max(...lngs) + pad,
    };
  }, [mappable]);

  const pins = useMemo(
    () => mappable.map((p) => geoToPercent(p.latitude!, p.longitude!, bounds)),
    [mappable, bounds],
  );

  const highlighted = properties.find((p) => p.id === highlightedId);

  const gridRows = Array.from({ length: GRID_ROWS }, (_, i) => i);
  const gridCols = Array.from({ length: GRID_COLS }, (_, i) => i);

  return (
    <div className="flex flex-col lg:flex-row gap-5" data-ocid="map-view">
      {/* ── Map canvas ──────────────────────────────────────── */}
      <div
        className="flex-1 card-glass rounded-xl border border-border/30 overflow-hidden relative"
        style={{ minHeight: "400px" }}
      >
        {/* SVG background (decorative only, no interactive elements) */}
        <svg
          viewBox="0 0 700 420"
          className="w-full h-full absolute inset-0"
          aria-hidden="true"
          focusable="false"
        >
          <title>Map background</title>
          {/* Ocean */}
          <rect width="700" height="420" fill="oklch(0.94 0.02 200)" />
          {/* India simplified outline */}
          <path
            d="M180,60 L240,50 L320,55 L390,65 L440,80 L470,120 L480,170 L470,220 L450,270 L420,310 L390,340 L360,360 L330,380 L300,390 L270,395 L240,385 L220,365 L200,340 L185,300 L170,260 L160,210 L155,160 L160,110 Z"
            fill="oklch(0.90 0.02 100 / 0.6)"
            stroke="oklch(0.80 0.02 100)"
            strokeWidth="1.5"
          />
          {/* Grid lines */}
          {gridRows.map((i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={(420 / (GRID_ROWS - 1)) * i}
              x2="700"
              y2={(420 / (GRID_ROWS - 1)) * i}
              stroke="oklch(0.88 0.01 200 / 0.35)"
              strokeWidth="0.5"
            />
          ))}
          {gridCols.map((i) => (
            <line
              key={`v-${i}`}
              x1={(700 / (GRID_COLS - 1)) * i}
              y1="0"
              x2={(700 / (GRID_COLS - 1)) * i}
              y2="420"
              stroke="oklch(0.88 0.01 200 / 0.35)"
              strokeWidth="0.5"
            />
          ))}
        </svg>

        {/* Interactive HTML pins overlaid on top */}
        {mappable.map((prop, i) => {
          const { xPct, yPct } = pins[i];
          const isHighlighted = prop.id === highlightedId;
          return (
            <button
              key={prop.id}
              type="button"
              onClick={() => onHighlight(isHighlighted ? null : prop.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onHighlight(isHighlighted ? null : prop.id);
                }
              }}
              className={[
                "absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-200 z-10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full",
              ].join(" ")}
              style={{ left: `${xPct}%`, top: `${yPct}%` }}
              aria-label={`${prop.title} — ${prop.priceLabel}`}
              aria-pressed={isHighlighted}
              data-ocid={`map-pin-${prop.id}`}
            >
              {/* Pulse ring */}
              {isHighlighted && (
                <span className="absolute inset-0 rounded-full bg-accent/20 animate-ping" />
              )}
              {/* Pin dot */}
              <span
                className={[
                  "relative flex items-center justify-center rounded-full border-2 border-white shadow-lg transition-all duration-200",
                  isHighlighted
                    ? "w-7 h-7 bg-accent"
                    : "w-5 h-5 bg-primary group-hover:bg-accent group-hover:scale-125",
                ].join(" ")}
              />
              {/* Price chip */}
              <span
                className={[
                  "absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-xs font-bold px-1.5 py-0.5 rounded bg-card shadow-sm border border-border/40 transition-all duration-200",
                  isHighlighted ? "text-accent" : "text-foreground",
                ].join(" ")}
              >
                {prop.priceLabel}
              </span>
            </button>
          );
        })}

        {/* Highlighted tooltip */}
        {highlighted && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-72 card-glass rounded-xl p-3 border border-accent/30 shadow-elevated z-20"
            data-ocid="map-tooltip"
          >
            <div className="flex gap-3 items-start">
              <img
                src={highlighted.images[0] ?? "/assets/images/placeholder.svg"}
                alt={highlighted.title}
                className="w-16 h-14 object-cover rounded-lg shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/assets/images/placeholder.svg";
                }}
              />
              <div className="min-w-0">
                <p className="font-display font-semibold text-sm text-foreground line-clamp-1">
                  {highlighted.title}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-accent shrink-0" />
                  <span className="truncate">{highlighted.city}</span>
                </p>
                <p className="text-sm font-bold text-accent mt-1">
                  {highlighted.priceLabel}
                </p>
              </div>
            </div>
            <Link
              to="/properties/$id"
              params={{ id: highlighted.id }}
              className="mt-2 block text-center text-xs text-accent hover:text-accent/80 font-medium transition-colors"
            >
              View Details →
            </Link>
          </motion.div>
        )}

        {/* Legend */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-card/90 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-border/30 text-xs text-muted-foreground z-10">
          <Navigation className="w-3 h-3 text-accent" />
          <span>{mappable.length} locations plotted</span>
        </div>
      </div>

      {/* ── Sidebar list ─────────────────────────────────────── */}
      <div
        className="lg:w-80 shrink-0 space-y-2 lg:max-h-[500px] lg:overflow-y-auto pr-0.5"
        data-ocid="map-sidebar"
      >
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1 pb-1">
          All Properties ({properties.length})
        </p>
        {properties.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onHighlight(p.id === highlightedId ? null : p.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onHighlight(p.id === highlightedId ? null : p.id);
              }
            }}
            className={[
              "w-full text-left rounded-xl border transition-smooth p-3 flex gap-3 items-start",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              p.id === highlightedId
                ? "border-accent/50 bg-accent/5 shadow-sm"
                : "border-border/30 bg-card/60 hover:border-accent/30 hover:bg-card/80",
              !p.latitude || !p.longitude ? "opacity-50" : "",
            ].join(" ")}
            data-ocid={`map-list-item-${p.id}`}
          >
            <img
              src={p.images[0] ?? "/assets/images/placeholder.svg"}
              alt={p.title}
              className="w-14 h-12 object-cover rounded-lg shrink-0"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "/assets/images/placeholder.svg";
              }}
            />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-xs text-foreground line-clamp-1">
                {p.title}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5 truncate">
                <MapPin className="w-2.5 h-2.5 text-accent shrink-0" />
                {p.city}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs font-bold text-accent">
                  {p.priceLabel}
                </span>
                {!p.latitude && !p.longitude && (
                  <Badge
                    variant="secondary"
                    className="text-xs px-1.5 py-0 bg-muted text-muted-foreground border-none"
                  >
                    No coords
                  </Badge>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
