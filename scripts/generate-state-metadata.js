const fs = require("fs");
const path = require("path");

const cityMetadata = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/city_metadata.json"), "utf8")
);

// Group by state
const stateMap = {};

for (const [key, data] of Object.entries(cityMetadata)) {
  const stateSlug = key.split("|")[0];
  if (!stateMap[stateSlug]) stateMap[stateSlug] = [];
  stateMap[stateSlug].push(data);
}

const result = {};

for (const [stateSlug, cities] of Object.entries(stateMap)) {
  const withYear = cities.filter((c) => c.medianYearBuilt);
  const withPop = cities.filter((c) => c.population);
  const withOwn = cities.filter((c) => c.homeownershipRate);

  const pctPre1980 =
    withYear.length > 0
      ? Math.round(
          (withYear.filter((c) => c.medianYearBuilt < 1980).length /
            withYear.length) *
            100
        )
      : null;

  const avgHomeownership =
    withOwn.length > 0
      ? Math.round(
          withOwn.reduce((sum, c) => sum + c.homeownershipRate, 0) /
            withOwn.length
        )
      : null;

  const topCities = [...withPop]
    .sort((a, b) => b.population - a.population)
    .slice(0, 5)
    .map((c) => {
      const cityKey = Object.entries(cityMetadata).find(
        ([k, v]) => v === c && k.startsWith(stateSlug)
      )?.[0];
      const cityName = cityKey
        ? cityKey
            .split("|")[1]
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ")
        : "";
      return { name: cityName, population: c.population };
    });

  const avgMedianYear =
    withYear.length > 0
      ? Math.round(
          withYear.reduce((sum, c) => sum + c.medianYearBuilt, 0) /
            withYear.length
        )
      : null;

  result[stateSlug] = {
    cityCount: cities.length,
    pctPre1980,
    avgMedianYear,
    avgHomeownership,
    topCities,
  };
}

fs.writeFileSync(
  path.join(__dirname, "../data/state_metadata.json"),
  JSON.stringify(result, null, 2)
);

console.log(`Generated metadata for ${Object.keys(result).length} states`);
