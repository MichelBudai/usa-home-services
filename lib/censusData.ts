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
  service: ServiceSlug
): string {
  switch (service) {
    case "plumbing-quote":
      return `Get free plumbing quotes from licensed local plumbers in ${cityName}.`;
    case "repiping-quote":
      return `Homes in ${cityName} vary in age — a repiping assessment confirms whether your pipes need replacement.`;
    case "water-heater-replacement-quote":
      return `Most water heaters in ${cityName} last 10–12 years. Get a replacement quote before a failure forces an emergency call.`;
    case "sewer-line-replacement-quote":
      return `A camera inspection is the fastest way to assess sewer line condition in ${cityName}.`;
    case "drain-line-replacement-quote":
      return `Drain line issues in ${cityName} homes are often caught early with a professional assessment.`;
    case "emergency-plumbing-quote":
      return `Licensed emergency plumbers serve ${cityName} — get a quote before the next unexpected failure.`;
    default:
      return `Connect with licensed local plumbers in ${cityName} for free estimates.`;
  }
}

export function generateCityContextByService(
  census: CityCensus | null,
  cityName: string,
  service: ServiceSlug
): string {
  // When census is absent, always return a generic phrase so city pages without Census data still get intro content.
  if (census == null) return getGenericCityContextByService(cityName, service);
  const year = census.median_year_built;
  const ownership = census.homeownership_rate_pct;
  const hasOldHousing = typeof year === "number" && year !== SENTINEL && year < 1986;
  const highOwnership = typeof ownership === "number" && ownership !== SENTINEL && ownership > 65;

  switch (service) {
    case "repiping-quote":
      if (hasOldHousing)
        return `Many homes in ${cityName} were built before 1986, when lead and galvanized pipes were common—consider a free repiping quote.`;
      break;
    case "water-heater-replacement-quote":
      if (hasOldHousing)
        return `With a median year built of ${year}, ${cityName} has many older homes where water heater replacement is common.`;
      break;
    case "sewer-line-replacement-quote":
    case "drain-line-replacement-quote":
      if (hasOldHousing)
        return `Older housing stock in ${cityName} often means aging sewer and drain lines—get a free quote for replacement.`;
      break;
    case "plumbing-quote":
    case "emergency-plumbing-quote":
      if (highOwnership)
        return `High homeownership in ${cityName} means many residents invest in plumbing upgrades—get a free quote.`;
      break;
    default:
      break;
  }
  return getGenericCityContextByService(cityName, service);
}

export function getClimateContent(stateSlug: string): {
  plumbingNote: string;
  primaryRisks: string[];
} | null {
  const census = getStateCensus(stateSlug);
  const climate = census?.climate;
  if (!climate?.plumbing_impact) return null;
  return {
    plumbingNote: climate.plumbing_impact,
    primaryRisks: Array.isArray(climate.primary_risks) ? climate.primary_risks : [],
  };
}

export function getPermitContent(stateSlug: string): string | null {
  const census = getStateCensus(stateSlug);
  return census?.permits ?? null;
}
