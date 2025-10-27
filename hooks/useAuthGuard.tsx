"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Role = "user" | "admin" | string;

/**
 * A reusable authentication guard for protecting pages.
 * Redirects to /login if token is missing or expired.
 * If a role is provided, redirects unauthorized users away.
 */
export function useAuthGuard(requiredRole?: Role) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ms_auth");
      if (!raw) {
        router.replace("/login");
        return;
      }

      const { access_token, expires_at, role } = JSON.parse(raw);

      if (!access_token || (expires_at && Date.now() / 1000 > expires_at)) {
        localStorage.removeItem("ms_auth");
        router.replace("/login");
        return;
      }

      if (
        requiredRole &&
        role?.toLowerCase() !== requiredRole.toLowerCase()
      ) {
        router.replace(role === "user" ? "/dashboard" : "/login");
        return;
      }

      setAuthorized(true);
    } catch {
      router.replace("/login");
    }
  }, [requiredRole, router]);

  return authorized;
}