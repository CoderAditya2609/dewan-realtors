import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

const FOOTER_LINKS = {
  "Quick Links": [
    { label: "Browse Properties", to: "/properties" },
    { label: "Featured Listings", to: "/properties?featured=true" },
    { label: "Compare Properties", to: "/compare" },
    { label: "Saved Properties", to: "/saved" },
  ],
  "Property Types": [
    { label: "Flats & Apartments", to: "/properties?type=flat" },
    { label: "Villas & Bungalows", to: "/properties?type=villa" },
    { label: "Plots & Land", to: "/properties?type=plot" },
    { label: "Commercial Spaces", to: "/properties?type=commercial" },
  ],
};

const CITIES = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune", "Chennai"];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shadow-md-soft">
                <Building2 className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <span className="font-display font-bold text-base leading-none text-foreground">
                  Dewan
                </span>
                <span className="font-display font-light text-base leading-none text-accent ml-1">
                  Realtors
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Find Your Perfect Space. Premium real estate curated for
              discerning buyers across India's finest cities.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 pt-1">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 transition-smooth"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section} className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                {section}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>14, Business Bay, Andheri West, Mumbai 400053</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span>hello@dewanrealtors.in</span>
              </li>
            </ul>

            {/* Cities */}
            <div className="pt-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Cities
              </p>
              <div className="flex flex-wrap gap-1.5">
                {CITIES.map((city) => (
                  <span
                    key={city}
                    className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border/50" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {year} Dewan Realtors. All rights reserved.</span>
          <span>
            Built with love using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
