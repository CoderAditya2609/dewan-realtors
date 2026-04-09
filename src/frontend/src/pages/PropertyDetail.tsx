import { PropertyCard } from "@/components/property/PropertyCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { usePropertyComparison } from "@/hooks/use-comparison";
import {
  useBookmarks,
  useProperties,
  useProperty,
  useSubmitInquiry,
  useSubmitVisitRequest,
  useToggleBookmark,
} from "@/hooks/use-properties";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import type { InquiryFormData, VisitRequestFormData } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Bookmark,
  BookmarkCheck,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Compass,
  GitCompare,
  MapPin,
  Maximize2,
  MessageSquare,
  Phone,
  Share2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Local form types ─────────────────────────────────────────────────────────

interface InquiryForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface VisitForm {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  message: string;
}

// ─── Label maps ───────────────────────────────────────────────────────────────

const FACING_LABELS: Record<string, string> = {
  north: "North",
  south: "South",
  east: "East",
  west: "West",
  "north-east": "North-East",
  "north-west": "North-West",
  "south-east": "South-East",
  "south-west": "South-West",
};

const TYPE_LABELS: Record<string, string> = {
  flat: "Flat",
  plot: "Plot",
  villa: "Villa",
  commercial: "Commercial",
  penthouse: "Penthouse",
  studio: "Studio",
  townhouse: "Townhouse",
};

// ─── Image Gallery ────────────────────────────────────────────────────────────

