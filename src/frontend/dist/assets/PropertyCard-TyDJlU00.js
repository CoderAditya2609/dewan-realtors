import { c as createLucideIcon, j as jsxRuntimeExports, m as motion, L as Link, B as Badge, f as BookmarkCheck, M as MapPin, a as Button, b as ue } from "./index-C7HzK6Z0.js";
import { a as useBookmarks, b as useToggleBookmark } from "./use-properties-BkgRPE2u.js";
import { E as Eye } from "./eye-BZeCpcUU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M10 4 8 6", key: "1rru8s" }],
  ["path", { d: "M17 19v2", key: "ts1sot" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "M7 19v2", key: "12npes" }],
  [
    "path",
    {
      d: "M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5",
      key: "14ym8i"
    }
  ]
];
const Bath = createLucideIcon("bath", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8", key: "1k78r4" }],
  ["path", { d: "M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4", key: "fb3tl2" }],
  ["path", { d: "M12 4v6", key: "1dcgq2" }],
  ["path", { d: "M2 18h20", key: "ajqnye" }]
];
const BedDouble = createLucideIcon("bed-double", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
];
const Bookmark = createLucideIcon("bookmark", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "m21 3-7 7", key: "1l2asr" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
];
const Maximize2 = createLucideIcon("maximize-2", __iconNode);
const TYPE_LABELS = {
  flat: "Flat",
  plot: "Plot",
  villa: "Villa",
  commercial: "Commercial",
  penthouse: "Penthouse",
  studio: "Studio",
  townhouse: "Townhouse"
};
function PropertyCard({
  property,
  index = 0,
  showCompare = false,
  onCompare,
  inCompare = false
}) {
  const { data: bookmarks = [] } = useBookmarks();
  const toggleBookmark = useToggleBookmark();
  const isBookmarked = bookmarks.includes(property.id);
  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark.mutate(property.id, {
      onSuccess: () => {
        ue.success(
          isBookmarked ? "Removed from saved" : "Saved to bookmarks"
        );
      }
    });
  };
  const handleCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onCompare == null ? void 0 : onCompare(property.id);
  };
  const imageSrc = property.images[0] ?? "/assets/images/placeholder.svg";
  const isAvailable = property.status === "available";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: {
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1]
      },
      whileHover: { y: -4, scale: 1.01 },
      className: "group relative",
      "data-ocid": `property-card-${property.id}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/properties/$id",
          params: { id: property.id },
          className: "block outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: [
                "card-glass rounded-xl overflow-hidden transition-smooth cursor-pointer",
                "hover:shadow-hover border border-border/30",
                inCompare ? "ring-2 ring-accent" : ""
              ].join(" "),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden aspect-[4/3]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: imageSrc,
                      alt: property.title,
                      className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                      onError: (e) => {
                        e.currentTarget.src = "/assets/images/placeholder.svg";
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" }),
                  property.status === "sold" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-sm px-4 py-1.5 bg-destructive text-destructive-foreground border-none shadow-elevated", children: "Sold" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 left-3 flex flex-wrap gap-1.5", children: [
                    property.featured && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent text-accent-foreground text-xs font-semibold border-none shadow-md-soft px-2 py-0.5", children: "★ Featured" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "secondary",
                        className: "bg-card/90 backdrop-blur-sm text-foreground text-xs border-none shadow-md-soft px-2 py-0.5",
                        children: TYPE_LABELS[property.type] ?? property.type
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-base text-accent leading-none", children: property.priceLabel }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleBookmark,
                      className: [
                        "absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-smooth shadow-md-soft",
                        "bg-card/90 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground",
                        isBookmarked ? "text-accent" : "text-muted-foreground"
                      ].join(" "),
                      "aria-label": isBookmarked ? "Remove bookmark" : "Bookmark property",
                      "data-ocid": `btn-bookmark-${property.id}`,
                      children: isBookmarked ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "w-4 h-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-base text-foreground leading-tight line-clamp-2 min-w-0", children: property.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
                      property.views
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-accent shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: property.address })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-0.5", children: [
                    property.bedrooms !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        property.bedrooms,
                        " Bed"
                      ] })
                    ] }),
                    property.bathrooms !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Bath, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        property.bathrooms,
                        " Bath"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground ml-auto", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        property.sizeSqFt.toLocaleString(),
                        " sq.ft"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground pt-0.5 border-t border-border/40", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "capitalize", children: [
                      "Facing: ",
                      property.facing
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/70 font-medium", children: property.city })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-smooth bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground group/cta",
                        "data-ocid": `btn-view-property-${property.id}`,
                        children: [
                          "View Details",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" })
                        ]
                      }
                    ),
                    showCompare && isAvailable && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        size: "sm",
                        onClick: handleCompare,
                        className: [
                          "text-xs h-9 px-3 border-border/60",
                          inCompare ? "bg-accent/15 border-accent/40 text-accent" : ""
                        ].join(" "),
                        "data-ocid": `btn-compare-${property.id}`,
                        children: inCompare ? "✓ Added" : "Compare"
                      }
                    )
                  ] })
                ] })
              ]
            }
          )
        }
      )
    }
  );
}
export {
  ArrowUpRight as A,
  BedDouble as B,
  Maximize2 as M,
  PropertyCard as P,
  Bath as a,
  Bookmark as b
};
