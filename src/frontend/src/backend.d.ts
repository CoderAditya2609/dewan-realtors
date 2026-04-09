import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface PropertyFilter {
    featured?: boolean;
    propertyType?: PropertyType;
    minSize?: bigint;
    city?: string;
    sold?: boolean;
    maxPrice?: bigint;
    minPrice?: bigint;
    maxSize?: bigint;
    facing?: FacingDirection;
}
export interface VisitRequestPublic {
    id: VisitRequestId;
    status: VisitStatus;
    customerPrincipal: Principal;
    name: string;
    createdAt: Timestamp;
    propertyId: PropertyId;
    email: string;
    message: string;
    preferredDate: string;
    preferredTime: string;
    phone: string;
}
export type VisitRequestId = bigint;
export type Timestamp = bigint;
export interface MonthlyInquiryCount {
    month: string;
    count: bigint;
}
export interface InquiryPublic {
    id: InquiryId;
    name: string;
    createdAt: Timestamp;
    propertyId: PropertyId;
    isRead: boolean;
    email: string;
    message: string;
    phone: string;
}
export interface InquiryInput {
    name: string;
    propertyId: PropertyId;
    email: string;
    message: string;
    phone: string;
}
export interface DashboardStats {
    soldListings: bigint;
    activeListings: bigint;
    totalListings: bigint;
    totalInquiries: bigint;
}
export interface PropertyPublic {
    id: PropertyId;
    title: string;
    featured: boolean;
    propertyType: PropertyType;
    listerId: Principal;
    city: string;
    published: boolean;
    createdAt: Timestamp;
    sold: boolean;
    description: string;
    amenities: Array<string>;
    viewCount: bigint;
    price: bigint;
    facing: FacingDirection;
    sizeSqft: bigint;
    images: Array<ExternalBlob>;
}
export interface VisitRequestInput {
    name: string;
    propertyId: PropertyId;
    email: string;
    message: string;
    preferredDate: string;
    preferredTime: string;
    phone: string;
}
export interface PropertyInput {
    title: string;
    featured: boolean;
    propertyType: PropertyType;
    city: string;
    description: string;
    amenities: Array<string>;
    price: bigint;
    facing: FacingDirection;
    sizeSqft: bigint;
    images: Array<ExternalBlob>;
}
export type InquiryId = bigint;
export type PropertyId = bigint;
export interface PropertyViewCount {
    title: string;
    propertyId: PropertyId;
    viewCount: bigint;
}
export interface UserProfile {
    name: string;
    role: string;
}
export enum FacingDirection {
    southEast = "southEast",
    southWest = "southWest",
    east = "east",
    west = "west",
    northEast = "northEast",
    northWest = "northWest",
    south = "south",
    north = "north"
}
export enum PropertyType {
    studio = "studio",
    commercial = "commercial",
    other = "other",
    villa = "villa",
    flat = "flat",
    penthouse = "penthouse",
    plot = "plot",
    townhouse = "townhouse"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum VisitStatus {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    reviewed = "reviewed",
    confirmed = "confirmed"
}
export interface backendInterface {
    addBookmark(propertyId: PropertyId): Promise<void>;
    addProperty(input: PropertyInput): Promise<PropertyPublic>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProperty(id: PropertyId): Promise<boolean>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCustomerDashboard(): Promise<{
        bookmarkCount: bigint;
    }>;
    getEmployeeDashboard(): Promise<{
        monthlyInquiries: Array<MonthlyInquiryCount>;
        stats: DashboardStats;
        topPropertyViews: Array<PropertyViewCount>;
    }>;
    getInquiry(id: InquiryId): Promise<InquiryPublic | null>;
    getProperty(id: PropertyId): Promise<PropertyPublic | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listBookmarks(): Promise<Array<PropertyId>>;
    listEmployeeProperties(): Promise<Array<PropertyPublic>>;
    listInquiries(): Promise<Array<InquiryPublic>>;
    listInquiriesForProperty(propertyId: PropertyId): Promise<Array<InquiryPublic>>;
    listProperties(filter: PropertyFilter): Promise<Array<PropertyPublic>>;
    listVisitRequests(): Promise<Array<VisitRequestPublic>>;
    listVisitRequestsForCustomer(): Promise<Array<VisitRequestPublic>>;
    markInquiryRead(id: InquiryId): Promise<boolean>;
    markPropertySold(id: PropertyId, sold: boolean): Promise<boolean>;
    publishProperty(id: PropertyId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    removeBookmark(propertyId: PropertyId): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitInquiry(input: InquiryInput): Promise<InquiryPublic>;
    submitVisitRequest(input: VisitRequestInput): Promise<VisitRequestPublic>;
    unpublishProperty(id: PropertyId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateProperty(id: PropertyId, input: PropertyInput): Promise<PropertyPublic | null>;
    updateVisitRequestStatus(id: VisitRequestId, status: VisitStatus): Promise<boolean>;
}
