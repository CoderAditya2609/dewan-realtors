// ─── User & Auth ─────────────────────────────────────────────────────────────

export type UserRole = "employee" | "customer" | "public";

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role?: UserRole;
  createdAt?: bigint;
}

// ─── Property ────────────────────────────────────────────────────────────────

export type PropertyType =
  | "flat"
  | "plot"
  | "villa"
  | "commercial"
  | "penthouse"
  | "studio"
  | "townhouse"
  | "other";

export type FacingDirection =
  | "north"
  | "south"
  | "east"
  | "west"
  | "north-east"
  | "north-west"
  | "south-east"
  | "south-west";

export type PropertyStatus = "available" | "sold" | "reserved";

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  priceLabel: string; // e.g. "₹1.2 Cr"
  city: string;
  address: string;
  latitude?: number;
  longitude?: number;
  sizeSqFt: number;
  facing: FacingDirection;
  type: PropertyType;
  amenities: string[];
  images: string[];
  featured: boolean;
  status: PropertyStatus;
  published?: boolean;
  listerId?: string;
  bedrooms?: number;
  bathrooms?: number;
  createdAt: bigint;
  updatedAt: bigint;
  addedBy: string;
  views: number;
}

export interface PropertyFormData {
  title: string;
  description: string;
  price: number;
  city: string;
  address: string;
  latitude?: number;
  longitude?: number;
  sizeSqFt: number;
  facing: FacingDirection;
  type: PropertyType;
  amenities: string[];
  images: string[];
  featured: boolean;
  bedrooms?: number;
  bathrooms?: number;
}

// ─── Filters ─────────────────────────────────────────────────────────────────

export interface PropertyFilter {
  city?: string;
  type?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  minSize?: number;
  maxSize?: number;
  facing?: FacingDirection;
  status?: PropertyStatus;
  featured?: boolean;
  search?: string;
}

// ─── Inquiry ─────────────────────────────────────────────────────────────────

export interface Inquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: bigint;
  isRead: boolean;
}

export interface InquiryFormData {
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

// ─── Visit Request ────────────────────────────────────────────────────────────

export type VisitStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface VisitRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: VisitStatus;
  createdAt: bigint;
}

export interface VisitRequestFormData {
  propertyId: string;
  customerName: string;
  customerPhone: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalListings: number;
  activeListings: number;
  soldListings: number;
  publishedListings?: number;
  unpublishedListings?: number;
  totalInquiries: number;
  totalVisitRequests: number;
  monthlyInquiries: MonthlyData[];
  propertyTypeBreakdown: TypeBreakdown[];
}

export interface MonthlyData {
  month: string;
  inquiries: number;
  views: number;
}

export interface TypeBreakdown {
  type: PropertyType;
  count: number;
}

// ─── Comparison ──────────────────────────────────────────────────────────────

export const MAX_COMPARE = 4;
