import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, S as SlidersHorizontal, L as Link, a as Button, X, B as Badge, M as MapPin } from "./index-C7HzK6Z0.js";
import { u as usePropertyComparison } from "./use-comparison-Cbhk9sVu.js";
import { c as useProperties } from "./use-properties-BkgRPE2u.js";
import { A as ArrowRight } from "./arrow-right-B4WfbZ0d.js";
import { C as CircleCheckBig } from "./circle-check-big-C64xRBrG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
const TYPE_LABELS = {
  flat: "Flat",
  plot: "Plot",
  villa: "Villa",
  commercial: "Commercial",
  penthouse: "Penthouse",
  studio: "Studio",
  townhouse: "Townhouse"
};
const FACING_LABELS = {
  north: "North",
  south: "South",
  east: "East",
  west: "West",
  "north-east": "North-East",
  "north-west": "North-West",
  "south-east": "South-East",
  "south-west": "South-West"
};
function CompareRow({
  label,
  colCount,
  values,
  bestIndex,
  isBooleanRow
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "grid border-b border-border/30 last:border-0",
      style: { gridTemplateColumns: `140px repeat(${colCount}, 1fr)` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3.5 bg-muted/20 text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center", children: label }),
        values.map((v, i) => {
          const key = `${label}-${i}`;
          const isHighlight = i === bestIndex;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: [
                "px-4 py-3.5 text-sm border-l border-border/30 flex items-center",
                isHighlight ? "text-accent font-bold bg-accent/5" : "text-foreground"
              ].join(" "),
              children: [
                isBooleanRow ? v ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-muted-foreground/40" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: String(v ?? "—") }),
                isHighlight && !isBooleanRow && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 text-[10px] font-medium bg-accent/15 text-accent px-1.5 py-0.5 rounded-full leading-none", children: "Best" })
              ]
            },
            key
          );
        })
      ]
    }
  );
}
function AmenitiesRow({ properties }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "grid border-b border-border/30 last:border-0",
      style: {
        gridTemplateColumns: `140px repeat(${properties.length}, 1fr)`
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3.5 bg-muted/20 text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-start pt-4", children: "Amenities" }),
        properties.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3.5 border-l border-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: p.amenities.join(", ") || "—" }) }, p.id))
      ]
    }
  );
}
function ComparePage() {
  const { compareIds, removeFromCompare, clearCompare } = usePropertyComparison();
  const { data: allProperties = [] } = useProperties();
  const compareProperties = reactExports.useMemo(
    () => compareIds.slice(0, 4).map((id) => allProperties.find((p) => p.id === id)).filter((p) => !!p),
    [compareIds, allProperties]
  );
  const lowestPriceIndex = reactExports.useMemo(() => {
    if (compareProperties.length === 0) return -1;
    let minIdx = 0;
    for (let i = 1; i < compareProperties.length; i++) {
      if (compareProperties[i].price < compareProperties[minIdx].price) {
        minIdx = i;
      }
    }
    return minIdx;
  }, [compareProperties]);
  const largestSizeIndex = reactExports.useMemo(() => {
    if (compareProperties.length === 0) return -1;
    let maxIdx = 0;
    for (let i = 1; i < compareProperties.length; i++) {
      if (compareProperties[i].sizeSqFt > compareProperties[maxIdx].sizeSqFt) {
        maxIdx = i;
      }
    }
    return maxIdx;
  }, [compareProperties]);
  if (compareIds.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex flex-col items-center justify-center text-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.94 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.4 },
        className: "flex flex-col items-center",
        "data-ocid": "empty-state-compare",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-10 h-10 text-muted-foreground/40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-heading text-foreground mb-3", children: "No properties selected for comparison" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm max-w-sm mb-8 leading-relaxed", children: [
            "Browse properties and click",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-medium", children: "Compare" }),
            " to add them. You can compare up to 4 properties side by side."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/properties", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "btn-primary gap-2",
              "data-ocid": "btn-go-browse-compare",
              children: [
                "Browse Properties",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ]
            }
          ) })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-6 flex items-center justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-heading text-foreground mb-1", children: "Compare Properties" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
          compareProperties.length,
          " of 4 properties selected"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/properties", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground",
            "data-ocid": "btn-add-more-compare",
            children: "+ Add More"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: clearCompare,
            className: "text-destructive hover:bg-destructive/10",
            "data-ocid": "btn-clear-compare",
            children: "Clear All"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "grid gap-4 mb-6 min-w-[500px]",
              style: {
                gridTemplateColumns: `140px repeat(${compareProperties.length}, 1fr)`
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
                compareProperties.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 8 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.35 },
                    className: "card-glass rounded-xl border border-border/30 overflow-hidden",
                    "data-ocid": `compare-property-${p.id}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: p.images[0] ?? "/assets/images/placeholder.svg",
                            alt: p.title,
                            className: "w-full h-40 object-cover",
                            onError: (e) => {
                              e.currentTarget.src = "/assets/images/placeholder.svg";
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => removeFromCompare(p.id),
                            className: "absolute top-2 right-2 w-7 h-7 rounded-full bg-card/95 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth shadow",
                            "aria-label": `Remove ${p.title} from comparison`,
                            "data-ocid": `btn-remove-compare-${p.id}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                          }
                        ),
                        p.featured && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute top-2 left-2 bg-accent text-accent-foreground border-none text-xs shadow", children: "★ Featured" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground line-clamp-2 leading-snug", children: p.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 text-accent shrink-0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: p.city })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base text-accent", children: p.priceLabel }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/properties/$id", params: { id: p.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            size: "sm",
                            variant: "outline",
                            className: "w-full text-xs h-7 mt-1",
                            children: "View Details"
                          }
                        ) })
                      ] })
                    ]
                  },
                  p.id
                ))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-glass rounded-xl border border-border/30 overflow-hidden min-w-[500px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 px-4 py-3 border-b border-border/40 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground", children: "Side-by-Side Comparison" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-accent/60 inline-block" }),
                "Gold = Best value"
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CompareRow,
              {
                label: "Price",
                colCount: compareProperties.length,
                values: compareProperties.map((p) => p.priceLabel),
                bestIndex: lowestPriceIndex
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CompareRow,
              {
                label: "Size (sq.ft)",
                colCount: compareProperties.length,
                values: compareProperties.map(
                  (p) => `${p.sizeSqFt.toLocaleString()} sq.ft`
                ),
                bestIndex: largestSizeIndex
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CompareRow,
              {
                label: "Type",
                colCount: compareProperties.length,
                values: compareProperties.map(
                  (p) => TYPE_LABELS[p.type] ?? p.type
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CompareRow,
              {
                label: "Facing",
                colCount: compareProperties.length,
                values: compareProperties.map(
                  (p) => FACING_LABELS[p.facing] ?? p.facing
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CompareRow,
              {
                label: "City",
                colCount: compareProperties.length,
                values: compareProperties.map((p) => p.city)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CompareRow,
              {
                label: "Status",
                colCount: compareProperties.length,
                values: compareProperties.map(
                  (p) => p.status === "sold" ? "Sold" : "Active"
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CompareRow,
              {
                label: "Featured",
                colCount: compareProperties.length,
                values: compareProperties.map((p) => p.featured),
                isBooleanRow: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AmenitiesRow, { properties: compareProperties })
          ] })
        ]
      }
    ) })
  ] });
}
export {
  ComparePage
};
