import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  useAddProperty,
  useDashboard,
  useDeleteProperty,
  useEmployeeProperties,
  useInquiries,
  useMarkPropertySold,
  usePublishProperty,
  useUnpublishProperty,
  useUpdateProperty,
  useVisitRequests,
} from "@/hooks/use-properties";
import type {
  FacingDirection,
  Property,
  PropertyFormData,
  PropertyType,
} from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  Calendar,
  CheckCircle,
  Eye,
  Globe,
  GlobeLock,
  MessageSquare,
  Pencil,
  PlusCircle,
  Star,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Constants ────────────────────────────────────────────────────────────────

const PIE_COLORS = [
  "oklch(0.72 0.16 62)",
  "oklch(0.60 0.14 62)",
  "oklch(0.78 0.15 62)",
  "oklch(0.50 0.12 62)",
  "oklch(0.84 0.13 62)",
];
const PROPERTY_TYPES: PropertyType[] = [
  "flat",
  "plot",
  "villa",
  "commercial",
  "penthouse",
  "studio",
  "townhouse",
  "other",
];
const FACING_DIRS: FacingDirection[] = [
  "north",
  "south",
  "east",
  "west",
  "north-east",
  "north-west",
  "south-east",
  "south-west",
];
const TABS = ["Overview", "Properties", "Inquiries", "Visit Requests"] as const;
type TabName = (typeof TABS)[number];

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  ocid,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  sub?: string;
  ocid: string;
}) {
  return (
    <div
      className="card-glass rounded-xl p-5 border border-border/30"
      data-ocid={ocid}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-accent" />
        </div>
      </div>
      <div className="font-display font-bold text-2xl text-foreground">
        {value}
      </div>
      <div className="text-sm text-muted-foreground mt-0.5">{label}</div>
      {sub && <div className="text-xs text-accent mt-1">{sub}</div>}
    </div>
  );
}

// ─── Property Form Modal ───────────────────────────────────────────────────────

const EMPTY_FORM: PropertyFormData = {
  title: "",
  description: "",
  price: 0,
  city: "",
  address: "",
  sizeSqFt: 0,
  facing: "north",
  type: "flat",
  amenities: [],
  images: [],
  featured: false,
};

