import { c as createLucideIcon, j as jsxRuntimeExports, e as cn, o as useParams, r as reactExports, h as Building2, L as Link, a as Button, m as motion, B as Badge, M as MapPin, f as BookmarkCheck, p as Phone, A as AnimatePresence, X, b as ue } from "./index-C7HzK6Z0.js";
import { b as Bookmark, M as Maximize2, B as BedDouble, a as Bath, P as PropertyCard } from "./PropertyCard-TyDJlU00.js";
import { u as useRecentlyViewed, L as Label, I as Input } from "./use-recently-viewed-CPjtvxEZ.js";
import { u as usePropertyComparison } from "./use-comparison-Cbhk9sVu.js";
import { d as useProperty, c as useProperties, a as useBookmarks, b as useToggleBookmark, e as useSubmitInquiry, f as useSubmitVisitRequest } from "./use-properties-BkgRPE2u.js";
import { C as Calendar } from "./calendar-5NWkneAY.js";
import { C as Compass } from "./compass-BCkf0uOV.js";
import { M as MessageSquare } from "./message-square-ClLjnwd9.js";
import { C as ChevronRight } from "./chevron-right-0G6fA_uH.js";
import "./eye-BZeCpcUU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M13 6h3a2 2 0 0 1 2 2v7", key: "1yeb86" }],
  ["path", { d: "M11 18H8a2 2 0 0 1-2-2V9", key: "19pyzm" }]
];
const GitCompare = createLucideIcon("git-compare", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
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
const TYPE_LABELS = {
  flat: "Flat",
  plot: "Plot",
  villa: "Villa",
  commercial: "Commercial",
  penthouse: "Penthouse",
  studio: "Studio",
  townhouse: "Townhouse"
};
function ImageGallery({ images, title }) {
  const [active, setActive] = reactExports.useState(0);
  const [zoomed, setZoomed] = reactExports.useState(false);
  const allImages = images.length > 0 ? images : ["/assets/images/placeholder.svg"];
  const prev = () => setActive((i) => (i - 1 + allImages.length) % allImages.length);
  const next = () => setActive((i) => (i + 1) % allImages.length);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "image-gallery", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "relative w-full overflow-hidden rounded-2xl aspect-video cursor-zoom-in group border border-border/20 shadow-elevated",
        onClick: () => setZoomed(true),
        "aria-label": "View full-size photo",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.img,
            {
              src: allImages[active],
              alt: `${title} — view ${active + 1}`,
              className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.28 },
              onError: (e) => {
                e.currentTarget.src = "/assets/images/placeholder.svg";
              }
            },
            active
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent pointer-events-none" }),
          allImages.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.stopPropagation();
                  prev();
                },
                className: "absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-elevated transition-smooth hover:bg-accent hover:text-accent-foreground opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
                "aria-label": "Previous photo",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.stopPropagation();
                  next();
                },
                className: "absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-elevated transition-smooth hover:bg-accent hover:text-accent-foreground opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
                "aria-label": "Next photo",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 right-3 bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-medium pointer-events-none", children: [
            active + 1,
            " / ",
            allImages.length
          ] })
        ]
      }
    ),
    allImages.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1", children: allImages.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setActive(i),
        className: [
          "flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-smooth border-2",
          i === active ? "border-accent shadow-md" : "border-transparent opacity-55 hover:opacity-90"
        ].join(" "),
        "aria-label": `View photo ${i + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: img,
            alt: `Property view ${i + 1}`,
            className: "w-full h-full object-cover",
            onError: (e) => {
              e.currentTarget.src = "/assets/images/placeholder.svg";
            }
          }
        )
      },
      `thumb-${img}`
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: zoomed && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-50 bg-foreground/90 backdrop-blur-md flex items-center justify-center p-4",
        onClick: () => setZoomed(false),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.img,
            {
              initial: { scale: 0.9 },
              animate: { scale: 1 },
              exit: { scale: 0.9 },
              src: allImages[active],
              alt: title,
              className: "max-w-full max-h-full object-contain rounded-xl shadow-elevated",
              onClick: (e) => e.stopPropagation()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "absolute top-4 right-4 w-10 h-10 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-background hover:bg-card/40 transition-smooth",
              onClick: () => setZoomed(false),
              "aria-label": "Close lightbox",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
            }
          )
        ]
      }
    ) })
  ] });
}
function StatCard({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-glass rounded-xl p-4 flex flex-col items-center gap-2 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide leading-none", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mt-1 capitalize", children: value })
    ] })
  ] });
}
function InquirySidebar({
  propertyId,
  propertyTitle
}) {
  const submitInquiry = useSubmitInquiry();
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { propertyId, ...form };
    submitInquiry.mutate(data, {
      onSuccess: () => {
        ue.success("Inquiry sent! We'll contact you shortly.");
        setForm({ name: "", email: "", phone: "", message: "" });
      },
      onError: () => ue.error("Failed to send. Please try again.")
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-glass rounded-2xl p-5 space-y-5 sticky top-24",
      "data-ocid": "inquiry-form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground", children: "Send Inquiry" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Get more details about this property" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-3.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "inq-name", children: "Full Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "inq-name",
                value: form.name,
                onChange: set("name"),
                placeholder: "Your name",
                required: true,
                "data-ocid": "input-inquiry-name"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "inq-phone", children: "Phone Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "inq-phone",
                value: form.phone,
                onChange: set("phone"),
                placeholder: "+91 98765 43210",
                required: true,
                "data-ocid": "input-inquiry-phone"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "inq-email", children: "Email Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "inq-email",
                type: "email",
                value: form.email,
                onChange: set("email"),
                placeholder: "you@email.com",
                required: true,
                "data-ocid": "input-inquiry-email"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "inq-msg", children: "Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "inq-msg",
                value: form.message,
                onChange: set("message"),
                placeholder: `I'm interested in ${propertyTitle}. Please share more details.`,
                rows: 4,
                required: true,
                "data-ocid": "input-inquiry-message"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "w-full btn-primary",
              disabled: submitInquiry.isPending,
              "data-ocid": "btn-submit-inquiry",
              children: submitInquiry.isPending ? "Sending…" : "Send Inquiry"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `https://wa.me/919876543210?text=${encodeURIComponent(
              `Hi, I'm interested in: ${propertyTitle}. Could you please share more details?`
            )}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-border/50 text-sm font-medium text-foreground hover:bg-muted/50 transition-smooth",
            "data-ocid": "btn-whatsapp",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  className: "w-5 h-5 text-green-600",
                  viewBox: "0 0 32 32",
                  fill: "currentColor",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16 3C9.371 3 4 8.371 4 15c0 2.254.609 4.457 1.766 6.383L4.062 28.25l7.031-1.844A12.946 12.946 0 0 0 16 27c6.629 0 12-5.371 12-12S22.629 3 16 3zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a10.94 10.94 0 0 1-5.195-1.305l-.371-.211-3.844 1.008.988-3.727-.234-.383A9.958 9.958 0 0 1 6 15c0-5.523 4.477-10 10-10zm-3.148 4.875c-.196 0-.512.074-.781.367-.266.293-1.016 1-1.016 2.43s1.039 2.816 1.184 3.012c.144.195 2.012 3.219 4.953 4.383 2.461.969 2.941.777 3.473.727.531-.05 1.715-.703 1.957-1.379.242-.676.242-1.258.172-1.379-.07-.121-.265-.195-.559-.344-.293-.148-1.734-.855-2.004-.953-.27-.098-.465-.148-.66.148-.195.293-.76.953-.93 1.148-.172.195-.344.219-.637.074-.293-.148-1.238-.457-2.359-1.457-.871-.777-1.457-1.734-1.629-2.031-.168-.293-.016-.453.129-.598.129-.129.293-.344.441-.516.148-.172.195-.293.293-.488.098-.195.05-.367-.023-.516-.074-.148-.66-1.582-.898-2.168-.234-.566-.477-.484-.66-.492-.168-.008-.363-.008-.559-.008z" })
                }
              ),
              "Chat on WhatsApp"
            ]
          }
        )
      ]
    }
  );
}
function ScheduleVisitModal({
  propertyId,
  propertyTitle,
  open,
  onClose
}) {
  const submitVisit = useSubmitVisitRequest();
  const [form, setForm] = reactExports.useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    message: ""
  });
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      propertyId,
      customerName: form.name,
      customerPhone: form.phone,
      preferredDate: form.date,
      preferredTime: form.time,
      message: form.message || void 0
    };
    submitVisit.mutate(data, {
      onSuccess: () => {
        ue.success("Visit scheduled! We'll confirm the details shortly.");
        onClose();
        setForm({
          name: "",
          phone: "",
          email: "",
          date: "",
          time: "",
          message: ""
        });
      },
      onError: () => ue.error("Could not schedule. Please try again.")
    });
  };
  reactExports.useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm",
      onClick: onClose,
      "data-ocid": "schedule-visit-modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24, scale: 0.97 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 24, scale: 0.97 },
          transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
          className: "card-glass w-full max-w-md rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-xl text-foreground", children: "Schedule a Visit" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 line-clamp-1", children: propertyTitle })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted/50 transition-smooth ml-3 mt-0.5 shrink-0",
                  "aria-label": "Close modal",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-3.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 col-span-2 sm:col-span-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "visit-name", children: "Full Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "visit-name",
                      value: form.name,
                      onChange: set("name"),
                      placeholder: "Your name",
                      required: true,
                      "data-ocid": "input-visit-name"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 col-span-2 sm:col-span-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "visit-phone", children: "Phone" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "visit-phone",
                      value: form.phone,
                      onChange: set("phone"),
                      placeholder: "+91 98765 43210",
                      required: true,
                      "data-ocid": "input-visit-phone"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "visit-email", children: "Email (optional)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "visit-email",
                    type: "email",
                    value: form.email,
                    onChange: set("email"),
                    placeholder: "you@email.com",
                    "data-ocid": "input-visit-email"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "visit-date", children: "Preferred Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "visit-date",
                      type: "date",
                      value: form.date,
                      onChange: set("date"),
                      min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                      required: true,
                      "data-ocid": "input-visit-date"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "visit-time", children: "Preferred Time" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "visit-time",
                      type: "time",
                      value: form.time,
                      onChange: set("time"),
                      required: true,
                      "data-ocid": "input-visit-time"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "visit-msg", children: "Additional Notes" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "visit-msg",
                    value: form.message,
                    onChange: set("message"),
                    placeholder: "Any specific requirements or questions?",
                    rows: 3,
                    "data-ocid": "input-visit-message"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full btn-primary mt-1",
                  disabled: submitVisit.isPending,
                  "data-ocid": "btn-submit-visit",
                  children: submitVisit.isPending ? "Scheduling…" : "Request Visit"
                }
              )
            ] })
          ]
        }
      )
    }
  ) });
}
function DetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[1fr_360px] gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-video rounded-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-1/2" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-3", children: ["a", "b", "c", "d"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }, `skel-stat-${id}`)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-96 rounded-2xl" })
    ] })
  ] });
}
function PropertyDetailPage() {
  const { id } = useParams({ from: "/properties/$id" });
  const { data: property, isLoading } = useProperty(id);
  const { data: allProperties = [] } = useProperties();
  const { data: bookmarks = [] } = useBookmarks();
  const toggleBookmark = useToggleBookmark();
  const { addViewed } = useRecentlyViewed();
  const { toggleCompare, isInCompare, canAddMore } = usePropertyComparison();
  const [visitOpen, setVisitOpen] = reactExports.useState(false);
  const topRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (id) addViewed(id);
  }, [id, addViewed]);
  const isBookmarked = bookmarks.includes(id);
  const inCompare = isInCompare(id);
  const handleBookmark = () => {
    toggleBookmark.mutate(id, {
      onSuccess: () => ue.success(
        isBookmarked ? "Removed from saved" : "Saved to bookmarks"
      )
    });
  };
  const handleCompare = () => {
    if (inCompare) {
      toggleCompare(id);
      ue.info("Removed from comparison");
    } else if (canAddMore) {
      toggleCompare(id);
      ue.success("Added to comparison");
    } else {
      ue.warning("You can compare up to 4 properties at a time");
    }
  };
  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: property == null ? void 0 : property.title, url }).catch(() => {
        navigator.clipboard.writeText(url);
        ue.success("Link copied to clipboard");
      });
    } else {
      navigator.clipboard.writeText(url);
      ue.success("Link copied to clipboard");
    }
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(DetailSkeleton, {});
  if (!property) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-24 text-center space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-14 h-14 text-muted-foreground mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground", children: "Property Not Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "This listing may have been removed or is no longer available." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/properties", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "btn-primary mt-2", children: "Browse Properties" }) })
    ] });
  }
  const similar = allProperties.filter(
    (p) => p.id !== property.id && (p.city === property.city || p.type === property.type)
  ).slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: topRef, className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            className: "text-muted-foreground hover:text-foreground transition-colors",
            children: "Home"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border/80", children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/properties",
            className: "text-muted-foreground hover:text-foreground transition-colors",
            children: "Properties"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border/80", children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium line-clamp-1 max-w-xs", children: property.title })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -12 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.3 },
            className: "mb-6",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/properties",
                className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                  "Back to Properties"
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[1fr_360px] gap-8 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageGallery, { images: property.images, title: property.title })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.08 },
                className: "space-y-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
                    property.featured && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent text-accent-foreground text-xs font-semibold border-none px-3 py-1", children: "★ Featured" }),
                    property.status === "sold" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-destructive text-destructive-foreground text-xs font-semibold border-none px-3 py-1", children: "Sold" }),
                    property.status === "reserved" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "secondary",
                        className: "text-xs font-semibold px-3 py-1",
                        children: "Reserved"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-xs px-3 py-1 border-border/50 capitalize",
                        children: TYPE_LABELS[property.type] ?? property.type
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
                      "Property ID: #",
                      property.id
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight min-w-0", children: property.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:text-right shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl font-bold text-accent leading-none", children: property.priceLabel }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                        "₹",
                        Math.round(
                          property.price / property.sizeSqFt
                        ).toLocaleString(),
                        " ",
                        "/ sq.ft"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-accent shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: property.address })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 pt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        onClick: () => setVisitOpen(true),
                        className: "btn-primary flex items-center gap-2",
                        "data-ocid": "btn-schedule-visit",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
                          "Schedule Visit"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "outline",
                        className: "flex items-center gap-2 border-border/60",
                        onClick: handleBookmark,
                        "data-ocid": "btn-bookmark-detail",
                        children: [
                          isBookmarked ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "w-4 h-4 text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "w-4 h-4" }),
                          isBookmarked ? "Saved" : "Save"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "outline",
                        className: [
                          "flex items-center gap-2 border-border/60",
                          inCompare ? "bg-accent/10 border-accent/40 text-accent" : ""
                        ].join(" "),
                        onClick: handleCompare,
                        "data-ocid": "btn-compare-detail",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(GitCompare, { className: "w-4 h-4" }),
                          inCompare ? "In Compare" : "Compare"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "outline",
                        size: "icon",
                        className: "border-border/60 ml-auto",
                        onClick: handleShare,
                        "aria-label": "Share property",
                        "data-ocid": "btn-share",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" })
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.14 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      StatCard,
                      {
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "w-5 h-5" }),
                        label: "Size",
                        value: `${property.sizeSqFt.toLocaleString()} sq.ft`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      StatCard,
                      {
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5" }),
                        label: "Type",
                        value: TYPE_LABELS[property.type] ?? property.type
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      StatCard,
                      {
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-5 h-5" }),
                        label: "Facing",
                        value: FACING_LABELS[property.facing] ?? property.facing
                      }
                    ),
                    property.bedrooms !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      StatCard,
                      {
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: "w-5 h-5" }),
                        label: "Bedrooms",
                        value: `${property.bedrooms} BHK`
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      StatCard,
                      {
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5" }),
                        label: "City",
                        value: property.city
                      }
                    )
                  ] }),
                  property.bathrooms !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      StatCard,
                      {
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bath, { className: "w-5 h-5" }),
                        label: "Bathrooms",
                        value: `${property.bathrooms} Bath`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      StatCard,
                      {
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5" }),
                        label: "City",
                        value: property.city
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.section,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.18 },
                className: "space-y-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "About this Property" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-glass rounded-xl p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: property.description }) })
                ]
              }
            ),
            property.amenities.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.section,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.22 },
                className: "space-y-3",
                "data-ocid": "amenities-section",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "Amenities" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: property.amenities.map((amenity) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent shrink-0" }),
                        amenity
                      ]
                    },
                    amenity
                  )) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.26 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InquirySidebar,
                  {
                    propertyId: property.id,
                    propertyTitle: property.title
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.section,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.28 },
                className: "space-y-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "Location" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-glass rounded-xl p-5 flex items-start gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: property.address }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: property.city }),
                      property.latitude !== void 0 && property.longitude !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "a",
                        {
                          href: `https://maps.google.com/?q=${property.latitude},${property.longitude}`,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          className: "text-xs text-accent hover:underline mt-1.5 inline-flex items-center gap-1",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                            "Open in Google Maps"
                          ]
                        }
                      )
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.32 },
                className: "card-glass rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-6 h-6" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Contact Our Agent" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Speak directly with a Dewan Realtors specialist" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 w-full sm:w-auto", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+919876543210", className: "flex-1 sm:flex-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "outline",
                        className: "w-full border-border/60 flex items-center gap-2 text-sm",
                        "data-ocid": "btn-call-agent",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
                          "Call Now"
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        onClick: () => setVisitOpen(true),
                        className: "flex-1 sm:flex-none btn-primary flex items-center gap-2 text-sm",
                        "data-ocid": "btn-schedule-visit-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }),
                          "Schedule Visit"
                        ]
                      }
                    )
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: 16 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.5, delay: 0.1 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InquirySidebar,
                {
                  propertyId: property.id,
                  propertyTitle: property.title
                }
              )
            }
          ) })
        ] }),
        similar.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.55 },
            className: "mt-16 pt-12 border-t border-border/40",
            "data-ocid": "similar-properties",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground", children: "Similar Properties" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                    "Properties in ",
                    property.city,
                    " and",
                    " ",
                    TYPE_LABELS[property.type],
                    " category"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/properties",
                    className: "text-sm text-accent hover:text-accent/80 transition-colors font-medium hidden sm:block",
                    children: "View All →"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: similar.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PropertyCard, { property: p, index: i }, p.id)) })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScheduleVisitModal,
      {
        propertyId: property.id,
        propertyTitle: property.title,
        open: visitOpen,
        onClose: () => setVisitOpen(false)
      }
    )
  ] });
}
export {
  PropertyDetailPage
};
