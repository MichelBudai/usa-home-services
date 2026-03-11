#!/usr/bin/env node
/**
 * scripts/fetch-census.js
 *
 * Enrichit cities.json avec les données US Census ACS 5-Year par ville.
 * Clé API Census gratuite : https://api.census.gov/data/key_signup.html
 * (gratuite, pas de carte bancaire, approuvée en quelques minutes)
 *
 * Données récupérées par ville :
 *   - Population
 *   - Median household income
 *   - Median home value
 *   - Homeownership rate
 *   - Median year built (home age)
 *   - Total housing units
 *
 * Usage :
 *   node scripts/fetch-census.js                        # toutes les villes
 *   node scripts/fetch-census.js --state alabama        # un état
 *   node scripts/fetch-census.js --state alabama --city birmingham
 *   node scripts/fetch-census.js --stale-only           # villes sans données seulement
 *
 * Output : cities.json enrichi avec un champ "census" par ville
 */

const fs = require('fs')
const path = require('path')
const https = require('https')

// ─── CONFIG ───────────────────────────────────────────────────────────────────

const CENSUS_API_KEY = process.env.CENSUS_API_KEY
const CITIES_JSON = path.join(process.cwd(), 'data', 'cities.json')

// ACS 5-Year Estimates (plus stable et complet que 1-Year)
const ACS_YEAR = '2022'
const ACS_BASE = `https://api.census.gov/data/${ACS_YEAR}/acs/acs5`

// Variables Census ACS5 qu'on veut
// Docs : https://api.census.gov/data/2022/acs/acs5/variables.html
const CENSUS_VARIABLES = {
  B01003_001E: 'population',              // Total population
  B19013_001E: 'median_household_income', // Median household income
  B25077_001E: 'median_home_value',       // Median value of owner-occupied housing
  B25035_001E: 'median_year_built',       // Median year structure built
  B25001_001E: 'total_housing_units',     // Total housing units
  B25003_002E: 'owner_occupied_units',    // Owner-occupied units (pour homeownership rate)
  B25003_001E: 'occupied_units_total',    // Total occupied units (pour homeownership rate)
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try { resolve(JSON.parse(data)) }
        catch (e) { reject(new Error('JSON parse error: ' + data.slice(0, 300))) }
      })
    }).on('error', reject)
  })
}

// Convertit le nom d'état en FIPS code (requis par Census API)
const STATE_FIPS = {
  'Alabama': '01', 'Alaska': '02', 'Arizona': '04', 'Arkansas': '05',
  'California': '06', 'Colorado': '08', 'Connecticut': '09', 'Delaware': '10',
  'Florida': '12', 'Georgia': '13', 'Hawaii': '15', 'Idaho': '16',
  'Illinois': '17', 'Indiana': '18', 'Iowa': '19', 'Kansas': '20',
  'Kentucky': '21', 'Louisiana': '22', 'Maine': '23', 'Maryland': '24',
  'Massachusetts': '25', 'Michigan': '26', 'Minnesota': '27', 'Mississippi': '28',
  'Missouri': '29', 'Montana': '30', 'Nebraska': '31', 'Nevada': '32',
  'New Hampshire': '33', 'New Jersey': '34', 'New Mexico': '35', 'New York': '36',
  'North Carolina': '37', 'North Dakota': '38', 'Ohio': '39', 'Oklahoma': '40',
  'Oregon': '41', 'Pennsylvania': '42', 'Rhode Island': '44', 'South Carolina': '45',
  'South Dakota': '46', 'Tennessee': '47', 'Texas': '48', 'Utah': '49',
  'Vermont': '50', 'Virginia': '51', 'Washington': '53', 'West Virginia': '54',
  'Wisconsin': '55', 'Wyoming': '56',
}

// ─── CENSUS API ───────────────────────────────────────────────────────────────

/**
 * Étape 1 : Récupère les FIPS codes de toutes les places d'un état
 * Census API retourne toutes les "places" (cities, towns, CDPs) d'un état
 */
