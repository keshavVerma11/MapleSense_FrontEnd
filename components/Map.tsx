"use client";

import MapIcon from "./ui/MapIcon";
import type { Tap } from "./types";

type Props = {
  taps: Tap[];
  selectedTapId: string | null;
  onSelectTap: (id: string) => void;
};

export default function Map({ taps, selectedTapId, onSelectTap }: Props) {
  return (
    <div
      style={{
        /* Full-bleed map surface */
        background: "linear-gradient(180deg,#eef7ea,#f8fbef)",
        width: "100%",
        height: "100%",
        position: "relative",
        borderRadius: 0,                 // ← remove inner rounding
        boxShadow: "none",               // ← remove halo that looked like spacing
        overflow: "hidden",
      }}
      aria-label="Maple Grove Map"
    >
      {/* map legend center */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          textAlign: "center",
          color: "#64748b",
          pointerEvents: "none",
        }}
      >
        <MapIcon size={54} muted />
        <div style={{ marginTop: 8, fontWeight: 700, color: "#475569" }}>
          Maple Grove Map
        </div>
        <div style={{ fontSize: 13 }}>
          Interactive map showing maple tap sensor locations and fill levels
        </div>
      </div>

      {/* tools rail */}
      <div
        style={{
          position: "absolute",
          right: 14,
          top: 20,
          display: "grid",
          gap: 10,
          background: "#ffffff",
          borderRadius: 16,
          padding: 8,
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
        aria-hidden
      >
        {["+", "-", "🎯"].map((g, i) => (
          <button
            key={i}
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              border: "1px solid #e2e8f0",
              background: "#f8fafc",
              cursor: "default",
            }}
          >
            <span aria-hidden>{g}</span>
          </button>
        ))}
      </div>

      {/* markers */}
      {taps.map((t) => {
        const isActive = t.id === selectedTapId;

        let labelBg: string;
        let labelColor: string;
        if (t.fillLevelPct > 80) {
          labelBg = "#fee2e2"; labelColor = "#b91c1c";   // red
        } else if (t.fillLevelPct > 50) {
          labelBg = "#fef3c7"; labelColor = "#b45309";   // yellow
        } else {
          labelBg = "#ffffff"; labelColor = "#0f172a";   // normal
        }

        return (
          <button
            key={t.id}
            onClick={() => onSelectTap(t.id)}
            aria-label={`Open details for ${t.name}`}
            style={{
              position: "absolute",
              left: `${t.positionPct.x}%`,
              top: `${t.positionPct.y}%`,
              transform: "translate(-50%,-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            {/* bubble label */}
            <div
              style={{
                transform: "translateY(-18px)",
                background: labelBg,
                color: labelColor,
                border: "1px solid #e2e8f0",
                padding: "6px 10px",
                fontSize: 13,
                borderRadius: 12,
                boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
                whiteSpace: "nowrap",
              }}
            >
              {t.name.split("#")[0].trim()} ({t.fillLevelPct}%)
            </div>

            {/* pin */}
            <div
              style={{
                width: isActive ? 26 : 22,
                height: isActive ? 26 : 22,
                borderRadius: "50%",
                border: "2px solid #065f46",
                background: "#86efac",
                display: "grid",
                placeItems: "center",
                boxShadow: isActive
                  ? "0 0 0 4px rgba(5,150,105,0.25)"
                  : "0 2px 8px rgba(0,0,0,0.18)",
              }}
            >
              <MapIcon size={isActive ? 16 : 14} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
