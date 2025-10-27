"use client";

type WeatherProps = {
  tempC?: number;          // e.g., 24
  highC?: number;          // e.g., 28
  lowC?: number;           // e.g., 18
  humidityPct?: number;    // e.g., 68
  windKmh?: number;        // e.g., 12
  windDir?: string;        // e.g., "NW"
  condition?: string;      // e.g., "Partly Sunny"
  updatedMinsAgo?: number; // e.g., 5
};

export default function WeatherBar({
  tempC = 69,
  highC = 78,
  lowC = 62,
  humidityPct = 68,
  windKmh = 12,
  windDir = "NW",
  condition = "Partly Sunny",
  updatedMinsAgo = 5,
}: WeatherProps) {
  return (
    <section
      role="region"
      aria-label="Weather Conditions"
      style={{
        width: "100%",
        boxSizing: "border-box",
        background: "#ffffffff",
        borderRadius: 16,
        boxShadow: "0 10px 28px rgba(15,23,42,0.06)",
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",           // responsive wrapping
        columnGap: 22,
        rowGap: 8,
      }}

    // style={{
    //     background: "#ffffff",
    //     borderRadius: 20,
    //     boxShadow: "0 10px 28px rgba(15,23,42,0.06)",
    //     padding: 16,
    //     height: "calc(100vh - 110px)",
    //     position: "sticky",
    //     top: 70,
    //     overflow: "hidden",
    // }}
    >
      <strong style={{ color: "#0f172a", fontWeight: 800 }}>Weather Conditions</strong>

      {/* flexible spacer pushes stats to the right on wide screens */}
      <div style={{ flex: 1, minWidth: 8 }} />

      <Stat icon="🌡️" label={`${tempC}°F`} sub={`H: ${highC}°  L: ${lowC}°`} />
      <Divider />
      <Stat icon="💧" label={`${humidityPct}%`} sub="Humidity" />
      <Divider />
      <Stat icon="🌬️" label={`${windKmh} km/h`} sub={`${windDir} Wind`} />
      <Divider />
      <Stat icon="🌤️" label={condition} sub={`Updated ${updatedMinsAgo} min ago`} />
    </section>
  );
}

function Stat({ icon, label, sub }: { icon: string; label: string; sub: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
      <span style={{ fontSize: 18 }} aria-hidden>
        {icon}
      </span>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 800, color: "#0f172a", lineHeight: 1, whiteSpace: "nowrap" }}>
          {label}
        </div>
        <div
          style={{
            color: "#64748b",
            fontSize: 12,
            lineHeight: 1.1,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
          title={sub}
        >
          {sub}
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        width: 1,
        height: 28,
        background: "#000000ff",
      }}
      aria-hidden
    />
  );
}
