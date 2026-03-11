"use client";

import styles from "./CensusStatsGrid.module.css";

const STAT_ICONS: Record<string, string> = {
  Population: "👥",
  "Homeownership rate": "🏠",
  "Median home value": "💰",
  "Median year built": "📅",
  "Homes built pre-1980": "🏗️",
  "Total housing units": "📦",
  "Cities covered": "📍",
};

function getIconForLabel(label: string): string {
  return STAT_ICONS[label] ?? "📊";
}

interface CensusStatsGridProps {
  stats: { label: string; value: string }[];
  variant?: "state" | "city";
}

export function CensusStatsGrid({ stats }: CensusStatsGridProps) {
  if (!stats.length) return null;

  return (
    <div className={styles.grid}>
      {stats.map(({ label, value }) => (
        <div key={label} className={styles.card}>
          <span className={styles.icon} aria-hidden>
            {getIconForLabel(label)}
          </span>
          <div className={styles.value}>{value}</div>
          <div className={styles.label}>{label}</div>
        </div>
      ))}
    </div>
  );
}
