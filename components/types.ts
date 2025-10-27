export type TapStatus = "active" | "idle" | "warning";

export type Tap = {
  id: string;
  name: string;
  grove: string;
  status: TapStatus;
  fillLevelPct: number;   // 0..100
  batteryPct: number;     // 0..100
  lastUpdatedMins: number;
  positionPct: { x: number; y: number }; // relative position on map
};
