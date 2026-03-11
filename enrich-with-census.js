#!/usr/bin/env node
/**
 * enrich-with-census.js
 *
 * Enrichit us_seo_home_improvement_4128_cities.json avec les données
 * US Census ACS5 pour chaque état ET chaque ville.
 *
 * CLÉ GRATUITE (pas de CB) : https://api.census.gov/data/key_signup.html
 *
 * Usage :
 *   node enrich-with-census.js --key YOUR_KEY
 *   node enrich-with-census.js --key YOUR_KEY --state alabama
 *   node enrich-with-census.js --key YOUR_KEY --state alabama --city birmingham
 *   node enrich-with-census.js --key YOUR_KEY --skip-done   (reprend où ça s'est arrêté)
 *
 * Output : même fichier JSON enrichi avec census_state + census_city sur chaque entrée
 */

const fs    = require('fs')
const https = require('https')
const path  = require('path')

// ─── ARGS ─────────────────────────────────────────────────────────────────────

const args        = process.argv.slice(2)
const getArg      = f => { const i = args.indexOf(f); return i !== -1 ? args[i+1] : null }
const API_KEY     = getArg('--key') || process.env.CENSUS_API_KEY
const FILTER_STATE = getArg('--state')
const FILTER_CITY  = getArg('--city')
const SKIP_DONE    = args.includes('--skip-done')

const INPUT_FILE  = path.join(__dirname, 'us_seo_home_improvement_4128_cities.json')

if (!API_KEY) {
  console.error(`
❌  Clé Census manquante.

Obtiens ta clé GRATUITE ici (30 sec, pas de CB) :
→  https://api.census.gov/data/key_signup.html

Puis relance :
   node enrich-with-census.js --key TA_CLE
  `)
  process.exit(1)
}

if (!fs.existsSync(INPUT_FILE)) {
  console.error(`❌  Fichier introuvable : ${INPUT_FILE}`)
  process.exit(1)
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const sleep   = ms => new Promise(r => setTimeout(r, ms))
const fmt     = (n, type) => {
  if (!n || n < 0) return null
  if (type === '$') return '$' + Math.round(n).toLocaleString('en-US')
  if (type === '%') return n + '%'
  return Math.round(n).toLocaleString('en-US')
}

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let d = ''
      res.on('data', c => d += c)
      res.on('end', () => {
        try { resolve(JSON.parse(d)) }
        catch(e) { reject(new Error('Parse error: ' + d.slice(0, 200))) }
      })
    }).on('error', reject)
  })
}

// ─── FIPS ─────────────────────────────────────────────────────────────────────

const FIPS = {
  'Alabama':'01','Alaska':'02','Arizona':'04','Arkansas':'05','California':'06',
  'Colorado':'08','Connecticut':'09','Delaware':'10','Florida':'12','Georgia':'13',
  'Hawaii':'15','Idaho':'16','Illinois':'17','Indiana':'18','Iowa':'19','Kansas':'20',
  'Kentucky':'21','Louisiana':'22','Maine':'23','Maryland':'24','Massachusetts':'25',
  'Michigan':'26','Minnesota':'27','Mississippi':'28','Missouri':'29','Montana':'30',
  'Nebraska':'31','Nevada':'32','New Hampshire':'33','New Jersey':'34','New Mexico':'35',
  'New York':'36','North Carolina':'37','North Dakota':'38','Ohio':'39','Oklahoma':'40',
  'Oregon':'41','Pennsylvania':'42','Rhode Island':'44','South Carolina':'45',
  'South Dakota':'46','Tennessee':'47','Texas':'48','Utah':'49','Vermont':'50',
  'Virginia':'51','Washington':'53','West Virginia':'54','Wisconsin':'55','Wyoming':'56',
}

// ─── CLIMATE (statique par état) ──────────────────────────────────────────────

