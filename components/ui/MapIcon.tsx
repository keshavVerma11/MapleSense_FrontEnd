"use client";

export default function MapIcon({ size = 14, muted = false }: { size?: number; muted?: boolean }) {
  const stroke = muted ? "#94a3b8" : "#065f46";
  const fill = muted ? "none" : "#065f46";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 22s7-7.582 7-12a7 7 0 1 0-14 0c0 4.418 7 12 7 12Z"
        stroke={stroke}
        strokeWidth="1.5"
        fill={muted ? "none" : "#86efac"}
      />
      <circle cx="12" cy="10" r="2.5" fill={fill} />
    </svg>
  );
}
