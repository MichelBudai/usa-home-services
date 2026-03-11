export interface NearbyCity {
  city: string;
  state: string;
  stateCode: string;
  distanceMiles: number;
  slug: string;
  stateSlug: string;
}

export interface CityMetadata {
  city: string;
  state: string;
  stateCode: string;
  tier: number;
  lat: number;
  lon: number;
  county: string;
  population?: number;
  medianYearBuilt?: number;
  homeownershipRate?: number;
  homeownersCount?: number;
  rentersCount?: number;
  medianHomeValue?: number;
  medianHouseholdIncome?: number;
  medianGrossRent?: number;
  totalHousingUnits?: number;
  growthSnippet?: string;
  nearbyCities: NearbyCity[];
}

interface CityMetadataMap {
  [key: string]: CityMetadata;
}

import cityMetadataJson from "../data/city_metadata.json";

const metadataMap = cityMetadataJson as unknown as CityMetadataMap;

function buildKey(stateSlug: string, citySlug: string): string {
  return `${stateSlug}|${citySlug}`;
}

export function getCityMetadata(
  stateSlug: string,
  citySlug: string
): CityMetadata | null {
  const key = buildKey(stateSlug, citySlug);
  const row = metadataMap[key];
  if (!row) return null;
  return row;
}