const CLIMATE = {
  'Alabama':{'zone':'Humid Subtropical','annual_rain_in':56,'freeze_days':20,'plumbing_impact':'High rainfall and humidity accelerate pipe corrosion and tree root intrusion in sewer lines.'},
  'Alaska':{'zone':'Subarctic','annual_rain_in':16,'freeze_days':200,'plumbing_impact':'Extreme freeze risk. Exposed pipes require insulation and heat tape year-round.'},
  'Arizona':{'zone':'Desert','annual_rain_in':12,'freeze_days':20,'plumbing_impact':'Hard water accelerates water heater failure and causes mineral buildup in pipes.'},
  'Arkansas':{'zone':'Humid Subtropical','annual_rain_in':50,'freeze_days':25,'plumbing_impact':'High humidity and rainfall stress drain lines. Root intrusion common in older neighborhoods.'},
  'California':{'zone':'Mediterranean','annual_rain_in':22,'freeze_days':5,'plumbing_impact':'Drought causes soil shifting that stresses underground pipes. Hard water in inland areas.'},
  'Colorado':{'zone':'Semi-Arid','annual_rain_in':18,'freeze_days':80,'plumbing_impact':'Freeze-thaw cycles stress pipe joints. Hard water causes mineral buildup in water heaters.'},
  'Connecticut':{'zone':'Humid Continental','annual_rain_in':48,'freeze_days':100,'plumbing_impact':'Freeze-thaw cycles cause pipe bursts. Spring thaw overwhelms older drain systems.'},
  'Delaware':{'zone':'Humid Subtropical','annual_rain_in':46,'freeze_days':50,'plumbing_impact':'Moderate freeze risk combined with humidity accelerates corrosion in older pipes.'},
  'Florida':{'zone':'Humid Subtropical','annual_rain_in':54,'freeze_days':5,'plumbing_impact':'Year-round heat and heavy summer rainfall stress drain and sewer systems constantly.'},
  'Georgia':{'zone':'Humid Subtropical','annual_rain_in':50,'freeze_days':20,'plumbing_impact':'High rainfall accelerates root intrusion. Older Atlanta-area homes commonly need sewer assessments.'},
  'Hawaii':{'zone':'Tropical','annual_rain_in':68,'freeze_days':0,'plumbing_impact':'Extreme humidity and salt air accelerate corrosion. Galvanized pipes deteriorate rapidly.'},
  'Idaho':{'zone':'Semi-Arid','annual_rain_in':19,'freeze_days':90,'plumbing_impact':'Hard water and freeze-thaw cycles are primary concerns for pipes and water heaters.'},
  'Illinois':{'zone':'Humid Continental','annual_rain_in':38,'freeze_days':100,'plumbing_impact':'Deep freeze winters cause annual pipe burst risks. Older Chicago-area homes have aging infrastructure.'},
  'Indiana':{'zone':'Humid Continental','annual_rain_in':42,'freeze_days':95,'plumbing_impact':'Freeze-thaw cycles and spring flooding stress both drain lines and sewer systems.'},
  'Iowa':{'zone':'Humid Continental','annual_rain_in':36,'freeze_days':110,'plumbing_impact':'Harsh winters create significant pipe freeze risk. Spring thaw commonly overwhelms older drains.'},
  'Kansas':{'zone':'Humid Continental','annual_rain_in':34,'freeze_days':90,'plumbing_impact':'Temperature extremes stress pipe materials. Hard water in western Kansas degrades water heaters.'},
  'Kentucky':{'zone':'Humid Subtropical','annual_rain_in':48,'freeze_days':40,'plumbing_impact':'High humidity and moderate freeze risk. Older Louisville and Lexington neighborhoods have aging sewer lines.'},
  'Louisiana':{'zone':'Humid Subtropical','annual_rain_in':60,'freeze_days':10,'plumbing_impact':'Highest rainfall in the contiguous US. Sewer systems under constant stress. Root intrusion very common.'},
  'Maine':{'zone':'Humid Continental','annual_rain_in':46,'freeze_days':130,'plumbing_impact':'Severe winters create high pipe freeze risk. Older housing stock needs annual plumbing checks.'},
  'Maryland':{'zone':'Humid Subtropical','annual_rain_in':44,'freeze_days':50,'plumbing_impact':'Freeze risk in winter combined with summer humidity. Older Baltimore-area homes commonly need repiping.'},
  'Massachusetts':{'zone':'Humid Continental','annual_rain_in':48,'freeze_days':100,'plumbing_impact':'Freeze-thaw cycles are severe. Older New England housing stock has high rate of aging pipe systems.'},
  'Michigan':{'zone':'Humid Continental','annual_rain_in':34,'freeze_days':120,'plumbing_impact':'Long cold winters create freeze risk. Older Detroit-area homes frequently need repiping assessments.'},
  'Minnesota':{'zone':'Humid Continental','annual_rain_in':30,'freeze_days':150,'plumbing_impact':'Among the harshest freeze conditions in the US. Pipe insulation is standard requirement in all homes.'},
  'Mississippi':{'zone':'Humid Subtropical','annual_rain_in':56,'freeze_days':15,'plumbing_impact':'High humidity and rainfall accelerate corrosion. Older neighborhoods commonly have clay sewer lines.'},
  'Missouri':{'zone':'Humid Continental','annual_rain_in':42,'freeze_days':80,'plumbing_impact':'Freeze risk in winter, heavy rain in spring. Older St. Louis and Kansas City homes need regular sewer checks.'},
  'Montana':{'zone':'Semi-Arid','annual_rain_in':16,'freeze_days':140,'plumbing_impact':'Extreme cold and freeze-thaw cycles are primary risks. Pipe insulation critical in all homes.'},
  'Nebraska':{'zone':'Humid Continental','annual_rain_in':28,'freeze_days':100,'plumbing_impact':'Hard water combined with freeze risk stresses both water heaters and pipe joints.'},
  'Nevada':{'zone':'Desert','annual_rain_in':10,'freeze_days':25,'plumbing_impact':'Hardest water in the US. Water heaters fail faster here than almost anywhere. Tankless units need frequent descaling.'},
  'New Hampshire':{'zone':'Humid Continental','annual_rain_in':46,'freeze_days':120,'plumbing_impact':'Severe winters. Older New England homes have high rate of galvanized and polybutylene pipes.'},
  'New Jersey':{'zone':'Humid Subtropical','annual_rain_in':46,'freeze_days':60,'plumbing_impact':'Freeze risk plus high humidity. Dense older housing stock in many NJ cities needs regular plumbing updates.'},
  'New Mexico':{'zone':'Desert','annual_rain_in':14,'freeze_days':35,'plumbing_impact':'Hard water is the dominant plumbing issue. Mineral buildup in pipes and water heaters is accelerated.'},
  'New York':{'zone':'Humid Continental','annual_rain_in':46,'freeze_days':100,'plumbing_impact':'Freeze-thaw cycles affect upstate heavily. NYC has some of the oldest housing stock in the US.'},
  'North Carolina':{'zone':'Humid Subtropical','annual_rain_in':50,'freeze_days':25,'plumbing_impact':'High humidity and rainfall. Growing housing market means new and old stock mixed — wide range of plumbing needs.'},
  'North Dakota':{'zone':'Humid Continental','annual_rain_in':18,'freeze_days':160,'plumbing_impact':'Extreme freeze conditions. Pipe insulation and heat tape are not optional — they are standard requirements.'},
  'Ohio':{'zone':'Humid Continental','annual_rain_in':40,'freeze_days':95,'plumbing_impact':'Freeze-thaw cycles and spring rain stress older drain systems. Older Cleveland and Columbus homes need regular checks.'},
  'Oklahoma':{'zone':'Humid Subtropical','annual_rain_in':36,'freeze_days':40,'plumbing_impact':'Ice storms create sudden freeze pipe risk. High humidity in summer accelerates corrosion.'},
  'Oregon':{'zone':'Oceanic','annual_rain_in':44,'freeze_days':15,'plumbing_impact':'Persistent rainfall stresses sewer systems. High moisture accelerates corrosion in older pipes.'},
  'Pennsylvania':{'zone':'Humid Continental','annual_rain_in':42,'freeze_days':90,'plumbing_impact':'Freeze-thaw cycles stress pipe joints. Older Philadelphia and Pittsburgh housing stock has high repiping demand.'},
  'Rhode Island':{'zone':'Humid Continental','annual_rain_in':48,'freeze_days':100,'plumbing_impact':'Small state but high density of older homes with aging pipe systems. Freeze risk is significant.'},
  'South Carolina':{'zone':'Humid Subtropical','annual_rain_in':50,'freeze_days':20,'plumbing_impact':'High humidity and rainfall accelerate root intrusion. Growing coastal communities have newer stock.'},
  'South Dakota':{'zone':'Humid Continental','annual_rain_in':20,'freeze_days':130,'plumbing_impact':'Harsh winters and hard water are both primary plumbing concerns for South Dakota homeowners.'},
  'Tennessee':{'zone':'Humid Subtropical','annual_rain_in':54,'freeze_days':25,'plumbing_impact':'High rainfall and humidity. Nashville and Memphis metro areas have significant older housing stock.'},
  'Texas':{'zone':'Varied','annual_rain_in':30,'freeze_days':20,'plumbing_impact':'Gulf Coast: humidity stresses drains. West Texas: hard water degrades water heaters. North Texas: freeze events cause annual pipe burst emergencies.'},
  'Utah':{'zone':'Desert','annual_rain_in':14,'freeze_days':55,'plumbing_impact':'Hard water is a major issue statewide. Water heaters fail faster and need more frequent maintenance.'},
  'Vermont':{'zone':'Humid Continental','annual_rain_in':42,'freeze_days':140,'plumbing_impact':'Severe winters. Vermont has one of the oldest housing stocks in the US — high repiping and sewer demand.'},
  'Virginia':{'zone':'Humid Subtropical','annual_rain_in':44,'freeze_days':45,'plumbing_impact':'Moderate freeze risk plus humidity. Northern Virginia newer stock; older Richmond and coastal areas have aging systems.'},
  'Washington':{'zone':'Oceanic','annual_rain_in':44,'freeze_days':20,'plumbing_impact':'Persistent rainfall and moisture stress sewer systems. Western WA has very high root intrusion rates.'},
  'West Virginia':{'zone':'Humid Continental','annual_rain_in':44,'freeze_days':70,'plumbing_impact':'Freeze risk combined with aging housing stock. WV has some of the oldest median home ages in the US.'},
  'Wisconsin':{'zone':'Humid Continental','annual_rain_in':34,'freeze_days':130,'plumbing_impact':'Long harsh winters create significant freeze risk. Older Milwaukee-area homes frequently need repiping.'},
  'Wyoming':{'zone':'Semi-Arid','annual_rain_in':14,'freeze_days':130,'plumbing_impact':'Extreme cold and hard water. Freeze pipe events are common in rural areas without proper insulation.'},
}

