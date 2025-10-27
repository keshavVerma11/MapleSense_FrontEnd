"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import LeftNavBar from "@/components/LeftNavBar";
import WeatherBar from "@/components/WeatherBar";
import Map from "@/components/Map";
import RightPopUp from "@/components/RightPopUp";
import type { Tap } from "@/components/types";

/** Mock data; swap with API later */
const TAPS: Tap[] = [
  {
    id: "tap-1",
    name: "North Grove Tap #1",
    grove: "North Maple Grove",
    status: "warning",
    fillLevelPct: 75,
    batteryPct: 78,
    lastUpdatedMins: 2,
    positionPct: { x: 56, y: 28 },
  },
  {
    id: "tap-2",
    name: "West Grove Tap #2",
    grove: "West Maple Grove",
    status: "active",
    fillLevelPct: 12,
    batteryPct: 67,
    lastUpdatedMins: 5,
    positionPct: { x: 42, y: 55 },
  },
  {
    id: "tap-3",
    name: "South Grove Tap #3",
    grove: "South Maple Grove",
    status: "active",
    fillLevelPct: 42,
    batteryPct: 91,
    lastUpdatedMins: 4,
    positionPct: { x: 78, y: 46 },
  },
  {
    id: "tap-5",
    name: "Central Grove Tap #5",
    grove: "Central Maple Grove",
    status: "idle",
    fillLevelPct: 0,
    batteryPct: 64,
    lastUpdatedMins: 8,
    positionPct: { x: 89, y: 60 },
  },
  {
    id: "tap-7",
    name: "East Grove Tap #7",
    grove: "East Maple Grove",
    status: "warning",
    fillLevelPct: 95,
    batteryPct: 23,
    lastUpdatedMins: 1,
    positionPct: { x: 66, y: 76 },
  },
];

export default function DashboardPage() {
  const [selectedTapId, setSelectedTapId] = useState<string | null>(null);
  const selectedTap = useMemo(
    () => TAPS.find((t) => t.id === selectedTapId) || null,
    [selectedTapId]
  );

  // Adjust this if Header height changes
  const HEADER_HEIGHT = 88;

  return (
    <main style={{ minHeight: "100svh", background: "#ffffffff", overflow: "hidden" }}>
      <Header />

      {/* Full-bleed, two-column layout */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "320px minmax(0,1fr)",
          gridTemplateRows: "1fr",
          gridTemplateAreas: `"left right"`,
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          width: "100vw",
          maxWidth: "100vw",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          gap: 0,
        }}
      >
        {/* Left rail */}
        <div style={{ gridArea: "left", height: "100%" }}>
          <LeftNavBar
            taps={TAPS}
            selectedTapId={selectedTapId}
            onSelectTap={setSelectedTapId}
          />
        </div>

        {/* Right pane: Weather on top, Map fills the rest */}
        <div
          style={{
            gridArea: "right",
            display: "grid",
            gridTemplateRows: "auto 1fr",
            gap: 0,
            padding: 0,
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          <div style={{ minHeight: 0 }}>
            <WeatherBar />
          </div>

          {/* Map area fills remaining height; no extra margins */}
          <div style={{ minHeight: 0 }}>
            <Map
              taps={TAPS}
              selectedTapId={selectedTapId}
              onSelectTap={setSelectedTapId}
            />
          </div>
        </div>
      </section>

      {/* Right detail drawer */}
      <RightPopUp
        tap={selectedTap}
        isOpen={!!selectedTap}
        onClose={() => setSelectedTapId(null)}
      />
    </main>
  );
}