function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const allImages =
    images.length > 0 ? images : ["/assets/images/placeholder.svg"];

  const prev = () =>
    setActive((i) => (i - 1 + allImages.length) % allImages.length);
  const next = () => setActive((i) => (i + 1) % allImages.length);

  return (
    <div className="space-y-3" data-ocid="image-gallery">
      {/* Main image */}
      <button
        type="button"
        className="relative w-full overflow-hidden rounded-2xl aspect-video cursor-zoom-in group border border-border/20 shadow-elevated"
        onClick={() => setZoomed(true)}
        aria-label="View full-size photo"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={allImages[active]}
            alt={`${title} — view ${active + 1}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
        </AnimatePresence>

        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent pointer-events-none" />

        {/* Prev / Next */}
        {allImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-elevated transition-smooth hover:bg-accent hover:text-accent-foreground opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-elevated transition-smooth hover:bg-accent hover:text-accent-foreground opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-3 right-3 bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-medium pointer-events-none">
          {active + 1} / {allImages.length}
        </div>
      </button>

      {/* Thumbnail strip */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allImages.map((img, i) => (
            <button
              type="button"
              key={`thumb-${img}`}
              onClick={() => setActive(i)}
              className={[
                "flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-smooth border-2",
                i === active
                  ? "border-accent shadow-md"
                  : "border-transparent opacity-55 hover:opacity-90",
              ].join(" ")}
              aria-label={`View photo ${i + 1}`}
            >
              <img
                src={img}
                alt={`Property view ${i + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/assets/images/placeholder.svg";
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setZoomed(false)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={allImages[active]}
              alt={title}
              className="max-w-full max-h-full object-contain rounded-xl shadow-elevated"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center text-background hover:bg-card/40 transition-smooth"
              onClick={() => setZoomed(false)}
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="card-glass rounded-xl p-4 flex flex-col items-center gap-2 text-center">
      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-none">
          {label}
        </p>
        <p className="text-sm font-semibold text-foreground mt-1 capitalize">
          {value}
        </p>
      </div>
    </div>
  );
}

// ─── Inquiry Sidebar ──────────────────────────────────────────────────────────

function InquirySidebar({
  propertyId,
  propertyTitle,
}: {
  propertyId: string;
  propertyTitle: string;
}) {
  const submitInquiry = useSubmitInquiry();
  const [form, setForm] = useState<InquiryForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const set =
    (field: keyof InquiryForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: InquiryFormData = { propertyId, ...form };
    submitInquiry.mutate(data, {
      onSuccess: () => {
        toast.success("Inquiry sent! We'll contact you shortly.");
        setForm({ name: "", email: "", phone: "", message: "" });
      },
      onError: () => toast.error("Failed to send. Please try again."),
    });
  };

  return (
    <div
      className="card-glass rounded-2xl p-5 space-y-5 sticky top-24"
      data-ocid="inquiry-form"
    >
      <div>
        <h3 className="font-display font-semibold text-lg text-foreground">
          Send Inquiry
        </h3>
        <p className="text-sm text-muted-foreground mt-0.5">
          Get more details about this property
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="space-y-1.5">
          <Label htmlFor="inq-name">Full Name</Label>
          <Input
            id="inq-name"
            value={form.name}
            onChange={set("name")}
            placeholder="Your name"
            required
            data-ocid="input-inquiry-name"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="inq-phone">Phone Number</Label>
          <Input
            id="inq-phone"
            value={form.phone}
            onChange={set("phone")}
            placeholder="+91 98765 43210"
            required
            data-ocid="input-inquiry-phone"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="inq-email">Email Address</Label>
          <Input
            id="inq-email"
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="you@email.com"
            required
            data-ocid="input-inquiry-email"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="inq-msg">Message</Label>
          <Textarea
            id="inq-msg"
            value={form.message}
            onChange={set("message")}
            placeholder={`I'm interested in ${propertyTitle}. Please share more details.`}
            rows={4}
            required
            data-ocid="input-inquiry-message"
          />
        </div>
        <Button
          type="submit"
          className="w-full btn-primary"
          disabled={submitInquiry.isPending}
          data-ocid="btn-submit-inquiry"
        >
          {submitInquiry.isPending ? "Sending…" : "Send Inquiry"}
        </Button>
      </form>

      {/* WhatsApp CTA */}
      <a
        href={`https://wa.me/919876543210?text=${encodeURIComponent(
          `Hi, I'm interested in: ${propertyTitle}. Could you please share more details?`,
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-border/50 text-sm font-medium text-foreground hover:bg-muted/50 transition-smooth"
        data-ocid="btn-whatsapp"
      >
        {/* WhatsApp icon */}
        <svg
          className="w-5 h-5 text-green-600"
          viewBox="0 0 32 32"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16 3C9.371 3 4 8.371 4 15c0 2.254.609 4.457 1.766 6.383L4.062 28.25l7.031-1.844A12.946 12.946 0 0 0 16 27c6.629 0 12-5.371 12-12S22.629 3 16 3zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a10.94 10.94 0 0 1-5.195-1.305l-.371-.211-3.844 1.008.988-3.727-.234-.383A9.958 9.958 0 0 1 6 15c0-5.523 4.477-10 10-10zm-3.148 4.875c-.196 0-.512.074-.781.367-.266.293-1.016 1-1.016 2.43s1.039 2.816 1.184 3.012c.144.195 2.012 3.219 4.953 4.383 2.461.969 2.941.777 3.473.727.531-.05 1.715-.703 1.957-1.379.242-.676.242-1.258.172-1.379-.07-.121-.265-.195-.559-.344-.293-.148-1.734-.855-2.004-.953-.27-.098-.465-.148-.66.148-.195.293-.76.953-.93 1.148-.172.195-.344.219-.637.074-.293-.148-1.238-.457-2.359-1.457-.871-.777-1.457-1.734-1.629-2.031-.168-.293-.016-.453.129-.598.129-.129.293-.344.441-.516.148-.172.195-.293.293-.488.098-.195.05-.367-.023-.516-.074-.148-.66-1.582-.898-2.168-.234-.566-.477-.484-.66-.492-.168-.008-.363-.008-.559-.008z" />
        </svg>
        Chat on WhatsApp
      </a>
    </div>
  );
}

// ─── Schedule Visit Modal ─────────────────────────────────────────────────────

function ScheduleVisitModal({
  propertyId,
  propertyTitle,
  open,
  onClose,
}: {
  propertyId: string;
  propertyTitle: string;
  open: boolean;
  onClose: () => void;
}) {
  const submitVisit = useSubmitVisitRequest();
  const [form, setForm] = useState<VisitForm>({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    message: "",
  });

  const set =
    (field: keyof VisitForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: VisitRequestFormData = {
      propertyId,
      customerName: form.name,
      customerPhone: form.phone,
      preferredDate: form.date,
      preferredTime: form.time,
      message: form.message || undefined,
    };
    submitVisit.mutate(data, {
      onSuccess: () => {
        toast.success("Visit scheduled! We'll confirm the details shortly.");
        onClose();
        setForm({
          name: "",
          phone: "",
          email: "",
          date: "",
          time: "",
          message: "",
        });
      },
      onError: () => toast.error("Could not schedule. Please try again."),
    });
  };

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
          onClick={onClose}
          data-ocid="schedule-visit-modal"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="card-glass w-full max-w-md rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="font-display font-semibold text-xl text-foreground">
                  Schedule a Visit
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                  {propertyTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted/50 transition-smooth ml-3 mt-0.5 shrink-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <Label htmlFor="visit-name">Full Name</Label>
                  <Input
                    id="visit-name"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your name"
                    required
                    data-ocid="input-visit-name"
                  />
                </div>
                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <Label htmlFor="visit-phone">Phone</Label>
                  <Input
                    id="visit-phone"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="+91 98765 43210"
                    required
                    data-ocid="input-visit-phone"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="visit-email">Email (optional)</Label>
                <Input
                  id="visit-email"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="you@email.com"
                  data-ocid="input-visit-email"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="visit-date">Preferred Date</Label>
                  <Input
                    id="visit-date"
                    type="date"
                    value={form.date}
                    onChange={set("date")}
                    min={new Date().toISOString().split("T")[0]}
                    required
                    data-ocid="input-visit-date"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="visit-time">Preferred Time</Label>
                  <Input
                    id="visit-time"
                    type="time"
                    value={form.time}
                    onChange={set("time")}
                    required
                    data-ocid="input-visit-time"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="visit-msg">Additional Notes</Label>
                <Textarea
                  id="visit-msg"
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Any specific requirements or questions?"
                  rows={3}
                  data-ocid="input-visit-message"
                />
              </div>
              <Button
                type="submit"
                className="w-full btn-primary mt-1"
                disabled={submitVisit.isPending}
                data-ocid="btn-submit-visit"
              >
                {submitVisit.isPending ? "Scheduling…" : "Request Visit"}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Page Skeleton ────────────────────────────────────────────────────────────

function DetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Skeleton className="h-7 w-40" />
      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-6">
          <Skeleton className="w-full aspect-video rounded-2xl" />
          <div className="space-y-3">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {(["a", "b", "c", "d"] as const).map((id) => (
              <Skeleton key={`skel-stat-${id}`} className="h-24 rounded-xl" />
            ))}
          </div>
        </div>
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    </div>
  );
}

// ─── Main Page Export ─────────────────────────────────────────────────────────

export function PropertyDetailPage() {
  const { id } = useParams({ from: "/properties/$id" });
  const { data: property, isLoading } = useProperty(id);
  const { data: allProperties = [] } = useProperties();
  const { data: bookmarks = [] } = useBookmarks();
  const toggleBookmark = useToggleBookmark();
  const { addViewed } = useRecentlyViewed();
  const { toggleCompare, isInCompare, canAddMore } = usePropertyComparison();
  const [visitOpen, setVisitOpen] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  // Auto-track view on page load
  useEffect(() => {
    if (id) addViewed(id);
  }, [id, addViewed]);

  const isBookmarked = bookmarks.includes(id);
  const inCompare = isInCompare(id);

  const handleBookmark = () => {
    toggleBookmark.mutate(id, {
      onSuccess: () =>
        toast.success(
          isBookmarked ? "Removed from saved" : "Saved to bookmarks",
        ),
    });
  };

  const handleCompare = () => {
    if (inCompare) {
      toggleCompare(id);
      toast.info("Removed from comparison");
    } else if (canAddMore) {
      toggleCompare(id);
      toast.success("Added to comparison");
    } else {
      toast.warning("You can compare up to 4 properties at a time");
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: property?.title, url }).catch(() => {
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      });
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  if (isLoading) return <DetailSkeleton />;

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-5">
        <Building2 className="w-14 h-14 text-muted-foreground mx-auto" />
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Property Not Found
        </h2>
        <p className="text-muted-foreground text-sm">
          This listing may have been removed or is no longer available.
        </p>
        <Link to="/properties">
          <Button className="btn-primary mt-2">Browse Properties</Button>
        </Link>
      </div>
    );
  }

  // Similar properties — same city or same type, exclude current
  const similar = allProperties
    .filter(
      (p) =>
        p.id !== property.id &&
        (p.city === property.city || p.type === property.type),
    )
    .slice(0, 3);

  return (
    <>
      <div ref={topRef} className="min-h-screen bg-background">
        {/* ── Breadcrumb ─────────────────────────────────────── */}
        <div className="bg-card border-b border-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <span className="text-border/80">/</span>
            <Link
              to="/properties"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Properties
            </Link>
            <span className="text-border/80">/</span>
            <span className="text-foreground font-medium line-clamp-1 max-w-xs">
              {property.title}
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Properties
            </Link>
          </motion.div>

          {/* Main grid */}
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
            {/* ── Left column ──────────────────────────────────── */}
            <div className="space-y-8 min-w-0">
              {/* Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ImageGallery images={property.images} title={property.title} />
              </motion.div>

              {/* Title + price + actions */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="space-y-4"
              >
                {/* Badge row */}
                <div className="flex flex-wrap gap-2 items-center">
                  {property.featured && (
                    <Badge className="bg-accent text-accent-foreground text-xs font-semibold border-none px-3 py-1">
                      ★ Featured
                    </Badge>
                  )}
                  {property.status === "sold" && (
                    <Badge className="bg-destructive text-destructive-foreground text-xs font-semibold border-none px-3 py-1">
                      Sold
                    </Badge>
                  )}
                  {property.status === "reserved" && (
                    <Badge
                      variant="secondary"
                      className="text-xs font-semibold px-3 py-1"
                    >
                      Reserved
                    </Badge>
                  )}
                  <Badge
                    variant="outline"
                    className="text-xs px-3 py-1 border-border/50 capitalize"
                  >
                    {TYPE_LABELS[property.type] ?? property.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-auto">
                    Property ID: #{property.id}
                  </span>
                </div>

                {/* Title + price */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight min-w-0">
                    {property.title}
                  </h1>
                  <div className="sm:text-right shrink-0">
                    <p className="font-display text-3xl font-bold text-accent leading-none">
                      {property.priceLabel}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      ₹
                      {Math.round(
                        property.price / property.sizeSqFt,
                      ).toLocaleString()}{" "}
                      / sq.ft
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-sm">{property.address}</span>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <Button
                    onClick={() => setVisitOpen(true)}
                    className="btn-primary flex items-center gap-2"
                    data-ocid="btn-schedule-visit"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule Visit
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-border/60"
                    onClick={handleBookmark}
                    data-ocid="btn-bookmark-detail"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-accent" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                    {isBookmarked ? "Saved" : "Save"}
                  </Button>
                  <Button
                    variant="outline"
                    className={[
                      "flex items-center gap-2 border-border/60",
                      inCompare
                        ? "bg-accent/10 border-accent/40 text-accent"
                        : "",
                    ].join(" ")}
                    onClick={handleCompare}
                    data-ocid="btn-compare-detail"
                  >
                    <GitCompare className="w-4 h-4" />
                    {inCompare ? "In Compare" : "Compare"}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-border/60 ml-auto"
                    onClick={handleShare}
                    aria-label="Share property"
                    data-ocid="btn-share"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>

              {/* Stats grid */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.14 }}
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <StatCard
                    icon={<Maximize2 className="w-5 h-5" />}
                    label="Size"
                    value={`${property.sizeSqFt.toLocaleString()} sq.ft`}
                  />
                  <StatCard
                    icon={<Building2 className="w-5 h-5" />}
                    label="Type"
                    value={TYPE_LABELS[property.type] ?? property.type}
                  />
                  <StatCard
                    icon={<Compass className="w-5 h-5" />}
                    label="Facing"
                    value={FACING_LABELS[property.facing] ?? property.facing}
                  />
                  {property.bedrooms !== undefined ? (
                    <StatCard
                      icon={<BedDouble className="w-5 h-5" />}
                      label="Bedrooms"
                      value={`${property.bedrooms} BHK`}
                    />
                  ) : (
                    <StatCard
                      icon={<MapPin className="w-5 h-5" />}
                      label="City"
                      value={property.city}
                    />
                  )}
                </div>

                {property.bathrooms !== undefined && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                    <StatCard
                      icon={<Bath className="w-5 h-5" />}
                      label="Bathrooms"
                      value={`${property.bathrooms} Bath`}
                    />
                    <StatCard
                      icon={<MapPin className="w-5 h-5" />}
                      label="City"
                      value={property.city}
                    />
                  </div>
                )}
              </motion.div>

              {/* Description */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
                className="space-y-3"
              >
                <h2 className="font-display text-xl font-semibold text-foreground">
                  About this Property
                </h2>
                <div className="card-glass rounded-xl p-5">
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {property.description}
                  </p>
                </div>
              </motion.section>

              {/* Amenities */}
              {property.amenities.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.22 }}
                  className="space-y-3"
                  data-ocid="amenities-section"
                >
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Amenities
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {amenity}
                      </span>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Inquiry form — mobile only */}
              <div className="lg:hidden">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.26 }}
                >
                  <InquirySidebar
                    propertyId={property.id}
                    propertyTitle={property.title}
                  />
                </motion.div>
              </div>

              {/* Location */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="space-y-3"
              >
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Location
                </h2>
                <div className="card-glass rounded-xl p-5 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {property.address}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {property.city}
                    </p>
                    {property.latitude !== undefined &&
                      property.longitude !== undefined && (
                        <a
                          href={`https://maps.google.com/?q=${property.latitude},${property.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-accent hover:underline mt-1.5 inline-flex items-center gap-1"
                        >
                          <MapPin className="w-3 h-3" />
                          Open in Google Maps
                        </a>
                      )}
                  </div>
                </div>
              </motion.section>

              {/* Contact agent strip */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.32 }}
                className="card-glass rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    Contact Our Agent
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Speak directly with a Dewan Realtors specialist
                  </p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a href="tel:+919876543210" className="flex-1 sm:flex-none">
                    <Button
                      variant="outline"
                      className="w-full border-border/60 flex items-center gap-2 text-sm"
                      data-ocid="btn-call-agent"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </Button>
                  </a>
                  <Button
                    onClick={() => setVisitOpen(true)}
                    className="flex-1 sm:flex-none btn-primary flex items-center gap-2 text-sm"
                    data-ocid="btn-schedule-visit-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Schedule Visit
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* ── Right sidebar (desktop) ───────────────────────── */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <InquirySidebar
                  propertyId={property.id}
                  propertyTitle={property.title}
                />
              </motion.div>
            </div>
          </div>

          {/* ── Similar Properties ────────────────────────────── */}
          {similar.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="mt-16 pt-12 border-t border-border/40"
              data-ocid="similar-properties"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-foreground">
                    Similar Properties
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Properties in {property.city} and{" "}
                    {TYPE_LABELS[property.type]} category
                  </p>
                </div>
                <Link
                  to="/properties"
                  className="text-sm text-accent hover:text-accent/80 transition-colors font-medium hidden sm:block"
                >
                  View All →
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similar.map((p, i) => (
                  <PropertyCard key={p.id} property={p} index={i} />
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>

      {/* Schedule Visit Modal */}
      <ScheduleVisitModal
        propertyId={property.id}
        propertyTitle={property.title}
        open={visitOpen}
        onClose={() => setVisitOpen(false)}
      />
    </>
  );
}
