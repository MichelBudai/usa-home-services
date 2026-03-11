/**
 * Lazy load of us_seo_home_improvement_4128_cities.json via fs (no static import).
 * Cached per process. Server-only (Node fs).
 */

import fs from "fs";
import path from "path";

export type CityEntry = string | { name: string; census_city?: unknown };

export interface EnrichedState {
  state: string;
  abbr: string;
  city_count: number;
  cities: CityEntry[];
  census_state?: unknown;
}

interface CitiesJson {
  meta: unknown;
  states: EnrichedState[];
}

const CITIES_JSON_PATH = path.join(
  process.cwd(),
  "us_seo_home_improvement_4128_cities.json"
);

let cached: CitiesJson | null = null;

export function getCitiesData(): CitiesJson {
  if (cached) return cached;
  const raw = fs.readFileSync(CITIES_JSON_PATH, "utf8");
  cached = JSON.parse(raw) as CitiesJson;
  return cached;
}

export function getCityNameFromEntry(city: CityEntry): string | null {
  if (typeof city === "string") return city;
  if (city && typeof city === "object" && "name" in city)
    return (city as { name: string }).name;
  return null;
}
