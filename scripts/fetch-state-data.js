#!/usr/bin/env node
/**
 * scripts/fetch-state-data.js
 *
 * Génère data/states.json avec pour chaque état :
 *   - Stats Census agrégées (population, homeownership, median home value)
 *   - % maisons construites avant 1980
 *   - Top 5 villes par score SEO (home age + homeownership)
 *   - Nombre de villes couvertes
 *   - Données météo/climat (NOAA - gratuit)
 *   - Contexte permis par état (statique, basé sur recherche)
 *
 * Sources :
 *   - US Census ACS5 API (gratuit, clé requise)
 *   - NOAA Climate Normals API (gratuit, sans clé)
 *   - Permit data : statique (varie peu)
 *
 * Usage :
 *   node scripts/fetch-state-data.js
 *   node scripts/fetch-state-data.js --state alabama
 */

const fs   = require('fs')
const path = require('path')
const https = require('https')

const CENSUS_API_KEY = process.env.CENSUS_API_KEY
const CITIES_JSON    = path.join(process.cwd(), 'data', 'cities.json')
const OUTPUT_FILE    = path.join(process.cwd(), 'data', 'states.json')
const ACS_YEAR       = '2022'
const ACS_BASE       = `https://api.census.gov/data/${ACS_YEAR}/acs/acs5`

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let d = ''
      res.on('data', c => d += c)
      res.on('end', () => { try { resolve(JSON.parse(d)) } catch(e) { reject(e) } })
    }).on('error', reject)
  })
}
function fmt(n, type = 'number') {
  if (!n || n < 0) return null
  if (type === 'currency') return '$' + n.toLocaleString('en-US')
  if (type === 'pct')      return n + '%'
  return n.toLocaleString('en-US')
}

// ─── FIPS + STATE META ────────────────────────────────────────────────────────

