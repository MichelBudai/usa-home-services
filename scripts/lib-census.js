/**
 * lib/census.js
 *
 * Utilitaire pour lire les données Census depuis cities.json
 * et générer du contenu local unique pour chaque page ville.
 *
 * Usage dans getStaticProps :
 *   import { getCensusData, generateLocalContent } from '../../../lib/census'
 *   const census = getCensusData(citiesData, state, city)
 *   const localContent = generateLocalContent(census, cityName, stateName)
 */

// ─── GETTER ───────────────────────────────────────────────────────────────────

/**
 * Récupère les données Census pour une ville depuis cities.json
 * Retourne null si non disponible
 */
function getCensusData(citiesData, stateSlug, citySlug) {
  const stateEntry = citiesData.states.find(
    s => s.state.toLowerCase().replace(/\s+/g, '-') === stateSlug
  )
  if (!stateEntry) return null

  const cityEntry = stateEntry.cities.find(c => {
    const name = typeof c === 'object' ? c.name : c
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === citySlug
  })

  if (!cityEntry || typeof cityEntry === 'string') return null
  return cityEntry.census || null
}

// ─── CONTENT GENERATOR ───────────────────────────────────────────────────────

/**
 * Génère des phrases locales uniques à partir des données Census
 * Chaque appel retourne du contenu différent selon les données disponibles
 * Directement injectable dans le contenu des pages
 */
function generateLocalContent(census, cityName, stateName) {
  if (!census || census.not_found) return getDefaultContent(cityName, stateName)

  const d = census.display
  const raw = census

  const content = {}

  // ── Phrase intro locale ──────────────────────────────────────────────────
  const introParts = []
  if (d.population) introParts.push(`a city of ${d.population} residents`)
  if (d.homeownership_rate) introParts.push(`${d.homeownership_rate} homeownership rate`)

  content.intro_sentence = introParts.length
    ? `${cityName} is ${introParts.join(' with a ')}.`
    : `${cityName} is a growing community in ${stateName}.`

  // ── Contexte housing stock ───────────────────────────────────────────────
  if (raw.median_year_built) {
    const age = raw.median_home_age_years
    if (age >= 40) {
      content.housing_context = `With a median home build year of ${raw.median_year_built}, many ${cityName} properties are over ${age} years old — making plumbing inspections and upgrades especially relevant for local homeowners.`
    } else if (age >= 20) {
      content.housing_context = `${cityName} homes were built around ${raw.median_year_built} on average, putting many water heaters and drain systems at or near end-of-life.`
    } else {
      content.housing_context = `${cityName}'s housing stock is relatively newer, with a median build year of ${raw.median_year_built} — but newer homes in ${stateName} still require licensed plumbing work for any modifications or replacements.`
    }
  }

  // ── Contexte repiping ────────────────────────────────────────────────────
  if (raw.median_year_built && raw.median_year_built < 1986) {
    content.repiping_context = `Homes built before 1986 in ${cityName} may contain polybutylene or galvanized steel pipes that are past their service life. With a median build year of ${raw.median_year_built}, a repiping assessment is worth getting before a failure forces an emergency repair.`
  } else if (raw.median_year_built && raw.median_year_built < 1995) {
    content.repiping_context = `${cityName} homes from the ${raw.median_year_built} era often have original pipe systems approaching the end of their typical 30–40 year lifespan.`
  }

  // ── Contexte water heater ────────────────────────────────────────────────
  if (raw.median_year_built) {
    const yr = raw.median_year_built
    content.water_heater_context = `Many ${cityName} homes built around ${yr} have original or first-replacement water heaters that are nearing the end of their 10–12 year lifespan. Getting a replacement quote before failure avoids the emergency call-out premium.`
  }

  // ── Contexte marché / investissement ────────────────────────────────────
  if (d.median_home_value && d.median_household_income) {
    content.market_context = `With a median home value of ${d.median_home_value} and median household income of ${d.median_household_income}, ${cityName} homeowners have a significant asset to protect — making quality plumbing work a smart long-term investment.`
  } else if (d.median_home_value) {
    content.market_context = `${cityName} homes are valued at a median of ${d.median_home_value} — protecting that investment starts with maintaining the plumbing systems that run through it.`
  }

  // ── Contexte sewer/drain ─────────────────────────────────────────────────
  if (raw.median_year_built && raw.median_year_built < 1980) {
    content.sewer_context = `Older ${cityName} neighborhoods — many with homes built in the ${raw.median_year_built} era — frequently have clay or cast-iron sewer lines that are candidates for root intrusion and pipe collapse. A camera inspection is the fastest way to know if replacement is needed.`
  } else {
    content.sewer_context = `${cityName}'s mix of housing stock means sewer line conditions vary significantly by neighborhood. A camera inspection gives you a definitive answer before committing to any repair or replacement.`
  }

  // ── Stats block (pour affichage direct sur la page) ──────────────────────
  content.stats_block = buildStatsBlock(d, raw)

  // ── Meta description enrichie ────────────────────────────────────────────
  if (d.population && d.homeownership_rate) {
    content.meta_enrichment = `${cityName} has ${d.population} residents and a ${d.homeownership_rate} homeownership rate.`
  }

  return content
}

/**
 * Construit le bloc de stats structurées pour affichage sur la page
 * Format : array de { label, value } pour rendu flexible
 */
function buildStatsBlock(d, raw) {
  const stats = []

  if (d.population) {
    stats.push({ label: 'City Population', value: d.population })
  }
  if (d.homeownership_rate) {
    stats.push({ label: 'Homeownership Rate', value: d.homeownership_rate })
  }
  if (d.median_home_value) {
    stats.push({ label: 'Median Home Value', value: d.median_home_value })
  }
  if (d.median_year_built) {
    stats.push({ label: 'Median Home Built', value: d.median_year_built })
  }
  if (d.median_household_income) {
    stats.push({ label: 'Median Household Income', value: d.median_household_income })
  }
  if (d.total_housing_units) {
    stats.push({ label: 'Total Housing Units', value: d.total_housing_units })
  }

  return stats
}

/**
 * Contenu par défaut quand Census data n'est pas disponible
 */
function getDefaultContent(cityName, stateName) {
  return {
    intro_sentence: `${cityName} is a community in ${stateName} where homeowners rely on licensed local plumbers for repairs, replacements, and new installations.`,
    housing_context: `${cityName} homes vary in age and construction — a licensed local plumber familiar with the area can assess your specific situation and give you an accurate quote.`,
    repiping_context: `If your ${cityName} home is over 30 years old, a repiping assessment is worth getting before a failure forces an emergency repair.`,
    water_heater_context: `Water heaters in ${cityName} typically last 10–12 years. Getting a replacement quote before failure avoids the emergency call-out premium.`,
    market_context: `Protecting your ${cityName} home starts with maintaining the plumbing systems that run through it.`,
    sewer_context: `A camera inspection is the fastest way to assess sewer line condition in ${cityName} before committing to any repair.`,
    stats_block: [],
    meta_enrichment: '',
  }
}

module.exports = { getCensusData, generateLocalContent, buildStatsBlock }
