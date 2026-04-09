import { c as createLucideIcon, x as useAuth, u as useNavigate, r as reactExports, j as jsxRuntimeExports, m as motion, h as Building2, U as User, a as Button } from "./index-C7HzK6Z0.js";
import { S as Sparkles, C as ClipboardList, a as ChartColumn, b as ShieldCheck, H as Heart, B as BookMarked } from "./sparkles-BM6rwK2a.js";
import { M as MessageSquare } from "./message-square-ClLjnwd9.js";
import { C as ChevronRight } from "./chevron-right-0G6fA_uH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
const employeeFeatures = [
  { icon: ClipboardList, text: "Create & publish property listings" },
  { icon: ChartColumn, text: "Access full dashboard analytics" },
  { icon: MessageSquare, text: "Manage leads and inquiries" }
];
const customerFeatures = [
  { icon: Heart, text: "Save properties you love" },
  { icon: BookMarked, text: "Build your personalised portfolio" },
  { icon: MessageSquare, text: "Enquire & schedule visits" }
];
function RegisterCard({
  title,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
  features,
  ctaLabel,
  userRole,
  onRegister,
  delay,
  badge,
  highlight
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 32 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
      whileHover: { y: -4 },
      className: "group relative flex flex-col rounded-2xl border overflow-hidden transition-smooth",
      style: {
        background: "oklch(var(--card) / 0.85)",
        backdropFilter: "blur(16px)",
        borderColor: highlight ? "oklch(0.72 0.16 62 / 0.4)" : "oklch(var(--border) / 0.3)",
        boxShadow: highlight ? "var(--shadow-hover)" : "var(--shadow-elevated)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-smooth",
            style: { background: "var(--gradient-accent)" }
          }
        ),
        highlight && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold px-2.5 py-1 rounded-full bg-accent text-accent-foreground", children: "✦ Popular" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 flex flex-col gap-6 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-14 h-14 rounded-2xl flex items-center justify-center",
                style: { background: iconBg },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-7 h-7 ${iconColor}` })
              }
            ),
            !highlight && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20", children: badge })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground leading-tight", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: subtitle })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: features.map(({ icon: FeatIcon, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-muted/60 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FeatIcon, { className: "w-3.5 h-3.5 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground/80", children: text })
          ] }, text)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 pb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "w-full h-12 gap-2 text-base font-semibold rounded-xl transition-smooth group-hover:shadow-lg",
              style: {
                background: "var(--gradient-accent)",
                color: "oklch(var(--accent-foreground))"
              },
              onClick: () => onRegister(userRole),
              "data-ocid": `btn-register-${userRole}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
                ctaLabel,
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-auto" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-center text-xs text-muted-foreground leading-relaxed", children: "Internet Identity creates your account automatically — no email needed" })
        ] })
      ]
    }
  );
}
function SignupPage() {
  const { login, isLoggedIn, role, setRole } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (isLoggedIn) {
      if (role === "employee") {
        navigate({ to: "/dashboard" });
      } else {
        navigate({ to: "/properties" });
      }
    }
  }, [isLoggedIn, role, navigate]);
  const handleRegister = (selectedRole) => {
    setRole(selectedRole);
    login();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-16 bg-background relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 pointer-events-none",
        style: {
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.72 0.16 62 / 0.08) 0%, transparent 70%)"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute bottom-0 left-0 right-0 h-64 pointer-events-none",
        style: {
          background: "radial-gradient(ellipse 60% 40% at 50% 110%, oklch(0.65 0.04 62 / 0.06) 0%, transparent 70%)"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        className: "text-center mb-12 space-y-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-12 h-12 rounded-xl flex items-center justify-center shadow-elevated",
                style: { background: "var(--gradient-accent)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-6 h-6 text-accent-foreground" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl tracking-tight text-foreground", children: "Dewan Realtors" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-base flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-accent" }),
            "Find Your Perfect Space"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-0.5 mx-auto rounded-full bg-accent/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-xl text-foreground", children: "Create Your Account" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm mx-auto", children: "Join Dewan Realtors — choose the account type that fits you" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        RegisterCard,
        {
          title: "Join as Employee",
          subtitle: "Get access to listing management tools, lead tracking, and the full team dashboard.",
          icon: ShieldCheck,
          iconBg: "oklch(0.25 0.02 285 / 0.1)",
          iconColor: "text-primary",
          features: employeeFeatures,
          ctaLabel: "Register as Employee",
          userRole: "employee",
          onRegister: handleRegister,
          delay: 0.1,
          badge: "Team"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        RegisterCard,
        {
          title: "Join as Customer",
          subtitle: "Discover premium properties, save your favourites, and reach out to our expert team.",
          icon: User,
          iconBg: "oklch(0.72 0.16 62 / 0.12)",
          iconColor: "text-accent",
          features: customerFeatures,
          ctaLabel: "Register as Customer",
          userRole: "customer",
          onRegister: handleRegister,
          delay: 0.2,
          badge: "Buyer",
          highlight: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.p,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5, delay: 0.5 },
        className: "mt-10 text-xs text-muted-foreground text-center",
        children: [
          "Already have an account?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "/auth/login",
              className: "text-accent underline underline-offset-2 hover:opacity-80 transition-smooth",
              children: "Sign in here"
            }
          )
        ]
      }
    )
  ] });
}
export {
  SignupPage
};