const STATE_META = {
  'Alabama':        { fips:'01', abbr:'AL', capital:'Montgomery',   climate_zone:'humid_subtropical' },
  'Alaska':         { fips:'02', abbr:'AK', capital:'Juneau',       climate_zone:'subarctic' },
  'Arizona':        { fips:'04', abbr:'AZ', capital:'Phoenix',      climate_zone:'desert' },
  'Arkansas':       { fips:'05', abbr:'AR', capital:'Little Rock',  climate_zone:'humid_subtropical' },
  'California':     { fips:'06', abbr:'CA', capital:'Sacramento',   climate_zone:'mediterranean' },
  'Colorado':       { fips:'08', abbr:'CO', capital:'Denver',       climate_zone:'semi_arid' },
  'Connecticut':    { fips:'09', abbr:'CT', capital:'Hartford',     climate_zone:'humid_continental' },
  'Delaware':       { fips:'10', abbr:'DE', capital:'Dover',        climate_zone:'humid_subtropical' },
  'Florida':        { fips:'12', abbr:'FL', capital:'Tallahassee',  climate_zone:'humid_subtropical' },
  'Georgia':        { fips:'13', abbr:'GA', capital:'Atlanta',      climate_zone:'humid_subtropical' },
  'Hawaii':         { fips:'15', abbr:'HI', capital:'Honolulu',     climate_zone:'tropical' },
  'Idaho':          { fips:'16', abbr:'ID', capital:'Boise',        climate_zone:'semi_arid' },
  'Illinois':       { fips:'17', abbr:'IL', capital:'Springfield',  climate_zone:'humid_continental' },
  'Indiana':        { fips:'18', abbr:'IN', capital:'Indianapolis', climate_zone:'humid_continental' },
  'Iowa':           { fips:'19', abbr:'IA', capital:'Des Moines',   climate_zone:'humid_continental' },
  'Kansas':         { fips:'20', abbr:'KS', capital:'Topeka',       climate_zone:'humid_continental' },
  'Kentucky':       { fips:'21', abbr:'KY', capital:'Frankfort',    climate_zone:'humid_subtropical' },
  'Louisiana':      { fips:'22', abbr:'LA', capital:'Baton Rouge',  climate_zone:'humid_subtropical' },
  'Maine':          { fips:'23', abbr:'ME', capital:'Augusta',      climate_zone:'humid_continental' },
  'Maryland':       { fips:'24', abbr:'MD', capital:'Annapolis',    climate_zone:'humid_subtropical' },
  'Massachusetts':  { fips:'25', abbr:'MA', capital:'Boston',       climate_zone:'humid_continental' },
  'Michigan':       { fips:'26', abbr:'MI', capital:'Lansing',      climate_zone:'humid_continental' },
  'Minnesota':      { fips:'27', abbr:'MN', capital:'Saint Paul',   climate_zone:'humid_continental' },
  'Mississippi':    { fips:'28', abbr:'MS', capital:'Jackson',      climate_zone:'humid_subtropical' },
  'Missouri':       { fips:'29', abbr:'MO', capital:'Jefferson City',climate_zone:'humid_continental' },
  'Montana':        { fips:'30', abbr:'MT', capital:'Helena',       climate_zone:'semi_arid' },
  'Nebraska':       { fips:'31', abbr:'NE', capital:'Lincoln',      climate_zone:'humid_continental' },
  'Nevada':         { fips:'32', abbr:'NV', capital:'Carson City',  climate_zone:'desert' },
  'New Hampshire':  { fips:'33', abbr:'NH', capital:'Concord',      climate_zone:'humid_continental' },
  'New Jersey':     { fips:'34', abbr:'NJ', capital:'Trenton',      climate_zone:'humid_subtropical' },
  'New Mexico':     { fips:'35', abbr:'NM', capital:'Santa Fe',     climate_zone:'desert' },
  'New York':       { fips:'36', abbr:'NY', capital:'Albany',       climate_zone:'humid_continental' },
  'North Carolina': { fips:'37', abbr:'NC', capital:'Raleigh',      climate_zone:'humid_subtropical' },
  'North Dakota':   { fips:'38', abbr:'ND', capital:'Bismarck',     climate_zone:'humid_continental' },
  'Ohio':           { fips:'39', abbr:'OH', capital:'Columbus',     climate_zone:'humid_continental' },
  'Oklahoma':       { fips:'40', abbr:'OK', capital:'Oklahoma City',climate_zone:'humid_subtropical' },
  'Oregon':         { fips:'41', abbr:'OR', capital:'Salem',        climate_zone:'oceanic' },
  'Pennsylvania':   { fips:'42', abbr:'PA', capital:'Harrisburg',   climate_zone:'humid_continental' },
  'Rhode Island':   { fips:'44', abbr:'RI', capital:'Providence',   climate_zone:'humid_continental' },
  'South Carolina': { fips:'45', abbr:'SC', capital:'Columbia',     climate_zone:'humid_subtropical' },
  'South Dakota':   { fips:'46', abbr:'SD', capital:'Pierre',       climate_zone:'humid_continental' },
  'Tennessee':      { fips:'47', abbr:'TN', capital:'Nashville',    climate_zone:'humid_subtropical' },
  'Texas':          { fips:'48', abbr:'TX', capital:'Austin',       climate_zone:'varied' },
  'Utah':           { fips:'49', abbr:'UT', capital:'Salt Lake City',climate_zone:'desert' },
  'Vermont':        { fips:'50', abbr:'VT', capital:'Montpelier',   climate_zone:'humid_continental' },
  'Virginia':       { fips:'51', abbr:'VA', capital:'Richmond',     climate_zone:'humid_subtropical' },
  'Washington':     { fips:'53', abbr:'WA', capital:'Olympia',      climate_zone:'oceanic' },
  'West Virginia':  { fips:'54', abbr:'WV', capital:'Charleston',   climate_zone:'humid_continental' },
  'Wisconsin':      { fips:'55', abbr:'WI', capital:'Madison',      climate_zone:'humid_continental' },
  'Wyoming':        { fips:'56', abbr:'WY', capital:'Cheyenne',     climate_zone:'semi_arid' },
}

// ─── PERMIT DATA (statique) ───────────────────────────────────────────────────
// Recherche compilée — varie peu, mise à jour annuelle suffisante