function PropertyFormModal({
  initial,
  onSubmit,
  onClose,
  isLoading,
}: {
  initial?: Partial<PropertyFormData>;
  onSubmit: (data: PropertyFormData) => void;
  onClose: () => void;
  isLoading: boolean;
}) {
  const [form, setForm] = useState<PropertyFormData>({
    ...EMPTY_FORM,
    ...initial,
  });
  const [amenityInput, setAmenityInput] = useState("");

  const set = <K extends keyof PropertyFormData>(
    k: K,
    v: PropertyFormData[K],
  ) => setForm((f) => ({ ...f, [k]: v }));

  const addAmenity = () => {
    const a = amenityInput.trim();
    if (a && !form.amenities.includes(a)) {
      set("amenities", [...form.amenities, a]);
      setAmenityInput("");
    }
  };

  const removeAmenity = (a: string) =>
    set(
      "amenities",
      form.amenities.filter((x) => x !== a),
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const inputCls =
    "w-full bg-input/60 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40";
  const labelCls = "block text-xs font-medium text-muted-foreground mb-1";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-ocid="modal-property-form"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
        role="presentation"
      />
      <motion.div
        className="relative bg-card border border-border/50 rounded-2xl shadow-[var(--shadow-elevated)] w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
      >
        <div className="flex items-center justify-between p-6 border-b border-border/40">
          <h2 className="font-display font-semibold text-xl text-foreground">
            {initial?.title ? "Edit Property" : "Add New Property"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label htmlFor="pf-title" className={labelCls}>
              Property Title *
            </label>
            <input
              id="pf-title"
              className={inputCls}
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Luxury Sea-View Penthouse"
              data-ocid="input-title"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pf-city" className={labelCls}>
                City *
              </label>
              <input
                id="pf-city"
                className={inputCls}
                required
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                placeholder="Mumbai"
                data-ocid="input-city"
              />
            </div>
            <div>
              <label htmlFor="pf-address" className={labelCls}>
                Full Address
              </label>
              <input
                id="pf-address"
                className={inputCls}
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                placeholder="Area, City, State"
                data-ocid="input-address"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pf-price" className={labelCls}>
                Price (₹) *
              </label>
              <input
                id="pf-price"
                className={inputCls}
                type="number"
                required
                min={0}
                value={form.price || ""}
                onChange={(e) => set("price", Number(e.target.value))}
                placeholder="e.g. 8500000"
                data-ocid="input-price"
              />
            </div>
            <div>
              <label htmlFor="pf-size" className={labelCls}>
                Size (sq.ft) *
              </label>
              <input
                id="pf-size"
                className={inputCls}
                type="number"
                required
                min={0}
                value={form.sizeSqFt || ""}
                onChange={(e) => set("sizeSqFt", Number(e.target.value))}
                placeholder="e.g. 1450"
                data-ocid="input-size"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pf-type" className={labelCls}>
                Property Type *
              </label>
              <select
                id="pf-type"
                className={inputCls}
                value={form.type}
                onChange={(e) => set("type", e.target.value as PropertyType)}
                data-ocid="select-type"
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-card capitalize">
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pf-facing" className={labelCls}>
                Facing Direction *
              </label>
              <select
                id="pf-facing"
                className={inputCls}
                value={form.facing}
                onChange={(e) =>
                  set("facing", e.target.value as FacingDirection)
                }
                data-ocid="select-facing"
              >
                {FACING_DIRS.map((d) => (
                  <option key={d} value={d} className="bg-card capitalize">
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pf-beds" className={labelCls}>
                Bedrooms
              </label>
              <input
                id="pf-beds"
                className={inputCls}
                type="number"
                min={0}
                value={form.bedrooms ?? ""}
                onChange={(e) =>
                  set(
                    "bedrooms",
                    e.target.value ? Number(e.target.value) : undefined,
                  )
                }
                placeholder="e.g. 3"
                data-ocid="input-bedrooms"
              />
            </div>
            <div>
              <label htmlFor="pf-baths" className={labelCls}>
                Bathrooms
              </label>
              <input
                id="pf-baths"
                className={inputCls}
                type="number"
                min={0}
                value={form.bathrooms ?? ""}
                onChange={(e) =>
                  set(
                    "bathrooms",
                    e.target.value ? Number(e.target.value) : undefined,
                  )
                }
                placeholder="e.g. 2"
                data-ocid="input-bathrooms"
              />
            </div>
          </div>

          <div>
            <label htmlFor="pf-desc" className={labelCls}>
              Description *
            </label>
            <textarea
              id="pf-desc"
              className={`${inputCls} resize-none`}
              rows={3}
              required
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe the property…"
              data-ocid="input-description"
            />
          </div>

          <div>
            <label htmlFor="pf-amenity" className={labelCls}>
              Amenities
            </label>
            <div className="flex gap-2 mb-2">
              <input
                id="pf-amenity"
                className={`${inputCls} flex-1`}
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addAmenity();
                  }
                }}
                placeholder="e.g. Parking, Gym…"
                data-ocid="input-amenity"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addAmenity}
                className="shrink-0"
              >
                Add
              </Button>
            </div>
            {form.amenities.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {form.amenities.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1 bg-accent/10 text-accent text-xs rounded-full px-2.5 py-1"
                  >
                    {a}
                    <button
                      type="button"
                      onClick={() => removeAmenity(a)}
                      className="hover:opacity-70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={form.featured}
              onClick={() => set("featured", !form.featured)}
              className={`w-10 h-6 rounded-full transition-smooth relative ${form.featured ? "bg-accent" : "bg-border"}`}
              data-ocid="toggle-featured"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${form.featured ? "translate-x-4" : "translate-x-0"}`}
              />
            </button>
            <span className="text-sm text-foreground flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-accent" />
              Mark as Featured
            </span>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn-primary flex-1"
              disabled={isLoading}
              data-ocid="btn-submit-property"
            >
              {isLoading
                ? "Saving…"
                : initial?.title
                  ? "Update Property"
                  : "Add Property"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Delete Confirm Dialog ─────────────────────────────────────────────────────

function DeleteDialog({
  propertyTitle,
  onConfirm,
  onClose,
  isLoading,
}: {
  propertyTitle: string;
  onConfirm: () => void;
  onClose: () => void;
  isLoading: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-ocid="modal-delete-confirm"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
        role="presentation"
      />
      <motion.div
        className="relative bg-card border border-border/50 rounded-2xl shadow-[var(--shadow-elevated)] w-full max-w-sm p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <h3 className="font-display font-semibold text-lg text-foreground mb-2">
          Delete Property
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Are you sure you want to delete{" "}
          <span className="text-foreground font-medium">"{propertyTitle}"</span>
          ? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={onConfirm}
            disabled={isLoading}
            data-ocid="btn-confirm-delete"
          >
            {isLoading ? "Deleting…" : "Delete"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab({
  stats,
  totalProperties,
}: {
  stats: ReturnType<typeof useDashboard>["data"];
  totalProperties: number;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            icon: Building2,
            label: "Total Listings",
            value: totalProperties || stats?.totalListings || 0,
            ocid: "stat-total",
          },
          {
            icon: CheckCircle,
            label: "Active Listings",
            value: stats?.activeListings ?? 0,
            ocid: "stat-active",
          },
          {
            icon: TrendingUp,
            label: "Sold Properties",
            value: stats?.soldListings ?? 0,
            ocid: "stat-sold",
          },
          {
            icon: MessageSquare,
            label: "Total Inquiries",
            value: stats?.totalInquiries ?? 0,
            ocid: "stat-inquiries",
          },
        ].map((s, i) => (
          <motion.div
            key={s.ocid}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <StatCard {...s} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.36 }}
        className="card-glass rounded-xl border border-border/30 p-5 flex items-center gap-4"
        data-ocid="stat-visit-requests"
      >
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
          <Calendar className="w-6 h-6 text-accent" />
        </div>
        <div>
          <div className="font-display font-bold text-xl text-foreground">
            {stats?.totalVisitRequests ?? 0}
          </div>
          <div className="text-sm text-muted-foreground">
            Visit Requests Pending
          </div>
        </div>
        <div className="ml-auto">
          <Badge className="bg-accent/10 text-accent border-none">
            Review Required
          </Badge>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.44 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div
          className="lg:col-span-2 card-glass rounded-xl border border-border/30 p-5"
          data-ocid="chart-monthly-inquiries"
        >
          <h3 className="font-semibold text-foreground mb-5 flex items-center gap-2">
            <Eye className="w-4 h-4 text-accent" />
            Monthly Activity
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={stats?.monthlyInquiries ?? []}
              barSize={18}
              barGap={4}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.85 0.02 65 / 0.4)"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "oklch(0.45 0.01 285)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "oklch(0.45 0.01 285)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "oklch(0.99 0.01 65)",
                  border: "1px solid oklch(0.88 0.02 65)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar
                dataKey="inquiries"
                fill="oklch(0.72 0.16 62)"
                radius={[4, 4, 0, 0]}
                name="Inquiries"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          className="card-glass rounded-xl border border-border/30 p-5"
          data-ocid="chart-type-breakdown"
        >
          <h3 className="font-semibold text-foreground mb-5 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-accent" />
            By Type
          </h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={stats?.propertyTypeBreakdown ?? []}
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={68}
                paddingAngle={3}
                dataKey="count"
              >
                {(stats?.propertyTypeBreakdown ?? []).map((entry, index) => (
                  <Cell
                    key={entry.type}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "oklch(0.99 0.01 65)",
                  border: "1px solid oklch(0.88 0.02 65)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(v, _n, p) => [`${v} properties`, p.payload.type]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2">
            {(stats?.propertyTypeBreakdown ?? []).map((entry, i) => (
              <div
                key={entry.type}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                />
                <span className="capitalize">{entry.type}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.52 }}
        className="card-glass rounded-xl border border-border/30 p-5"
        data-ocid="chart-property-views"
      >
        <h3 className="font-semibold text-foreground mb-5 flex items-center gap-2">
          <Users className="w-4 h-4 text-accent" />
          Property Views Trend
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={stats?.monthlyInquiries ?? []}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.85 0.02 65 / 0.4)"
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "oklch(0.45 0.01 285)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "oklch(0.45 0.01 285)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "oklch(0.99 0.01 65)",
                border: "1px solid oklch(0.88 0.02 65)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="inquiries"
              stroke="oklch(0.72 0.16 62)"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "oklch(0.72 0.16 62)", strokeWidth: 0 }}
              name="Inquiries"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

// ─── Properties Tab ────────────────────────────────────────────────────────────

function PropertiesTab({ properties }: { properties: Property[] }) {
  const addProperty = useAddProperty();
  const updateProperty = useUpdateProperty();
  const deleteProperty = useDeleteProperty();
  const markSold = useMarkPropertySold();
  const publishProperty = usePublishProperty();
  const unpublishProperty = useUnpublishProperty();

  const [addOpen, setAddOpen] = useState(false);
  const [editProp, setEditProp] = useState<Property | null>(null);
  const [deleteProp, setDeleteProp] = useState<Property | null>(null);
  // Track local published state until backend supports dedicated endpoint
  const [publishedIds, setPublishedIds] = useState<Set<string>>(
    () =>
      new Set(
        properties.filter((p) => p.status === "available").map((p) => p.id),
      ),
  );

  const handleAdd = (data: PropertyFormData) => {
    addProperty.mutate(data, { onSuccess: () => setAddOpen(false) });
  };
  const handleEdit = (data: PropertyFormData) => {
    if (!editProp) return;
    updateProperty.mutate(
      { id: editProp.id, data },
      { onSuccess: () => setEditProp(null) },
    );
  };
  const handleDelete = () => {
    if (!deleteProp) return;
    deleteProperty.mutate(deleteProp.id, {
      onSuccess: () => setDeleteProp(null),
    });
  };
  const handleMarkSold = (id: string) => markSold.mutate(id);

  const handleTogglePublish = (p: Property) => {
    const isPublished = publishedIds.has(p.id);
    if (isPublished) {
      unpublishProperty.mutate(p.id, {
        onSuccess: () =>
          setPublishedIds((prev) => {
            const next = new Set(prev);
            next.delete(p.id);
            return next;
          }),
      });
    } else {
      publishProperty.mutate(p.id, {
        onSuccess: () => setPublishedIds((prev) => new Set([...prev, p.id])),
      });
    }
  };

  const publishedCount = publishedIds.size;

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-foreground">
            All Properties ({properties.length})
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            <span className="text-emerald-600 font-medium">
              {publishedCount} published
            </span>
            {" · "}
            <span className="text-muted-foreground">
              {properties.length - publishedCount} unpublished
            </span>
          </p>
        </div>
        <Button
          className="btn-primary gap-2 text-sm"
          onClick={() => setAddOpen(true)}
          data-ocid="btn-add-property"
        >
          <PlusCircle className="w-4 h-4" />
          Add Property
        </Button>
      </div>

      <div
        className="card-glass rounded-xl border border-border/30 overflow-hidden"
        data-ocid="table-properties"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30 border-b border-border/40">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Property
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide hidden md:table-cell">
                  City
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide hidden sm:table-cell">
                  Price
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide hidden lg:table-cell">
                  Type
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Published
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {properties.map((p, i) => {
                const isPublished = publishedIds.has(p.id);
                return (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="hover:bg-muted/20 transition-smooth"
                    data-ocid={`row-property-${p.id}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-muted">
                          <img
                            src={
                              p.images[0] ?? "/assets/images/placeholder.svg"
                            }
                            alt={p.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                "/assets/images/placeholder.svg";
                            }}
                          />
                        </div>
                        <span className="font-medium text-foreground truncate max-w-[140px]">
                          {p.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                      {p.city}
                    </td>
                    <td className="px-4 py-3 font-semibold text-accent hidden sm:table-cell">
                      {p.priceLabel}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="capitalize text-muted-foreground">
                        {p.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        className={`text-xs capitalize ${
                          p.status === "available"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-0"
                            : p.status === "sold"
                              ? "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 border-0"
                              : "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-0"
                        }`}
                      >
                        {p.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={isPublished ? "published" : "unpublished"}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge
                            className={`text-xs flex items-center gap-1 w-fit border-0 ${
                              isPublished
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                                : "bg-muted/60 text-muted-foreground"
                            }`}
                            data-ocid={`badge-published-${p.id}`}
                          >
                            {isPublished ? (
                              <Globe className="w-3 h-3" />
                            ) : (
                              <GlobeLock className="w-3 h-3" />
                            )}
                            {isPublished ? "Published" : "Unpublished"}
                          </Badge>
                        </motion.div>
                      </AnimatePresence>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`text-xs h-7 px-2 ${
                            isPublished
                              ? "text-muted-foreground hover:text-foreground"
                              : "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                          }`}
                          onClick={() => handleTogglePublish(p)}
                          data-ocid={`btn-toggle-publish-${p.id}`}
                        >
                          {isPublished ? "Unpublish" : "Publish"}
                        </Button>
                        {p.status !== "sold" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground"
                            onClick={() => handleMarkSold(p.id)}
                            data-ocid={`btn-mark-sold-${p.id}`}
                          >
                            Sold
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-7 h-7 text-muted-foreground hover:text-foreground"
                          onClick={() => setEditProp(p)}
                          aria-label="Edit property"
                          data-ocid={`btn-edit-${p.id}`}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-7 h-7 text-muted-foreground hover:text-destructive"
                          onClick={() => setDeleteProp(p)}
                          aria-label="Delete property"
                          data-ocid={`btn-delete-${p.id}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {properties.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="empty-properties"
          >
            <Building2 className="w-10 h-10 text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground text-sm">
              No properties yet. Add your first listing.
            </p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {addOpen && (
          <PropertyFormModal
            onSubmit={handleAdd}
            onClose={() => setAddOpen(false)}
            isLoading={addProperty.isPending}
          />
        )}
        {editProp && (
          <PropertyFormModal
            initial={{
              title: editProp.title,
              description: editProp.description,
              price: editProp.price,
              city: editProp.city,
              address: editProp.address,
              sizeSqFt: editProp.sizeSqFt,
              facing: editProp.facing,
              type: editProp.type,
              amenities: editProp.amenities,
              images: editProp.images,
              featured: editProp.featured,
              bedrooms: editProp.bedrooms,
              bathrooms: editProp.bathrooms,
            }}
            onSubmit={handleEdit}
            onClose={() => setEditProp(null)}
            isLoading={updateProperty.isPending}
          />
        )}
        {deleteProp && (
          <DeleteDialog
            propertyTitle={deleteProp.title}
            onConfirm={handleDelete}
            onClose={() => setDeleteProp(null)}
            isLoading={deleteProperty.isPending}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Inquiries Tab ─────────────────────────────────────────────────────────────

function InquiriesTab() {
  const { data: inquiries = [], isLoading } = useInquiries();

  if (isLoading) return <LoadingSpinner size="md" text="Loading inquiries…" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-foreground">
          All Inquiries ({inquiries.length})
        </h3>
        <Badge className="bg-accent/10 text-accent border-none">
          {inquiries.filter((i) => !i.isRead).length} unread
        </Badge>
      </div>
      <div
        className="card-glass rounded-xl border border-border/30 overflow-hidden"
        data-ocid="table-inquiries"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30 border-b border-border/40">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Property
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide hidden sm:table-cell">
                  Phone
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide hidden md:table-cell">
                  Email
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide hidden lg:table-cell">
                  Message
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide hidden md:table-cell">
                  Date
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {inquiries.map((inq, i) => (
                <motion.tr
                  key={inq.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="hover:bg-muted/20 transition-smooth"
                  data-ocid={`row-inquiry-${inq.id}`}
                >
                  <td className="px-4 py-3 font-medium text-foreground max-w-[130px] truncate">
                    {inq.propertyTitle}
                  </td>
                  <td className="px-4 py-3 text-foreground">{inq.name}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                    {inq.phone}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                    {inq.email}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate hidden lg:table-cell">
                    {inq.message}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs hidden md:table-cell">
                    {new Date(Number(inq.createdAt)).toLocaleDateString(
                      "en-IN",
                      { day: "numeric", month: "short" },
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Badge
                      className={`text-xs ${inq.isRead ? "bg-muted/60 text-muted-foreground border-0" : "bg-accent/15 text-accent border-0"}`}
                    >
                      {inq.isRead ? "Read" : "Unread"}
                    </Badge>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {inquiries.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="empty-inquiries"
          >
            <MessageSquare className="w-10 h-10 text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground text-sm">
              No inquiries received yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Visit Requests Tab ────────────────────────────────────────────────────────

function VisitRequestsTab() {
  const { data: visits = [], isLoading } = useVisitRequests();

  if (isLoading)
    return <LoadingSpinner size="md" text="Loading visit requests…" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-foreground">
          Visit Requests ({visits.length})
        </h3>
        <Badge className="bg-accent/10 text-accent border-none">
          {visits.filter((v) => v.status === "pending").length} pending
        </Badge>
      </div>
      <div
        className="card-glass rounded-xl border border-border/30 overflow-hidden"
        data-ocid="table-visit-requests"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30 border-b border-border/40">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Property
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide hidden sm:table-cell">
                  Phone
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide hidden md:table-cell">
                  Preferred Date
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide hidden md:table-cell">
                  Time
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {visits.map((visit, i) => (
                <motion.tr
                  key={visit.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="hover:bg-muted/20 transition-smooth"
                  data-ocid={`row-visit-${visit.id}`}
                >
                  <td className="px-4 py-3 font-medium text-foreground max-w-[130px] truncate">
                    {visit.propertyTitle}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {visit.customerName}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                    {visit.customerPhone}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                    {visit.preferredDate}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                    {visit.preferredTime}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Badge
                      className={`text-xs capitalize ${
                        visit.status === "pending"
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-0"
                          : visit.status === "confirmed"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-0"
                            : visit.status === "cancelled"
                              ? "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 border-0"
                              : "bg-muted/60 text-muted-foreground border-0"
                      }`}
                    >
                      {visit.status}
                    </Badge>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {visits.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="empty-visits"
          >
            <Calendar className="w-10 h-10 text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground text-sm">
              No visit requests yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Dashboard Page ───────────────────────────────────────────────────────

export function DashboardPage() {
  const { isEmployee, isLoggedIn, login } = useAuth();
  const { data: stats, isLoading: statsLoading } = useDashboard();
  const { data: properties = [], isLoading: propsLoading } =
    useEmployeeProperties();
  const [activeTab, setActiveTab] = useState<TabName>("Overview");

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
          <Building2 className="w-8 h-8 text-accent" />
        </div>
        <h2 className="text-heading mb-3">Employee Dashboard</h2>
        <p className="text-muted-foreground text-sm mb-6 max-w-xs">
          Please log in with Internet Identity to access the employee dashboard.
        </p>
        <Button
          onClick={login}
          className="btn-primary gap-2"
          data-ocid="btn-dashboard-login"
        >
          Log in with Internet Identity
        </Button>
      </div>
    );
  }

  if (!isEmployee) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-5">
          <Building2 className="w-8 h-8 text-destructive" />
        </div>
        <h2 className="text-heading mb-3">Access Restricted</h2>
        <p className="text-muted-foreground text-sm mb-6">
          This dashboard is for employees only.
        </p>
        <Link to="/properties">
          <Button variant="outline" data-ocid="btn-goto-properties">
            Browse Properties
          </Button>
        </Link>
      </div>
    );
  }

  if (statsLoading || propsLoading)
    return <LoadingSpinner size="lg" text="Loading dashboard…" fullPage />;

  return (
    <div className="min-h-screen bg-background" data-ocid="page-dashboard">
      <div className="bg-card border-b border-border/50 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-semibold text-xl text-foreground">
              Employee Dashboard
            </h1>
            <p className="text-muted-foreground text-xs mt-0.5">
              Dewan Realtors · {properties.length} total properties
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-accent/10 text-accent border-none text-xs hidden sm:inline-flex">
              Employee
            </Badge>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <nav
            className="flex gap-1 border-b border-transparent -mb-px overflow-x-auto scrollbar-none"
            data-ocid="nav-dashboard-tabs"
          >
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-4 py-2.5 text-sm font-medium border-b-2 transition-smooth whitespace-nowrap ${
                  activeTab === tab
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                data-ocid={`tab-${tab.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === "Overview" && (
              <OverviewTab stats={stats} totalProperties={properties.length} />
            )}
            {activeTab === "Properties" && (
              <PropertiesTab properties={properties} />
            )}
            {activeTab === "Inquiries" && <InquiriesTab />}
            {activeTab === "Visit Requests" && <VisitRequestsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
