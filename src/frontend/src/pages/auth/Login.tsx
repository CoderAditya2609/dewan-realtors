import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  BookMarked,
  Building2,
  ChevronRight,
  ClipboardList,
  Heart,
  LogIn,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

// ─── Feature list items ────────────────────────────────────────────────────────
const employeeFeatures = [
  { icon: ClipboardList, text: "Add & manage property listings" },
  { icon: BarChart3, text: "Analytics dashboard & insights" },
  { icon: MessageSquare, text: "View & respond to inquiries" },
];

const customerFeatures = [
  { icon: Heart, text: "Save & bookmark properties" },
  { icon: BookMarked, text: "Track your saved listings" },
  { icon: MessageSquare, text: "Send inquiries & schedule visits" },
];

// ─── Auth Card ────────────────────────────────────────────────────────────────
interface AuthCardProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  features: { icon: React.ElementType; text: string }[];
  ctaLabel: string;
  userRole: "employee" | "customer";
  onLogin: (role: "employee" | "customer") => void;
  delay: number;
  badge: string;
}

function AuthCard({
  title,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
  features,
  ctaLabel,
  userRole,
  onLogin,
  delay,
  badge,
}: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col rounded-2xl border border-border/30 overflow-hidden transition-smooth"
      style={{
        background: "oklch(var(--card) / 0.85)",
        backdropFilter: "blur(16px)",
        boxShadow: "var(--shadow-elevated)",
      }}
    >
      {/* Shimmer line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-smooth"
        style={{ background: "var(--gradient-accent)" }}
      />

      <div className="p-8 flex flex-col gap-6 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: iconBg }}
          >
            <Icon className={`w-7 h-7 ${iconColor}`} />
          </div>
          <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20">
            {badge}
          </span>
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

        {/* Feature list */}
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
          onClick={() => onLogin(userRole)}
          data-ocid={`btn-login-${userRole}`}
        >
          <LogIn className="w-4 h-4" />
          {ctaLabel}
          <ChevronRight className="w-4 h-4 ml-auto" />
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground leading-relaxed">
          Secured by Internet Identity — no passwords required
        </p>
      </div>
    </motion.div>
  );
}

// ─── Login Page ───────────────────────────────────────────────────────────────
export function LoginPage() {
  const { login, isLoggedIn, role, setRole } = useAuth();
  const navigate = useNavigate();

  // Redirect after login based on role
  useEffect(() => {
    if (isLoggedIn) {
      if (role === "employee") {
        navigate({ to: "/dashboard" });
      } else {
        navigate({ to: "/properties" });
      }
    }
  }, [isLoggedIn, role, navigate]);

  const handleLogin = (selectedRole: "employee" | "customer") => {
    // Set role first so it's stored as pendingRole, then trigger II login
    // After login, the auth hook will persist the role to backend
    setRole(selectedRole);
    login();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-16 bg-background relative overflow-hidden">
      {/* Background decoration */}
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
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Choose how you'd like to access the platform
        </p>
      </motion.div>

      {/* Dual cards */}
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <AuthCard
          title="Employee Access"
          subtitle="Manage listings, respond to leads, and track performance across all properties."
          icon={ShieldCheck}
          iconBg="oklch(0.25 0.02 285 / 0.1)"
          iconColor="text-primary"
          features={employeeFeatures}
          ctaLabel="Login as Employee"
          userRole="employee"
          onLogin={handleLogin}
          delay={0.1}
          badge="Team"
        />
        <AuthCard
          title="Customer Access"
          subtitle="Explore premium listings, save favourites, and connect with our team directly."
          icon={User}
          iconBg="oklch(0.72 0.16 62 / 0.12)"
          iconColor="text-accent"
          features={customerFeatures}
          ctaLabel="Login as Customer"
          userRole="customer"
          onLogin={handleLogin}
          delay={0.2}
          badge="Buyer"
        />
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-10 text-xs text-muted-foreground text-center"
      >
        Don't have an account?{" "}
        <a
          href="/auth/signup"
          className="text-accent underline underline-offset-2 hover:opacity-80 transition-smooth"
        >
          Create one here
        </a>
      </motion.p>
    </div>
  );
}
