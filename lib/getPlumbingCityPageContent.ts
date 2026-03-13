/**
 * Dedicated city page content for the generic "plumbing-quote" service.
 * Replaces the getDrainLineCityPageContent fallback used previously.
 *
 * This function covers the broad "Plumbing Quote" landing page at city level —
 * all services, all jobs, one local licensed plumber.
 */
import type { CityMetadata } from "./cityMetadata";
import type { ServiceCityContent } from "./cityServiceContentPlumbing";

const PHONE_DEFAULT = "(555) 123-4567";

const EEAT_BULLETS = [
  "This guide is written for homeowners comparing local quotes — we focus on what actually affects your estimate.",
  "We don't charge plumbers for placement. The quotes you get are from licensed contractors, not pay-to-play leads.",
  "Cost ranges are based on typical project scope; your final quote depends on your home and local permit requirements.",
];

function buildTrustBullets(stateAbbr: string, cityName: string, county?: string): string[] {
  const bullets = [
    `Licensed & insured in ${stateAbbr}`,
    "Free estimates, no obligation",
    `Same-day availability in ${cityName}`,
    "Upfront pricing before any work begins",
  ];
  if (county) bullets.push(`Serving ${cityName} and ${county}`);
  return bullets;
}

function buildLocalSignalsBullets(
  stateName: string,
  stateAbbr: string,
  cityName: string,
  baseBullets: string[],
  cityMetadata?: CityMetadata | null
): string[] {
  const bullets = [...baseBullets];
  const county = cityMetadata?.county;
  const medianYear = cityMetadata?.medianYearBuilt;
  const growthSnippet = cityMetadata?.growthSnippet;
  if (county) {
    bullets.unshift(`Serving ${cityName} and ${county} — permits and inspections handled at the county level.`);
  }
  if (medianYear) {
    bullets.push(
      `Many ${cityName} homes were built in the ${medianYear} era — local plumbers are familiar with this housing stock and typical repair scope.`
    );
  }
  if (growthSnippet) {
    bullets.push(
      `${cityName} is ${growthSnippet}, so demand for quality plumbing work is high; getting a quote early helps secure a slot.`
    );
  }
  return bullets;
}

