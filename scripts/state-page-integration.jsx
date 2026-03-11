/**
 * Intégration state data dans pages/plumbing-quote/[state].jsx
 * Montre comment utiliser les données dans chaque section de la page état
 */

import { getStateData, buildStateStatsBlock } from '../../lib/state-data'

// ─── getStaticProps ───────────────────────────────────────────────────────────

export async function getStaticProps({ params }) {
  const { state } = params  // ex: "alabama"

  const stateData  = getStateData(state)
  const statsBlock = buildStateStatsBlock(stateData)

  return {
    props: {
      stateData:  stateData  || null,
      statsBlock: statsBlock || [],
    },
    revalidate: 60 * 60 * 24 * 30, // refresh mensuel
  }
}

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

export default function StatePage({ stateData, statsBlock }) {
  const s = stateData
  if (!s) return <div>State not found</div>

  return (
    <main>

      {/* ── HERO ── */}
      <section className="hero">
        <h1>Free Plumbing Quote in {s.name}</h1>
        <p>
          {s.content?.intro ||
            `Connect with licensed ${s.abbr} plumbers in your city — free estimates, no obligation.`}
        </p>
        {/* Trust bar */}
        <ul className="trust-bar">
          <li>✔ Licensed & insured {s.abbr} plumbers</li>
          <li>✔ Free estimates, no obligation</li>
          <li>✔ {s.cities_count}+ cities covered in {s.name}</li>
          <li>✔ Upfront pricing before any work starts</li>
        </ul>
      </section>

      {/* ── CENSUS STATS BLOCK ── */}
      {statsBlock.length > 0 && (
        <section className="state-stats">
          <h2>{s.name} Housing & Plumbing Market Overview</h2>
          <div className="stats-grid">
            {statsBlock.map(({ label, value }) => (
              <div key={label} className="stat-item">
                <span className="stat-value">{value}</span>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>
          <p className="stats-source">
            Source: US Census Bureau, American Community Survey 5-Year Estimates ({s.name})
          </p>
        </section>
      )}

      {/* ── HOUSING STOCK CONTEXT ── */}
      {s.content?.housing_context && (
        <section className="housing-context">
          <h2>Why {s.name} Homeowners Get Plumbing Quotes</h2>
          <p>{s.content.housing_context}</p>
          {s.content.climate_context && (
            <p>{s.content.climate_context}</p>
          )}
        </section>
      )}

      {/* ── CLIMATE / WEATHER IMPACT ── */}
      {s.climate && (
        <section className="climate-section">
          <h2>How {s.name}'s Climate Affects Your Plumbing</h2>
          <p>{s.climate.plumbing_note}</p>
          <ul className="climate-risks">
            {s.climate.primary_risks.map((risk, i) => (
              <li key={i}>⚠ {risk.charAt(0).toUpperCase() + risk.slice(1)}</li>
            ))}
          </ul>
          <div className="climate-stats">
            {s.climate.avg_annual_rainfall_in && (
              <span>🌧 ~{s.climate.avg_annual_rainfall_in}" annual rainfall</span>
            )}
            {s.climate.freeze_days_per_year > 0 && (
              <span>🌡 ~{s.climate.freeze_days_per_year} freeze days/year</span>
            )}
          </div>
        </section>
      )}

      {/* ── PERMIT INFO ── */}
      {s.permits && (
        <section className="permit-section">
          <h2>Plumbing Permits & Licensing in {s.name}</h2>
          <p>{s.content?.permit_context}</p>
          <div className="permit-details">
            <p><strong>Licensing board:</strong> {s.permits.board}</p>
            <p>
              <strong>License required:</strong>{' '}
              {s.permits.requires_license ? `Yes — ${s.abbr} state plumbing license required` : 'Regulated at city/county level'}
            </p>
            <p><strong>Notes:</strong> {s.permits.notes}</p>
          </div>
        </section>
      )}

      {/* ── TOP 5 CITIES ── */}
      {s.top5_cities?.length > 0 && (
        <section className="top-cities">
          <h2>Top Cities for Plumbing Quotes in {s.name}</h2>
          <p>{s.content?.top_cities_intro}</p>
          <div className="top-cities-grid">
            {s.top5_cities.map((city) => (
              <a
                key={city.slug}
                href={`/plumbing-quote/${s.slug}/${city.slug}/`}
                className="city-card"
              >
                <strong>{city.name}</strong>
                {city.homeownership_rate && (
                  <span>{city.homeownership_rate} homeowners</span>
                )}
                {city.median_year_built && (
                  <span>Built ~{city.median_year_built}</span>
                )}
                {city.median_home_value && (
                  <span>Median value {city.median_home_value}</span>
                )}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* ── CITY GRID ── */}
      <section className="city-grid">
        <h2>All {s.name} Cities — Plumbing Quotes</h2>
        {/* ton grid existant */}
      </section>

    </main>
  )
}

/**
 * Exemple output pour Alabama :
 *
 * stateData = {
 *   name: "Alabama", abbr: "AL", cities_count: 100,
 *   census: {
 *     population: 5024279,
 *     pct_homes_built_pre1980: 38,
 *     median_year_built: 1981,
 *     homeownership_rate_pct: 69,
 *     median_home_value: 172500,
 *     display: { population: "5,024,279", homeownership_rate: "69%", ... }
 *   },
 *   climate: {
 *     plumbing_note: "High annual rainfall and humidity accelerate pipe corrosion...",
 *     primary_risks: ["heavy rainfall stresses drain and sewer lines", ...],
 *     avg_annual_rainfall_in: 52,
 *     freeze_days_per_year: 15,
 *   },
 *   permits: {
 *     board: "Alabama Plumbers and Gas Fitters Examining Board",
 *     notes: "State license required. Permits pulled at county level.",
 *   },
 *   top5_cities: [
 *     { name: "Birmingham", homeownership_rate: "46%", median_year_built: 1978 },
 *     { name: "Huntsville", homeownership_rate: "61%", median_year_built: 1988 },
 *     ...
 *   ],
 *   content: {
 *     intro: "Alabama is a state of 5,024,279 residents with a 69% homeownership rate...",
 *     housing_context: "38% of Alabama homes were built before 1980...",
 *     climate_context: "High annual rainfall and humidity accelerate pipe corrosion...",
 *     permit_context: "In Alabama, plumbing work is regulated by the Alabama Plumbers...",
 *   }
 * }
 */
