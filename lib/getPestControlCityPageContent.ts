/**
 * Dedicated city page content for the generic "pest-control-quote" service.
 * Replaces the getTermiteTreatmentCityPageContent fallback used previously.
 *
 * This function covers the broad "Pest Control Quote" landing page at city level —
 * all pest types, all treatments, one local licensed specialist.
 */
import type { CityMetadata } from "./cityMetadata";
import type { ServiceCityContent } from "./cityServiceContentPestControl";

const PHONE_DEFAULT = "(555) 123-4567";

const EEAT_BULLETS = [
  "This guide is written for homeowners comparing local quotes — we focus on what actually affects your estimate.",
  "We don't charge pest control specialists for placement. The quotes you get are from licensed contractors, not pay-to-play leads.",
  "Cost ranges are based on typical project scope; your final quote depends on your home, infestation severity, and local regulations.",
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
    bullets.unshift(`Serving ${cityName} and ${county} — licensed under ${stateName} state requirements.`);
  }
  if (medianYear) {
    bullets.push(
      `Many ${cityName} homes were built in the ${medianYear} era — local specialists know the common pest entry points for this housing stock.`
    );
  }
  if (growthSnippet) {
    bullets.push(
      `${cityName} is ${growthSnippet}, so demand for quality pest control is high; getting a quote early helps secure a slot.`
    );
  }
  return bullets;
}

