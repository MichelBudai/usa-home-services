import { slugify } from "./slugs";
import {
  getCitiesData,
  getCityNameFromEntry,
  type CityEntry,
} from "./loadCitiesJson";
import { SERVICE_SLUGS, SERVICE_LABELS, type ServiceSlug } from "./constants";

export type { CityEntry, ServiceSlug };
export { SERVICE_SLUGS, SERVICE_LABELS };

export interface StateData {
  state: string;
  abbr: string;
  city_count: number;
  cities: CityEntry[];
}

import nearbyCitiesJson from "../data/nearby_cities.json";

/** Override "nearby" cities when real metro/proximity data exists. Key: "stateSlug|citySlug", value: city slug[] */
const nearbyOverrides = nearbyCitiesJson as Record<string, string[]>;

const citiesData = getCitiesData();
export const rawStates: StateData[] = citiesData.states as StateData[];

// Build state slug -> state data (slug from state name, e.g. "New York" -> "new-york")
export const stateSlugToState: Map<string, StateData> = new Map();
for (const s of rawStates) {
  stateSlugToState.set(slugify(s.state), s);
}

// State slug -> list of city slugs for that state
export const stateSlugToCitySlugs: Map<string, string[]> = new Map();
// State slug -> city slug -> city display name
export const stateSlugToCitySlugToName: Map<string, Map<string, string>> =
  new Map();

for (const s of rawStates) {
  const stateSlug = slugify(s.state);
  const citySlugs: string[] = [];
  const slugToName = new Map<string, string>();
  for (const city of s.cities) {
    const cityName = getCityNameFromEntry(city);
    if (!cityName) continue;
    const citySlug = slugify(cityName);
    citySlugs.push(citySlug);
    slugToName.set(citySlug, cityName);
  }
  stateSlugToCitySlugs.set(stateSlug, citySlugs);
  stateSlugToCitySlugToName.set(stateSlug, slugToName);
}

export const stateSlugs: string[] = rawStates.map((s) => slugify(s.state));

export function getStateBySlug(slug: string): StateData | undefined {
  return stateSlugToState.get(slug);
}

export function getCityName(stateSlug: string, citySlug: string): string | undefined {
  return stateSlugToCitySlugToName.get(stateSlug)?.get(citySlug);
}

export function getCitiesForState(stateSlug: string): { slug: string; name: string }[] {
  const slugs = stateSlugToCitySlugs.get(stateSlug);
  const slugToName = stateSlugToCitySlugToName.get(stateSlug);
  if (!slugs || !slugToName) return [];
  return slugs.map((slug) => ({ slug, name: slugToName.get(slug) ?? slug }));
}

/**
 * Returns up to `count` other cities in the same state (excl. current).
 * Uses curated nearby_cities.json when available (real metro/proximity); otherwise fallback to next cities in state list.
 */
export function getNearbyCities(
  stateSlug: string,
  currentCitySlug: string,
  count: number = 3
): { slug: string; name: string }[] {
  const key = `${stateSlug}|${currentCitySlug}`;
  const overrideSlugs = nearbyOverrides[key];
  const slugToName = stateSlugToCitySlugToName.get(stateSlug);
  if (overrideSlugs?.length && slugToName) {
    return overrideSlugs
      .slice(0, count)
      .map((slug) => ({ slug, name: slugToName.get(slug) ?? slug }))
      .filter((x) => x.name && x.slug !== currentCitySlug);
  }
  const cities = getCitiesForState(stateSlug);
  const idx = cities.findIndex((c) => c.slug === currentCitySlug);
  if (idx < 0) return [];
  const out: { slug: string; name: string }[] = [];
  for (let i = 1; i <= count; i++) {
    const next = cities[(idx + i) % cities.length];
    if (next && next.slug !== currentCitySlug) out.push(next);
  }
  return out;
}

export function isValidService(service: string): service is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(service);
}

export function isValidStateSlug(slug: string): boolean {
  return stateSlugToState.has(slug);
}

export function isValidCitySlug(stateSlug: string, citySlug: string): boolean {
  return stateSlugToCitySlugToName.get(stateSlug)?.has(citySlug) ?? false;
}
