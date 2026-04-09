import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  BookMarked,
  Building2,
  ChevronRight,
  ClipboardList,
  Heart,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  User,
  UserPlus,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

// ─── Feature lists ────────────────────────────────────────────────────────────
const employeeFeatures = [
  { icon: ClipboardList, text: "Create & publish property listings" },
  { icon: BarChart3, text: "Access full dashboard analytics" },
  { icon: MessageSquare, text: "Manage leads and inquiries" },
];

const customerFeatures = [
  { icon: Heart, text: "Save properties you love" },
  { icon: BookMarked, text: "Build your personalised portfolio" },
  { icon: MessageSquare, text: "Enquire & schedule visits" },
];

// ─── Register Card ────────────────────────────────────────────────────────────
interface RegisterCardProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  features: { icon: React.ElementType; text: string }[];
  ctaLabel: string;
  helperText: string;
  userRole: "employee" | "customer";
  onRegister: (r: "employee" | "customer", mode?: "google") => void;
  delay: number;
  badge: string;
  highlight?: boolean;
}

function RegisterCard({
  title,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
  features,
  ctaLabel,
  helperText,
  userRole,
  onRegister,
  delay,
  badge,
  highlight,
}: RegisterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col rounded-2xl border overflow-hidden transition-smooth"
      style={{
        background: "oklch(var(--card) / 0.85)",
        backdropFilter: "blur(16px)",
        borderColor: highlight
          ? "oklch(0.72 0.16 62 / 0.4)"
          : "oklch(var(--border) / 0.3)",
        boxShadow: highlight ? "var(--shadow-hover)" : "var(--shadow-elevated)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-smooth"
        style={{ background: "var(--gradient-accent)" }}
      />

      {highlight && (
        <div className="absolute top-3 right-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent text-accent-foreground">
            ✦ Popular
          </span>
        </div>
      )}

      <div className="p-8 flex flex-col gap-6 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: iconBg }}
          >
            <Icon className={`w-7 h-7 ${iconColor}`} />
          </div>
          {!highlight && (
            <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20">
              {badge}
            </span>
          )}
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="font-display font-bold text-2xl text-foreground leading-tight">
            {title}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Features */}
        <ul className="space-y-3">
          {features.map(({ icon: FeatIcon, text }) => (
            <li key={text} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-muted/60 flex items-center justify-center shrink-0">
                <FeatIcon className="w-3.5 h-3.5 text-accent" />
              </div>
              <span className="text-sm text-foreground/80">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="px-8 pb-8">
        <Button
          className="w-full h-12 gap-2 text-base font-semibold rounded-xl transition-smooth group-hover:shadow-lg"
          style={{
            background: "var(--gradient-accent)",
            color: "oklch(var(--accent-foreground))",
          }}
          onClick={() =>
            onRegister(userRole, userRole === "customer" ? "google" : undefined)
          }
          data-ocid={`btn-register-${userRole}`}
        >
          {userRole === "customer" ? (
            <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
              <path
                fill="currentColor"
                d="M21.35 11.1h-9.18v2.98h5.27c-.23 1.48-1.76 4.35-5.27 4.35-3.17 0-5.75-2.62-5.75-5.84s2.58-5.84 5.75-5.84c1.81 0 3.02.77 3.71 1.43l2.52-2.45C16.78 4.23 14.67 3.3 12.17 3.3 7.2 3.3 3.17 7.38 3.17 12.59s4.03 9.29 9 9.29c5.2 0 8.64-3.65 8.64-8.79 0-.59-.06-1.03-.14-1.49z"
              />
            </svg>
          ) : (
            <UserPlus className="w-4 h-4" />
          )}
          {ctaLabel}
          <ChevronRight className="w-4 h-4 ml-auto" />
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground leading-relaxed">
          {helperText}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Signup Page ──────────────────────────────────────────────────────────────
export function SignupPage() {
  const { login, isLoggedIn, role, setRole } = useAuth();
  const navigate = useNavigate();
  const [employeePin, setEmployeePin] = useState("");
  const [pinError, setPinError] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      if (role === "employee") {
        navigate({ to: "/dashboard" });
      } else {
        navigate({ to: "/properties" });
      }
    }
  }, [isLoggedIn, role, navigate]);

  const handleRegister = (
    selectedRole: "employee" | "customer",
    _mode?: "google",
  ) => {
    if (selectedRole === "employee" && employeePin !== "180726") {
      setPinError("Invalid employee PIN.");
      return;
    }

    setPinError("");
    setRole(selectedRole);
    login();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-16 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.72 0.16 62 / 0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 110%, oklch(0.65 0.04 62 / 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Logo + tagline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12 space-y-3"
      >
        <div className="flex items-center justify-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-elevated"
            style={{ background: "var(--gradient-accent)" }}
          >
            <Building2 className="w-6 h-6 text-accent-foreground" />
          </div>
          <h1 className="font-display font-bold text-3xl tracking-tight text-foreground">
            Dewan Realtors
          </h1>
        </div>
        <p className="text-muted-foreground text-base flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-accent" />
          Find Your Perfect Space
        </p>
        <div className="w-16 h-0.5 mx-auto rounded-full bg-accent/40" />
        <div className="space-y-1">
          <p className="font-display font-semibold text-xl text-foreground">
            Create Your Account
          </p>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Join Dewan Realtors — choose the account type that fits you
          </p>
        </div>
      </motion.div>

      {/* Dual cards */}
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <RegisterCard
          title="Join as Employee"
          subtitle="Get access to listing management tools, lead tracking, and the full team dashboard."
          icon={ShieldCheck}
          iconBg="oklch(0.25 0.02 285 / 0.1)"
          iconColor="text-primary"
          features={employeeFeatures}
          ctaLabel="Continue as Employee"
          helperText="Employee registration requires PIN verification"
          userRole="employee"
          onRegister={handleRegister}
          delay={0.1}
          badge="Team"
        />
        <RegisterCard
          title="Join as Customer"
          subtitle="Discover premium properties, save your favourites, and reach out to our expert team."
          icon={User}
          iconBg="oklch(0.72 0.16 62 / 0.12)"
          iconColor="text-accent"
          features={customerFeatures}
          ctaLabel="Continue with Google"
          helperText="Use your currently signed-in Google account"
          userRole="customer"
          onRegister={handleRegister}
          delay={0.2}
          badge="Buyer"
          highlight
        />
      </div>

      <div className="w-full max-w-md mt-6 rounded-xl border border-border/40 bg-card/70 backdrop-blur-md p-4 shadow-elevated">
        <label className="text-sm font-medium text-foreground block mb-2">
          Employee PIN
        </label>
        <Input
          type="password"
          value={employeePin}
          onChange={(e) => setEmployeePin(e.target.value)}
          placeholder="Enter PIN for employee account"
          className="h-11"
          data-ocid="input-signup-employee-pin"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Required only for employee account creation.
        </p>
        {pinError ? (
          <p className="text-xs text-destructive mt-2">{pinError}</p>
        ) : null}
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-10 text-xs text-muted-foreground text-center"
      >
        Already have an account?{" "}
        <a
          href="/auth/login"
          className="text-accent underline underline-offset-2 hover:opacity-80 transition-smooth"
        >
          Sign in here
        </a>
      </motion.p>
    </div>
  );
}
