import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyCardSkeleton } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { usePropertyComparison } from "@/hooks/use-comparison";
import {
  useBookmarks,
  useProperties,
  useToggleBookmark,
} from "@/hooks/use-properties";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Bookmark, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";

export function SavedPage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Redirect non-logged-in users
  useEffect(() => {
    if (!isLoggedIn) {
      navigate({ to: "/auth/login" });
    }
  }, [isLoggedIn, navigate]);

  const { data: bookmarkIds = [], isLoading: bookmarksLoading } =
    useBookmarks();
  const { data: allProperties = [], isLoading: propsLoading } = useProperties();
  const { toggleCompare, isInCompare, canAddMore } = usePropertyComparison();
  const toggleBookmark = useToggleBookmark();

  const savedProperties = useMemo(
    () => allProperties.filter((p) => bookmarkIds.includes(p.id)),
    [allProperties, bookmarkIds],
  );

  const isLoading = bookmarksLoading || propsLoading;

  const handleCompare = (id: string) => {
    if (!isInCompare(id) && !canAddMore) {
      toast.error("You can compare up to 4 properties at a time");
      return;
    }
    toggleCompare(id);
    toast.success(
      isInCompare(id) ? "Removed from comparison" : "Added to comparison",
    );
  };

  const handleRemoveBookmark = (id: string) => {
    toggleBookmark.mutate(id, {
      onSuccess: () => toast.success("Removed from saved properties"),
    });
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="bg-card border-b border-border/50">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-start justify-between gap-4 flex-wrap"
          >
            <div>
              <h1 className="text-heading text-foreground mb-1 flex items-center gap-2">
                <Bookmark className="w-6 h-6 text-accent" />
                Saved Properties
              </h1>
              <p className="text-muted-foreground text-sm">
                {isLoading
                  ? "Loading your saved listings…"
                  : `${savedProperties.length} saved listing${savedProperties.length !== 1 ? "s" : ""}`}
              </p>
            </div>
            {savedProperties.length > 0 && (
              <Link to="/compare">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-accent/40 text-accent hover:bg-accent hover:text-accent-foreground"
                  data-ocid="btn-go-compare"
                >
                  Compare Selected
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(["sk-1", "sk-2", "sk-3"] as const).map((sk) => (
              <PropertyCardSkeleton key={sk} />
            ))}
          </div>
        ) : savedProperties.length === 0 ? (
          // Empty state
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-28 text-center"
            data-ocid="empty-state-saved"
          >
            <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6">
              <Bookmark className="w-10 h-10 text-muted-foreground/40" />
            </div>
            <h3 className="font-display font-semibold text-2xl text-foreground mb-3">
              No saved properties yet
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs mb-8 leading-relaxed">
              Start browsing! Bookmark properties you love and they'll appear
              here for easy access.
            </p>
            <Link to="/properties">
              <Button
                className="btn-primary gap-2"
                data-ocid="btn-explore-to-save"
              >
                Browse Properties
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {savedProperties.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="relative"
              >
                {/* Remove bookmark button overlay */}
                <button
                  type="button"
                  onClick={() => handleRemoveBookmark(p.id)}
                  className="absolute top-3 right-3 z-20 w-8 h-8 rounded-lg bg-destructive/90 backdrop-blur-sm flex items-center justify-center text-destructive-foreground hover:bg-destructive transition-smooth shadow-md"
                  aria-label="Remove from saved"
                  data-ocid={`btn-remove-saved-${p.id}`}
                >
                  <X className="w-4 h-4" />
                </button>

                <PropertyCard
                  property={p}
                  index={i}
                  showCompare
                  onCompare={handleCompare}
                  inCompare={isInCompare(p.id)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