const STATE_PERMITS = {
  'Alabama':        { board: 'Alabama Plumbers and Gas Fitters Examining Board', requires_license: true, permit_required: true, notes: 'State license required. Permits pulled at county level.' },
  'Alaska':         { board: 'Alaska Division of Corporations, Business & Professional Licensing', requires_license: true, permit_required: true, notes: 'State journeyman or master license required.' },
  'Arizona':        { board: 'Arizona Registrar of Contractors', requires_license: true, permit_required: true, notes: 'ROC license required. Permits at city/county level.' },
  'Arkansas':       { board: 'Arkansas State Board of Plumbing Examiners', requires_license: true, permit_required: true, notes: 'State plumbing license required for all work.' },
  'California':     { board: 'California Contractors State License Board (CSLB)', requires_license: true, permit_required: true, notes: 'C-36 Plumbing Contractor license required. Strict permit enforcement.' },
  'Colorado':       { board: 'Colorado Department of Regulatory Agencies', requires_license: true, permit_required: true, notes: 'State license required. Local permits vary by municipality.' },
  'Connecticut':    { board: 'Connecticut Department of Consumer Protection', requires_license: true, permit_required: true, notes: 'P-1 or P-2 license required. Permits at local level.' },
  'Delaware':       { board: 'Delaware Division of Professional Regulation', requires_license: true, permit_required: true, notes: 'State plumbing license required.' },
  'Florida':        { board: 'Florida Department of Business and Professional Regulation', requires_license: true, permit_required: true, notes: 'State-certified or county-registered license. Strict hurricane code compliance.' },
  'Georgia':        { board: 'Georgia State Construction Industry Licensing Board', requires_license: true, permit_required: true, notes: 'State license required. Permits at county level.' },
  'Hawaii':         { board: 'Hawaii Department of Commerce and Consumer Affairs', requires_license: true, permit_required: true, notes: 'State license required. All islands enforce permits.' },
  'Idaho':          { board: 'Idaho Division of Building Safety', requires_license: true, permit_required: true, notes: 'State journeyman license required.' },
  'Illinois':       { board: 'Illinois Department of Public Health', requires_license: false, permit_required: true, notes: 'No statewide license — regulated at city/county level. Chicago has strict local requirements.' },
  'Indiana':        { board: 'Indiana Plumbing Commission', requires_license: true, permit_required: true, notes: 'State plumbing license required.' },
  'Iowa':           { board: 'Iowa Plumbing and Mechanical Systems Board', requires_license: true, permit_required: true, notes: 'State license required for all plumbing work.' },
  'Kansas':         { board: 'Kansas Department of Health and Environment', requires_license: true, permit_required: true, notes: 'State license required. Permits at local level.' },
  'Kentucky':       { board: 'Kentucky Department of Housing, Buildings and Construction', requires_license: true, permit_required: true, notes: 'State license required.' },
  'Louisiana':      { board: 'Louisiana State Plumbing Board', requires_license: true, permit_required: true, notes: 'State license required. Permits at parish level.' },
  'Maine':          { board: 'Maine Plumbers Examining Board', requires_license: true, permit_required: true, notes: 'State license required.' },
  'Maryland':       { board: 'Maryland Board of Master Electricians — WSSC for plumbing', requires_license: true, permit_required: true, notes: 'WSSC permit required in Prince George\'s and Montgomery counties. Local permits elsewhere.' },
  'Massachusetts':  { board: 'Massachusetts Board of State Examiners of Plumbers and Gas Fitters', requires_license: true, permit_required: true, notes: 'State license strictly enforced. Permits required for all work including water heaters.' },
  'Michigan':       { board: 'Michigan Department of Licensing and Regulatory Affairs', requires_license: true, permit_required: true, notes: 'State plumbing license required.' },
  'Minnesota':      { board: 'Minnesota Department of Labor and Industry', requires_license: true, permit_required: true, notes: 'State license required. Strict enforcement.' },
  'Mississippi':    { board: 'Mississippi State Board of Contractors', requires_license: true, permit_required: true, notes: 'State license required.' },
  'Missouri':       { board: 'Missouri Division of Professional Registration', requires_license: false, permit_required: true, notes: 'No statewide license — regulated at city level. St. Louis and Kansas City have local requirements.' },
  'Montana':        { board: 'Montana Department of Labor and Industry', requires_license: true, permit_required: true, notes: 'State plumbing license required.' },
  'Nebraska':       { board: 'Nebraska Plumbing Board', requires_license: true, permit_required: true, notes: 'State license required.' },
  'Nevada':         { board: 'Nevada State Contractors Board', requires_license: true, permit_required: true, notes: 'C-1 license required. Permits at county level.' },
  'New Hampshire':  { board: 'NH Office of Professional Licensure and Certification', requires_license: true, permit_required: true, notes: 'State license required.' },
  'New Jersey':     { board: 'NJ Division of Consumer Affairs — Board of Examiners of Master Plumbers', requires_license: true, permit_required: true, notes: 'Master plumber license required. Municipal permits.' },
  'New Mexico':     { board: 'New Mexico Regulation and Licensing Department', requires_license: true, permit_required: true, notes: 'State license required.' },
  'New York':       { board: 'NY Department of State / local licensing varies', requires_license: true, permit_required: true, notes: 'NYC has separate strict licensing. Upstate varies by county.' },
  'North Carolina': { board: 'North Carolina State Board of Examiners of Plumbing, Heating and Fire Sprinkler Contractors', requires_license: true, permit_required: true, notes: 'State license required.' },
  'North Dakota':   { board: 'North Dakota State Plumbing Board', requires_license: true, permit_required: true, notes: 'State license required.' },
  'Ohio':           { board: 'Ohio Construction Industry Licensing Board', requires_license: true, permit_required: true, notes: 'State license required. County permits.' },
  'Oklahoma':       { board: 'Oklahoma Construction Industries Board', requires_license: true, permit_required: true, notes: 'State license required.' },
  'Oregon':         { board: 'Oregon Building Codes Division', requires_license: true, permit_required: true, notes: 'State license strictly enforced. All work requires permits.' },
  'Pennsylvania':   { board: 'Pennsylvania Attorney General — varies by municipality', requires_license: false, permit_required: true, notes: 'No statewide license. Philadelphia and Pittsburgh have local requirements.' },
  'Rhode Island':   { board: 'Rhode Island Contractors\' Registration and Licensing Board', requires_license: true, permit_required: true, notes: 'State license required.' },
  'South Carolina': { board: 'South Carolina Contractors\' Licensing Board', requires_license: true, permit_required: true, notes: 'State license required.' },
  'South Dakota':   { board: 'South Dakota State Plumbing Commission', requires_license: true, permit_required: true, notes: 'State license required.' },
  'Tennessee':      { board: 'Tennessee Board for Licensing Contractors', requires_license: true, permit_required: true, notes: 'State license required for jobs over $25,000. Local permits for smaller jobs.' },
  'Texas':          { board: 'Texas State Board of Plumbing Examiners', requires_license: true, permit_required: true, notes: 'State license required. Permits at city level. Large metro areas have strict enforcement.' },
  'Utah':           { board: 'Utah Division of Occupational and Professional Licensing', requires_license: true, permit_required: true, notes: 'State license required.' },
  'Vermont':        { board: 'Vermont Office of Professional Regulation', requires_license: true, permit_required: true, notes: 'State license required.' },
  'Virginia':       { board: 'Virginia Department of Professional and Occupational Regulation', requires_license: true, permit_required: true, notes: 'State license required. Local permits.' },
  'Washington':     { board: 'Washington Department of Labor and Industries', requires_license: true, permit_required: true, notes: 'State license strictly enforced. All work requires permits.' },
  'West Virginia':  { board: 'West Virginia Division of Labor', requires_license: true, permit_required: true, notes: 'State license required.' },
  'Wisconsin':      { board: 'Wisconsin Department of Safety and Professional Services', requires_license: true, permit_required: true, notes: 'State license required.' },
  'Wyoming':        { board: 'Wyoming Plumbing Board', requires_license: true, permit_required: true, notes: 'State license required.' },
}

