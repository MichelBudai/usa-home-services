const fs = require("fs");
const path = require("path");

const cities = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../us_seo_home_improvement_4128_cities.json"), "utf8")
);

const countyCache = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/county_cache.json"), "utf8")
);

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function fixCounty(county) {
  if (!county) return "";
  // Corrige "Jefferson County County" → "Jefferson County"
  return county.replace(/\s+County\s+County$/i, " County");
}

function getGrowthSnippet(population) {
  if (!population) return undefined;
  if (population > 500000) return "one of the largest cities in its state";
  if (population > 200000) return "a major regional city";
  if (population > 100000) return "a large city";
  if (population > 50000) return "a growing mid-size city";
  if (population > 20000) return "a growing community";
  if (population > 10000) return "a small but established city";
  return "a small community";
}

const result = {};

for (const entry of cities) {
  const stateSlug = slugify(entry.state);
  const citySlug = slugify(entry.city);
  const key = `${stateSlug}|${citySlug}`;
  const d = entry.local_data ?? {};
  const county = fixCounty(countyCache[key] ?? "");

  result[key] = {
    city: entry.city,
    state: entry.state,
    stateCode: entry.state_code,
    tier: entry.tier,
    lat: entry.lat,
    lon: entry.lon,
    county,
    population: entry.population ?? undefined,
    medianYearBuilt: d.median_year_built ?? undefined,
    homeownershipRate: d.homeownership_rate ?? undefined,
    homeownersCount: d.homeowners_count ?? undefined,
    rentersCount: d.renters_count ?? undefined,
    medianHomeValue: d.median_home_value ?? undefined,
    medianHouseholdIncome: d.median_household_income ?? undefined,
    medianGrossRent: d.median_gross_rent ?? undefined,
    totalHousingUnits: d.total_housing_units ?? undefined,
    growthSnippet: getGrowthSnippet(entry.population),
    nearbyCities: (entry.nearby_cities ?? []).map(n => ({
      city: n.city,
      state: n.state,
      stateCode: n.state_code,
      distanceMiles: n.distance_miles,
      slug: slugify(n.city),
      stateSlug: slugify(n.state),
    })),
  };
}

fs.writeFileSync(
  path.join(__dirname, "../data/city_metadata.json"),
  JSON.stringify(result, null, 2)
);

console.log(`Generated ${Object.keys(result).length} entries`);

// Vérifie quelques exemples
const examples = ["alabama|birmingham", "texas|houston", "california|los-angeles"];
for (const k of examples) {
  if (result[k]) console.log(`\n${k}:`, JSON.stringify(result[k], null, 2));
}
