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

interface PropertyCardProps {
  property: Property;
  index?: number;
  showCompare?: boolean;
  onCompare?: (id: string) => void;
  inCompare?: boolean;
}

export function PropertyCard({
  property,
  index = 0,
  showCompare = false,
  onCompare,
  inCompare = false,
}: PropertyCardProps) {
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
  const isAvailable = property.status === "available";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative"
      data-ocid={`property-card-${property.id}`}
    >
      <Link
        to="/properties/$id"
        params={{ id: property.id }}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
      >
        <div
          className={[
            "card-glass rounded-xl overflow-hidden transition-smooth cursor-pointer",
            "hover:shadow-hover border border-border/30",
            inCompare ? "ring-2 ring-accent" : "",
          ].join(" ")}
        >
          {/* Image */}
          <div className="relative overflow-hidden aspect-[4/3]">
            <img
              src={imageSrc}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "/assets/images/placeholder.svg";
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />

            {/* Status badge */}
            {property.status === "sold" && (
              <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                <Badge className="text-sm px-4 py-1.5 bg-destructive text-destructive-foreground border-none shadow-elevated">
                  Sold
                </Badge>
              </div>
            )}

            {/* Top badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              {property.featured && (
                <Badge className="bg-accent text-accent-foreground text-xs font-semibold border-none shadow-md-soft px-2 py-0.5">
                  ★ Featured
                </Badge>
              )}
              <Badge
                variant="secondary"
                className="bg-card/90 backdrop-blur-sm text-foreground text-xs border-none shadow-md-soft px-2 py-0.5"
              >
                {TYPE_LABELS[property.type] ?? property.type}
              </Badge>
            </div>

            {/* Price badge bottom-right */}
            <div className="absolute bottom-3 right-3">
              <div className="bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-elevated">
                <span className="font-display font-bold text-base text-accent leading-none">
                  {property.priceLabel}
                </span>
              </div>
            </div>

            {/* Bookmark button */}
            <button
              type="button"
              onClick={handleBookmark}
              className={[
                "absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-smooth shadow-md-soft",
                "bg-card/90 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground",
                isBookmarked ? "text-accent" : "text-muted-foreground",
              ].join(" ")}
              aria-label={
                isBookmarked ? "Remove bookmark" : "Bookmark property"
              }
              data-ocid={`btn-bookmark-${property.id}`}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Title + views */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display font-semibold text-base text-foreground leading-tight line-clamp-2 min-w-0">
                {property.title}
              </h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                <Eye className="w-3 h-3" />
                {property.views}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
              <span className="truncate">{property.address}</span>
            </div>

            {/* Details row */}
            <div className="flex items-center gap-3 pt-0.5">
              {property.bedrooms !== undefined && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <BedDouble className="w-3.5 h-3.5" />
                  <span>{property.bedrooms} Bed</span>
                </div>
              )}
              {property.bathrooms !== undefined && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Bath className="w-3.5 h-3.5" />
                  <span>{property.bathrooms} Bath</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{property.sizeSqFt.toLocaleString()} sq.ft</span>
              </div>
            </div>

            {/* Facing & city */}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-0.5 border-t border-border/40">
              <span className="capitalize">Facing: {property.facing}</span>
              <span className="text-foreground/70 font-medium">
                {property.city}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1">
              <span
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-smooth bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground group/cta"
                data-ocid={`btn-view-property-${property.id}`}
              >
                View Details
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              </span>
              {showCompare && isAvailable && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCompare}
                  className={[
                    "text-xs h-9 px-3 border-border/60",
                    inCompare
                      ? "bg-accent/15 border-accent/40 text-accent"
                      : "",
                  ].join(" ")}
                  data-ocid={`btn-compare-${property.id}`}
                >
                  {inCompare ? "✓ Added" : "Compare"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