async function getStatePlaces(stateFips) {
  const vars = 'NAME,GEO_ID'
  const url = `${ACS_BASE}?get=${vars}&for=place:*&in=state:${stateFips}&key=${CENSUS_API_KEY}`

  const data = await httpsGet(url)
  if (!Array.isArray(data) || data.length < 2) return {}

  const headers = data[0]
  const nameIdx = headers.indexOf('NAME')
  const placeIdx = headers.indexOf('place')

  const places = {}
  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    // NAME format: "Birmingham city, Alabama"
    const fullName = row[nameIdx]
    const placeFips = row[placeIdx]

    // Extrait juste le nom de la ville (avant " city," ou " town," etc.)
    const cityName = fullName
      .replace(/\s+(city|town|village|borough|CDP|municipality|township|consolidated government|unified government|metro government|urban county|charter township),.*$/i, '')
      .trim()

    const citySlug = slugify(cityName)
    places[citySlug] = {
      name: cityName,
      fips: placeFips,
      full_name: fullName,
    }
  }

  return places
}

/**
 * Étape 2 : Récupère les données ACS pour une ville spécifique
 */
async function getCityData(stateFips, placeFips) {
  const varList = Object.keys(CENSUS_VARIABLES).join(',')
  const url = `${ACS_BASE}?get=NAME,${varList}&for=place:${placeFips}&in=state:${stateFips}&key=${CENSUS_API_KEY}`

  const data = await httpsGet(url)
  if (!Array.isArray(data) || data.length < 2) return null

  const headers = data[0]
  const row = data[1]

  const raw = {}
  for (const [censusVar, fieldName] of Object.entries(CENSUS_VARIABLES)) {
    const idx = headers.indexOf(censusVar)
    raw[fieldName] = idx !== -1 ? parseInt(row[idx]) || null : null
  }

  // Calcule homeownership rate
  const homeownershipRate = (raw.owner_occupied_units && raw.occupied_units_total)
    ? Math.round((raw.owner_occupied_units / raw.occupied_units_total) * 100)
    : null

  // Calcule l'âge médian du logement
  const currentYear = new Date().getFullYear()
  const medianHomeAge = raw.median_year_built
    ? currentYear - raw.median_year_built
    : null

  return {
    population: raw.population,
    median_household_income: raw.median_household_income,
    median_home_value: raw.median_home_value,
    median_year_built: raw.median_year_built,
    median_home_age_years: medianHomeAge,
    total_housing_units: raw.total_housing_units,
    homeownership_rate_pct: homeownershipRate,
    // Champs display-ready pour injection directe dans le contenu
    display: {
      population: raw.population
        ? raw.population.toLocaleString('en-US')
        : null,
      median_household_income: raw.median_household_income
        ? `$${raw.median_household_income.toLocaleString('en-US')}`
        : null,
      median_home_value: raw.median_home_value
        ? `$${raw.median_home_value.toLocaleString('en-US')}`
        : null,
      median_year_built: raw.median_year_built
        ? String(raw.median_year_built)
        : null,
      median_home_age: medianHomeAge
        ? `${medianHomeAge} years old on average`
        : null,
      total_housing_units: raw.total_housing_units
        ? raw.total_housing_units.toLocaleString('en-US')
        : null,
      homeownership_rate: homeownershipRate
        ? `${homeownershipRate}%`
        : null,
    },
    fetched_at: new Date().toISOString(),
    source: `US Census ACS5 ${ACS_YEAR}`,
  }
}

// ─── MAIN LOGIC ───────────────────────────────────────────────────────────────

