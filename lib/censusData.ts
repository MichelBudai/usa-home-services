/**
 * Census getters and helpers for state/city pages. Uses getCitiesData() (no static JSON import).
 */

import { getCitiesData, getCityNameFromEntry } from "./loadCitiesJson";
import { slugify } from "./slugs";
import type { ServiceSlug } from "./data";

const SENTINEL = -666666666;

export interface CensusDisplay {
  population?: string;
  median_household_income?: string;
  median_home_value?: string;
  median_year_built?: string;
  median_home_age?: string;
  total_housing_units?: string;
  homeownership_rate?: string;
  pct_homes_pre1980?: string;
}

export interface StateCensus {
  population?: number;
  median_household_income?: number;
  median_home_value?: number;
  median_year_built?: number;
  total_housing_units?: number;
  homeownership_rate_pct?: number;
  pct_homes_built_pre1980?: number;
  display?: CensusDisplay;
  permits?: string;
  climate?: {
    plumbing_impact?: string;
    primary_risks?: string[];
  };
}

export interface CityCensus {
  population?: number;
  median_household_income?: number;
  median_home_value?: number;
  median_year_built?: number;
  total_housing_units?: number;
  homeownership_rate_pct?: number;
  display?: CensusDisplay;
  latitude?: number;
  longitude?: number;
}

function isValidNum(n: number | undefined): n is number {
  return typeof n === "number" && n !== SENTINEL && !Number.isNaN(n);
}

export function getStateCensus(stateSlug: string): StateCensus | null {
  const { states } = getCitiesData();
  const state = states.find((s) => slugify(s.state) === stateSlug);
  const census = state?.census_state;
  return census && typeof census === "object" ? (census as StateCensus) : null;
}

export function getCityCensus(
  stateSlug: string,
  citySlug: string
): CityCensus | null {
  const { states } = getCitiesData();
  const state = states.find((s) => slugify(s.state) === stateSlug);
  if (!state) return null;
  for (const entry of state.cities) {
    const name = getCityNameFromEntry(entry);
    if (!name || slugify(name) !== citySlug) continue;
    if (typeof entry === "object" && entry && "census_city" in entry) {
      const c = (entry as { census_city?: unknown }).census_city;
      return c && typeof c === "object" ? (c as CityCensus) : null;
    }
    return null;
  }
  return null;
}

/** Raw census_city shape for scoring (median_home_age_years exists in JSON but not in CityCensus display type). */
function getCityScore(entry: unknown): number {
  if (!entry || typeof entry !== "object" || !("census_city" in entry)) return 0;
  const c = (entry as { census_city?: unknown }).census_city;
  if (!c || typeof c !== "object") return 0;
  const cc = c as {
    median_home_age_years?: number;
    homeownership_rate_pct?: number;
  };
  const age = cc.median_home_age_years;
  const ownership = cc.homeownership_rate_pct;
  const ageVal =
    typeof age === "number" && age !== SENTINEL && !Number.isNaN(age) ? age : 0;
  const ownershipVal =
    typeof ownership === "number" &&
    ownership !== SENTINEL &&
    !Number.isNaN(ownership)
    ? ownership
    : 0;
  return ageVal + ownershipVal;
}

