import { c as createLucideIcon, u as useNavigate, r as reactExports, j as jsxRuntimeExports, m as motion, B as Badge, L as Link, a as Button, P as PropertyCardSkeleton, b as ue } from "./index-C7HzK6Z0.js";
import { P as PropertyCard } from "./PropertyCard-TyDJlU00.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BlNAleYo.js";
import { u as usePropertyComparison } from "./use-comparison-Cbhk9sVu.js";
import { u as useFeaturedProperties } from "./use-properties-BkgRPE2u.js";
import { A as ArrowRight } from "./arrow-right-B4WfbZ0d.js";
import { C as ChevronRight } from "./chevron-right-0G6fA_uH.js";
import { U as Users } from "./users-URKF0WXH.js";
import { C as Compass } from "./compass-BCkf0uOV.js";
import { S as Star } from "./star-7755pBng.js";
import "./eye-BZeCpcUU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const BadgeCheck = createLucideIcon("badge-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const WHY_CHOOSE = [
  {
    icon: Award,
    title: "Premium Listings",
    desc: "Curated selection of luxury and investment-grade properties — each vetted for quality and value.",
    gradient: "from-accent/20 to-accent/5"
  },
  {
    icon: Users,
    title: "Trusted Agents",
    desc: "Our seasoned professionals bring decades of combined expertise across India's top real estate markets.",
    gradient: "from-secondary/30 to-secondary/5"
  },
  {
    icon: BadgeCheck,
    title: "Verified Properties",
    desc: "Every listing is manually verified for title clarity, construction quality, and legal compliance.",
    gradient: "from-accent/20 to-accent/5"
  },
  {
    icon: Compass,
    title: "Expert Guidance",
    desc: "From search to handover, our end-to-end advisory ensures you invest with absolute confidence.",
    gradient: "from-secondary/30 to-secondary/5"
  }
];
const TESTIMONIALS = [
  {
    name: "Arjun Mehta",
    role: "Investor, Mumbai",
    initials: "AM",
    text: "Dewan Realtors helped me find a penthouse that exceeded every expectation. Their market knowledge is truly unmatched.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "Home Buyer, Bengaluru",
    initials: "PS",
    text: "Seamless experience from search to handover. I found my dream 3BHK in Koramangala within two weeks — incredible service.",
    rating: 5
  },
  {
    name: "Rahul Kapoor",
    role: "Business Owner, Delhi",
    initials: "RK",
    text: "Our office space search was handled with complete professionalism. Grade-A commercial in Connaught Place — simply brilliant.",
    rating: 5
  }
];
const STATS = [
  { value: "2,400+", label: "Properties Listed" },
  { value: "18 Yrs", label: "Market Experience" },
  { value: "6,200+", label: "Happy Families" },
  { value: "₹1,200 Cr", label: "Value Transacted" }
];
const PROPERTY_TYPE_OPTIONS = [
  { label: "All Types", value: "all" },
  { label: "Flat / Apartment", value: "flat" },
  { label: "Villa", value: "villa" },
  { label: "Penthouse", value: "penthouse" },
  { label: "Plot", value: "plot" },
  { label: "Commercial", value: "commercial" },
  { label: "Studio", value: "studio" }
];
function StarRating({ count }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", "aria-label": `${count} stars`, children: Array.from({ length: count }).map((_, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: static star count, order never changes
    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 fill-accent text-accent" }, i)
  )) });
}
function InitialsAvatar({ initials }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-accent", children: initials }) });
}
function HomePage() {
  const { data: featured = [], isLoading } = useFeaturedProperties();
  const { toggleCompare, isInCompare, canAddMore } = usePropertyComparison();
  const navigate = useNavigate();
  const carouselRef = reactExports.useRef(null);
  const [searchCity, setSearchCity] = reactExports.useState("");
  const [searchType, setSearchType] = reactExports.useState("all");
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
  const handleSearch = () => {
    const params = {};
    if (searchCity.trim()) params.city = searchCity.trim();
    if (searchType && searchType !== "all") params.type = searchType;
    navigate({ to: "/properties", search: params });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };
  const scrollCarousel = (dir) => {
    if (!carouselRef.current) return;
    const amount = 340;
    carouselRef.current.scrollBy({
      left: dir === "right" ? amount : -amount,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative min-h-[92vh] flex items-center justify-center overflow-hidden",
        style: { background: "oklch(0.10 0.01 285)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/assets/generated/hero-luxury.dim_1400x900.jpg",
                alt: "Luxury real estate",
                className: "w-full h-full object-cover opacity-45"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "absolute top-0 left-0 w-full h-full pointer-events-none",
              "aria-hidden": true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute top-0 right-0 w-1/3 h-1/3 opacity-10",
                    style: {
                      background: "radial-gradient(circle at top right, oklch(0.72 0.16 62 / 0.8), transparent 60%)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute bottom-0 left-0 w-1/3 h-1/2 opacity-10",
                    style: {
                      background: "radial-gradient(circle at bottom left, oklch(0.72 0.16 62 / 0.6), transparent 60%)"
                    }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 container mx-auto px-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 28 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, scale: 0.95 },
                      animate: { opacity: 1, scale: 1 },
                      transition: { duration: 0.5, delay: 0.1 },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          className: "mb-6 px-4 py-1.5 text-xs tracking-widest uppercase border font-medium backdrop-blur-sm",
                          style: {
                            background: "oklch(0.72 0.16 62 / 0.15)",
                            borderColor: "oklch(0.72 0.16 62 / 0.4)",
                            color: "oklch(0.85 0.12 62)"
                          },
                          children: "✦ Premium Real Estate Platform"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "h1",
                    {
                      className: "font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] mb-4",
                      style: { color: "oklch(0.97 0.01 65)" },
                      children: [
                        "Find Your",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.82 0.14 62)" }, children: "Perfect Space" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed",
                      style: { color: "oklch(0.80 0.01 65)" },
                      children: [
                        "Explore curated luxury properties across India's finest cities.",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden sm:block" }),
                        "Trusted by thousands of discerning buyers and investors."
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 20 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.6, delay: 0.25 },
                      className: "max-w-2xl mx-auto mb-12",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex flex-col sm:flex-row items-stretch gap-0 rounded-2xl overflow-hidden shadow-2xl border",
                          style: {
                            background: "oklch(0.99 0.01 65 / 0.95)",
                            borderColor: "oklch(0.88 0.02 65)",
                            backdropFilter: "blur(16px)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center px-4 py-1 border-b sm:border-b-0 sm:border-r border-border/30", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Search,
                                {
                                  className: "w-4 h-4 shrink-0 mr-2",
                                  style: { color: "oklch(0.72 0.16 62)" }
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "input",
                                {
                                  type: "text",
                                  placeholder: "Enter city or location…",
                                  value: searchCity,
                                  onChange: (e) => setSearchCity(e.target.value),
                                  onKeyDown: handleKeyDown,
                                  className: "flex-1 bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none",
                                  "data-ocid": "hero-search-city",
                                  "aria-label": "Search by city"
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 sm:w-44", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: searchType, onValueChange: setSearchType, children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                SelectTrigger,
                                {
                                  className: "h-full w-full border-0 rounded-none bg-transparent text-sm shadow-none focus:ring-0 px-4 py-3",
                                  "data-ocid": "hero-search-type",
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Property Type" })
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PROPERTY_TYPE_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
                            ] }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "button",
                              {
                                type: "button",
                                onClick: handleSearch,
                                className: "flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold transition-all active:scale-95",
                                style: {
                                  background: "linear-gradient(135deg, oklch(0.72 0.16 62), oklch(0.65 0.12 62))",
                                  color: "oklch(0.12 0.01 285)"
                                },
                                "data-ocid": "hero-search-btn",
                                "aria-label": "Search properties",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
                                  "Search"
                                ]
                              }
                            )
                          ]
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      transition: { duration: 0.5, delay: 0.4 },
                      className: "flex flex-col sm:flex-row items-center justify-center gap-3",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/properties", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            size: "lg",
                            className: "btn-primary px-8 py-3 text-sm h-auto shadow-elevated hover:shadow-hover",
                            "data-ocid": "hero-cta-browse",
                            children: [
                              "Browse Properties",
                              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
                            ]
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/properties", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            variant: "outline",
                            size: "lg",
                            className: "px-8 py-3 text-sm h-auto backdrop-blur-sm",
                            style: {
                              background: "oklch(0.97 0.01 65 / 0.10)",
                              borderColor: "oklch(0.97 0.01 65 / 0.30)",
                              color: "oklch(0.97 0.01 65)"
                            },
                            "data-ocid": "hero-cta-featured",
                            children: "View Featured"
                          }
                        ) })
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 32 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.5, ease: [0.4, 0, 0.2, 1] },
                className: "mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto",
                children: STATS.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-xl px-4 py-3 border text-center",
                    style: {
                      background: "oklch(0.97 0.01 65 / 0.08)",
                      borderColor: "oklch(0.97 0.01 65 / 0.15)",
                      backdropFilter: "blur(8px)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "font-display font-bold text-lg",
                          style: { color: "oklch(0.82 0.14 62)" },
                          children: stat.value
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "text-xs mt-0.5",
                          style: { color: "oklch(0.75 0.01 65)" },
                          children: stat.label
                        }
                      )
                    ]
                  },
                  stat.label
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "absolute bottom-8 left-1/2 -translate-x-1/2",
              animate: { y: [0, 8, 0] },
              transition: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-5 h-9 rounded-full border-2 flex items-start justify-center pt-1.5",
                  style: { borderColor: "oklch(0.97 0.01 65 / 0.35)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-1 h-1.5 rounded-full",
                      style: { background: "oklch(0.97 0.01 65 / 0.6)" }
                    }
                  )
                }
              )
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-background overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "flex items-end justify-between mb-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "mb-3 bg-accent/10 text-accent border-none text-xs",
                  children: "Featured"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-heading text-foreground", children: "Featured Properties" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-0.5 w-12 rounded-full",
                    style: { background: "oklch(0.72 0.16 62)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-0.5 w-4 rounded-full opacity-40",
                    style: { background: "oklch(0.72 0.16 62)" }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 max-w-md text-sm", children: "Handpicked properties for buyers with exceptional taste." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => scrollCarousel("left"),
                    className: "w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-smooth",
                    "aria-label": "Scroll left",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 rotate-180" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => scrollCarousel("right"),
                    className: "w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-smooth",
                    "aria-label": "Scroll right",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/properties",
                  className: "flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors",
                  "data-ocid": "link-view-all-properties",
                  children: [
                    "View all",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                  ]
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              ref: carouselRef,
              className: "flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide",
              style: { scrollbarWidth: "none" },
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "shrink-0 w-[300px] sm:w-[320px] snap-start",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(PropertyCardSkeleton, {})
                },
                i
              )) }) : featured.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "shrink-0 w-[300px] sm:w-[320px] snap-start",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    PropertyCard,
                    {
                      property: p,
                      index: i,
                      showCompare: true,
                      onCompare: handleCompare,
                      inCompare: isInCompare(p.id)
                    }
                  )
                },
                p.id
              ))
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-8 sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/properties", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "gap-2",
          "data-ocid": "mobile-view-all",
          children: [
            "View All Properties",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
          ]
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-14",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "mb-3 bg-accent/10 text-accent border-none text-xs",
                children: "Our Advantage"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-heading text-foreground", children: "Why Dewan Realtors?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-0.5 w-4 rounded-full opacity-40",
                  style: { background: "oklch(0.72 0.16 62)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-0.5 w-12 rounded-full",
                  style: { background: "oklch(0.72 0.16 62)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-0.5 w-4 rounded-full opacity-40",
                  style: { background: "oklch(0.72 0.16 62)" }
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-4 max-w-lg mx-auto text-sm leading-relaxed", children: "We combine deep market knowledge with an exceptional service ethos to deliver results you can trust — every single time." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: WHY_CHOOSE.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: {
            duration: 0.5,
            delay: i * 0.1,
            ease: [0.22, 1, 0.36, 1]
          },
          whileHover: { y: -6, scale: 1.02 },
          className: "card-glass rounded-2xl p-6 border border-border/30 hover:border-accent/30 hover:shadow-elevated transition-smooth group cursor-default",
          "data-ocid": `why-card-${i}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-smooth`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  item.icon,
                  {
                    className: "w-6 h-6",
                    style: { color: "oklch(0.60 0.14 62)" }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-base text-foreground mb-2", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: item.desc }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "mt-5 h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-500",
                style: { background: "oklch(0.72 0.16 62 / 0.4)" }
              }
            )
          ]
        },
        item.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-14",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "mb-3 bg-accent/10 text-accent border-none text-xs",
                children: "Client Stories"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-heading text-foreground", children: "What Our Clients Say" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-0.5 w-12 rounded-full",
                  style: { background: "oklch(0.72 0.16 62)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-0.5 w-4 rounded-full opacity-40",
                  style: { background: "oklch(0.72 0.16 62)" }
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: {
            opacity: 0,
            y: 20,
            x: i === 0 ? -16 : i === 2 ? 16 : 0
          },
          whileInView: { opacity: 1, y: 0, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.55, delay: i * 0.12 },
          className: "card-glass rounded-2xl p-6 border border-border/30 hover:border-accent/20 hover:shadow-elevated transition-smooth group",
          "data-ocid": `testimonial-card-${i}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-5xl font-display leading-none mb-3 select-none",
                style: { color: "oklch(0.72 0.16 62 / 0.25)" },
                "aria-hidden": true,
                children: '"'
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { count: t.rating }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/75 leading-relaxed mt-4 mb-5 italic", children: t.text }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-4 border-t border-border/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(InitialsAvatar, { initials: t.initials }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: t.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: t.role })
              ] })
            ] })
          ]
        },
        t.name
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "py-24 relative overflow-hidden",
        style: { background: "oklch(0.12 0.01 285)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15",
                style: { background: "oklch(0.72 0.16 62)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute bottom-0 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10",
                style: { background: "oklch(0.65 0.12 62)" }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 container mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.96 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true },
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-px w-16 opacity-40",
                      style: { background: "oklch(0.72 0.16 62)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-1.5 h-1.5 rounded-full",
                      style: { background: "oklch(0.72 0.16 62)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-px w-16 opacity-40",
                      style: { background: "oklch(0.72 0.16 62)" }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "h2",
                  {
                    className: "font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight",
                    style: { color: "oklch(0.97 0.01 65)" },
                    children: [
                      "Ready to Find Your",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.82 0.14 62)" }, children: "Perfect Space?" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "max-w-xl mx-auto mb-10 leading-relaxed text-base",
                    style: { color: "oklch(0.72 0.01 65)" },
                    children: "Whether you're buying, investing, or leasing — our expert team is here to guide every step of your journey with clarity and care."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/properties", "data-ocid": "cta-explore-properties", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-elevated",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.72 0.16 62), oklch(0.62 0.12 62))",
                        color: "oklch(0.12 0.01 285)"
                      },
                      children: [
                        "Browse Properties",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#contact", "data-ocid": "cta-contact", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 border",
                      style: {
                        borderColor: "oklch(0.72 0.16 62 / 0.5)",
                        color: "oklch(0.82 0.14 62)",
                        background: "oklch(0.72 0.16 62 / 0.06)"
                      },
                      children: "Contact Us"
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "mt-10 text-xs tracking-wider uppercase",
                    style: { color: "oklch(0.55 0.01 65)" },
                    children: "Trusted by 6,200+ families across India"
                  }
                )
              ]
            }
          ) })
        ]
      }
    )
  ] });
}
export {
  HomePage
};