// ─── PERMITS (statique) ───────────────────────────────────────────────────────

const PERMITS = {
  'Alabama':       'Licensed by the Alabama Plumbers and Gas Fitters Examining Board. Permits at county level.',
  'Alaska':        'State journeyman or master license required. All work permitted.',
  'Arizona':       'Arizona Registrar of Contractors license required. Permits at city/county level.',
  'Arkansas':      'Arkansas State Board of Plumbing Examiners license required.',
  'California':    'C-36 Plumbing Contractor license (CSLB) required. Strict permit enforcement statewide.',
  'Colorado':      'State license required. Local permits vary by municipality.',
  'Connecticut':   'P-1 or P-2 license required. Permits at local level.',
  'Delaware':      'Delaware Division of Professional Regulation license required.',
  'Florida':       'State-certified or county-registered license required. Hurricane code compliance applies.',
  'Georgia':       'Georgia State Construction Industry Licensing Board license required. County permits.',
  'Hawaii':        'Hawaii DCCA license required. All islands enforce permits strictly.',
  'Idaho':         'Idaho Division of Building Safety journeyman license required.',
  'Illinois':      'No statewide license — regulated at city/county level. Chicago has strict local requirements.',
  'Indiana':       'Indiana Plumbing Commission state license required.',
  'Iowa':          'Iowa Plumbing and Mechanical Systems Board license required.',
  'Kansas':        'State license required. Permits at local level.',
  'Kentucky':      'Kentucky Department of Housing, Buildings and Construction license required.',
  'Louisiana':     'Louisiana State Plumbing Board license required. Permits at parish level.',
  'Maine':         'Maine Plumbers Examining Board license required.',
  'Maryland':      'State license required. WSSC permit required in Prince George\'s and Montgomery counties.',
  'Massachusetts': 'State license strictly enforced. Permits required for all work including water heaters.',
  'Michigan':      'Michigan LARA state plumbing license required.',
  'Minnesota':     'Minnesota Department of Labor and Industry license required. Strict enforcement.',
  'Mississippi':   'Mississippi State Board of Contractors license required.',
  'Missouri':      'No statewide license — regulated at city level. St. Louis and Kansas City have local requirements.',
  'Montana':       'Montana Department of Labor and Industry license required.',
  'Nebraska':      'Nebraska Plumbing Board state license required.',
  'Nevada':        'Nevada State Contractors Board C-1 license required. County permits.',
  'New Hampshire': 'NH Office of Professional Licensure and Certification license required.',
  'New Jersey':    'Master plumber license required. Municipal permits.',
  'New Mexico':    'New Mexico Regulation and Licensing Department license required.',
  'New York':      'NYC has separate strict licensing. Upstate varies by county.',
  'North Carolina':'NC State Board of Examiners of Plumbing, Heating and Fire Sprinkler Contractors license required.',
  'North Dakota':  'North Dakota State Plumbing Board license required.',
  'Ohio':          'Ohio Construction Industry Licensing Board license required. County permits.',
  'Oklahoma':      'Oklahoma Construction Industries Board license required.',
  'Oregon':        'Oregon Building Codes Division license required. All work requires permits.',
  'Pennsylvania':  'No statewide license. Philadelphia and Pittsburgh have local requirements.',
  'Rhode Island':  'Rhode Island Contractors Registration and Licensing Board license required.',
  'South Carolina':'South Carolina Contractors Licensing Board license required.',
  'South Dakota':  'South Dakota State Plumbing Commission license required.',
  'Tennessee':     'State license required for jobs over $25,000. Local permits for smaller jobs.',
  'Texas':         'Texas State Board of Plumbing Examiners license required. City-level permits.',
  'Utah':          'Utah Division of Occupational and Professional Licensing license required.',
  'Vermont':       'Vermont Office of Professional Regulation license required.',
  'Virginia':      'Virginia DPOR license required. Local permits.',
  'Washington':    'Washington L&I license strictly enforced. All work requires permits.',
  'West Virginia': 'West Virginia Division of Labor license required.',
  'Wisconsin':     'Wisconsin DSPS license required.',
  'Wyoming':       'Wyoming Plumbing Board license required.',
}

