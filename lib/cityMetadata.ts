/**
 * City metadata for local content differentiation (county, median year built, population, growth).
 * Key in JSON: "stateSlug|citySlug". When no data exists, getCityMetadata returns null — use generic fallback copy.
 */

export interface CityMetadata {
  county: string;
  medianYearBuilt?: number;
  population?: number;
  growthSnippet?: string;
}

interface CityMetadataMap {
  [key: string]: {
    county: string;
    medianYearBuilt?: number;
    population?: number;
    growthSnippet?: string;
  };
}

import cityMetadataJson from "../data/city_metadata.json";

const metadataMap = cityMetadataJson as CityMetadataMap;

function buildKey(stateSlug: string, citySlug: string): string {
  return `${stateSlug}|${citySlug}`;
}

/**
 * Returns metadata for a city when available; otherwise null.
 * Use for intro/hero/FAQ and service block localParagraphs — when null, keep generic copy.
 */
export function getCityMetadata(
  stateSlug: string,
  citySlug: string
): CityMetadata | null {
  const key = buildKey(stateSlug, citySlug);
  const row = metadataMap[key];
  if (!row) return null;
  return {
    county: row.county,
    medianYearBuilt: row.medianYearBuilt,
    population: row.population,
    growthSnippet: row.growthSnippet,
  };
}
