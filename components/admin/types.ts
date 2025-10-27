// Project structure (suggested)
// ├─ app/admin/page.tsx
// ├─ components/Header.tsx           (already exists; you provided)
// ├─ components/admin/UserList.tsx
// ├─ components/admin/DetailTables.tsx
// ├─ components/admin/AdminActions.tsx
// ├─ components/admin/Badge.tsx
// └─ components/admin/types.ts

// ======================= components/admin/types.ts =======================
export type Pi = {
  id: string;
  name: string;
  location: string;
  status: "online" | "offline" | "sleep";
  lastSeen: string;
};

export type Sensor = {
  id: string;
  type: "temp" | "pressure" | "flow" | "humidity";
  status: "active" | "inactive" | "fault";
  attachedPiId: string;
  lastReading: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "producer" | "viewer";
  pis: Pi[];
  sensors: Sensor[];
};