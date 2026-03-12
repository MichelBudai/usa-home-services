import { slugify } from "./slugs";
import { getCurrentSiteConfig } from "./getSiteConfig";
import cityMetadataJson from "../data/city_metadata.json";
import { type CityMetadata } from "./cityMetadata";

export type ServiceSlug = string;

export function getServiceSlugs(): string[] {
  return getCurrentSiteConfig().services.map((s) => s.slug);
}
export function getServiceLabels(): Record<string, string> {
  return Object.fromEntries(
    getCurrentSiteConfig().services.map((s) => [s.slug, s.label])
  );
}
// Compatibilité — sera supprimé progressivement
export const SERVICE_SLUGS: string[] = [];
export const SERVICE_LABELS: Record<string, string> = {};

const metadataMap = cityMetadataJson as unknown as Record<string, CityMetadata>;

// Build state slug -> list of city entries
const stateSlugToCities: Map<string, { slug: string; name: string }[]> = new Map();
const stateSlugToAbbr: Map<string, string> = new Map();
const stateSlugToName: Map<string, string> = new Map();

for (const [key, entry] of Object.entries(metadataMap)) {
  const [stateSlug, citySlug] = key.split("|");
  if (!stateSlugToCities.has(stateSlug)) {
    stateSlugToCities.set(stateSlug, []);
    stateSlugToAbbr.set(stateSlug, entry.stateCode);
    stateSlugToName.set(stateSlug, entry.state);
  }
  stateSlugToCities.get(stateSlug)!.push({ slug: citySlug, name: entry.city });
}

// Sort cities by population desc within each state
Array.from(stateSlugToCities.entries()).forEach(([stateSlug, cities]) => {
  cities.sort((a, b) => {
    const pa = metadataMap[`${stateSlug}|${a.slug}`]?.population ?? 0;
    const pb = metadataMap[`${stateSlug}|${b.slug}`]?.population ?? 0;
    return pb - pa;
  });
});

export const stateSlugs: string[] = Array.from(stateSlugToCities.keys()).sort();

export interface StateData {
  state: string;
  abbr: string;
  city_count: number;
  cities: { slug: string; name: string }[];
}

export function getStateBySlug(slug: string): StateData | undefined {
  const cities = stateSlugToCities.get(slug);
  if (!cities) return undefined;
  return {
    state: stateSlugToName.get(slug) ?? slug,
    abbr: stateSlugToAbbr.get(slug) ?? "",
    city_count: cities.length,
    cities,
  };
}

export function getCityName(stateSlug: string, citySlug: string): string | undefined {
  return metadataMap[`${stateSlug}|${citySlug}`]?.city;
}

export function getCitiesForState(stateSlug: string): { slug: string; name: string }[] {
  return stateSlugToCities.get(stateSlug) ?? [];
}

/**
 * Returns up to `count` nearby cities using nearbyCities from metadata.
 * Falls back to next cities in state list.
 */
export function getNearbyCities(
  stateSlug: string,
  currentCitySlug: string,
  count: number = 3
): { slug: string; name: string }[] {
  const entry = metadataMap[`${stateSlug}|${currentCitySlug}`];
  if (entry?.nearbyCities?.length) {
    return entry.nearbyCities
      .slice(0, count)
      .filter((n) => n.slug !== currentCitySlug)
      .map((n) => ({ slug: n.slug, name: n.city }));
  }
  // Fallback
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
  return getServiceSlugs().includes(service);
}

export function isValidStateSlug(slug: string): boolean {
  return stateSlugToCities.has(slug);
}

export function isValidCitySlug(stateSlug: string, citySlug: string): boolean {
  return !!metadataMap[`${stateSlug}|${citySlug}`];
}
