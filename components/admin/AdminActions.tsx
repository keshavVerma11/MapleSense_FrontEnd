// ======================= components/admin/AdminActions.tsx =======================
import React from "react";

export default function AdminActions() {
  const buttonStyle: React.CSSProperties = {
    borderRadius: 16,
    padding: "10px 14px",
    background: "#10b981",
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
    border: "1px solid #bbf7d0",
    boxShadow: "0 6px 18px rgba(16,185,129,0.25)",
    cursor: "pointer",
  };
  return (
    <div style={{ position: "fixed", right: 16, bottom: 16, display: "flex", flexDirection: "column", gap: 8 }}>
      <button aria-label="add-user" title="Add User" style={buttonStyle} onClick={() => {}}>Add User</button>
      <button aria-label="add-pi" title="Add Raspberry Pi" style={buttonStyle} onClick={() => {}}>Add Raspberry Pi</button>
      <button aria-label="add-sensor" title="Add Sensor" style={buttonStyle} onClick={() => {}}>Add Sensor</button>
    </div>
  );
}