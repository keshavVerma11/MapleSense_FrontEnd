"use client";

import { CSSProperties } from "react";
import type { Tap } from "./types";
import LeftBarIcon from "./ui/LeftBarIcon";

type Props = {
  taps: Tap[];
  selectedTapId: string | null;
  onSelectTap: (id: string) => void;
};

export default function LeftNavBar({ taps, selectedTapId, onSelectTap }: Props) {
  return (
    <aside
      aria-label="Maple Tap Sensors"
      style={{
        background: "#ffffffff",
        borderRadius: 20,
        boxShadow: "0 10px 28px rgba(15,23,42,0.06)",
        padding: 16,
        height: "calc(100vh - 110px)",
        position: "sticky",
        top: 70,
        overflow: "hidden",
      }}
    >
      <h2
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: "#0f172a",
          margin: "4px 8px 2px",
        }}
      >
        Maple Tap Sensors
      </h2>
      <p style={{ color: "#64748b", margin: "0 8px 12px" }}>
        Select a maple tap to view bucket fill level and battery status
      </p>

      <div style={{ overflow: "auto", height: "calc(100% - 64px)", paddingRight: 6 }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
          {taps.map((t) => (
            <li key={t.id}>
              <TapCard
                tap={t}
                active={selectedTapId === t.id}
                onClick={() => onSelectTap(t.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function TapCard({
  tap,
  active,
  onClick,
}: {
  tap: Tap;
  active: boolean;
  onClick: () => void;
}) {
  const pill = (text: string, color: string, bg: string) => (
    <span
      style={{
        padding: "2px 8px",
        borderRadius: 9999,
        fontSize: 12,
        fontWeight: 700,
        color,
        background: bg,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );

  const statusPill =
    tap.status === "active"
      ? pill("active", "#166534", "#dcfce7")
      : tap.status === "warning"
      ? pill("warning", "#92400e", "#fef3c7")
      : pill("idle", "#334155", "#e2e8f0");

  const cardStyle: CSSProperties = {
    cursor: "pointer",
    display: "grid",
    gap: 10,
    padding: 14,
    borderRadius: 16,
    border: "1px solid #e2e8f0",
    background: active ? "#f8fafc" : "#ffffff",
    boxShadow: active ? "inset 0 0 0 2px #93c5fd" : "0 1px 0 rgba(0,0,0,0.02)",
    width: "100%",                 // fill container
    boxSizing: "border-box",
  };

  return (
    <button
      onClick={onClick}
      style={{ all: "unset", display: "block", width: "100%", boxSizing: "border-box" }}
    >
      <div style={cardStyle}>
        {/* Header row: icon | name/grove | status pill (top-right, never wraps) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "24px 1fr auto",
            columnGap: 10,
            alignItems: "start",
          }}
        >
          <LeftBarIcon />
          <div style={{ minWidth: 0 }}>
            <strong
                title={tap.name}                     // ← add this
                aria-label={tap.name}                // ← a11y
                style={{
                    color: "#0f172a",
                    display: "block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
              }}
            >
              {tap.name}
            </strong>
            <div
                title={tap.grove}                    // ← add this if you like
                style={{
                    color: "#64748b",
                    fontSize: 14,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
              }}
            >
              {tap.grove}
            </div>
          </div>
          <div style={{ justifySelf: "end" }}>{statusPill}</div>
        </div>

        {/* Fill level */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
            <span style={{ color: "#475569" }}>Fill Level</span>
            {(() => {
              const p = tap.fillLevelPct;
              const textColor = p > 80 ? "#b91c1c" : p > 50 ? "#b45309" : "#10b981";
              return <span style={{ fontWeight: 700, color: textColor }}>{p}%</span>;
            })()}
          </div>
          {(() => {
            const p = tap.fillLevelPct;
            const barFill = p > 80 ? "#ef4444" : p > 50 ? "#f59e0b" : "#10b981";
            return <ProgressBar value={p} track="#e5e7eb" fill={barFill} />;
          })()}
        </div>

        {/* Battery */}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
          <span style={{ color: "#475569" }}>Battery</span>
          <span style={{ fontWeight: 700, color: "#334155" }}>{tap.batteryPct}%</span>
        </div>
      </div>
    </button>
  );
}

function ProgressBar({
  value,
  track,
  fill,
}: {
  value: number;
  track: string;
  fill: string;
}) {
  return (
    <div
      style={{
        height: 6,
        background: track,
        borderRadius: 9999,
        marginTop: 6,
        position: "relative",
      }}
      aria-hidden
    >
      <div
        style={{
          width: `${Math.max(0, Math.min(100, value))}%`,
          height: "100%",
          background: fill,
          borderRadius: 9999,
          boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.12)",
        }}
      />
    </div>
  );
}
