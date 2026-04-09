import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBookmarks, useToggleBookmark } from "@/hooks/use-properties";
import type { Property } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Bath,
  BedDouble,
  Bookmark,
  BookmarkCheck,
  Eye,
  MapPin,
  Maximize2,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

const TYPE_LABELS: Record<string, string> = {
  flat: "Flat",
  plot: "Plot",
  villa: "Villa",
  commercial: "Commercial",
  penthouse: "Penthouse",
  studio: "Studio",
  townhouse: "Townhouse",
};

interface PropertyListRowProps {
  property: Property;
  index?: number;
  onCompare?: (id: string) => void;
  inCompare?: boolean;
}

export function PropertyListRow({
  property,
  index = 0,
  onCompare,
  inCompare = false,
}: PropertyListRowProps) {
  const { data: bookmarks = [] } = useBookmarks();
  const toggleBookmark = useToggleBookmark();
  const isBookmarked = bookmarks.includes(property.id);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark.mutate(property.id, {
      onSuccess: () => {
        toast.success(
          isBookmarked ? "Removed from saved" : "Saved to bookmarks",
        );
      },
    });
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCompare?.(property.id);
  };

  const imageSrc = property.images[0] ?? "/assets/images/placeholder.svg";

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{ y: -2 }}
      data-ocid={`property-row-${property.id}`}
    >
      <Link
        to="/properties/$id"
        params={{ id: property.id }}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
      >
        <div
          className={[
            "card-glass rounded-xl border border-border/30 overflow-hidden transition-smooth hover:shadow-hover cursor-pointer",
            inCompare ? "ring-2 ring-accent" : "",
          ].join(" ")}
        >
          <div className="flex gap-0">
            {/* Thumbnail */}
            <div className="relative w-44 sm:w-56 md:w-64 shrink-0 overflow-hidden">
              <img
                src={imageSrc}
                alt={property.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                style={{ minHeight: "160px", maxHeight: "180px" }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/assets/images/placeholder.svg";
                }}
              />
              {/* Status overlay */}
              {property.status === "sold" && (
                <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                  <Badge className="text-xs px-3 py-1 bg-destructive text-destructive-foreground border-none">
                    Sold
                  </Badge>
                </div>
              )}
              {/* Featured badge */}
              {property.featured && (
                <div className="absolute top-2 left-2">
                  <Badge className="bg-accent text-accent-foreground text-xs border-none shadow-sm px-2 py-0.5">
                    ★ Featured
                  </Badge>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 p-4 flex flex-col justify-between gap-3">
              <div className="space-y-2">
                {/* Title row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-display font-semibold text-base text-foreground line-clamp-1 leading-snug">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5 text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span className="truncate">{property.address}</span>
                    </div>
                  </div>
                  {/* Price */}
                  <div className="shrink-0 text-right">
                    <div className="font-display font-bold text-lg text-accent leading-none">
                      {property.priceLabel}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {property.sizeSqFt.toLocaleString()} sq.ft
                    </div>
                  </div>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <Badge
                    variant="secondary"
                    className="text-xs px-2 py-0.5 bg-muted border-none"
                  >
                    {TYPE_LABELS[property.type] ?? property.type}
                  </Badge>
                  {property.bedrooms !== undefined && (
                    <span className="flex items-center gap-1">
                      <BedDouble className="w-3.5 h-3.5" />
                      {property.bedrooms} Bed
                    </span>
                  )}
                  {property.bathrooms !== undefined && (
                    <span className="flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5" />
                      {property.bathrooms} Bath
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5" />
                    {property.sizeSqFt.toLocaleString()} sq.ft
                  </span>
                  <span className="capitalize">Facing: {property.facing}</span>
                  <span className="flex items-center gap-1 ml-auto text-muted-foreground/60">
                    <Eye className="w-3 h-3" />
                    {property.views}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground line-clamp-2 hidden sm:block">
                  {property.description}
                </p>

                {/* Amenities */}
                {property.amenities.length > 0 && (
                  <div className="hidden md:flex flex-wrap gap-1">
                    {property.amenities.slice(0, 4).map((a) => (
                      <span
                        key={a}
                        className="text-xs px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground border border-border/40"
                      >
                        {a}
                      </span>
                    ))}
                    {property.amenities.length > 4 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground border border-border/40">
                        +{property.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-1 border-t border-border/30">
                <div
                  className="flex items-center gap-1.5 py-1.5 px-4 rounded-lg text-sm font-medium transition-smooth bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground"
                  data-ocid={`btn-view-row-${property.id}`}
                >
                  View Details
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
                {onCompare && property.status === "available" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCompare}
                    className={[
                      "text-xs h-8 px-3 border-border/60",
                      inCompare
                        ? "bg-accent/15 border-accent/40 text-accent"
                        : "",
                    ].join(" ")}
                    data-ocid={`btn-compare-row-${property.id}`}
                  >
                    {inCompare ? "✓ Added" : "Compare"}
                  </Button>
                )}
                <button
                  type="button"
                  onClick={handleBookmark}
                  className={[
                    "ml-auto w-8 h-8 rounded-lg flex items-center justify-center transition-smooth border",
                    isBookmarked
                      ? "border-accent/40 bg-accent/10 text-accent"
                      : "border-border/60 text-muted-foreground hover:border-accent/40 hover:text-accent",
                  ].join(" ")}
                  aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
                  data-ocid={`btn-bookmark-row-${property.id}`}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-4 h-4" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
