// ======================= components/admin/UserList.tsx =======================
import React from "react";
import type { User } from "./types";
import Badge from "./Badge";

export default function UserList({ users, selectedUserId, onSelect }: { users: User[]; selectedUserId: string | null; onSelect: (id: string) => void; }) {
  return (
    <aside
      style={{
        height: "72vh",
        overflow: "auto",
        border: "1px solid #e2e8f0",
        borderRadius: 20,
        background: "#fff",
        boxShadow: "0 10px 28px rgba(15,23,42,0.06)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0 }}>Users</h2>
        <span style={{ fontSize: 12, color: "#64748b" }}>{users.length} total</span>
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {users.map((u) => {
          const isActive = u.id === selectedUserId;
          return (
            <li key={u.id}>
              <button
                onClick={() => onSelect(u.id)}
                aria-current={isActive ? "true" : undefined}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 16px",
                  border: 0,
                  background: isActive ? "#f7fee7" : "transparent",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span aria-hidden style={{ marginTop: 4, width: 10, height: 10, borderRadius: 9999, background: isActive ? "#65a30d" : "#cbd5e1" }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <p style={{ margin: 0, fontWeight: 600, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.name}</p>
                      <Badge tone={u.role === "admin" ? "slate" : "green"}>{u.role}</Badge>
                    </div>
                    <p style={{ margin: 0, color: "#64748b", fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.email}</p>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}