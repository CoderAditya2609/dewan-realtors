import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BookmarkCheck,
  Building2,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  SlidersHorizontal,
  Sun,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Properties", to: "/properties" },
  { label: "Compare", to: "/compare" },
];

export function Header() {
  const { isDark, toggle } = useDarkMode();
  const { isLoggedIn, isEmployee, isCustomer, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/50 shadow-md-soft">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group min-w-0 shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shadow-md-soft group-hover:shadow-lg-soft transition-smooth">
            <Building2 className="w-5 h-5 text-accent-foreground" />
          </div>
          <div className="hidden sm:block">
            <span className="font-display font-bold text-lg leading-none text-foreground tracking-tight">
              Dewan
            </span>
            <span className="font-display font-light text-lg leading-none text-accent ml-1 tracking-tight">
              Realtors
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={[
                "px-4 py-2 rounded-md text-sm font-medium transition-smooth relative",
                isActive(link.to)
                  ? "text-accent bg-accent/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
              ].join(" ")}
              data-ocid={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
              {isActive(link.to) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-accent rounded-full"
                />
              )}
            </Link>
          ))}
          {isEmployee && (
            <Link
              to="/dashboard"
              className={[
                "px-4 py-2 rounded-md text-sm font-medium transition-smooth flex items-center gap-1.5",
                isActive("/dashboard")
                  ? "text-accent bg-accent/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
              ].join(" ")}
              data-ocid="nav-link-dashboard"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Dashboard
            </Link>
          )}
          {isCustomer && (
            <Link
              to="/saved"
              className={[
                "px-4 py-2 rounded-md text-sm font-medium transition-smooth flex items-center gap-1.5",
                isActive("/saved")
                  ? "text-accent bg-accent/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
              ].join(" ")}
              data-ocid="nav-link-saved"
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              Saved
            </Link>
          )}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Dark mode toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="rounded-lg w-9 h-9 text-muted-foreground hover:text-foreground hover:bg-muted/60"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            data-ocid="toggle-dark-mode"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          {/* Auth */}
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/60 border border-border/40">
                <User className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-medium text-foreground max-w-20 truncate">
                  {user?.displayName}
                </span>
                <Badge
                  variant="secondary"
                  className="text-xs py-0 px-1.5 h-4 capitalize bg-accent/20 text-accent border-none"
                >
                  {user?.role}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="w-9 h-9 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                aria-label="Log out"
                data-ocid="btn-logout"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/auth/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm font-medium"
                  data-ocid="btn-login"
                >
                  Log in
                </Button>
              </Link>
              <Link to="/auth/signup">
                <Button size="sm" className="btn-primary text-sm" data-ocid="btn-signup">
                  Sign up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden w-9 h-9 rounded-lg"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation"
            data-ocid="btn-mobile-menu"
          >
            {menuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border/40 bg-card/98 backdrop-blur-md overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    "px-4 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                    isActive(link.to)
                      ? "text-accent bg-accent/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              ))}
              {isEmployee && (
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              )}
              {isCustomer && (
                <Link
                  to="/saved"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 flex items-center gap-2"
                >
                  <BookmarkCheck className="w-4 h-4" />
                  Saved Properties
                </Link>
              )}
              <div className="pt-2 border-t border-border/40 mt-1">
                {isLoggedIn ? (
                  <div className="flex items-center justify-between px-4 py-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {user?.displayName}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-xs capitalize bg-accent/20 text-accent border-none"
                      >
                        {user?.role}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                      className="text-destructive hover:bg-destructive/10"
                      data-ocid="btn-mobile-logout"
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2 px-2">
                    <Link to="/auth/login" className="flex-1" onClick={() => setMenuOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full text-sm"
                        data-ocid="btn-mobile-login"
                      >
                        Log in
                      </Button>
                    </Link>
                    <Link to="/auth/signup" className="flex-1" onClick={() => setMenuOpen(false)}>
                      <Button className="w-full btn-primary text-sm" data-ocid="btn-mobile-signup">
                        Sign up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
              {/* Comparison bar shortcut */}
              <Link
                to="/compare"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Compare Properties
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