// ─── CLIMATE DATA (statique, basé NOAA normals) ───────────────────────────────
// Impact sur la plomberie par zone climatique

const CLIMATE_IMPACT = {
  humid_subtropical: {
    avg_annual_rainfall_inches: 52,
    freeze_days_per_year: 15,
    humidity_level: 'high',
    primary_risks: ['heavy rainfall stresses drain and sewer lines', 'tree root intrusion accelerated by moisture', 'pipe corrosion from humidity', 'summer heat strains water heaters'],
    plumbing_note: 'High annual rainfall and humidity accelerate pipe corrosion and root intrusion in sewer lines. Homes in this climate typically need sewer inspections every 3–5 years.',
  },
  humid_continental: {
    avg_annual_rainfall_inches: 38,
    freeze_days_per_year: 90,
    humidity_level: 'moderate',
    primary_risks: ['freeze-thaw cycles stress pipe joints', 'pipe bursts during hard freezes', 'spring thaw overwhelms drain capacity', 'aging cast iron corrodes faster'],
    plumbing_note: 'Freeze-thaw cycles are the primary plumbing risk. Homes in this climate should insulate exposed pipes and inspect water heaters annually before winter.',
  },
  desert: {
    avg_annual_rainfall_inches: 12,
    freeze_days_per_year: 20,
    humidity_level: 'low',
    primary_risks: ['hard water accelerates water heater failure', 'mineral buildup in pipes reduces flow', 'extreme heat stresses water heater anodes', 'monsoon season overwhelms drainage'],
    plumbing_note: 'Hard water is the dominant plumbing concern in desert climates — it accelerates water heater failure and causes mineral buildup in pipes. Tankless water heaters require more frequent descaling.',
  },
  semi_arid: {
    avg_annual_rainfall_inches: 18,
    freeze_days_per_year: 45,
    humidity_level: 'low',
    primary_risks: ['hard water and mineral buildup', 'temperature swings stress pipe materials', 'drought-to-flood cycles strain sewer systems'],
    plumbing_note: 'Semi-arid climates combine hard water mineral buildup with significant temperature swings — both accelerate pipe and water heater wear.',
  },
  oceanic: {
    avg_annual_rainfall_inches: 44,
    freeze_days_per_year: 10,
    humidity_level: 'high',
    primary_risks: ['persistent moisture causes pipe corrosion', 'heavy winter rainfall stresses sewer systems', 'mold risk from leaks in humid conditions'],
    plumbing_note: 'Persistent rainfall and humidity in oceanic climates make sewer line maintenance especially important. Root intrusion and pipe corrosion are common in homes over 20 years old.',
  },
  mediterranean: {
    avg_annual_rainfall_inches: 22,
    freeze_days_per_year: 5,
    humidity_level: 'moderate',
    primary_risks: ['drought stress on soil shifts foundations and pipes', 'hard water in inland areas', 'wildfire ash can contaminate water lines'],
    plumbing_note: 'Drought conditions cause soil shifting that stresses underground pipes. California homeowners in older homes should get sewer line inspections every 3–5 years.',
  },
  tropical: {
    avg_annual_rainfall_inches: 68,
    freeze_days_per_year: 0,
    humidity_level: 'very_high',
    primary_risks: ['extreme humidity accelerates all pipe corrosion', 'heavy rainfall overwhelms drainage', 'hard water from volcanic geology', 'salt air corrosion near coast'],
    plumbing_note: 'Tropical humidity and salt air in coastal Hawaii accelerate pipe corrosion significantly. Copper and PEX piping are preferred; galvanized steel deteriorates rapidly.',
  },
  subarctic: {
    avg_annual_rainfall_inches: 16,
    freeze_days_per_year: 200,
    humidity_level: 'low',
    primary_risks: ['permafrost movement stresses foundations and pipes', 'extreme freeze risk for all exposed pipes', 'freeze-thaw cycles severe', 'short construction season limits repair windows'],
    plumbing_note: 'Alaska\'s extreme freeze risk means pipe insulation and heat tape are standard requirements. Any exposed plumbing is at risk — emergency plumbing calls are common during severe cold snaps.',
  },
  varied: {
    avg_annual_rainfall_inches: 30,
    freeze_days_per_year: 30,
    humidity_level: 'moderate',
    primary_risks: ['climate varies significantly by region', 'Gulf Coast: humidity and rainfall stress drains', 'West Texas: hard water and heat stress water heaters', 'North Texas: freeze risk'],
    plumbing_note: 'Texas climate varies significantly by region — Gulf Coast homes face humidity and sewer root intrusion, while West Texas hard water accelerates water heater failure, and North Texas freeze events cause annual pipe burst emergencies.',
  },
}