export function getPestControlCityPageContent(
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

  const introParagraphs: string[] = [];
  introParagraphs.push(
    `Get a free pest control quote in ${cityName}, ${stateName}. This page connects you with licensed local specialists for any pest problem — termites, rodents, bed bugs, mosquitoes, wildlife, and general pest control — no obligation.`
  );
  if (county || growthSnippet) {
    introParagraphs.push(
      county && growthSnippet
        ? `${cityName} is ${growthSnippet}. Pest pressure in ${county} is well known to local specialists who can give you a real treatment estimate for your specific situation.`
        : county
          ? `In ${county}, licensed pest control specialists work the area regularly and know local pest species, seasonal timing, and treatment regulations. A phone quote takes under 5 minutes.`
          : `${cityName} is ${growthSnippet}. Get a real pest control estimate from a licensed specialist who serves your area.`
    );
  } else {
    introParagraphs.push(
      `A licensed pest control specialist who serves ${cityName} can identify your pest problem and give you an honest treatment estimate over the phone in under 5 minutes.`
    );
  }

  const localParagraphs: string[] = [
    ...(county
      ? [`Pest control licensing, treatment regulations, and wildlife removal permits in ${county} are handled by licensed specialists who work the area regularly.`]
      : []),
    ...(medianYear
      ? [`With a median build year of ${medianYear}, many ${cityName} homes have aging foundations, deteriorated soffits, and pipe penetrations that are common pest entry points. Getting a quote before an infestation compounds saves significant money.`]
      : []),
    ...(homeownershipRate
      ? [`With a homeownership rate of ${homeownershipRate}% in ${cityName}, most residents have a direct financial stake in protecting their home from pest damage. A free quote takes less than 5 minutes.`]
      : []),
    ...(growthSnippet
      ? [`As ${growthSnippet}, ${cityName}'s development activity displaces wildlife and rodent populations — intrusions into homes are increasingly common. Getting a quote early limits treatment scope and cost.`]
      : []),
  ].filter(Boolean);
  if (!localParagraphs.length) {
    localParagraphs.push(`A licensed ${cityName} pest control specialist can give you a treatment quote tailored to your home and pest problem.`);
  }

  return {
    meta: {
      title: `Pest Control Quote in ${cityName}, ${stateAbbr} | Free Estimates from Licensed Local Specialists`,
      description: `Free pest control quote in ${cityName}, ${stateName}. Licensed local specialists for termites, rodents, bed bugs, mosquitoes & wildlife. Upfront pricing, no obligation.`,
    },
    hero: {
      h1: `Free Pest Control Quote in ${cityName}, ${stateName}`,
      sub: `Licensed ${cityName} pest control specialists for any pest problem — termites, rodents, bed bugs, mosquitoes, wildlife, and more. Honest estimates, no commitment.`,
      trustBullets: buildTrustBullets(stateAbbr, cityName, county),
      cta: "Get Your Free Pest Control Quote — Call Now",
    },
    intro: {
      h2: `Get a Real Pest Control Estimate in ${cityName}, ${stateName}`,
      paragraphs: introParagraphs,
      cta: `Call for a Free ${cityName} Pest Control Quote`,
    },
    costEstimator: {
      h2: `Pest Control Cost Estimator — ${cityName}, ${stateName}`,
      intro: `Use this tool for a ballpark before you call. Pest control costs in ${cityName} vary widely by pest type — from a $150 general treatment to $8,000+ for termite fumigation. Your exact quote depends on your specific pest problem and home.`,
      ctaBelow: `Get Your Exact ${cityName} Pest Control Quote — Call Now`,
    },
    mainService: {
      h2: `Pest Control Quote in ${cityName}, ${stateAbbr}`,
      description: `Pest control costs in ${cityName} vary more than most homeowners expect. Treatment method, infestation severity, pest species, and local regulations all affect what you'll pay. A one-time general treatment runs $150–$400; annual prevention programs run $400–$900 per year; termite treatment can reach $8,000+ depending on method. The only quote that matters is one from a licensed specialist who knows your area and your pest problem. Getting a quote before a minor infestation becomes a major one saves significantly on treatment scope and cost.`,
      localParagraphs,
      cost: `${cityName} pest control costs: $150 for general treatment to $8,000+ for termite fumigation`,
      whatAffects: [
        "Pest type — termites, rodents, bed bugs, mosquitoes, wildlife",
        "Infestation severity and extent",
        "Treatment method — liquid barrier, heat, bait, exclusion",
        `${stateAbbr} licensing and permit requirements by pest type`,
      ],
      cta: `Get a Pest Control Quote in ${cityName} — Call Now`,
    },
    whyCall: {
      h2: `Why ${cityName} Homeowners Get a Pest Control Quote First`,
      paragraphs: [
        `A phone quote from a licensed ${cityName} pest control specialist gives you a realistic treatment budget before any work starts. Pest control costs${county ? ` in ${county}` : ""} vary significantly by pest type, infestation severity, and treatment method. A 5-minute call gets you a number — and a method recommendation — that reflects your specific situation.`,
        `It filters out the wrong contractors fast. Any ${cityName} specialist who won't give you a range over the phone before charging an inspection fee is worth avoiding. Serious pest control contractors are used to giving ballpark estimates; a free quote call tells you immediately who's worth your time.`,
        `Getting a quote before an infestation spreads saves money. Termite damage, rodent infestations, and bed bug problems all become significantly more expensive the longer they're untreated. Most homeowner insurance policies don't cover pest damage — early treatment is the only financial protection.`,
      ],
    },
    localSignals: {
      h2: `Pest Control Quote Service Areas Near ${cityName}, ${stateName}`,
      intro: `Licensed pest control specialists available for quotes in ${cityName} and nearby communities including ${nearby1}, ${nearby2}, and ${nearby3}.`,
      bullets: buildLocalSignalsBullets(
        stateName,
        stateAbbr,
        cityName,
        [
          `All specialists are licensed under ${stateName} state requirements`,
          `Familiar with ${cityName}-area pest species, seasonal timing, and local regulations`,
          "Upfront pricing — no surprise fees after treatment begins",
          `Same-day and emergency availability in ${cityName} and surrounding ${stateAbbr} areas`,
        ],
        cityMetadata
      ),
    },
    eeat: { title: "Why trust this guide", bullets: EEAT_BULLETS },
    faq: {
      h2: `Pest Control Quote FAQ — ${cityName}, ${stateName}`,
      items: [
        {
          q: `How much does pest control cost in ${cityName}, ${stateAbbr}?`,
          a: `Pest control costs in ${cityName} vary widely by service. A one-time general treatment runs $150–$400; annual prevention programs run $400–$900. Termite treatment ranges from $500 to $8,000+; rodent exclusion runs $300–$2,500+; bed bug heat treatment runs $500–$5,000+. A licensed ${cityName} specialist can give you a pest-specific quote over the phone.`,
        },
        {
          q: `Is the pest control quote in ${cityName} free?`,
          a: `Yes. A phone quote costs nothing. No obligation, no inspection fee. You get a real estimate from a licensed ${cityName} specialist before any work begins.`,
        },
        {
          q: `Do pest control specialists need a license in ${cityName}?`,
          a: `Yes. ${stateName} requires pest control applicators to be licensed by the state. Wildlife removal specialists require separate permits for most species. All specialists connected through this page are licensed and insured in ${stateName}.`,
        },
        {
          q: `Can I get same-day pest control service in ${cityName}?`,
          a: `In most ${cityName} areas, same-day service is available for active infestations and wildlife intrusions. Heat treatment for bed bugs and termite fumigation typically require advance scheduling. Call to confirm availability.`,
        },
        {
          q: `What pest problems are most common in ${cityName} homes?`,
          a: `Common issues vary by season and housing type but typically include termites, rodents (mice and rats), bed bugs, mosquitoes, and wildlife intrusions (raccoons, squirrels, bats). ${medianYear ? `Older ${cityName} homes built around ${medianYear} are particularly vulnerable to termite damage and rodent entry through aging foundations.` : "Older homes are particularly vulnerable to termite damage and rodent entry."} Getting a quote early helps you plan and avoid overpaying.`,
        },
        {
          q: `Does homeowner insurance cover pest damage in ${cityName}?`,
          a: `Most standard homeowner insurance policies in ${stateName} do not cover termite damage, rodent damage, or wildlife intrusion — these are considered preventable maintenance issues. Early treatment is the most cost-effective protection available.`,
        },
      ],
    },
    closing: {
      h2: `Get Your Free Pest Control Quote in ${cityName} Today`,
      text: `No forms. No waiting. No obligation. A licensed pest control specialist serving ${cityName}, ${stateName} can give you an honest estimate for any pest problem in under 5 minutes.`,
      cta: `Call for Your Free ${cityName} Pest Control Quote`,
      sub: `Call ${phone} · Available 7 days a week · Same-day quote in ${cityName}`,
    },
    internalLinks: {
      otherServicesLabel: `Other pest control services in ${cityName}:`,
      nearbyLabel: "Nearby cities:",
      backLabel: `← All cities in ${stateName}`,
    },
  };
}