// ─── CENSUS API ───────────────────────────────────────────────────────────────

const ACS = 'https://api.census.gov/data/2022/acs/acs5'

// Variables ACS5
const STATE_VARS = [
  'B01003_001E',  // population
  'B19013_001E',  // median household income
  'B25077_001E',  // median home value
  'B25035_001E',  // median year built
  'B25001_001E',  // total housing units
  'B25003_001E',  // occupied units total
  'B25003_002E',  // owner occupied
  'B25034_010E',  // built 1979 or earlier
  'B25034_001E',  // total units (for % calc)
].join(',')

const CITY_VARS = [
  'B01003_001E',  // population
  'B19013_001E',  // median household income
  'B25077_001E',  // median home value
  'B25035_001E',  // median year built
  'B25001_001E',  // total housing units
  'B25003_001E',  // occupied units total
  'B25003_002E',  // owner occupied
].join(',')

function parseStateRow(headers, row) {
  const v = k => { const i = headers.indexOf(k); return i !== -1 ? (parseInt(row[i]) || null) : null }

  const pop       = v('B01003_001E')
  const income    = v('B19013_001E')
  const homeVal   = v('B25077_001E')
  const yearBuilt = v('B25035_001E')
  const units     = v('B25001_001E')
  const occupied  = v('B25003_001E')
  const owned     = v('B25003_002E')
  const pre1980   = v('B25034_010E')
  const totalPct  = v('B25034_001E')

  const ownRate   = (owned && occupied) ? Math.round(owned / occupied * 100) : null
  const pre80Pct  = (pre1980 && totalPct) ? Math.round(pre1980 / totalPct * 100) : null
  const homeAge   = yearBuilt ? new Date().getFullYear() - yearBuilt : null

  return {
    population:                pop,
    median_household_income:   income,
    median_home_value:         homeVal,
    median_year_built:         yearBuilt,
    median_home_age_years:     homeAge,
    total_housing_units:       units,
    homeownership_rate_pct:    ownRate,
    pct_homes_built_pre1980:   pre80Pct,
    display: {
      population:               fmt(pop),
      median_household_income:  fmt(income, '$'),
      median_home_value:        fmt(homeVal, '$'),
      median_year_built:        yearBuilt ? String(yearBuilt) : null,
      median_home_age:          homeAge ? `${homeAge} yrs` : null,
      total_housing_units:      fmt(units),
      homeownership_rate:       fmt(ownRate, '%'),
      pct_homes_pre1980:        pre80Pct ? `${pre80Pct}%` : null,
    },
  }
}

