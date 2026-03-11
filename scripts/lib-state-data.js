/**
 * lib/state-data.js
 *
 * Utilitaire pour lire states.json et générer le contenu des pages état.
 * Usage dans getStaticProps des pages /plumbing-quote/[state]/
 */

const fs   = require('fs')
const path = require('path')

const STATES_JSON = path.join(process.cwd(), 'data', 'states.json')

// ─── GETTER ───────────────────────────────────────────────────────────────────

function getStateData(stateSlug) {
  if (!fs.existsSync(STATES_JSON)) return null
  try {
    const data = JSON.parse(fs.readFileSync(STATES_JSON, 'utf8'))
    return data.states?.[stateSlug] || null
  } catch { return null }
}

// ─── STATS BLOCK ─────────────────────────────────────────────────────────────

function buildStateStatsBlock(stateData) {
  if (!stateData?.census?.display) return []
  const d = stateData.census.display
  const stats = []

  if (d.population)              stats.push({ label: 'State Population',         value: d.population })
  if (d.homeownership_rate)      stats.push({ label: 'Homeownership Rate',        value: d.homeownership_rate })
  if (d.median_home_value)       stats.push({ label: 'Median Home Value',         value: d.median_home_value })
  if (d.median_year_built)       stats.push({ label: 'Median Home Built',         value: d.median_year_built })
  if (d.median_household_income) stats.push({ label: 'Median Household Income',   value: d.median_household_income })
  if (d.pct_homes_pre1980)       stats.push({ label: 'Homes Built Before 1980',   value: d.pct_homes_pre1980 })
  if (stateData.cities_count)    stats.push({ label: 'Cities Covered',            value: stateData.cities_count.toLocaleString() })

  return stats
}

module.exports = { getStateData, buildStateStatsBlock }