export function getTopCitiesForState(
  stateSlug: string,
  limit: number
): { slug: string; name: string }[] {
  const { states } = getCitiesData();
  const state = states.find((s) => slugify(s.state) === stateSlug);
  if (!state) return [];
  const scored = state.cities.map((entry) => {
    const name = getCityNameFromEntry(entry);
    if (!name) return { name: "", slug: "", score: 0 };
    const slug = slugify(name);
    const score = getCityScore(entry);
    return { name, slug, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored
    .filter((x) => x.slug)
    .slice(0, limit)
    .map(({ slug, name }) => ({ slug, name }));
}

export interface CensusStat {
  label: string;
  value: string;
}

export function buildStateCensusStats(
  census: StateCensus | null,
  cityCount?: number
): CensusStat[] {
  if (!census) return [];
  const stats: CensusStat[] = [];
  const d = census.display;

  if (isValidNum(census.population))
    stats.push({
      label: "Population",
      value: d?.population ?? String(census.population),
    });
  if (isValidNum(census.homeownership_rate_pct))
    stats.push({
      label: "Homeownership rate",
      value: d?.homeownership_rate ?? `${census.homeownership_rate_pct}%`,
    });
  if (isValidNum(census.median_home_value))
    stats.push({
      label: "Median home value",
      value: d?.median_home_value ?? `$${census.median_home_value.toLocaleString()}`,
    });
  if (isValidNum(census.median_year_built))
    stats.push({
      label: "Median year built",
      value: d?.median_year_built ?? String(census.median_year_built),
    });
  if (isValidNum(census.pct_homes_built_pre1980))
    stats.push({
      label: "Homes built pre-1980",
      value: d?.pct_homes_pre1980 ?? `${census.pct_homes_built_pre1980}%`,
    });
  if (isValidNum(census.total_housing_units))
    stats.push({
      label: "Total housing units",
      value: d?.total_housing_units ?? census.total_housing_units.toLocaleString(),
    });
  if (typeof cityCount === "number" && cityCount > 0)
    stats.push({ label: "Cities covered", value: String(cityCount) });

  return stats;
}

export function buildCityCensusStats(census: CityCensus | null): CensusStat[] {
  if (!census) return [];
  const stats: CensusStat[] = [];
  const d = census.display;

  if (isValidNum(census.population))
    stats.push({
      label: "Population",
      value: d?.population ?? String(census.population),
    });
  if (isValidNum(census.homeownership_rate_pct))
    stats.push({
      label: "Homeownership rate",
      value: d?.homeownership_rate ?? `${census.homeownership_rate_pct}%`,
    });
  if (isValidNum(census.median_home_value))
    stats.push({
      label: "Median home value",
      value: d?.median_home_value ?? `$${census.median_home_value.toLocaleString()}`,
    });
  if (isValidNum(census.median_year_built))
    stats.push({
      label: "Median year built",
      value: d?.median_year_built ?? String(census.median_year_built),
    });
  if (isValidNum(census.total_housing_units))
    stats.push({
      label: "Total housing units",
      value: d?.total_housing_units ?? census.total_housing_units.toLocaleString(),
    });

  return stats;
}

export function getStateCensusMetaSnippet(
  stateName: string,
  census: StateCensus | null
): string {
  if (!census || !isValidNum(census.population)) return "";
  const pop = census.display?.population ?? census.population.toLocaleString();
  const rate = isValidNum(census.homeownership_rate_pct)
    ? census.display?.homeownership_rate ?? `${census.homeownership_rate_pct}%`
    : "";
  return `${stateName} has ${pop} residents${rate ? ` and ${rate} homeownership.` : "."} `;
}

export function getCityCensusMetaSnippet(
  cityName: string,
  stateName: string,
  census: CityCensus | null
): string {
  if (!census || !isValidNum(census.population)) return "";
  const pop = census.display?.population ?? census.population.toLocaleString();
  const rate = isValidNum(census.homeownership_rate_pct)
    ? census.display?.homeownership_rate ?? `${census.homeownership_rate_pct}%`
    : "";
  return `${cityName}, ${stateName} has ${pop} residents${rate ? ` and ${rate} homeownership.` : "."} `;
}

function getGenericCityContextByService(
  cityName: string,
  service: string,
  namePlural?: string
): string {
  const specialists = namePlural ? namePlural.toLowerCase() : "specialists";
  switch (service) {
    case "pest-control-quote":
      return `Get free pest control quotes from licensed local ${specialists} in ${cityName}.`;
    case "termite-treatment-quote":
      return `Homes in ${cityName} vary in age — older construction increases termite risk. Get a free inspection quote.`;
    case "rodent-control-quote":
      return `Licensed rodent control ${specialists} serve ${cityName} — get an exclusion quote before the problem grows.`;
    case "bed-bug-treatment-quote":
      return `Licensed bed bug ${specialists} serve ${cityName} — get a treatment quote before the infestation spreads.`;
    case "mosquito-control-quote":
      return `Mosquito pressure in ${cityName} varies by season — get a free program quote before peak season.`;
    case "wildlife-removal-quote":
      return `Licensed wildlife removal ${specialists} serve ${cityName} — get a humane removal quote today.`;
    default:
      return `Connect with licensed local ${specialists} in ${cityName} for free estimates.`;
  }
}

export function generateCityContextByService(
  census: CityCensus | null,
  cityName: string,
  service: string,
  namePlural?: string
): string {
  if (census == null) return getGenericCityContextByService(cityName, service, namePlural);
  const year = census.median_year_built;
  const ownership = census.homeownership_rate_pct;
  const hasOldHousing = typeof year === "number" && year !== SENTINEL && year < 1986;
  const highOwnership = typeof ownership === "number" && ownership !== SENTINEL && ownership > 65;

  switch (service) {
    case "termite-treatment-quote":
      if (hasOldHousing)
        return `Many homes in ${cityName} were built before 1986 — older construction increases termite and pest entry risk. Get a free inspection quote.`;
      break;
    case "pest-control-quote":
      if (highOwnership)
        return `High homeownership in ${cityName} means protecting your home from pest damage matters — get a free quote.`;
      break;
    default:
      break;
  }
  return getGenericCityContextByService(cityName, service, namePlural);
}

export function getClimateContent(stateSlug: string): {
  pestNote: string;
  primaryRisks: string[];
} | null {
  const census = getStateCensus(stateSlug);
  const climate = census?.climate;
  if (!climate?.plumbing_impact) return null;
  return {
    pestNote: climate.plumbing_impact,
    primaryRisks: Array.isArray(climate.primary_risks) ? climate.primary_risks : [],
  };
}

export function getPermitContent(stateSlug: string): string | null {
  const census = getStateCensus(stateSlug);
  return census?.permits ?? null;
}