// ─── CENSUS STATE-LEVEL FETCH ─────────────────────────────────────────────────

async function fetchStateCensus(stateFips) {
  const variables = [
    'B01003_001E',  // population
    'B19013_001E',  // median household income
    'B25077_001E',  // median home value
    'B25035_001E',  // median year built
    'B25001_001E',  // total housing units
    'B25003_001E',  // occupied units
    'B25003_002E',  // owner occupied
    'B25034_010E',  // built 1979 or earlier (proxy for pre-1980)
    'B25034_001E',  // total units for % calc
  ].join(',')

  const url = `${ACS_BASE}?get=NAME,${variables}&for=state:${stateFips}&key=${CENSUS_API_KEY}`
  const data = await httpsGet(url)

  if (!Array.isArray(data) || data.length < 2) return null

  const headers = data[0]
  const row = data[1]

  const get = (v) => {
    const i = headers.indexOf(v)
    return i !== -1 ? parseInt(row[i]) || null : null
  }

  const population            = get('B01003_001E')
  const medianIncome          = get('B19013_001E')
  const medianHomeValue       = get('B25077_001E')
  const medianYearBuilt       = get('B25035_001E')
  const totalHousingUnits     = get('B25001_001E')
  const occupiedUnits         = get('B25003_001E')
  const ownerOccupied         = get('B25003_002E')
  const builtPre1980          = get('B25034_010E')
  const totalForPctCalc       = get('B25034_001E')

  const homeownershipRate = (ownerOccupied && occupiedUnits)
    ? Math.round((ownerOccupied / occupiedUnits) * 100) : null

  const pctPre1980 = (builtPre1980 && totalForPctCalc)
    ? Math.round((builtPre1980 / totalForPctCalc) * 100) : null

  const currentYear = new Date().getFullYear()
  const medianHomeAge = medianYearBuilt ? currentYear - medianYearBuilt : null

  return {
    population,
    median_household_income: medianIncome,
    median_home_value: medianHomeValue,
    median_year_built: medianYearBuilt,
    median_home_age_years: medianHomeAge,
    total_housing_units: totalHousingUnits,
    homeownership_rate_pct: homeownershipRate,
    pct_homes_built_pre1980: pctPre1980,
    display: {
      population:               fmt(population),
      median_household_income:  fmt(medianIncome, 'currency'),
      median_home_value:        fmt(medianHomeValue, 'currency'),
      median_year_built:        medianYearBuilt ? String(medianYearBuilt) : null,
      median_home_age:          medianHomeAge ? `${medianHomeAge} years` : null,
      total_housing_units:      fmt(totalHousingUnits),
      homeownership_rate:       fmt(homeownershipRate, 'pct'),
      pct_homes_pre1980:        pctPre1980 ? `${pctPre1980}%` : null,
    },
  }
}

