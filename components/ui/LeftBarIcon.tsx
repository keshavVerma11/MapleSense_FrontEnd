"use client";

export default function LeftBarIcon({ small = false }: { small?: boolean }) {
  const s = small ? 16 : 18;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="7" width="18" height="12" rx="3" ry="3" fill="#e5e7eb" stroke="#cbd5e1" />
      <rect x="6" y="10" width="12" height="2" rx="1" fill="#94a3b8" />
      <rect x="6" y="13.5" width="8" height="2" rx="1" fill="#94a3b8" />
    </svg>
  );
}
