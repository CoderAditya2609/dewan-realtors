import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyCardSkeleton } from "@/components/ui/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePropertyComparison } from "@/hooks/use-comparison";
import { useFeaturedProperties } from "@/hooks/use-properties";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  ChevronRight,
  Compass,
  Search,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ─── Data ─────────────────────────────────────────────────────────────────────

const WHY_CHOOSE = [
  {
    icon: Award,
    title: "Premium Listings",
    desc: "Curated selection of luxury and investment-grade properties — each vetted for quality and value.",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: Users,
    title: "Trusted Agents",
    desc: "Our seasoned professionals bring decades of combined expertise across India's top real estate markets.",
    gradient: "from-secondary/30 to-secondary/5",
  },
  {
    icon: BadgeCheck,
    title: "Verified Properties",
    desc: "Every listing is manually verified for title clarity, construction quality, and legal compliance.",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: Compass,
    title: "Expert Guidance",
    desc: "From search to handover, our end-to-end advisory ensures you invest with absolute confidence.",
    gradient: "from-secondary/30 to-secondary/5",
  },
];

const TESTIMONIALS = [
  {
    name: "Arjun Mehta",
    role: "Investor, Mumbai",
    initials: "AM",
    text: "Dewan Realtors helped me find a penthouse that exceeded every expectation. Their market knowledge is truly unmatched.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Home Buyer, Bengaluru",
    initials: "PS",
    text: "Seamless experience from search to handover. I found my dream 3BHK in Koramangala within two weeks — incredible service.",
    rating: 5,
  },
  {
    name: "Rahul Kapoor",
    role: "Business Owner, Delhi",
    initials: "RK",
    text: "Our office space search was handled with complete professionalism. Grade-A commercial in Connaught Place — simply brilliant.",
    rating: 5,
  },
];

const STATS = [
  { value: "2,400+", label: "Properties Listed" },
  { value: "18 Yrs", label: "Market Experience" },
  { value: "6,200+", label: "Happy Families" },
  { value: "₹1,200 Cr", label: "Value Transacted" },
];

