import { UserRole as BackendUserRole, createActor } from "@/backend";
import type { UserRole } from "@/types";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface AuthUser {
  principalId: string;
  role: UserRole;
  displayName: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  role: UserRole;
  isEmployee: boolean;
  isCustomer: boolean;
  isLoggedIn: boolean;
  isRoleLoading: boolean;
  login: () => void;
  logout: () => void;
  setRole: (role: "employee" | "customer") => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function backendRoleToAppRole(backendRole: BackendUserRole): UserRole {
  if (backendRole === BackendUserRole.admin) return "employee";
  if (backendRole === BackendUserRole.user) return "customer";
  return "customer"; // guest → default to customer for logged-in users
}

function appRoleToBackendRole(
  appRole: "employee" | "customer",
): BackendUserRole {
  return appRole === "employee" ? BackendUserRole.admin : BackendUserRole.user;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { loginStatus, login, clear, identity } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor(createActor);

  const [selectedRole, setSelectedRole] = useState<UserRole>("public");
  const [isRoleLoading, setIsRoleLoading] = useState(false);

  // Track the pending role chosen before/during login so we can persist it once actor is ready
  const pendingRoleRef = useRef<"employee" | "customer" | null>(null);

  const isLoggedIn = loginStatus === "success" && identity !== null;
  const principalId = identity?.getPrincipal().toString() ?? "";
  const identityRef = useRef(identity);
  identityRef.current = identity;

  // When actor becomes available after login, sync role with backend
  useEffect(() => {
    if (!isLoggedIn || !actor || actorFetching) return;

    let cancelled = false;
    setIsRoleLoading(true);

    const syncRole = async () => {
      try {
        const pending = pendingRoleRef.current;

        if (pending) {
          // User explicitly chose a role before/during login — persist it
          const backendRole = appRoleToBackendRole(pending);
          const principal = identityRef.current?.getPrincipal();
          if (!principal) {
            console.error("[Auth] Cannot assign role: principal unavailable");
            return;
          }
          try {
            await actor.assignCallerUserRole(principal, backendRole);
          } catch (err) {
            console.error("[Auth] assignCallerUserRole failed:", err);
            // Still set the role locally so UI is not stuck
          }
          if (!cancelled) {
            setSelectedRole(pending);
            pendingRoleRef.current = null;
          }
        } else {
          // Returning user — fetch their persisted role from the backend
          let backendRole: BackendUserRole;
          try {
            backendRole = await actor.getCallerUserRole();
          } catch (err) {
            console.error("[Auth] getCallerUserRole failed:", err);
            // Fall back to customer on error so user is not stuck
            if (!cancelled) setSelectedRole("customer");
            return;
          }

          if (!cancelled) {
            if (backendRole === BackendUserRole.guest) {
              // New user with no role yet — default to customer
              const principal = identityRef.current?.getPrincipal();
              if (principal) {
                try {
                  await actor.assignCallerUserRole(
                    principal,
                    BackendUserRole.user,
                  );
                } catch (err) {
                  console.error(
                    "[Auth] assignCallerUserRole (default) failed:",
                    err,
                  );
                }
              }
              if (!cancelled) setSelectedRole("customer");
            } else {
              const appRole = backendRoleToAppRole(backendRole);
              if (!cancelled) setSelectedRole(appRole);
            }
          }
        }
      } finally {
        if (!cancelled) setIsRoleLoading(false);
      }
    };

    void syncRole();
    return () => {
      cancelled = true;
    };
  }, [isLoggedIn, actor, actorFetching]);

  // Clear role on logout
  useEffect(() => {
    if (!isLoggedIn) {
      setSelectedRole("public");
      pendingRoleRef.current = null;
    }
  }, [isLoggedIn]);

  const handleSetRole = useCallback((r: "employee" | "customer") => {
    setSelectedRole(r);
    pendingRoleRef.current = r;
  }, []);

  const handleLogout = useCallback(() => {
    clear();
    setSelectedRole("public");
    pendingRoleRef.current = null;
  }, [clear]);

  const role: UserRole = isLoggedIn
    ? selectedRole === "public"
      ? "customer"
      : selectedRole
    : "public";

  const user: AuthUser | null = isLoggedIn
    ? {
        principalId,
        role,
        displayName: `${principalId.slice(0, 6)}...${principalId.slice(-4)}`,
      }
    : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isEmployee: role === "employee",
        isCustomer: role === "customer",
        isLoggedIn,
        isRoleLoading,
        login,
        logout: handleLogout,
        setRole: handleSetRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
