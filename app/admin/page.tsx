"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import UserList from "@/components/admin/UserList";
import DetailTables from "@/components/admin/DetailTables";
import AdminActions from "@/components/admin/AdminActions";
import type { User } from "@/components/admin/types";
import api from "@/src/lib/api";

/** Backend response types */
type ApiUser = {
  user_id: string;
  username: string;
  email: string;
  role: string; // "admin" | "user"
  active: boolean;
  created_at: string;
  updated_at: string;
};

type ApiUsersResponse = { users: ApiUser[] };

type ApiPiItem = {
  pi_id: string;
  user_id: string;
  created_at: string; // ISO
};

type ApiPisResponse = { items: ApiPiItem[] };

/** Map API → UI */
function mapApiUser(u: ApiUser): User {
  return {
    id: u.user_id,
    name: u.username || "(no username)",
    email: u.email,
    role: u.role === "admin" ? "admin" : "producer", // adjust if your UI supports "user"
    pis: [],
    sensors: [],
  };
}

function mapApiPi(p: ApiPiItem) {
  return {
    id: p.pi_id,
    name: p.pi_id, // no "name" in API, show id
    location: "—",
    status: "online", // placeholder until your API provides status
    lastSeen: new Date(p.created_at).toISOString().replace("T", " ").replace("Z", ""),
  };
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [loadingUsers, setLoadingUsers] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);

  const [pisByUser, setPisByUser] = useState<Record<string, ReturnType<typeof mapApiPi>[]>>({});
  const [loadingPisFor, setLoadingPisFor] = useState<string | null>(null);
  const [pisError, setPisError] = useState<string | null>(null);

  // Load users
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoadingUsers(true);
      setUsersError(null);
      try {
        const { data } = await api.get<ApiUsersResponse>("/api/users");
        if (cancelled) return;
        const mapped = data.users.map(mapApiUser);
        setUsers(mapped);
        setSelectedUserId((prev) => prev ?? mapped[0]?.id ?? null);
      } catch (e: any) {
        if (!cancelled) setUsersError(e?.message || "Failed to load users");
      } finally {
        if (!cancelled) setLoadingUsers(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Load PIs for selected user (and cache)
  useEffect(() => {
    if (!selectedUserId) return;
    if (pisByUser[selectedUserId]) return; // cached

    let cancelled = false;

    (async () => {
      setLoadingPisFor(selectedUserId);
      setPisError(null);
      try {
        const { data } = await api.get<ApiPisResponse>("/pis");
        if (cancelled) return;

        const filtered = data.items
          .filter((p) => p.user_id === selectedUserId)
          .map(mapApiPi);

        setPisByUser((prev) => ({ ...prev, [selectedUserId]: filtered }));
      } catch (e: any) {
        if (!cancelled) setPisError(e?.message || "Failed to load devices");
      } finally {
        if (!cancelled) setLoadingPisFor(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedUserId, pisByUser]);

  // Inject the user’s PIs before handing to DetailTables
  const selectedUser = useMemo(() => {
    const base = users.find((u) => u.id === selectedUserId) || null;
    if (!base) return null;
    return { ...base, pis: pisByUser[selectedUserId ?? ""] ?? [] } as User;
  }, [users, selectedUserId, pisByUser]);

  return (
    <main style={{ minHeight: "100svh", background: "#f1f5f9" }}>
      <Header />
      <section style={{ maxWidth: 1120, margin: "16px auto", padding: "0 16px", boxSizing: "border-box" }}>
        <div style={{ display: "grid", gridTemplateColumns: "300px minmax(0,1fr)", gap: 16 }}>
          {/* LEFT: Users */}
          <div>
            {loadingUsers ? (
              <div style={{ border: "1px solid #e2e8f0", borderRadius: 16, padding: 12, background: "#fff" }}>
                Loading users…
              </div>
            ) : usersError ? (
              <div
                style={{
                  border: "1px solid #fecaca",
                  borderRadius: 16,
                  padding: 12,
                  background: "#fff1f2",
                  color: "#991b1b",
                }}
              >
                {usersError}
              </div>
            ) : (
              <UserList users={users} selectedUserId={selectedUserId} onSelect={setSelectedUserId} />
            )}
          </div>

          {/* RIGHT: Details */}
          <div
            style={{
              position: "relative",
              border: "1px solid #e2e8f0",
              borderRadius: 20,
              background: "#fff",
              boxShadow: "0 10px 28px rgba(15,23,42,0.06)",
              padding: 16,
              minHeight: 480,
            }}
          >
            {loadingPisFor === selectedUserId && (
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>Loading devices…</div>
            )}
            {pisError && (
              <div
                style={{
                  border: "1px solid #fecaca",
                  borderRadius: 12,
                  padding: 8,
                  background: "#fff1f2",
                  color: "#991b1b",
                  marginBottom: 8,
                }}
              >
                {pisError}
              </div>
            )}

            <DetailTables user={selectedUser} />
            <AdminActions />
          </div>
        </div>
      </section>
    </main>
  );
}