const PROPERTY_TYPE_OPTIONS = [
  { label: "All Types", value: "all" },
  { label: "Flat / Apartment", value: "flat" },
  { label: "Villa", value: "villa" },
  { label: "Penthouse", value: "penthouse" },
  { label: "Plot", value: "plot" },
  { label: "Commercial", value: "commercial" },
  { label: "Studio", value: "studio" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} stars`}>
      {Array.from({ length: count }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static star count, order never changes
        <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
      ))}
    </div>
  );
}

function InitialsAvatar({ initials }: { initials: string }) {
  return (
    <div className="w-11 h-11 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
      <span className="font-display font-semibold text-sm text-accent">
        {initials}
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function HomePage() {
  const { data: featured = [], isLoading } = useFeaturedProperties();
  const { toggleCompare, isInCompare, canAddMore } = usePropertyComparison();
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);

  const [searchCity, setSearchCity] = useState("");
  const [searchType, setSearchType] = useState("all");

  const handleCompare = (id: string) => {
    if (!isInCompare(id) && !canAddMore) {
      toast.error("You can compare up to 4 properties at a time");
      return;
    }
    toggleCompare(id);
    toast.success(
      isInCompare(id) ? "Removed from comparison" : "Added to comparison",
    );
  };

  const handleSearch = () => {
    const params: Record<string, string> = {};
    if (searchCity.trim()) params.city = searchCity.trim();
    if (searchType && searchType !== "all") params.type = searchType;
    navigate({ to: "/properties", search: params });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const scrollCarousel = (dir: "left" | "right") => {
    if (!carouselRef.current) return;
    const amount = 340;
    carouselRef.current.scrollBy({
      left: dir === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col">
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        style={{ background: "oklch(0.10 0.01 285)" }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-luxury.dim_1400x900.jpg"
            alt="Luxury real estate"
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </div>

        {/* Gold geometric accent lines */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          aria-hidden
        >
          <div
            className="absolute top-0 right-0 w-1/3 h-1/3 opacity-10"
            style={{
              background:
                "radial-gradient(circle at top right, oklch(0.72 0.16 62 / 0.8), transparent 60%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-1/3 h-1/2 opacity-10"
            style={{
              background:
                "radial-gradient(circle at bottom left, oklch(0.72 0.16 62 / 0.6), transparent 60%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Badge
                className="mb-6 px-4 py-1.5 text-xs tracking-widest uppercase border font-medium backdrop-blur-sm"
                style={{
                  background: "oklch(0.72 0.16 62 / 0.15)",
                  borderColor: "oklch(0.72 0.16 62 / 0.4)",
                  color: "oklch(0.85 0.12 62)",
                }}
              >
                ✦ Premium Real Estate Platform
              </Badge>
            </motion.div>

            <h1
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] mb-4"
              style={{ color: "oklch(0.97 0.01 65)" }}
            >
              Find Your
              <br />
              <span style={{ color: "oklch(0.82 0.14 62)" }}>
                Perfect Space
              </span>
            </h1>

            <p
              className="text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
              style={{ color: "oklch(0.80 0.01 65)" }}
            >
              Explore curated luxury properties across India's finest cities.
              <br className="hidden sm:block" />
              Trusted by thousands of discerning buyers and investors.
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div
                className="flex flex-col sm:flex-row items-stretch gap-0 rounded-2xl overflow-hidden shadow-2xl border"
                style={{
                  background: "oklch(0.99 0.01 65 / 0.95)",
                  borderColor: "oklch(0.88 0.02 65)",
                  backdropFilter: "blur(16px)",
                }}
              >
                {/* City Input */}
                <div className="flex-1 flex items-center px-4 py-1 border-b sm:border-b-0 sm:border-r border-border/30">
                  <Search
                    className="w-4 h-4 shrink-0 mr-2"
                    style={{ color: "oklch(0.72 0.16 62)" }}
                  />
                  <input
                    type="text"
                    placeholder="Enter city or location…"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                    data-ocid="hero-search-city"
                    aria-label="Search by city"
                  />
                </div>

                {/* Type Select */}
                <div className="shrink-0 sm:w-44">
                  <Select value={searchType} onValueChange={setSearchType}>
                    <SelectTrigger
                      className="h-full w-full border-0 rounded-none bg-transparent text-sm shadow-none focus:ring-0 px-4 py-3"
                      data-ocid="hero-search-type"
                    >
                      <SelectValue placeholder="Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_TYPE_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Search CTA */}
                <button
                  type="button"
                  onClick={handleSearch}
                  className="flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold transition-all active:scale-95"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.72 0.16 62), oklch(0.65 0.12 62))",
                    color: "oklch(0.12 0.01 285)",
                  }}
                  data-ocid="hero-search-btn"
                  aria-label="Search properties"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </motion.div>

            {/* Hero CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link to="/properties">
                <Button
                  size="lg"
                  className="btn-primary px-8 py-3 text-sm h-auto shadow-elevated hover:shadow-hover"
                  data-ocid="hero-cta-browse"
                >
                  Browse Properties
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/properties">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-sm h-auto backdrop-blur-sm"
                  style={{
                    background: "oklch(0.97 0.01 65 / 0.10)",
                    borderColor: "oklch(0.97 0.01 65 / 0.30)",
                    color: "oklch(0.97 0.01 65)",
                  }}
                  data-ocid="hero-cta-featured"
                >
                  View Featured
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl px-4 py-3 border text-center"
                style={{
                  background: "oklch(0.97 0.01 65 / 0.08)",
                  borderColor: "oklch(0.97 0.01 65 / 0.15)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  className="font-display font-bold text-lg"
                  style={{ color: "oklch(0.82 0.14 62)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: "oklch(0.75 0.01 65)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-5 h-9 rounded-full border-2 flex items-start justify-center pt-1.5"
            style={{ borderColor: "oklch(0.97 0.01 65 / 0.35)" }}
          >
            <div
              className="w-1 h-1.5 rounded-full"
              style={{ background: "oklch(0.97 0.01 65 / 0.6)" }}
            />
          </div>
        </motion.div>
      </section>

      {/* ─── Featured Properties (Carousel) ──────────────────────────────── */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <Badge
                variant="secondary"
                className="mb-3 bg-accent/10 text-accent border-none text-xs"
              >
                Featured
              </Badge>
              <h2 className="text-heading text-foreground">
                Featured Properties
              </h2>
              {/* Gold accent underline */}
              <div className="mt-2 flex items-center gap-2">
                <div
                  className="h-0.5 w-12 rounded-full"
                  style={{ background: "oklch(0.72 0.16 62)" }}
                />
                <div
                  className="h-0.5 w-4 rounded-full opacity-40"
                  style={{ background: "oklch(0.72 0.16 62)" }}
                />
              </div>
              <p className="text-muted-foreground mt-2 max-w-md text-sm">
                Handpicked properties for buyers with exceptional taste.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              {/* Carousel navigation */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => scrollCarousel("left")}
                  className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-smooth"
                  aria-label="Scroll left"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel("right")}
                  className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-smooth"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <Link
                to="/properties"
                className="flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                data-ocid="link-view-all-properties"
              >
                View all
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none" }}
            >
              {isLoading ? (
                <>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="shrink-0 w-[300px] sm:w-[320px] snap-start"
                    >
                      <PropertyCardSkeleton />
                    </div>
                  ))}
                </>
              ) : (
                featured.map((p, i) => (
                  <div
                    key={p.id}
                    className="shrink-0 w-[300px] sm:w-[320px] snap-start"
                  >
                    <PropertyCard
                      property={p}
                      index={i}
                      showCompare
                      onCompare={handleCompare}
                      inCompare={isInCompare(p.id)}
                    />
                  </div>
                ))
              )}
            </div>
          </motion.div>

          <div className="text-center mt-8 sm:hidden">
            <Link to="/properties">
              <Button
                variant="outline"
                className="gap-2"
                data-ocid="mobile-view-all"
              >
                View All Properties
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ────────────────────────────────────────────────── */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <Badge
              variant="secondary"
              className="mb-3 bg-accent/10 text-accent border-none text-xs"
            >
              Our Advantage
            </Badge>
            <h2 className="text-heading text-foreground">
              Why Dewan Realtors?
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div
                className="h-0.5 w-4 rounded-full opacity-40"
                style={{ background: "oklch(0.72 0.16 62)" }}
              />
              <div
                className="h-0.5 w-12 rounded-full"
                style={{ background: "oklch(0.72 0.16 62)" }}
              />
              <div
                className="h-0.5 w-4 rounded-full opacity-40"
                style={{ background: "oklch(0.72 0.16 62)" }}
              />
            </div>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm leading-relaxed">
              We combine deep market knowledge with an exceptional service ethos
              to deliver results you can trust — every single time.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="card-glass rounded-2xl p-6 border border-border/30 hover:border-accent/30 hover:shadow-elevated transition-smooth group cursor-default"
                data-ocid={`why-card-${i}`}
              >
                {/* Icon container with gradient */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-smooth`}
                >
                  <item.icon
                    className="w-6 h-6"
                    style={{ color: "oklch(0.60 0.14 62)" }}
                  />
                </div>

                <h3 className="font-display font-semibold text-base text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>

                {/* Bottom gold line accent */}
                <div
                  className="mt-5 h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-500"
                  style={{ background: "oklch(0.72 0.16 62 / 0.4)" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <Badge
              variant="secondary"
              className="mb-3 bg-accent/10 text-accent border-none text-xs"
            >
              Client Stories
            </Badge>
            <h2 className="text-heading text-foreground">
              What Our Clients Say
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div
                className="h-0.5 w-12 rounded-full"
                style={{ background: "oklch(0.72 0.16 62)" }}
              />
              <div
                className="h-0.5 w-4 rounded-full opacity-40"
                style={{ background: "oklch(0.72 0.16 62)" }}
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{
                  opacity: 0,
                  y: 20,
                  x: i === 0 ? -16 : i === 2 ? 16 : 0,
                }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="card-glass rounded-2xl p-6 border border-border/30 hover:border-accent/20 hover:shadow-elevated transition-smooth group"
                data-ocid={`testimonial-card-${i}`}
              >
                {/* Quote mark */}
                <div
                  className="text-5xl font-display leading-none mb-3 select-none"
                  style={{ color: "oklch(0.72 0.16 62 / 0.25)" }}
                  aria-hidden
                >
                  "
                </div>

                <StarRating count={t.rating} />

                <p className="text-sm text-foreground/75 leading-relaxed mt-4 mb-5 italic">
                  {t.text}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                  <InitialsAvatar initials={t.initials} />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner (Dark with gold accents) ─────────────────────────── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "oklch(0.12 0.01 285)" }}
      >
        {/* Decorative background glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15"
            style={{ background: "oklch(0.72 0.16 62)" }}
          />
          <div
            className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10"
            style={{ background: "oklch(0.65 0.12 62)" }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Decorative gold line */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div
                className="h-px w-16 opacity-40"
                style={{ background: "oklch(0.72 0.16 62)" }}
              />
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "oklch(0.72 0.16 62)" }}
              />
              <div
                className="h-px w-16 opacity-40"
                style={{ background: "oklch(0.72 0.16 62)" }}
              />
            </div>

            <h2
              className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight"
              style={{ color: "oklch(0.97 0.01 65)" }}
            >
              Ready to Find Your
              <br />
              <span style={{ color: "oklch(0.82 0.14 62)" }}>
                Perfect Space?
              </span>
            </h2>

            <p
              className="max-w-xl mx-auto mb-10 leading-relaxed text-base"
              style={{ color: "oklch(0.72 0.01 65)" }}
            >
              Whether you're buying, investing, or leasing — our expert team is
              here to guide every step of your journey with clarity and care.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary gold CTA */}
              <Link to="/properties" data-ocid="cta-explore-properties">
                <button
                  type="button"
                  className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-elevated"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.72 0.16 62), oklch(0.62 0.12 62))",
                    color: "oklch(0.12 0.01 285)",
                  }}
                >
                  Browse Properties
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              {/* Outline ghost CTA */}
              <a href="#contact" data-ocid="cta-contact">
                <button
                  type="button"
                  className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 border"
                  style={{
                    borderColor: "oklch(0.72 0.16 62 / 0.5)",
                    color: "oklch(0.82 0.14 62)",
                    background: "oklch(0.72 0.16 62 / 0.06)",
                  }}
                >
                  Contact Us
                </button>
              </a>
            </div>

            {/* Bottom trust text */}
            <p
              className="mt-10 text-xs tracking-wider uppercase"
              style={{ color: "oklch(0.55 0.01 65)" }}
            >
              Trusted by 6,200+ families across India
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