// ─── TOP 5 CITIES SCORING ─────────────────────────────────────────────────────

function getTop5Cities(stateEntry) {
  const scored = []

  for (const cityEntry of stateEntry.cities) {
    const isObj = typeof cityEntry === 'object'
    const name   = isObj ? cityEntry.name : cityEntry
    const census = isObj ? cityEntry.census : null

    if (!census || census.not_found) continue

    // Score = home age (40%) + homeownership rate (40%) + population (20%)
    const ageScore  = census.median_home_age_years
      ? Math.min(census.median_home_age_years / 60 * 100, 100) : 0
    const ownScore  = census.homeownership_rate_pct || 0
    const popScore  = census.population
      ? Math.min(census.population / 500000 * 100, 100) : 0

    const score = (ageScore * 0.4) + (ownScore * 0.4) + (popScore * 0.2)

    scored.push({
      name,
      slug: slugify(name),
      score: Math.round(score),
      median_year_built:    census.median_year_built,
      homeownership_rate:   census.display?.homeownership_rate,
      population:           census.display?.population,
      median_home_value:    census.display?.median_home_value,
    })
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
}

// ─── CONTENT GENERATOR ───────────────────────────────────────────────────────

function generateStateContent(stateName, stateAbbr, census, permits, climate, citiesCount, top5) {
  const c = census?.display || {}
  const cl = climate || {}

  const content = {}

  // Intro paragraph
  const parts = []
  if (c.population)          parts.push(`a state of ${c.population} residents`)
  if (c.homeownership_rate)  parts.push(`${c.homeownership_rate} homeownership rate`)
  if (c.median_home_value)   parts.push(`median home value of ${c.median_home_value}`)
  content.intro = parts.length
    ? `${stateName} is ${parts.join(', ')} — and ${citiesCount} cities covered by this service.`
    : `${stateName} homeowners across ${citiesCount} cities can get free plumbing quotes through this service.`

  // Housing stock context
  if (census?.pct_homes_built_pre1980 && census.median_year_built) {
    const pct = census.pct_homes_built_pre1980
    if (pct > 40) {
      content.housing_context = `${pct}% of ${stateName} homes were built before 1980 — a significant share of the state's housing stock that may contain aging galvanized or polybutylene pipes. With a statewide median build year of ${census.median_year_built}, repiping assessments and proactive water heater replacements are among the most common plumbing quotes ${stateName} homeowners request.`
    } else if (pct > 20) {
      content.housing_context = `${pct}% of ${stateName} homes predate 1980, with a median build year of ${census.median_year_built}. Older homes in ${stateName} are the most likely candidates for repiping, sewer line assessments, and water heater replacements.`
    } else {
      content.housing_context = `${stateName}'s housing stock has a median build year of ${census.median_year_built}. While newer than many states, homes approaching 30+ years still benefit from plumbing inspections — especially for water heaters, drain lines, and sewer connections.`
    }
  }

  // Climate/plumbing context
  if (cl.plumbing_note) {
    content.climate_context = cl.plumbing_note
  }

  // Permit context
  if (permits) {
    content.permit_context = `In ${stateName}, plumbing work is regulated by the ${permits.board}. ${permits.notes} Getting a quote from a licensed ${stateAbbr} plumber ensures your project is permitted correctly — unlicensed work creates liability for homeowners at resale.`
  }

  // Top 5 cities intro
  if (top5?.length) {
    const cityList = top5.map(c => c.name).join(', ')
    content.top_cities_intro = `Based on homeownership rate and housing age, the highest-demand cities for plumbing quotes in ${stateName} include ${cityList}.`
  }

  return content
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!CENSUS_API_KEY) {
    console.error('❌ Missing CENSUS_API_KEY\nGet your free key at: https://api.census.gov/data/key_signup.html')
    process.exit(1)
  }

  const args       = process.argv.slice(2)
  const filterState = args.includes('--state') ? args[args.indexOf('--state') + 1] : null

  const citiesData = JSON.parse(fs.readFileSync(CITIES_JSON, 'utf8'))

  // Charge states.json existant si présent
  let statesData = { generated_at: null, states: {} }
  if (fs.existsSync(OUTPUT_FILE)) {
    statesData = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'))
  }

  console.log('\n🏛  Fetching state-level data...\n')

  for (const stateEntry of citiesData.states) {
    const stateName = stateEntry.state
    if (filterState && slugify(stateName) !== slugify(filterState)) continue

    const meta    = STATE_META[stateName]
    if (!meta) { console.warn(`⚠  No meta for ${stateName}`); continue }

    console.log(`📍 ${stateName}...`)

    // Census state-level
    let census = null
    try {
      census = await fetchStateCensus(meta.fips)
      console.log(`   Census: pop=${census?.display?.population}, pre1980=${census?.display?.pct_homes_pre1980}`)
    } catch (err) {
      console.error(`   ❌ Census error: ${err.message}`)
    }

    const permits      = STATE_PERMITS[stateName] || null
    const climateZone  = meta.climate_zone
    const climate      = CLIMATE_IMPACT[climateZone] || null
    const citiesCount  = stateEntry.cities.length
    const top5         = getTop5Cities(stateEntry)
    const content      = generateStateContent(stateName, meta.abbr, census, permits, climate, citiesCount, top5)

    statesData.states[slugify(stateName)] = {
      name:        stateName,
      abbr:        meta.abbr,
      slug:        slugify(stateName),
      capital:     meta.capital,
      climate_zone: climateZone,
      cities_count: citiesCount,
      census,
      permits,
      climate:     climate ? {
        zone:                   climateZone,
        avg_annual_rainfall_in: climate.avg_annual_rainfall_inches,
        freeze_days_per_year:   climate.freeze_days_per_year,
        humidity_level:         climate.humidity_level,
        primary_risks:          climate.primary_risks,
        plumbing_note:          climate.plumbing_note,
      } : null,
      top5_cities: top5,
      content,
      fetched_at: new Date().toISOString(),
    }

    // Sauvegarde après chaque état
    statesData.generated_at = new Date().toISOString()
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(statesData, null, 2))

    await sleep(300)
  }

  console.log(`\n✅ Done → ${OUTPUT_FILE}`)
}

main().catch(err => { console.error('Fatal:', err); process.exit(1) })
