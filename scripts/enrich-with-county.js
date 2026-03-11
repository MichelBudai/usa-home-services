const fs = require("fs");
const path = require("path");

const cities = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../us_seo_home_improvement_4128_cities.json"), "utf8")
);

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getCounty(lat, lon) {
  try {
    const url = `https://geo.fcc.gov/api/census/block/find?latitude=${lat}&longitude=${lon}&format=json`;
    const res = await fetch(url);
    const data = await res.json();
    return data?.County?.name ? `${data.County.name} County` : "";
  } catch {
    return "";
  }
}

async function main() {
  const outputPath = path.join(__dirname, "../data/county_cache.json");

  // Charge le cache existant si présent
  let cache = {};
  if (fs.existsSync(outputPath)) {
    cache = JSON.parse(fs.readFileSync(outputPath, "utf8"));
  }

  let processed = 0;
  let total = cities.length;

  for (const entry of cities) {
    const key = `${slugify(entry.state)}|${slugify(entry.city)}`;

    // Skip si déjà dans le cache
    if (cache[key] !== undefined) {
      processed++;
      continue;
    }

    const county = await getCounty(entry.lat, entry.lon);
    cache[key] = county;
    processed++;

    if (processed % 50 === 0) {
      fs.writeFileSync(outputPath, JSON.stringify(cache, null, 2));
      console.log(`${processed}/${total} — ${entry.city}, ${entry.state_code} → ${county}`);
    }

    await sleep(100); // 100ms entre chaque requête
  }

  fs.writeFileSync(outputPath, JSON.stringify(cache, null, 2));
  console.log(`Done — ${Object.keys(cache).length} counties saved`);
}

main();