function parseCityRow(headers, row) {
  const v = k => { const i = headers.indexOf(k); return i !== -1 ? (parseInt(row[i]) || null) : null }

  const pop       = v('B01003_001E')
  const income    = v('B19013_001E')
  const homeVal   = v('B25077_001E')
  const yearBuilt = v('B25035_001E')
  const units     = v('B25001_001E')
  const occupied  = v('B25003_001E')
  const owned     = v('B25003_002E')

  const ownRate   = (owned && occupied) ? Math.round(owned / occupied * 100) : null
  const homeAge   = yearBuilt ? new Date().getFullYear() - yearBuilt : null

  return {
    population:                pop,
    median_household_income:   income,
    median_home_value:         homeVal,
    median_year_built:         yearBuilt,
    median_home_age_years:     homeAge,
    total_housing_units:       units,
    homeownership_rate_pct:    ownRate,
    display: {
      population:               fmt(pop),
      median_household_income:  fmt(income, '$'),
      median_home_value:        fmt(homeVal, '$'),
      median_year_built:        yearBuilt ? String(yearBuilt) : null,
      median_home_age:          homeAge ? `${homeAge} yrs` : null,
      total_housing_units:      fmt(units),
      homeownership_rate:       fmt(ownRate, '%'),
    },
  }
}

