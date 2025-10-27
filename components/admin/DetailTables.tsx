import React from "react";
import type { User } from "./types";
import Badge from "./Badge";

function statusTone(status: string): "green" | "red" | "amber" | "slate" {
  switch (status) {
    case "online":
    case "active":
      return "green";
    case "offline":
    case "fault":
      return "red";
    case "sleep":
    case "inactive":
      return "amber";
    default:
      return "slate";
  }
}

export default function DetailTables({ user }: { user: User | null }) {
  if (!user) {
    return <div style={{ color: "#64748b" }}>Select a user to view Raspberry Pi and sensor details.</div>;
  }

  return (
    <div style={{ display: "grid", gap: 24 }}>
      {/* Summary */}
      <section style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#0f172a" }}>{user.name}</h2>
          <p style={{ margin: 0, color: "#64748b", fontSize: 14 }}>{user.email}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Badge tone="slate">User ID: {user.id}</Badge>
          <Badge tone="green">PIs: {user.pis.length}</Badge>
          <Badge tone="amber">Sensors: {user.sensors.length}</Badge>
        </div>
      </section>

      {/* Pis */}
      <section>
        <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Raspberry Pis</h3>
        <div style={{ overflow: "auto", border: "1px solid #e2e8f0", borderRadius: 16 }}>
          <table style={{ width: "100%", fontSize: 14, borderCollapse: "separate", borderSpacing: 0 }}>
            <thead>
              <tr style={{ background: "#f8fafc", color: "#475569" }}>
                {['ID','Name','Location','Status','Last Seen'].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {user.pis.map((pi, idx) => (
                <tr key={pi.id} style={{ background: idx % 2 ? "#ffffff" : "#fcfcfd" }}>
                  <td style={{ padding: "10px 12px", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12 }}>{pi.id}</td>
                  <td style={{ padding: "10px 12px" }}>{pi.name}</td>
                  <td style={{ padding: "10px 12px" }}>{pi.location}</td>
                  <td style={{ padding: "10px 12px" }}><Badge tone={statusTone(pi.status)}>{pi.status}</Badge></td>
                  <td style={{ padding: "10px 12px", color: "#64748b" }}>{pi.lastSeen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sensors */}
      <section>
        <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Sensors</h3>
        <div style={{ overflow: "auto", border: "1px solid #e2e8f0", borderRadius: 16 }}>
          <table style={{ width: "100%", fontSize: 14, borderCollapse: "separate", borderSpacing: 0 }}>
            <thead>
              <tr style={{ background: "#f8fafc", color: "#475569" }}>
                {['ID','Type','Status','Attached Pi','Last Reading'].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {user.sensors.map((s, idx) => (
                <tr key={s.id} style={{ background: idx % 2 ? "#ffffff" : "#fcfcfd" }}>
                  <td style={{ padding: "10px 12px", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12 }}>{s.id}</td>
                  <td style={{ padding: "10px 12px", textTransform: "uppercase", letterSpacing: 0.5 }}>{s.type}</td>
                  <td style={{ padding: "10px 12px" }}><Badge tone={statusTone(s.status)}>{s.status}</Badge></td>
                  <td style={{ padding: "10px 12px", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12 }}>{s.attachedPiId}</td>
                  <td style={{ padding: "10px 12px", color: "#64748b" }}>{s.lastReading}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
