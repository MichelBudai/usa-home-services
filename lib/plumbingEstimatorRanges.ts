/**
 * Realistic cost ranges per (service, home size, home age).
 * Key: "service|size|age" -> [min, max] in dollars.
 * Used by PlumbingCostEstimator instead of multiplicative factors.
 */

export const SERVICE_KEYS = ["drain", "waterheater", "sewer", "repiping", "minor"] as const;
export const SIZE_KEYS = ["under1k", "1k2k", "2k35k", "35kplus"] as const;
export const AGE_KEYS = ["pre1970", "1970_1990", "after1990"] as const;

export type ServiceKey = (typeof SERVICE_KEYS)[number];
export type SizeKey = (typeof SIZE_KEYS)[number];
export type AgeKey = (typeof AGE_KEYS)[number];

export const EMERGENCY_ADD = { min: 150, max: 400 };

/** Default range per service when a combination is missing (fallback). */
export const DEFAULT_RANGES: Record<ServiceKey, [number, number]> = {
  drain: [600, 2500],
  waterheater: [1000, 2400],
  sewer: [5000, 15000],
  repiping: [5500, 12000],
  minor: [200, 500],
};

/** Lookup table: "service|size|age" -> [min, max] */
export const PLUMBING_RANGES: Record<string, [number, number]> = {
  // Drain line replacement
  "drain|under1k|after1990": [500, 1200],
  "drain|under1k|1970_1990": [600, 1500],
  "drain|under1k|pre1970": [700, 1800],
  "drain|1k2k|after1990": [700, 1800],
  "drain|1k2k|1970_1990": [800, 2200],
  "drain|1k2k|pre1970": [900, 2600],
  "drain|2k35k|after1990": [900, 2800],
  "drain|2k35k|1970_1990": [1000, 3200],
  "drain|2k35k|pre1970": [1200, 3800],
  "drain|35kplus|after1990": [1200, 3500],
  "drain|35kplus|1970_1990": [1400, 4200],
  "drain|35kplus|pre1970": [1600, 4500],
  // Water heater replacement
  "waterheater|under1k|after1990": [900, 1500],
  "waterheater|under1k|1970_1990": [1000, 1800],
  "waterheater|under1k|pre1970": [1100, 2000],
  "waterheater|1k2k|after1990": [1000, 2000],
  "waterheater|1k2k|1970_1990": [1100, 2400],
  "waterheater|1k2k|pre1970": [1200, 2600],
  "waterheater|2k35k|after1990": [1100, 2600],
  "waterheater|2k35k|1970_1990": [1200, 2800],
  "waterheater|2k35k|pre1970": [1300, 3000],
  "waterheater|35kplus|after1990": [1200, 2800],
  "waterheater|35kplus|1970_1990": [1400, 3200],
  "waterheater|35kplus|pre1970": [1500, 3200],
  // Sewer line replacement
  "sewer|under1k|after1990": [3500, 8000],
  "sewer|under1k|1970_1990": [4000, 10000],
  "sewer|under1k|pre1970": [5000, 12000],
  "sewer|1k2k|after1990": [4500, 12000],
  "sewer|1k2k|1970_1990": [5000, 15000],
  "sewer|1k2k|pre1970": [6000, 18000],
  "sewer|2k35k|after1990": [5500, 16000],
  "sewer|2k35k|1970_1990": [6000, 19000],
  "sewer|2k35k|pre1970": [7000, 20000],
  "sewer|35kplus|after1990": [6000, 18000],
  "sewer|35kplus|1970_1990": [8000, 22000],
  "sewer|35kplus|pre1970": [10000, 22000],
  // Repiping (whole home)
  "repiping|under1k|after1990": [4000, 7000],
  "repiping|under1k|1970_1990": [4500, 8500],
  "repiping|under1k|pre1970": [5000, 10000],
  "repiping|1k2k|after1990": [5000, 10000],
  "repiping|1k2k|1970_1990": [5500, 12000],
  "repiping|1k2k|pre1970": [6000, 14000],
  "repiping|2k35k|after1990": [6000, 12000],
  "repiping|2k35k|1970_1990": [7000, 14000],
  "repiping|2k35k|pre1970": [8000, 15000],
  "repiping|35kplus|after1990": [7000, 13000],
  "repiping|35kplus|1970_1990": [8000, 15000],
  "repiping|35kplus|pre1970": [10000, 15000],
  // Minor repair (size/age matter less)
  "minor|under1k|after1990": [150, 400],
  "minor|under1k|1970_1990": [180, 450],
  "minor|under1k|pre1970": [200, 500],
  "minor|1k2k|after1990": [180, 450],
  "minor|1k2k|1970_1990": [200, 500],
  "minor|1k2k|pre1970": [220, 550],
  "minor|2k35k|after1990": [200, 500],
  "minor|2k35k|1970_1990": [220, 550],
  "minor|2k35k|pre1970": [250, 600],
  "minor|35kplus|after1990": [220, 500],
  "minor|35kplus|1970_1990": [250, 550],
  "minor|35kplus|pre1970": [280, 600],
};

export function getPlumbingRange(
  service: string,
  size: string,
  age: string
): [number, number] {
  const key = `${service}|${size}|${age}`;
  const range = PLUMBING_RANGES[key];
  if (range) return range;
  const defaultRange = DEFAULT_RANGES[service as ServiceKey];
  return defaultRange ?? [500, 3000];
}
