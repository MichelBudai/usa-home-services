const fs = require("fs");
const path = require("path");

const citiesJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../us_seo_home_improvement_4128_cities.json"), "utf8")
);

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
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

for (const state of citiesJson.states) {
  const stateSlug = slugify(state.state);
  for (const entry of state.cities) {
    const cityName = typeof entry === "string" ? entry : entry.name;
    if (!cityName) continue;
    const citySlug = slugify(cityName);
    const census = typeof entry === "object" ? entry.census_city : null;
    if (!census) continue;

    const key = `${stateSlug}|${citySlug}`;
    result[key] = {
      county: census.county ?? "",
      medianYearBuilt: census.median_year_built ?? undefined,
      population: census.population ?? undefined,
      homeownershipRate: census.homeownership_rate_pct ?? undefined,
      growthSnippet: getGrowthSnippet(census.population),
    };
  }
}

fs.writeFileSync(
  path.join(__dirname, "../data/city_metadata.json"),
  JSON.stringify(result, null, 2)
);

console.log(`Generated ${Object.keys(result).length} city metadata entries`);