async function processState(stateEntry, placesMap, filterCity) {
  let fetched = 0, notFound = 0, errors = 0

  for (let i = 0; i < stateEntry.cities.length; i++) {
    const cityName = stateEntry.cities[i]

    // Support ancien format (string) et nouveau format (object)
    const isObject = typeof cityName === 'object'
    const name = isObject ? cityName.name : cityName
    const citySlug = slugify(name)

    // Filter par ville si demandé
    if (filterCity && citySlug !== slugify(filterCity)) continue

    // Skip si déjà fetché (--stale-only)
    const existing = isObject ? cityName.census : null
    if (existing?.fetched_at) continue

    // Cherche le FIPS dans la map des places
    const placeInfo = placesMap[citySlug]
      || placesMap[slugify(name.replace(/\s+/g, ' '))]

    if (!placeInfo) {
      // Essai avec variantes communes
      const variants = [
        citySlug + '-city',
        citySlug.replace(/-/g, ' '),
      ]
      const found = variants.find(v => placesMap[v])

      if (!found) {
        console.log(`    ⚠  ${name} — not found in Census places`)
        notFound++

        // Marque comme introuvable pour ne pas réessayer
        const censusData = { not_found: true, fetched_at: new Date().toISOString() }
        if (isObject) {
          stateEntry.cities[i].census = censusData
        } else {
          stateEntry.cities[i] = { name, census: censusData }
        }
        continue
      }
    }

    const stateFips = STATE_FIPS[stateEntry.state]
    const placeFips = (placeInfo || placesMap[Object.keys(placesMap).find(k => k.includes(citySlug))])?.fips

    if (!placeFips) { notFound++; continue }

    try {
      await sleep(100) // rate limiting doux
      const censusData = await getCityData(stateFips, placeFips)

      if (censusData) {
        if (isObject) {
          stateEntry.cities[i].census = censusData
        } else {
          stateEntry.cities[i] = { name, census: censusData }
        }
        fetched++
        console.log(`    ✅ ${name} — pop: ${censusData.display.population}, income: ${censusData.display.median_household_income}`)
      }
    } catch (err) {
      console.error(`    ❌ ${name} — ${err.message}`)
      errors++
    }
  }

  return { fetched, notFound, errors }
}

// ─── CLI RUNNER ───────────────────────────────────────────────────────────────

async function main() {
  if (!CENSUS_API_KEY) {
    console.error(`
❌ Missing CENSUS_API_KEY

Obtiens ta clé gratuite ici (30 secondes, pas de CB) :
→ https://api.census.gov/data/key_signup.html

Puis relance :
CENSUS_API_KEY=your-key node scripts/fetch-census.js
    `)
    process.exit(1)
  }

  const args = process.argv.slice(2)
  const getArg = (flag) => {
    const i = args.indexOf(flag)
    return i !== -1 ? args[i + 1] : null
  }

  const filterState = getArg('--state')
  const filterCity = getArg('--city')
  const staleOnly = args.includes('--stale-only')

  // Charge cities.json
  const citiesData = JSON.parse(fs.readFileSync(CITIES_JSON, 'utf8'))

  console.log('\n🏛  US Census ACS5 fetch starting...\n')

  let totalFetched = 0, totalNotFound = 0, totalErrors = 0

  for (const stateEntry of citiesData.states) {
    if (filterState && slugify(stateEntry.state) !== slugify(filterState)) continue

    const stateFips = STATE_FIPS[stateEntry.state]
    if (!stateFips) {
      console.warn(`⚠  No FIPS for ${stateEntry.state}`)
      continue
    }

    console.log(`\n📍 ${stateEntry.state} (${stateEntry.cities.length} cities)`)

    // Récupère toutes les places Census de cet état (1 appel API pour tout l'état)
    console.log(`   Fetching Census places list...`)
    let placesMap = {}
    try {
      placesMap = await getStatePlaces(stateFips)
      console.log(`   ${Object.keys(placesMap).length} places found in Census`)
    } catch (err) {
      console.error(`   ❌ Failed to get places for ${stateEntry.state}: ${err.message}`)
      continue
    }

    // Process chaque ville
    const stats = await processState(stateEntry, placesMap, filterCity)
    totalFetched += stats.fetched
    totalNotFound += stats.notFound
    totalErrors += stats.errors

    // Sauvegarde après chaque état (évite de perdre le travail)
    fs.writeFileSync(CITIES_JSON, JSON.stringify(citiesData, null, 2))
    console.log(`   💾 Saved — ${stats.fetched} fetched, ${stats.notFound} not found, ${stats.errors} errors`)

    await sleep(500) // pause entre états
  }

  // Sauvegarde finale
  fs.writeFileSync(CITIES_JSON, JSON.stringify(citiesData, null, 2))

  console.log(`
═══════════════════════════════════════
✅ Census fetch complete
   ${totalFetched} cities enriched
   ${totalNotFound} not found in Census
   ${totalErrors} errors
   Output: ${CITIES_JSON}
═══════════════════════════════════════
  `)
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
