import React from "react";

export default function Badge({ tone = "slate", children }: { tone?: "green" | "red" | "amber" | "slate"; children: React.ReactNode }) {
  const tones: Record<string, { bg: string; text: string; border: string }> = {
    green: { bg: "#ecfdf5", text: "#047857", border: "#a7f3d0" },
    red: { bg: "#fef2f2", text: "#b91c1c", border: "#fecaca" },
    amber: { bg: "#fffbeb", text: "#92400e", border: "#fde68a" },
    slate: { bg: "#f1f5f9", text: "#334155", border: "#e2e8f0" },
  };
  const { bg, text, border } = tones[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 8px",
        borderRadius: 9999,
        border: `1px solid ${border}`,
        background: bg,
        color: text,
        fontSize: 12,
        fontWeight: 600,
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  );
}