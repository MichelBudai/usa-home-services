/**
 * Exemple d'intégration Census dans une page ville Next.js
 * A merger dans ton fichier pages/plumbing-quote/[state]/[city].jsx existant
 */

import { getCensusData, generateLocalContent } from '../../../lib/census'
const citiesData = require('../../../data/cities.json')

// ─── getStaticProps ───────────────────────────────────────────────────────────

export async function getStaticProps({ params }) {
  const { state, city } = params

  // Données Census
  const censusRaw = getCensusData(citiesData, state, city)
  const localContent = generateLocalContent(censusRaw, cityName, stateName)

  return {
    props: {
      // ...tes props existantes
      census: censusRaw,
      localContent,
    },
    revalidate: 60 * 60 * 24 * 30, // Census data : refresh mensuel suffisant
  }
}

// ─── COMPOSANTS ──────────────────────────────────────────────────────────────

/**
 * Bloc stats Census — à placer dans la section intro ou local signals
 * Remplace ton bloc "why get a quote here" générique
 */
function CensusStatsBlock({ stats, cityName, stateAbbr }) {
  if (!stats?.length) return null

  return (
    <div className="census-stats">
      <h3>{cityName}, {stateAbbr} — Local Housing Facts</h3>
      <div className="stats-grid">
        {stats.map(({ label, value }) => (
          <div key={label} className="stat-item">
            <span className="stat-value">{value}</span>
            <span className="stat-label">{label}</span>
          </div>
        ))}
      </div>
      <p className="stats-source">
        Source: US Census Bureau, American Community Survey 5-Year Estimates
      </p>
    </div>
  )
}

// ─── EXEMPLE D'USAGE DANS LE JSX DE LA PAGE ──────────────────────────────────

export default function CityPage({ cityName, stateAbbr, stateName, census, localContent }) {
  return (
    <main>

      {/* HERO — inchangé */}
      <section className="hero">
        <h1>Free Plumbing Quote in {cityName}, {stateAbbr}</h1>
        <p>{localContent.intro_sentence}</p>
        {/* ... trust bar, CTA ... */}
      </section>

      {/* INTRO — enrichie avec données Census */}
      <section className="intro">
        <h2>Get a Real Plumbing Estimate in {cityName}, {stateName}</h2>

        {/* Phrase housing stock unique par ville */}
        <p>{localContent.housing_context}</p>

        <p>
          This page connects {cityName} homeowners directly with licensed local
          plumbers who know the area, know the permit process, and will give you
          a straight price before a single tool comes out of the truck.
        </p>

        {/* Contexte marché local */}
        {localContent.market_context && (
          <p>{localContent.market_context}</p>
        )}
      </section>

      {/* STATS BLOCK — données Census */}
      <CensusStatsBlock
        stats={localContent.stats_block}
        cityName={cityName}
        stateAbbr={stateAbbr}
      />

      {/* SERVICES — contenu enrichi par service */}
      <section className="services">
        <h2>Plumbing Services in {cityName}, {stateAbbr}</h2>

        {/* Repiping — contexte local unique */}
        <div className="service-block">
          <h3>Repiping Quote in {cityName}, {stateAbbr}</h3>
          <p>{localContent.repiping_context}</p>
          {/* ... range de prix, bullets, CTA ... */}
        </div>

        {/* Water Heater — contexte local unique */}
        <div className="service-block">
          <h3>Water Heater Replacement Quote in {cityName}, {stateAbbr}</h3>
          <p>{localContent.water_heater_context}</p>
        </div>

        {/* Sewer Line — contexte local unique */}
        <div className="service-block">
          <h3>Sewer Line Replacement Quote in {cityName}, {stateAbbr}</h3>
          <p>{localContent.sewer_context}</p>
        </div>
      </section>

    </main>
  )
}

/**
 * Exemple de output Census pour Birmingham, AL :
 *
 * localContent = {
 *   intro_sentence: "Birmingham is a city of 212,237 residents with a 46% homeownership rate.",
 *   housing_context: "With a median home build year of 1978, many Birmingham properties
 *                     are over 46 years old — making plumbing inspections especially relevant.",
 *   repiping_context: "Homes built before 1986 in Birmingham may contain polybutylene or
 *                      galvanized steel pipes past their service life...",
 *   water_heater_context: "Many Birmingham homes built around 1978 have water heaters
 *                          nearing end of lifespan...",
 *   market_context: "With a median home value of $142,400 and median household income
 *                    of $36,212, Birmingham homeowners have a significant asset to protect.",
 *   sewer_context: "Older Birmingham neighborhoods — homes built in the 1978 era —
 *                   frequently have clay or cast-iron sewer lines...",
 *   stats_block: [
 *     { label: "City Population",        value: "212,237" },
 *     { label: "Homeownership Rate",     value: "46%" },
 *     { label: "Median Home Value",      value: "$142,400" },
 *     { label: "Median Home Built",      value: "1978" },
 *     { label: "Median Household Income",value: "$36,212" },
 *     { label: "Total Housing Units",    value: "97,431" },
 *   ]
 * }
 */