async function fetchStateCensus(fips) {
  const url = `${ACS}?get=NAME,${STATE_VARS}&for=state:${fips}&key=${API_KEY}`
  const data = await get(url)
  if (!Array.isArray(data) || data.length < 2) return null
  return parseStateRow(data[0], data[1])
}

async function fetchAllCityPlaces(fips) {
  // Récupère toutes les "places" Census d'un état (1 seul appel pour tout l'état)
  const url = `${ACS}?get=NAME,${CITY_VARS}&for=place:*&in=state:${fips}&key=${API_KEY}`
  const data = await get(url)
  if (!Array.isArray(data) || data.length < 2) return {}

  const headers = data[0]
  const map = {}

  for (let i = 1; i < data.length; i++) {
    const row      = data[i]
    const nameIdx  = headers.indexOf('NAME')
    const fullName = row[nameIdx] || ''

    // "Birmingham city, Alabama" → "birmingham"
    const cityName = fullName
      .replace(/\s+(city|town|village|borough|CDP|municipality|township|consolidated government|unified government|metro government|urban county|charter township|census-designated place),.*$/i, '')
      .trim()

    const slug = slugify(cityName)
    if (!map[slug]) {
      map[slug] = parseCityRow(headers, row)
    }
  }

  return map
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🏛  Census enrichment starting...')
  console.log(`   Input  : ${INPUT_FILE}`)
  console.log(`   Mode   : ${SKIP_DONE ? 'skip already enriched' : 'enrich all'}`)
  if (FILTER_STATE) console.log(`   Filter : state = ${FILTER_STATE}`)
  if (FILTER_CITY)  console.log(`   Filter : city  = ${FILTER_CITY}`)
  console.log()

  const data = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'))

  let statesProcessed = 0, citiesEnriched = 0, citiesNotFound = 0

  for (const stateEntry of data.states) {
    // Filter
    if (FILTER_STATE && slugify(stateEntry.state) !== slugify(FILTER_STATE)) continue

    const fips = FIPS[stateEntry.state]
    if (!fips) { console.warn(`⚠  No FIPS for ${stateEntry.state}`); continue }

    // Skip state if already done
    if (SKIP_DONE && stateEntry.census_state) {
      console.log(`⏭  ${stateEntry.state} — skip (done)`)
      continue
    }

    console.log(`\n📍 ${stateEntry.state}`)

    // ── 1. State-level Census ──────────────────────────────────────────────
    process.stdout.write('   State census... ')
    try {
      const stateCensus = await fetchStateCensus(fips)
      stateEntry.census_state = stateCensus
        ? { ...stateCensus, permits: PERMITS[stateEntry.state] || null, climate: CLIMATE[stateEntry.state] || null, fetched_at: new Date().toISOString() }
        : null
      console.log(stateCensus
        ? `✅  pop=${stateCensus.display.population}  pre1980=${stateCensus.display.pct_homes_pre1980}  own=${stateCensus.display.homeownership_rate}`
        : '⚠  no data')
    } catch(e) {
      stateEntry.census_state = null
      console.log(`❌  ${e.message}`)
    }

    await sleep(300)

    // ── 2. Fetch toutes les places Census de l'état (1 seul appel) ─────────
    process.stdout.write('   City places... ')
    let placesMap = {}
    try {
      placesMap = await fetchAllCityPlaces(fips)
      console.log(`✅  ${Object.keys(placesMap).length} places`)
    } catch(e) {
      console.log(`❌  ${e.message}`)
    }

    await sleep(300)

    // ── 3. Match chaque ville ──────────────────────────────────────────────
    let found = 0, notFound = 0
    const newCities = []

    for (const cityRaw of stateEntry.cities) {
      // Après un premier run, cities peut contenir des objets { name, census_city }
      const cityName = typeof cityRaw === 'string' ? cityRaw : (cityRaw?.name ?? '')
      if (!cityName) {
        newCities.push(cityRaw)
        continue
      }

      if (FILTER_CITY && slugify(cityName) !== slugify(FILTER_CITY)) {
        newCities.push(cityRaw)
        continue
      }

      const slug    = slugify(cityName)
      const census  = placesMap[slug] || null

      if (census) {
        found++
        newCities.push({ name: cityName, census_city: { ...census, fetched_at: new Date().toISOString() } })
      } else {
        notFound++
        newCities.push(typeof cityRaw === 'object' && cityRaw !== null && 'name' in cityRaw ? cityRaw : cityName)
      }
    }

    stateEntry.cities = newCities
    citiesEnriched  += found
    citiesNotFound  += notFound
    console.log(`   Cities: ✅ ${found} enriched  ⚠ ${notFound} not found`)

    statesProcessed++

    // Sauvegarde après chaque état (protection contre interruption)
    data.meta.census_enriched_at = new Date().toISOString()
    fs.writeFileSync(INPUT_FILE, JSON.stringify(data, null, 2))
    console.log(`   💾 Saved`)

    await sleep(400)
  }

  // Sauvegarde finale
  fs.writeFileSync(INPUT_FILE, JSON.stringify(data, null, 2))

  console.log(`
═══════════════════════════════════════════
✅  Done
   States processed : ${statesProcessed}
   Cities enriched  : ${citiesEnriched}
   Cities not found : ${citiesNotFound}
   Output           : ${INPUT_FILE}
═══════════════════════════════════════════
  `)
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1) })
