import { Layout } from "@/components/layout/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { AuthProvider } from "@/hooks/use-auth";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// ─── Lazy-loaded pages ────────────────────────────────────────────────────────
const HomePage = lazy(() =>
  import("@/pages/Home").then((m) => ({ default: m.HomePage })),
);
const PropertiesPage = lazy(() =>
  import("@/pages/Properties").then((m) => ({ default: m.PropertiesPage })),
);
const PropertyDetailPage = lazy(() =>
  import("@/pages/PropertyDetail").then((m) => ({
    default: m.PropertyDetailPage,
  })),
);
const DashboardPage = lazy(() =>
  import("@/pages/Dashboard").then((m) => ({ default: m.DashboardPage })),
);
const SavedPage = lazy(() =>
  import("@/pages/Saved").then((m) => ({ default: m.SavedPage })),
);
const ComparePage = lazy(() =>
  import("@/pages/Compare").then((m) => ({ default: m.ComparePage })),
);
const LoginPage = lazy(() =>
  import("@/pages/auth/Login").then((m) => ({ default: m.LoginPage })),
);
const SignupPage = lazy(() =>
  import("@/pages/auth/Signup").then((m) => ({ default: m.SignupPage })),
);

// ─── Page wrapper ─────────────────────────────────────────────────────────────
function PageSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingSpinner size="lg" text="Loading…" fullPage />}>
      {children}
    </Suspense>
  );
}

// ─── Routes ───────────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <PageSuspense>
      <HomePage />
    </PageSuspense>
  ),
});

const propertiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties",
  component: () => (
    <PageSuspense>
      <PropertiesPage />
    </PageSuspense>
  ),
});

const propertyDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/$id",
  component: () => (
    <PageSuspense>
      <PropertyDetailPage />
    </PageSuspense>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <PageSuspense>
      <DashboardPage />
    </PageSuspense>
  ),
});

const savedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/saved",
  component: () => (
    <PageSuspense>
      <SavedPage />
    </PageSuspense>
  ),
});

const compareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/compare",
  component: () => (
    <PageSuspense>
      <ComparePage />
    </PageSuspense>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/login",
  component: () => (
    <PageSuspense>
      <LoginPage />
    </PageSuspense>
  ),
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/signup",
  component: () => (
    <PageSuspense>
      <SignupPage />
    </PageSuspense>
  ),
});

// ─── Router ───────────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  homeRoute,
  propertiesRoute,
  propertyDetailRoute,
  dashboardRoute,
  savedRoute,
  compareRoute,
  loginRoute,
  signupRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
