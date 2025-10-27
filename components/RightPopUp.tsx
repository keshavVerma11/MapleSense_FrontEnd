"use client";

import { CSSProperties, useEffect } from "react";
import type { Tap } from "./types";
import LeftBarIcon from "./ui/LeftBarIcon";

type Props = {
  tap: Tap | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function RightPopUp({ tap, isOpen, onClose }: Props) {
  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      {/* overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: isOpen ? "rgba(2,6,23,0.40)" : "transparent",
          transition: "background 140ms ease",
          pointerEvents: isOpen ? "auto" : "none",
        }}
        aria-hidden
      />

      {/* panel */}
      <aside
        role="dialog"
        aria-label={tap ? tap.name : "Tap details"}
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          width: 420,
          maxWidth: "92vw",
          height: "100vh",
          background: "#ffffff",
          boxShadow: "-10px 0 32px rgba(2,6,23,0.25)",
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          transform: `translateX(${isOpen ? "0" : "100%"})`,
          transition: "transform 200ms ease",
          display: "grid",
          gridTemplateRows: "auto 1fr",
        }}
      >
        <div style={{ padding: 18, borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <LeftBarIcon />
            <div>
              <div style={{ fontWeight: 800, color: "#0f172a" }}>
                {tap?.name ?? "—"}
              </div>
              <div style={{ color: "#94a3b8", fontSize: 12 }}>
                Real-time maple sap collection data
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                marginLeft: "auto",
                width: 32,
                height: 32,
                borderRadius: 10,
                border: "1px solid #e2e8f0",
                background: "#f8fafc",
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              ×
            </button>
          </div>
        </div>

        <div style={{ padding: 16, overflow: "auto", display: "grid", gap: 14 }}>
          <Section title="Status">
            <Row icon="📍" label={tap?.grove ?? "—"} />
            <Row icon="🕒" label={`Last updated: ${tap?.lastUpdatedMins ?? "—"} minute(s) ago`} />
            <Pill status={tap?.status} />
          </Section>
            <Section title="Bucket Fill Level" highlight>
            {(() => {
                const p = tap?.fillLevelPct ?? 0;

                // 0–50: green, 50–80: yellow/amber, >80: red
                const statColor = p > 80 ? "#b91c1c" : p > 50 ? "#b45309" : "#10b981";
                const barColor  = p > 80 ? "#ef4444" : p > 50 ? "#f59e0b" : "#10b981";

                return (
                <>
                    <StatBig value={p} color={statColor} />
                    <Bar value={p} color={barColor} />
                </>
                );
            })()}
            </Section>
          <Section title="Battery Level">
            <StatBig value={tap?.batteryPct ?? 0} color="#0f172a" />
            <div style={{ color: "#64748b", fontSize: 13, marginTop: 6 }}>
              {batteryHealth(tap?.batteryPct ?? 0)}
            </div>
          </Section>
        </div>
      </aside>
    </>
  );
}

function Section({
  title,
  children,
  highlight,
}: {
  title: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <section
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: 14,
        boxShadow: highlight ? "inset 0 0 0 2px #eab30822" : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <LeftBarIcon small />
        <strong style={{ color: "#0f172a" }}>{title}</strong>
      </div>
      {children}
    </section>
  );
}

function Row({ icon, label }: { icon: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#334155", fontSize: 14 }}>
      <span aria-hidden>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function Pill({ status }: { status?: "active" | "idle" | "warning" }) {
  const map: Record<string, { fg: string; bg: string; text: string }> = {
    active: { fg: "#166534", bg: "#dcfce7", text: "active" },
    warning: { fg: "#92400e", bg: "#fef3c7", text: "warning" },
    idle: { fg: "#334155", bg: "#e2e8f0", text: "idle" },
  };
  const s = status ? map[status] : map.idle;
  return (
    <div
      style={{
        marginTop: 8,
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: 9999,
        background: s.bg,
        color: s.fg,
        fontWeight: 800,
        fontSize: 12,
      }}
    >
      {s.text}
    </div>
  );
}

function StatBig({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ fontSize: 36, fontWeight: 900, color }}>{value}%</div>
  );
}

function Bar({ value, color }: { value: number; color: string }) {
  return (
    <div
      style={{
        height: 8,
        borderRadius: 9999,
        background: "#e5e7eb",
        marginTop: 10,
      }}
    >
      <div
        style={{
          width: `${Math.max(0, Math.min(100, value))}%`,
          height: "100%",
          background: color,
          borderRadius: 9999,
        }}
      />
    </div>
  );
}

function batteryHealth(pct: number) {
  if (pct >= 80) return "Good";
  if (pct >= 40) return "Fair";
  return "Low — consider replacing soon";
}