export function getPlumbingCityPageContent(
  cityName: string,
  stateName: string,
  stateAbbr: string,
  nearby1: string,
  nearby2: string,
  nearby3: string,
  phone: string = PHONE_DEFAULT,
  cityMetadata?: CityMetadata | null
): ServiceCityContent {
  const county = cityMetadata?.county;
  const medianYear = cityMetadata?.medianYearBuilt;
  const growthSnippet = cityMetadata?.growthSnippet;
  const homeownershipRate = cityMetadata?.homeownershipRate;
  const homeValue = cityMetadata?.medianHomeValue;

  const introParagraphs: string[] = [];
  introParagraphs.push(
    `Get a free plumbing quote in ${cityName}, ${stateName}. This page connects you with licensed local plumbers for any job — repairs, replacements, installations, and emergencies — no obligation.`
  );
  if (county || growthSnippet) {
    introParagraphs.push(
      county && growthSnippet
        ? `${cityName} is ${growthSnippet}. Plumbing permits and inspections in ${county} are handled by plumbers who work the area regularly — a quick call gets you a real estimate for your specific job.`
        : county
          ? `In ${county}, plumbing permits and labor rates are familiar to local plumbers. A phone quote takes under 5 minutes and gives you a real number before spending anything.`
          : `${cityName} is ${growthSnippet}. Get a real plumbing estimate from a licensed plumber who serves your area.`
    );
  } else {
    introParagraphs.push(
      `A licensed plumber who serves ${cityName} can give you an honest estimate over the phone in under 5 minutes — for any job, big or small.`
    );
  }

  const localParagraphs: string[] = [
    ...(county
      ? [`In ${county}, plumbing permit requirements and labor rates vary by job type — a licensed ${cityName} plumber familiar with the area will factor that into your quote upfront.`]
      : []),
    ...(medianYear
      ? [`With a median build year of ${medianYear}, many ${cityName} homes are dealing with aging pipes, outdated water heaters, and sewer lines nearing end-of-life. A quote now avoids emergency pricing later.`]
      : []),
    ...(homeownershipRate
      ? [`With a homeownership rate of ${homeownershipRate}% in ${cityName}, most residents have a direct stake in keeping their plumbing in good shape — a free quote takes less than 5 minutes.`]
      : []),
    ...(growthSnippet
      ? [`As ${growthSnippet}, ${cityName} sees steady demand for plumbing work — getting a quote early helps you secure a slot and avoid last-minute premium pricing.`]
      : []),
  ].filter(Boolean);
  if (!localParagraphs.length) {
    localParagraphs.push(`A licensed ${cityName} plumber can give you an estimate tailored to your home and job scope.`);
  }

  return {
    meta: {
      title: `Plumbing Quote in ${cityName}, ${stateAbbr} | Free Estimates from Licensed Local Plumbers`,
      description: `Free plumbing quote in ${cityName}, ${stateName}. Licensed local plumbers for repairs, replacements & installations. Upfront pricing, no obligation.`,
    },
    hero: {
      h1: `Free Plumbing Quote in ${cityName}, ${stateName}`,
      sub: `Licensed ${cityName} plumbers for any job — repairs, water heaters, sewer lines, repiping, and more. Honest estimates, no commitment.`,
      trustBullets: buildTrustBullets(stateAbbr, cityName, county),
      cta: "Get Your Free Plumbing Quote — Call Now",
    },
    intro: {
      h2: `Get a Real Plumbing Estimate in ${cityName}, ${stateName}`,
      paragraphs: introParagraphs,
      cta: `Call for a Free ${cityName} Plumbing Quote`,
    },
    costEstimator: {
      h2: `Plumbing Cost Estimator — ${cityName}, ${stateName}`,
      intro: `Use this tool for a ballpark before you call. Plumbing costs in ${cityName} vary widely by job type — from a $150 drain repair to a $15,000 whole-home repipe. Your exact ${cityName} quote depends on your specific situation.`,
      ctaBelow: `Get Your Exact ${cityName} Plumbing Quote — Call Now`,
    },
    mainService: {
      h2: `Plumbing Quote in ${cityName}, ${stateAbbr}`,
      description: `Plumbing costs in ${cityName} vary more than most homeowners expect — labor rates, permit fees, and material costs all shift by job type and county. Whether you need a drain snaked, a water heater replaced, a sewer line diagnosed, or a full repipe, the only quote that matters is one from a plumber who knows your area. Getting a quote before a problem becomes an emergency saves the after-hours premium that can add $150–$400 or more to any job.`,
      localParagraphs,
      cost: `${cityName} plumbing costs vary by job — from $150 for minor repairs to $15,000+ for repiping`,
      whatAffects: [
        "Type of job — repair, replacement, or new installation",
        "Materials and parts specific to your home",
        `${stateAbbr} permit and inspection requirements`,
        "Emergency or after-hours call-out timing",
      ],
      cta: `Get a Plumbing Quote in ${cityName} — Call Now`,
    },
    whyCall: {
      h2: `Why ${cityName} Homeowners Get a Plumbing Quote First`,
      paragraphs: [
        `A phone quote from a licensed ${cityName} plumber gives you a realistic budget before any work starts — and before any truck rolls. Plumbing costs${county ? ` in ${county}` : ""} vary by job type, materials, and local permit requirements. A 5-minute call gets you a number that reflects your home and your situation, not a national average.`,
        `It filters out the wrong plumbers fast. Any ${cityName} plumber who won't give you a range over the phone before charging a dispatch fee is worth avoiding. Serious contractors are used to giving ballpark estimates; a free quote call tells you immediately who's worth your time.`,
        `Getting a quote before a failure avoids emergency pricing. Burst pipes, sewer backups, and water heater failures all trigger after-hours premiums of $150–$400 or more. If you know a problem is developing — aging pipes, slow drains, inconsistent water pressure — getting a quote now keeps costs in the planned range.`,
      ],
    },
    localSignals: {
      h2: `Plumbing Quote Service Areas Near ${cityName}, ${stateName}`,
      intro: `Licensed plumbers available for quotes in ${cityName} and nearby communities including ${nearby1}, ${nearby2}, and ${nearby3}.`,
      bullets: buildLocalSignalsBullets(
        stateName,
        stateAbbr,
        cityName,
        [
          `All plumbers are licensed under ${stateName} state requirements`,
          `Familiar with ${cityName}-area permit processes and local labor rates`,
          "Upfront pricing — no surprise fees after the job starts",
          `Same-day and emergency availability in ${cityName} and surrounding ${stateAbbr} areas`,
        ],
        cityMetadata
      ),
    },
    eeat: { title: "Why trust this guide", bullets: EEAT_BULLETS },
    faq: {
      h2: `Plumbing Quote FAQ — ${cityName}, ${stateName}`,
      items: [
        {
          q: `How much does a plumber cost in ${cityName}, ${stateAbbr}?`,
          a: `Plumber hourly rates in ${cityName} typically range from $65 to $175 per hour depending on the job type and time of day. Larger projects — water heater replacement, sewer line work, repiping — are usually quoted at a flat project rate. A licensed ${cityName} plumber can give you a specific estimate over the phone.`,
        },
        {
          q: `Is the plumbing quote in ${cityName} free?`,
          a: `Yes. A phone quote costs nothing. No obligation, no dispatch fee. You get a real estimate from a licensed ${cityName} plumber before any work begins.`,
        },
        {
          q: `Do I need a permit for plumbing work in ${cityName}?`,
          a: `Most major plumbing work in ${cityName}, ${stateName} requires a permit — including water heater replacement, sewer line work, and whole-home repiping. ${county ? `In ${county}, a` : "A"} licensed plumber handles the permit and includes the cost in your quote.`,
        },
        {
          q: `Can I get same-day plumbing service in ${cityName}?`,
          a: `In most ${cityName} areas, same-day service is available for emergencies. Non-urgent work is often schedulable within 1–3 days. Call to confirm current availability.`,
        },
        {
          q: `What plumbing problems are most common in ${cityName} homes?`,
          a: `Common issues include corroded galvanized pipes in older homes, tree root intrusion in sewer lines, water heater failures, slow or blocked drains, and leaking fixtures. ${medianYear ? `Many ${cityName} homes built around ${medianYear} are dealing with aging systems.` : ""} Getting a quote first helps you plan and avoid overpaying.`,
        },
        {
          q: `How do I find a licensed plumber in ${cityName}?`,
          a: `Select your specific plumbing service on this page to connect with licensed, insured plumbers who operate in ${cityName} and are familiar with local permit requirements and labor rates.`,
        },
      ],
    },
    closing: {
      h2: `Get Your Free Plumbing Quote in ${cityName} Today`,
      text: `No forms. No waiting. No obligation. A licensed plumber serving ${cityName}, ${stateName} can give you an honest estimate for any plumbing job in under 5 minutes.`,
      cta: `Call for Your Free ${cityName} Plumbing Quote`,
      sub: `Call ${phone} · Available 7 days a week · Same-day quote in ${cityName}`,
    },
    internalLinks: {
      otherServicesLabel: `Other plumbing services in ${cityName}:`,
      nearbyLabel: "Nearby cities:",
      backLabel: `← All cities in ${stateName}`,
    },
  };
}
