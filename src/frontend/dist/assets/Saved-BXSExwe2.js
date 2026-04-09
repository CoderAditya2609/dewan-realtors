import { x as useAuth, u as useNavigate, r as reactExports, j as jsxRuntimeExports, m as motion, L as Link, a as Button, P as PropertyCardSkeleton, X, b as ue } from "./index-C7HzK6Z0.js";
import { b as Bookmark, P as PropertyCard } from "./PropertyCard-TyDJlU00.js";
import { u as usePropertyComparison } from "./use-comparison-Cbhk9sVu.js";
import { a as useBookmarks, c as useProperties, b as useToggleBookmark } from "./use-properties-BkgRPE2u.js";
import { A as ArrowRight } from "./arrow-right-B4WfbZ0d.js";
import "./eye-BZeCpcUU.js";
function SavedPage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!isLoggedIn) {
      navigate({ to: "/auth/login" });
    }
  }, [isLoggedIn, navigate]);
  const { data: bookmarkIds = [], isLoading: bookmarksLoading } = useBookmarks();
  const { data: allProperties = [], isLoading: propsLoading } = useProperties();
  const { toggleCompare, isInCompare, canAddMore } = usePropertyComparison();
  const toggleBookmark = useToggleBookmark();
  const savedProperties = reactExports.useMemo(
    () => allProperties.filter((p) => bookmarkIds.includes(p.id)),
    [allProperties, bookmarkIds]
  );
  const isLoading = bookmarksLoading || propsLoading;
  const handleCompare = (id) => {
    if (!isInCompare(id) && !canAddMore) {
      ue.error("You can compare up to 4 properties at a time");
      return;
    }
    toggleCompare(id);
    ue.success(
      isInCompare(id) ? "Removed from comparison" : "Added to comparison"
    );
  };
  const handleRemoveBookmark = (id) => {
    toggleBookmark.mutate(id, {
      onSuccess: () => ue.success("Removed from saved properties")
    });
  };
  if (!isLoggedIn) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "flex items-start justify-between gap-4 flex-wrap",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-heading text-foreground mb-1 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "w-6 h-6 text-accent" }),
              "Saved Properties"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: isLoading ? "Loading your saved listings…" : `${savedProperties.length} saved listing${savedProperties.length !== 1 ? "s" : ""}` })
          ] }),
          savedProperties.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/compare", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "gap-2 border-accent/40 text-accent hover:bg-accent hover:text-accent-foreground",
              "data-ocid": "btn-go-compare",
              children: [
                "Compare Selected",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
              ]
            }
          ) })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: ["sk-1", "sk-2", "sk-3"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(PropertyCardSkeleton, {}, sk)) }) : savedProperties.length === 0 ? (
      // Empty state
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.96 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.4 },
          className: "flex flex-col items-center justify-center py-28 text-center",
          "data-ocid": "empty-state-saved",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "w-10 h-10 text-muted-foreground/40" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-2xl text-foreground mb-3", children: "No saved properties yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs mb-8 leading-relaxed", children: "Start browsing! Bookmark properties you love and they'll appear here for easy access." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/properties", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "btn-primary gap-2",
                "data-ocid": "btn-explore-to-save",
                children: [
                  "Browse Properties",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                ]
              }
            ) })
          ]
        }
      )
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: savedProperties.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35, delay: i * 0.06 },
        className: "relative",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleRemoveBookmark(p.id),
              className: "absolute top-3 right-3 z-20 w-8 h-8 rounded-lg bg-destructive/90 backdrop-blur-sm flex items-center justify-center text-destructive-foreground hover:bg-destructive transition-smooth shadow-md",
              "aria-label": "Remove from saved",
              "data-ocid": `btn-remove-saved-${p.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PropertyCard,
            {
              property: p,
              index: i,
              showCompare: true,
              onCompare: handleCompare,
              inCompare: isInCompare(p.id)
            }
          )
        ]
      },
      p.id
    )) }) })
  ] });
}
export {
  SavedPage
};
