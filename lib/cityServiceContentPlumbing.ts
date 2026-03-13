/**
 * City page content for single-service pages: repiping, water-heater, sewer, drain.
 * Each service has its own template and copy (no shared "plumbing" wording).
 */
import type { CityMetadata } from "./cityMetadata";
import { getPlumbingCityPageContent } from "./getPlumbingCityPageContent";

export interface ServiceCityContent {
  meta: { title: string; description: string };
  hero: { h1: string; sub: string; trustBullets: string[]; cta: string };
  intro: { h2: string; paragraphs: string[]; cta: string };
  costEstimator: { h2: string; intro: string; ctaBelow: string };
  mainService: {
    h2: string;
    description: string;
    localParagraphs?: string[];
    cost: string;
    whatAffects: string[];
    cta: string;
  };
  whyCall: { h2: string; paragraphs: string[] };
  localSignals: { h2: string; intro: string; bullets: string[] };
  /** E-E-A-T: short "Why trust this guide" block for service city pages only. */
  eeat: { title: string; bullets: string[] };
  faq: { h2: string; items: { q: string; a: string }[] };
  closing: { h2: string; text: string; cta: string; sub: string };
  internalLinks: {
    otherServicesLabel: string;
    nearbyLabel: string;
    backLabel: string;
  };
}

const PHONE_DEFAULT = "(555) 123-4567";

type ServiceContentParams = {
  cityName: string;
  stateName: string;
  stateAbbr: string;
  nearby1: string;
  nearby2: string;
  nearby3: string;
  phone?: string;
  cityMetadata?: CityMetadata | null;
};

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

/** Local signals bullets: base list + county/housing when metadata present (no duplicate with intro/mainService). */
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
    bullets.unshift(`Serving ${cityName} and ${county} — permits and inspections are handled at the county level.`);
  }
  if (medianYear) {
    bullets.push(
      `Many ${cityName} homes were built in the ${medianYear} era — local plumbers are familiar with this housing stock and typical scope.`
    );
  }
  if (growthSnippet) {
    bullets.push(
      `${cityName} is ${growthSnippet}, so demand for quality work is high; getting a quote early helps secure a slot.`
    );
  }
  return bullets;
}

const EEAT_BULLETS = [
  "This guide is written for homeowners comparing local quotes — we focus on what actually affects your estimate.",
  "We don't charge plumbers for placement. The quotes you get are from licensed contractors, not pay-to-play leads.",
  "Cost ranges are based on typical project scope; your final quote depends on your home and local permit requirements.",
];

// ——— Repiping ———
export function getRepipingCityPageContent(
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
  const income = cityMetadata?.medianHouseholdIncome;
  const homeValue = cityMetadata?.medianHomeValue;
  const homeownershipRate = cityMetadata?.homeownershipRate;

  const introParagraphs: string[] = [];
  introParagraphs.push(
    `Get a free repiping quote in ${cityName}, ${stateName}. This page connects you with licensed plumbers who specialize in whole-home repiping — no national call center, no obligation.`
  );
  if (county || growthSnippet) {
    introParagraphs.push(
      county && growthSnippet
        ? `${cityName} is ${growthSnippet}. Repiping permits and timelines in ${county} are familiar to local plumbers — a quick call gives you a real estimate for your home.`
        : county
          ? `In ${county}, permit requirements for repiping are handled by plumbers who work the area regularly. A phone quote takes under 5 minutes.`
          : `${cityName} is ${growthSnippet}. Get a real repiping estimate from a plumber who serves your area.`
    );
  } else {
    introParagraphs.push(`A licensed plumber who serves ${cityName} can give you a straight repiping estimate over the phone in under 5 minutes.`);
  }

  const localParagraphs: string[] = [
    ...(county ? [`In ${county}, permit timelines for repiping can affect scheduling — a licensed plumber familiar with the area will factor that into your quote.`] : []),
    ...(medianYear ? [`With a median build year of ${medianYear}, many ${cityName} repiping quotes involve homes with galvanized or polybutylene systems that are past their lifespan.`] : []),
    ...(homeownershipRate ? [`With a homeownership rate of ${homeownershipRate}% in ${cityName}, most residents have a direct financial stake in keeping their plumbing up to date — repiping is one of the highest-ROI investments before a sale.`] : []),
    ...(growthSnippet ? [`As ${growthSnippet}, ${cityName} sees strong demand for repiping as older inventory is updated.`] : []),
  ].filter(Boolean);
  if (!localParagraphs.length) localParagraphs.push(`A licensed ${cityName} plumber can give you a repiping quote tailored to your home.`);

  return {
    meta: {
      title: `Repiping Quote, ${cityName} | Free Estimates, Licensed Local Plumbers`,
      description: `Free repiping quote in ${cityName}, ${stateName}. Whole-home repipe estimates from licensed plumbers. Upfront pricing, no obligation.`,
    },
    hero: {
      h1: `Free Repiping Quote in ${cityName}, ${stateName}`,
      sub: `Licensed ${cityName} plumbers for whole-home repiping. Honest estimates. No commitment until you're ready.`,
      trustBullets: buildTrustBullets(stateAbbr, cityName, county),
      cta: "Get Your Free Repiping Quote — Call Now",
    },
    intro: {
      h2: `Get a Real Repiping Estimate in ${cityName}, ${stateName}`,
      paragraphs: introParagraphs,
      cta: `Call for a Free ${cityName} Repiping Quote`,
    },
    costEstimator: {
      h2: `Repiping Cost Estimator — ${cityName}, ${stateName}`,
      intro: `Use this tool for a ballpark before you call. Repiping ranges depend on home size, pipe material (PEX vs. copper), and ${stateAbbr} permit costs. Your exact ${cityName} quote may vary.`,
      ctaBelow: `Get Your Exact ${cityName} Repiping Quote — Call Now`,
    },
    mainService: {
      h2: `Repiping Quote in ${cityName}, ${stateAbbr}`,
      description: `Whole-home repiping is one of the largest plumbing investments a ${cityName} homeowner will make. Costs depend on square footage, current pipe material (galvanized, polybutylene, copper), wall and crawl space accessibility, and ${stateName} permit requirements that vary by county. If you're seeing rust-colored water, frequent leaks in multiple spots, or persistent low pressure, a repiping quote is the first call to make — before a failure forces an emergency that costs two to three times more.`,
      localParagraphs,
      cost: `Typical ${cityName} repiping cost: $4,000 – $15,000+`,
      whatAffects: [
        "Home size and number of fixtures",
        "Current pipe material (galvanized steel, polybutylene, copper)",
        "Accessibility — slab vs. crawl space vs. basement",
        `${stateAbbr} permit and inspection requirements`,
      ],
      cta: `Get a Repiping Quote in ${cityName} — Call Now`,
    },
    whyCall: {
      h2: `Why ${cityName} Homeowners Get a Repiping Quote First`,
      paragraphs: [
        `A phone quote from a licensed ${cityName} plumber gives you three things that no search result can: a realistic budget for a full repipe, a clear scope (PEX vs. copper, timeline), and the chance to compare before committing. Repiping is one of the largest plumbing investments you'll make — labor rates, ${stateName} permit fees${county ? `, and ${county} permit timelines` : ""} all vary. A 5-minute call gets you a number that actually reflects your home and your area.`,
        `It filters out the wrong plumbers fast. Any ${cityName} plumber who won't give you a range over the phone before charging a dispatch fee is a plumber worth avoiding. Serious contractors are used to giving ballpark repiping estimates; a free quote call tells you immediately who's worth your time.`,
        `Getting a quote before a pipe fails avoids emergency pricing. Emergency repiping in ${cityName} typically costs two to three times more than scheduled work. If your home was built before 1975 with original galvanized pipes, or you're seeing rust-colored water and frequent leaks, getting a quote now — before a failure — is the smart move.`,
      ],
    },
    localSignals: {
      h2: `Repiping Quote Service Areas Near ${cityName}, ${stateName}`,
      intro: `Licensed plumbers available for repiping quotes in ${cityName} and nearby communities including ${nearby1}, ${nearby2}, and ${nearby3}.`,
      bullets: buildLocalSignalsBullets(
        stateName,
        stateAbbr,
        cityName,
        [
          `All plumbers are licensed under ${stateName} state requirements`,
          `Familiar with ${cityName}-area permit processes for repiping`,
          "Upfront pricing — no surprise fees after the job starts",
          `Emergency availability in ${cityName} and surrounding ${stateAbbr} areas`,
        ],
        cityMetadata
      ),
    },
    eeat: { title: "Why trust this guide", bullets: EEAT_BULLETS },
    faq: {
      h2: `Repiping Quote FAQ — ${cityName}, ${stateName}`,
      items: [
        {
          q: `How much does repiping cost in ${cityName}, ${stateAbbr}?`,
          a: `Repiping in ${cityName} typically ranges from $4,000 to $15,000+ depending on home size, pipe material (PEX vs. copper), and accessibility. A licensed ${cityName} plumber can give you a project-specific quote over the phone.`,
        },
        {
          q: `Is the repiping quote in ${cityName} free?`,
          a: `Yes. A phone quote costs nothing. No obligation, no dispatch fee. You get a real estimate from a licensed ${cityName} plumber before any work begins.`,
        },
        {
          q: `Do I need a permit for repiping in ${cityName}?`,
          a: `Yes. Whole-home repiping in ${cityName}, ${stateName} requires permits. ${county ? `In ${county}, permit timelines vary — ` : ""}A licensed plumber handles the permit and includes the cost in your quote.`,
        },
        {
          q: `How do I know if I need repiping in my ${cityName} home?`,
          a: `Common signs include rust-colored water, frequent leaks in multiple locations, consistently low pressure, and pipes 40+ years old. If your ${cityName} home was built before 1975 with original galvanized pipes, get a quote now — before a failure forces an emergency repair.`,
        },
        {
          q: `PEX or copper for repiping in ${cityName}?`,
          a: `Both are used in ${cityName}. PEX is typically lower cost and faster to install; copper lasts longer but costs more. A licensed ${cityName} plumber can recommend the best option for your home and budget when you call.`,
        },
      ],
    },
    closing: {
      h2: `Get Your Free Repiping Quote in ${cityName} Today`,
      text: `No forms. No waiting. No obligation. A licensed plumber serving ${cityName}, ${stateName} can give you an honest repiping estimate in under 5 minutes.`,
      cta: `Call for Your Free ${cityName} Repiping Quote`,
      sub: `Available 7 days a week · Same-day quote in ${cityName}`,
    },
    internalLinks: {
      otherServicesLabel: `Other services in ${cityName}:`,
      nearbyLabel: "Nearby cities:",
      backLabel: `← All cities in ${stateName}`,
    },
  };
}

// ——— Water Heater Replacement ———
export function getWaterHeaterCityPageContent(
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
  const income = cityMetadata?.medianHouseholdIncome;
  const homeValue = cityMetadata?.medianHomeValue;
  const homeownershipRate = cityMetadata?.homeownershipRate;

  const introParagraphs: string[] = [];
  introParagraphs.push(
    `Get a free water heater replacement quote in ${cityName}, ${stateName}. This page connects you with licensed plumbers who install and replace water heaters — tank or tankless, no obligation.`
  );
  if (county || growthSnippet) {
    introParagraphs.push(
      county && growthSnippet
        ? `${cityName} is ${growthSnippet}. In ${county}, permit requirements for water heater replacement are straightforward — a local plumber can give you a real estimate and same-day or next-day options.`
        : county
          ? `In ${county}, water heater permits are handled by plumbers who work the area regularly. A phone quote takes under 5 minutes.`
          : `${cityName} is ${growthSnippet}. Get a real water heater estimate from a plumber who serves your area.`
    );
  } else {
    introParagraphs.push(`${stateName} utility rebates may apply to tankless or high-efficiency units — a licensed ${cityName} plumber will tell you when you call.`);
  }

  const localParagraphs: string[] = [
    ...(county ? [`${county} permit requirements for water heater replacement are straightforward; a local plumber can outline the process when you call.`] : []),
    ...(medianYear ? [`Homes in ${cityName} built around ${medianYear} often have water heaters nearing end-of-life — getting a quote now avoids emergency pricing.`] : []),
    ...(income ? [`With a median household income of $${income.toLocaleString()} in ${cityName}, getting a flat-rate quote before work starts ensures no surprises on the final invoice.`] : []),
    ...(growthSnippet ? [`${cityName} is ${growthSnippet}, so same-day and next-day installs are in high demand; booking ahead often saves money.`] : []),
  ].filter(Boolean);
  if (!localParagraphs.length) localParagraphs.push(`A licensed ${cityName} plumber can give you a water heater quote tailored to your home.`);

  return {
    meta: {
      title: `Water Heater Replacement Quote, ${cityName} | Free Estimates, Licensed Local Plumbers`,
      description: `Free water heater replacement quote in ${cityName}, ${stateName}. Tank & tankless from licensed plumbers. Upfront pricing, no obligation.`,
    },
    hero: {
      h1: `Free Water Heater Replacement Quote in ${cityName}, ${stateName}`,
      sub: `Licensed ${cityName} plumbers for water heater replacement. Tank & tankless. Honest estimates, no commitment.`,
      trustBullets: buildTrustBullets(stateAbbr, cityName, county),
      cta: "Get Your Free Quote — Call Now",
    },
    intro: {
      h2: `Get a Real Water Heater Estimate in ${cityName}, ${stateName}`,
      paragraphs: introParagraphs,
      cta: `Call for a Free ${cityName} Water Heater Quote`,
    },
    costEstimator: {
      h2: `Water Heater Cost Estimator — ${cityName}, ${stateName}`,
      intro: `Use this tool for a ballpark before you call. Water heater costs depend on tank vs. tankless, capacity, and ${stateAbbr} labor and permit costs. Your exact ${cityName} quote may vary.`,
      ctaBelow: `Get Your Exact ${cityName} Water Heater Quote — Call Now`,
    },
    mainService: {
      h2: `Water Heater Replacement Quote in ${cityName}, ${stateAbbr}`,
      description: `Water heater replacements are among the most common plumbing jobs in ${cityName} — and among the most price-variable. Tank vs. tankless, gas vs. electric, capacity, and the condition of existing connections all affect what you'll pay. Getting a quote before yours fails entirely saves the emergency call-out premium that can add $150–$400 to any job. ${stateName} utility rebates may apply to qualifying tankless or high-efficiency installations.`,
      localParagraphs,
      cost: `Typical ${cityName} water heater replacement cost: $900 – $3,200`,
      whatAffects: [
        "Tank vs. tankless unit",
        "Gas vs. electric connection",
        "Tank capacity (40, 50, 80 gallon)",
        "Ease of access and existing connection compatibility",
      ],
      cta: `Get a Water Heater Quote in ${cityName} — Call Now`,
    },
    whyCall: {
      h2: `Why ${cityName} Homeowners Get a Water Heater Quote First`,
      paragraphs: [
        `A phone quote from a licensed ${cityName} plumber gives you a realistic price for a replacement — tank or tankless, capacity, and whether ${stateName} or utility rebates apply. Labor and permit costs${county ? ` in ${county}` : ""} vary; a 5-minute call gets you a number that reflects your setup and your area. Same-day emergency water heater work in ${cityName} typically adds $150–$400 to the job — getting a quote before your unit fails is the smart move.`,
        `It filters out the wrong contractors fast. Any ${cityName} plumber who won't give you a range over the phone before charging a dispatch fee is worth avoiding. Serious installers are used to giving ballpark estimates; a free quote call tells you who's worth your time.`,
        `Water heater replacement is one of the most common plumbing jobs in ${cityName} — and one of the most price-variable. Gas vs. electric, tank vs. tankless, and ease of access all affect the final number. A licensed plumber who serves ${cityName} can walk you through options and rebates so you're not overpaying or underbuying.`,
      ],
    },
    localSignals: {
      h2: `Water Heater Quote Service Areas Near ${cityName}, ${stateName}`,
      intro: `Licensed plumbers available for water heater quotes in ${cityName} and nearby communities including ${nearby1}, ${nearby2}, and ${nearby3}.`,
      bullets: buildLocalSignalsBullets(
        stateName,
        stateAbbr,
        cityName,
        [
          `All plumbers are licensed under ${stateName} state requirements`,
          `Familiar with ${cityName}-area permits for water heater installation`,
          "Upfront pricing — no surprise fees after the job starts",
          `Same-day and next-day availability in ${cityName} and surrounding ${stateAbbr} areas`,
        ],
        cityMetadata
      ),
    },
    eeat: { title: "Why trust this guide", bullets: EEAT_BULLETS },
    faq: {
      h2: `Water Heater Quote FAQ — ${cityName}, ${stateName}`,
      items: [
        {
          q: `How much does a water heater replacement cost in ${cityName}?`,
          a: `Water heater replacement in ${cityName} typically ranges from $900 to $3,200 depending on tank vs. tankless, capacity, and fuel type. A licensed ${cityName} plumber can give you a project-specific quote over the phone.`,
        },
        {
          q: `Is the water heater quote in ${cityName} free?`,
          a: `Yes. A phone quote costs nothing. No obligation, no dispatch fee. You get a real estimate before any work begins.`,
        },
        {
          q: `Do I need a permit for a water heater in ${cityName}?`,
          a: `Yes. Water heater replacement in ${cityName}, ${stateName} typically requires a permit. ${county ? `In ${county}, ` : ""}A licensed plumber handles the permit and includes the cost in your quote.`,
        },
        {
          q: `Tank or tankless in ${cityName}?`,
          a: `Both are common in ${cityName}. Tank units are lower upfront cost; tankless can save on energy and may qualify for ${stateName} rebates. A local plumber can recommend the best option for your home when you call.`,
        },
        {
          q: `Can I get same-day water heater replacement in ${cityName}?`,
          a: `In most ${cityName} areas, same-day or next-day service is available. Emergency replacement — no hot water — is often addressable the same day. Call to confirm current availability.`,
        },
      ],
    },
    closing: {
      h2: `Get Your Free Water Heater Quote in ${cityName} Today`,
      text: `No forms. No waiting. No obligation. A licensed plumber serving ${cityName}, ${stateName} can give you an honest water heater estimate in under 5 minutes.`,
      cta: `Call for Your Free ${cityName} Water Heater Quote`,
      sub: `Available 7 days a week · Same-day quote in ${cityName}`,
    },
    internalLinks: {
      otherServicesLabel: `Other services in ${cityName}:`,
      nearbyLabel: "Nearby cities:",
      backLabel: `← All cities in ${stateName}`,
    },
  };
}

// ——— Sewer Line Replacement ———
export function getSewerLineCityPageContent(
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
  const income = cityMetadata?.medianHouseholdIncome;
  const homeValue = cityMetadata?.medianHomeValue;
  const homeownershipRate = cityMetadata?.homeownershipRate;

  const introParagraphs: string[] = [];
  introParagraphs.push(
    `Get a free sewer line replacement quote in ${cityName}, ${stateName}. This page connects you with licensed plumbers who specialize in sewer line work — trenchless and traditional — no obligation.`
  );
  if (county || growthSnippet) {
    introParagraphs.push(
      county && growthSnippet
        ? `${cityName} is ${growthSnippet}. Sewer work in ${county} often requires permits and inspections; local plumbers know the process and can give you a real estimate and whether trenchless is an option.`
        : county
          ? `In ${county}, sewer line permits and inspections are handled by plumbers who work the area regularly. A phone quote takes under 5 minutes.`
          : `${cityName} is ${growthSnippet}. Get a real sewer line estimate from a plumber who serves your area.`
    );
  } else {
    introParagraphs.push(`Trenchless sewer replacement is available in most ${cityName} areas and can avoid full yard excavation. A licensed plumber can tell you if your property qualifies when you call.`);
  }

  const localParagraphs: string[] = [
    ...(county ? [`In ${county}, sewer work typically requires permits and inspections; a plumber who regularly works the area can streamline the process.`] : []),
    ...(medianYear ? [`Older ${cityName} neighborhoods, including many homes built before ${medianYear}, frequently have clay or cast-iron sewer lines that are prime candidates for replacement or trenchless repair.`] : []),
    ...(homeValue ? [`With a median home value of $${homeValue.toLocaleString()} in ${cityName}, addressing sewer line issues before they escalate protects one of your largest assets.`] : []),
    ...(growthSnippet ? [`As ${growthSnippet}, ${cityName} has a mix of older and newer infrastructure — a camera inspection will show whether you need a full replacement or a targeted repair.`] : []),
  ].filter(Boolean);
  if (!localParagraphs.length) localParagraphs.push(`A licensed ${cityName} plumber can give you a sewer line quote tailored to your property.`);

  return {
    meta: {
      title: `Sewer Line Replacement Quote, ${cityName} | Free Estimates, Licensed Local Plumbers`,
      description: `Free sewer line replacement quote in ${cityName}, ${stateName}. Trenchless & traditional. Licensed plumbers, upfront pricing, no obligation.`,
    },
    hero: {
      h1: `Free Sewer Line Replacement Quote in ${cityName}, ${stateName}`,
      sub: `Licensed ${cityName} plumbers for sewer line replacement. Trenchless options. Honest estimates, no commitment.`,
      trustBullets: buildTrustBullets(stateAbbr, cityName, county),
      cta: "Get Your Free Quote — Call Now",
    },
    intro: {
      h2: `Get a Real Sewer Line Estimate in ${cityName}, ${stateName}`,
      paragraphs: introParagraphs,
      cta: `Call for a Free ${cityName} Sewer Line Quote`,
    },
    costEstimator: {
      h2: `Sewer Line Cost Estimator — ${cityName}, ${stateName}`,
      intro: `Use this tool for a ballpark before you call. Sewer line costs depend on length, depth, trenchless vs. excavation, and ${stateAbbr} permit fees. Your exact ${cityName} quote may vary.`,
      ctaBelow: `Get Your Exact ${cityName} Sewer Line Quote — Call Now`,
    },
    mainService: {
      h2: `Sewer Line Replacement Quote in ${cityName}, ${stateAbbr}`,
      description: `Sewer line issues are the plumbing problem ${cityName} homeowners are most likely to delay — and the one where delay costs the most. Tree root intrusion, pipe collapse, and corrosion are common in older ${cityName} neighborhoods. Trenchless sewer line replacement is available in most ${cityName} areas and can eliminate the need for full yard excavation — it costs less, takes less time, and leaves your landscaping intact. A licensed ${cityName} plumber will tell you whether your property and pipe condition qualify when you call.`,
      localParagraphs,
      cost: `Typical ${cityName} sewer line replacement cost: $3,500 – $22,000`,
      whatAffects: [
        "Length and depth of the affected run",
        "Trenchless vs. traditional excavation",
        "Current pipe material (clay, cast iron, ABS)",
        `Distance to the city main and ${stateAbbr} permit fees`,
      ],
      cta: `Get a Sewer Line Quote in ${cityName} — Call Now`,
    },
    whyCall: {
      h2: `Why ${cityName} Homeowners Get a Sewer Line Quote First`,
      paragraphs: [
        `A phone quote from a licensed ${cityName} plumber gives you a realistic budget — and whether trenchless replacement is an option for your property. Sewer line cost depends on length, depth, pipe material, and ${stateName} permit requirements${county ? ` (${county} handles permits and inspections)` : ""}. A 5-minute call gets you a number that reflects your situation; many ${cityName} plumbers can also outline timeline and access needs.`,
        `Sewer work is a major project. Any ${cityName} plumber who won't give you a range over the phone before a dispatch fee is worth avoiding. Serious contractors are used to giving ballpark sewer estimates; a free quote call tells you who's worth your time.`,
        `Delaying sewer repair often increases cost. Tree root intrusion, pipe collapse, and corrosion get worse over time — the longer you wait, the more excavation may be required. Getting a quote now helps you plan and, when possible, lock in trenchless options before a full dig is the only choice.`,
      ],
    },
    localSignals: {
      h2: `Sewer Line Quote Service Areas Near ${cityName}, ${stateName}`,
      intro: `Licensed plumbers available for sewer line quotes in ${cityName} and nearby communities including ${nearby1}, ${nearby2}, and ${nearby3}.`,
      bullets: buildLocalSignalsBullets(
        stateName,
        stateAbbr,
        cityName,
        [
          `All plumbers are licensed under ${stateName} state requirements`,
          `Familiar with ${cityName}-area permits and inspections for sewer work`,
          "Upfront pricing — no surprise fees after the job starts",
          `Emergency sewer availability in ${cityName} and surrounding ${stateAbbr} areas`,
        ],
        cityMetadata
      ),
    },
    eeat: { title: "Why trust this guide", bullets: EEAT_BULLETS },
    faq: {
      h2: `Sewer Line Quote FAQ — ${cityName}, ${stateName}`,
      items: [
        {
          q: `How much does sewer line replacement cost in ${cityName}?`,
          a: `Sewer line replacement in ${cityName} typically ranges from $3,500 to $22,000 depending on length, depth, trenchless vs. excavation, and pipe material. A licensed ${cityName} plumber can give you a project-specific quote.`,
        },
        {
          q: `Is the sewer line quote in ${cityName} free?`,
          a: `Yes. A phone quote costs nothing. No obligation, no dispatch fee. You get a real estimate before any work begins.`,
        },
        {
          q: `Do I need a permit for sewer work in ${cityName}?`,
          a: `Yes. Sewer line replacement in ${cityName}, ${stateName} typically requires permits. ${county ? `In ${county}, ` : ""}A licensed plumber handles the permit and includes the cost in your quote.`,
        },
        {
          q: `What is trenchless sewer replacement in ${cityName}?`,
          a: `Trenchless methods allow sewer line replacement or repair with minimal excavation — often through a small access point. It's available in most ${cityName} areas and can save time and landscaping. A local plumber can confirm if your property qualifies.`,
        },
        {
          q: `How do I know if I need sewer line replacement in ${cityName}?`,
          a: `Signs include recurring backups, slow drains throughout the house, sewage odors, and soggy spots in the yard. A camera inspection is the fastest way to confirm — most ${cityName} plumbers include it in the quote process.`,
        },
      ],
    },
    closing: {
      h2: `Get Your Free Sewer Line Quote in ${cityName} Today`,
      text: `No forms. No waiting. No obligation. A licensed plumber serving ${cityName}, ${stateName} can give you an honest sewer line estimate in under 5 minutes.`,
      cta: `Call for Your Free ${cityName} Sewer Line Quote`,
      sub: `Available 7 days a week · Same-day quote in ${cityName}`,
    },
    internalLinks: {
      otherServicesLabel: `Other services in ${cityName}:`,
      nearbyLabel: "Nearby cities:",
      backLabel: `← All cities in ${stateName}`,
    },
  };
}

// ——— Drain Line Replacement ———
export function getDrainLineCityPageContent(
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
  const income = cityMetadata?.medianHouseholdIncome;
  const homeValue = cityMetadata?.medianHomeValue;
  const homeownershipRate = cityMetadata?.homeownershipRate;

  const introParagraphs: string[] = [];
  introParagraphs.push(
    `Get a free drain line replacement quote in ${cityName}, ${stateName}. This page connects you with licensed plumbers who do drain line work — camera inspection and repair or replacement — no obligation.`
  );
  if (county || growthSnippet) {
    introParagraphs.push(
      county && growthSnippet
        ? `${cityName} is ${growthSnippet}. In ${county}, drain line scope and permits vary; a local plumber can give you a real estimate and confirm whether you need a full replacement or a targeted repair.`
        : county
          ? `In ${county}, drain line work may require a permit depending on scope; a plumber who works the area can outline the process when you call.`
          : `${cityName} is ${growthSnippet}. Get a real drain line estimate from a plumber who serves your area.`
    );
  } else {
    introParagraphs.push(`A camera inspection is the fastest way to get an accurate quote — most ${cityName} plumbers include it in their quote process.`);
  }

  const localParagraphs: string[] = [
    ...(county ? [`Drain line work in ${county} may require a permit depending on scope; a licensed ${cityName} plumber can confirm when you call.`] : []),
    ...(medianYear ? [`With many ${cityName} homes built around ${medianYear}, drain line replacement quotes often involve older materials and access challenges that affect the final price.`] : []),
    ...(income ? [`${cityName} homeowners with a median household income of $${income.toLocaleString()} find that getting a drain line quote early — before a failure — is the most cost-effective approach.`] : []),
    ...(growthSnippet ? [`In ${cityName}, ${growthSnippet}, demand for drain and sewer services is steady — getting a quote early helps secure a slot without emergency fees.`] : []),
  ].filter(Boolean);
  if (!localParagraphs.length) localParagraphs.push(`A licensed ${cityName} plumber can give you a drain line quote tailored to your home.`);

  return {
    meta: {
      title: `Drain Line Replacement Quote, ${cityName} | Free Estimates, Licensed Local Plumbers`,
      description: `Free drain line replacement quote in ${cityName}, ${stateName}. Licensed plumbers, camera inspection, upfront pricing, no obligation.`,
    },
    hero: {
      h1: `Free Drain Line Replacement Quote in ${cityName}, ${stateName}`,
      sub: `Licensed ${cityName} plumbers for drain line replacement. Camera inspection. Honest estimates, no commitment.`,
      trustBullets: buildTrustBullets(stateAbbr, cityName, county),
      cta: "Get Your Free Quote — Call Now",
    },
    intro: {
      h2: `Get a Real Drain Line Estimate in ${cityName}, ${stateName}`,
      paragraphs: introParagraphs,
      cta: `Call for a Free ${cityName} Drain Line Quote`,
    },
    costEstimator: {
      h2: `Drain Line Cost Estimator — ${cityName}, ${stateName}`,
      intro: `Use this tool for a ballpark before you call. Drain line costs depend on location of the run, pipe material, and ${stateAbbr} permit costs. Your exact ${cityName} quote may vary.`,
      ctaBelow: `Get Your Exact ${cityName} Drain Line Quote — Call Now`,
    },
    mainService: {
      h2: `Drain Line Replacement Quote in ${cityName}, ${stateAbbr}`,
      description: `Recurring clogs, slow drains, and sewage odors in your ${cityName} home are often symptoms of a failing drain line — not a clog that a snake can fix permanently. If you've had the same drain cleaned more than twice in 12 months, a replacement quote is the smarter next step. A camera inspection is the fastest way to get an accurate drain line quote in ${cityName} — it shows exactly where the problem is, so you're not paying to replace pipe that doesn't need replacing. Most ${cityName} plumbers include the camera inspection in their quote process.`,
      localParagraphs,
      cost: `Typical ${cityName} drain line replacement cost: $500 – $4,500`,
      whatAffects: [
        "Location of the damaged section (under slab, in wall, exterior)",
        "Pipe diameter and material",
        "Whether a camera inspection is needed",
        `${stateAbbr} permit requirements for your city`,
      ],
      cta: `Get a Drain Line Quote in ${cityName} — Call Now`,
    },
    whyCall: {
      h2: `Why ${cityName} Homeowners Get a Drain Line Quote First`,
      paragraphs: [
        `A phone quote from a licensed ${cityName} plumber gives you a realistic budget — and whether you need a full drain line replacement or a targeted repair. Recurring clogs, slow drains, and sewage odors are often symptoms of a failing drain line; location (under slab, in wall, exterior), pipe material, and ${stateName} permit requirements${county ? ` (${county})` : ""} all affect the final number. A 5-minute call gets you a ballpark; many ${cityName} plumbers use camera inspections to confirm scope before giving a firm quote.`,
        `It filters out the wrong contractors fast. Any ${cityName} plumber who won't give you a range over the phone before a dispatch fee is worth avoiding. A free quote call tells you who's serious — and a camera inspection often clarifies whether the issue is drain line or sewer line, which can change the cost significantly.`,
        `What sounds like a sewer problem is sometimes a drain line issue that costs a fraction of the price. A licensed ${cityName} plumber can often narrow it down from a quick conversation and recommend next steps (e.g. camera inspection) so you're not overpaying for the wrong scope.`,
      ],
    },
    localSignals: {
      h2: `Drain Line Quote Service Areas Near ${cityName}, ${stateName}`,
      intro: `Licensed plumbers available for drain line quotes in ${cityName} and nearby communities including ${nearby1}, ${nearby2}, and ${nearby3}.`,
      bullets: buildLocalSignalsBullets(
        stateName,
        stateAbbr,
        cityName,
        [
          `All plumbers are licensed under ${stateName} state requirements`,
          `Familiar with ${cityName}-area permit requirements for drain work`,
          "Upfront pricing — no surprise fees after the job starts",
          `Same-day and emergency availability in ${cityName} and surrounding ${stateAbbr} areas`,
        ],
        cityMetadata
      ),
    },
    eeat: { title: "Why trust this guide", bullets: EEAT_BULLETS },
    faq: {
      h2: `Drain Line Quote FAQ — ${cityName}, ${stateName}`,
      items: [
        {
          q: `How much does drain line replacement cost in ${cityName}?`,
          a: `Drain line replacement in ${cityName} typically ranges from $500 to $4,500 depending on location of the run, pipe material, and access. A licensed ${cityName} plumber can give you a project-specific quote, often after a camera inspection.`,
        },
        {
          q: `Is the drain line quote in ${cityName} free?`,
          a: `Yes. A phone quote costs nothing. No obligation, no dispatch fee. You get a real estimate before any work begins.`,
        },
        {
          q: `Do I need a permit for drain line work in ${cityName}?`,
          a: `It depends on scope. Drain line work in ${cityName}, ${stateName} may require a permit. ${county ? `In ${county}, ` : ""}A licensed plumber can confirm and include permit cost in your quote.`,
        },
        {
          q: `How do I know if I need drain line replacement in ${cityName}?`,
          a: `If you've had the same drain cleaned more than twice in 12 months, or you have recurring clogs and slow drains, a replacement quote is the next step. A camera inspection — which most ${cityName} plumbers offer — shows exactly where the problem is.`,
        },
        {
          q: `What's the difference between drain line and sewer line in ${cityName}?`,
          a: `Drain lines carry wastewater from your fixtures to the main sewer line (or septic). The sewer line runs from your property to the city main or septic tank. Both can fail; a licensed ${cityName} plumber can determine which is the issue and quote accordingly.`,
        },
      ],
    },
    closing: {
      h2: `Get Your Free Drain Line Quote in ${cityName} Today`,
      text: `No forms. No waiting. No obligation. A licensed plumber serving ${cityName}, ${stateName} can give you an honest drain line estimate in under 5 minutes.`,
      cta: `Call for Your Free ${cityName} Drain Line Quote`,
      sub: `Available 7 days a week · Same-day quote in ${cityName}`,
    },
    internalLinks: {
      otherServicesLabel: `Other services in ${cityName}:`,
      nearbyLabel: "Nearby cities:",
      backLabel: `← All cities in ${stateName}`,
    },
  };
}

// ——— Emergency Plumbing ———
export function getEmergencyPlumbingCityPageContent(
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
  const growthSnippet = cityMetadata?.growthSnippet;

  const introParagraphs: string[] = [];
  introParagraphs.push(
    `Get a free emergency plumbing quote in ${cityName}, ${stateName}. This page connects you with licensed plumbers who offer same-day and after-hours service — leaks, sewer backups, no hot water. No obligation.`
  );
  if (county || growthSnippet) {
    introParagraphs.push(
      county && growthSnippet
        ? `${cityName} is ${growthSnippet}. Emergency and after-hours rates in ${county} are familiar to local plumbers — a quick call gives you a real estimate.`
        : county
          ? `In ${county}, licensed plumbers who serve the area can quote emergency and same-day service. A phone quote takes under 5 minutes.`
          : `${cityName} is ${growthSnippet}. Get a real emergency plumbing estimate from a plumber who serves your area.`
    );
  } else {
    introParagraphs.push(`A licensed plumber who serves ${cityName} can give you an emergency quote over the phone in under 5 minutes — including any after-hours premium.`);
  }

  const localParagraphs: string[] = [];
  if (county) localParagraphs.push(`In ${county}, same-day and after-hours availability varies; a local plumber will confirm when you call.`);
  if (growthSnippet) localParagraphs.push(`As ${growthSnippet}, ${cityName} has strong demand for emergency plumbing — calling for a quote before a crisis often saves the after-hours premium.`);
  if (!localParagraphs.length) localParagraphs.push(`A licensed ${cityName} plumber can give you an emergency quote tailored to your situation.`);

  return {
    meta: {
      title: `Emergency Plumbing Quote, ${cityName} | Free Estimates, 24/7 Local Plumbers`,
      description: `Free emergency plumbing quote in ${cityName}, ${stateName}. Same-day and after-hours from licensed plumbers. Upfront pricing, no obligation.`,
    },
    hero: {
      h1: `Free Emergency Plumbing Quote in ${cityName}, ${stateName}`,
      sub: `Licensed ${cityName} plumbers for same-day and after-hours service. Leaks, sewer backups, no hot water — honest estimates, no commitment.`,
      trustBullets: buildTrustBullets(stateAbbr, cityName, county),
      cta: "Get Your Free Emergency Quote — Call Now",
    },
    intro: {
      h2: `Get a Real Emergency Plumbing Estimate in ${cityName}, ${stateName}`,
      paragraphs: introParagraphs,
      cta: `Call for a Free ${cityName} Emergency Plumbing Quote`,
    },
    costEstimator: {
      h2: `Emergency Plumbing Cost Estimator — ${cityName}, ${stateName}`,
      intro: `Use this tool for a ballpark before you call. Emergency and after-hours rates in ${cityName} typically add $150–$400 to the base job. Your exact quote may vary.`,
      ctaBelow: `Get Your Exact ${cityName} Emergency Quote — Call Now`,
    },
    mainService: {
      h2: `Emergency Plumbing Quote in ${cityName}, ${stateAbbr}`,
      description: `When you need a plumber fast — burst pipe, sewer backup, no hot water — a quick phone quote from a licensed ${cityName} plumber tells you what to expect. Emergency and after-hours call-out in ${cityName} typically adds $150–$400 to the job; same-day and next-day service is available in most areas. Getting a number before work starts avoids surprise fees.`,
      localParagraphs,
      cost: `Typical ${cityName} emergency plumbing: base job + $150–$400 after-hours premium`,
      whatAffects: [
        "Type of emergency — leak, sewer backup, water heater, etc.",
        "Time of day — night, weekend, holiday premiums",
        "Scope of work and parts needed",
        `${stateAbbr} labor rates in ${cityName}`,
      ],
      cta: `Get an Emergency Plumbing Quote in ${cityName} — Call Now`,
    },
    whyCall: {
      h2: `Why ${cityName} Homeowners Get an Emergency Quote First`,
      paragraphs: [
        `A phone quote from a licensed ${cityName} plumber gives you a real number — including any after-hours premium — before a truck rolls. Emergency plumbing in ${cityName} often adds $150–$400 to the base job; a 5-minute call confirms the total so you're not surprised.`,
        `It filters out the wrong plumbers fast. Any ${cityName} plumber who won't give you a range over the phone before charging a dispatch fee is worth avoiding. Serious contractors are used to quoting emergency work; a free call tells you who's worth your time.`,
        `If the situation isn't life-threatening, calling two local plumbers can surface a real price difference. This platform makes it easy to connect with licensed emergency plumbers in ${cityName}.`,
      ],
    },
    localSignals: {
      h2: `Emergency Plumbing Quote Service Areas Near ${cityName}, ${stateName}`,
      intro: `Licensed plumbers available for emergency quotes in ${cityName} and nearby communities including ${nearby1}, ${nearby2}, and ${nearby3}.`,
      bullets: buildLocalSignalsBullets(
        stateName,
        stateAbbr,
        cityName,
        [
          `All plumbers are licensed under ${stateName} state requirements`,
          `Same-day and after-hours availability in ${cityName}`,
          "Upfront pricing — after-hours premium quoted before work starts",
          `Serving ${cityName} and surrounding ${stateAbbr} areas`,
        ],
        cityMetadata
      ),
    },
    eeat: { title: "Why trust this guide", bullets: EEAT_BULLETS },
    faq: {
      h2: `Emergency Plumbing Quote FAQ — ${cityName}, ${stateName}`,
      items: [
        {
          q: `How much does emergency plumbing cost in ${cityName}?`,
          a: `Emergency and after-hours plumbing in ${cityName} typically adds $150–$400 to the base job. The total depends on the work — leak repair, water heater, sewer backup — and local rates. A licensed ${cityName} plumber can give you a quote over the phone.`,
        },
        {
          q: `Is the emergency plumbing quote in ${cityName} free?`,
          a: `Yes. A phone quote costs nothing. No obligation, no dispatch fee. You get a real estimate — including any after-hours premium — before any work begins.`,
        },
        {
          q: `Can I get a plumber same day in ${cityName}?`,
          a: `In most ${cityName} areas, same-day and after-hours service is available for emergencies. Call to confirm current availability.`,
        },
        {
          q: `What counts as a plumbing emergency in ${cityName}?`,
          a: `Common emergencies include major leaks, burst pipes, sewer backups, no water, and no hot water. If you're unsure, call; a licensed ${cityName} plumber can tell you whether it's urgent and give you a quote.`,
        },
        {
          q: `Do emergency plumbers in ${cityName} charge more?`,
          a: `Yes. After-hours, night, weekend, and holiday call-outs typically add $150–$400 to the job. A quick phone quote from a ${cityName} plumber tells you exactly what to expect before you commit.`,
        },
      ],
    },
    closing: {
      h2: `Get Your Free Emergency Plumbing Quote in ${cityName} Today`,
      text: `No forms. No waiting. No obligation. A licensed plumber serving ${cityName}, ${stateName} can give you an honest emergency estimate in under 5 minutes.`,
      cta: `Call for Your Free ${cityName} Emergency Plumbing Quote`,
      sub: `Available 7 days a week · Same-day and after-hours quote in ${cityName}`,
    },
    internalLinks: {
      otherServicesLabel: `Other services in ${cityName}:`,
      nearbyLabel: "Nearby cities:",
      backLabel: `← All cities in ${stateName}`,
    },
  };
}

/** Dispatcher: returns city page content for the given service (non-plumbing). */
export function getServiceCityPageContent(
  service: "plumbing-quote" | "repiping-quote" | "water-heater-replacement-quote" | "sewer-line-replacement-quote" | "drain-line-replacement-quote" | "emergency-plumbing-quote",
  params: ServiceContentParams
): ServiceCityContent {
  const { cityName, stateName, stateAbbr, nearby1, nearby2, nearby3, phone, cityMetadata } = params;
  const p = [cityName, stateName, stateAbbr, nearby1, nearby2, nearby3, phone ?? PHONE_DEFAULT, cityMetadata] as const;
  switch (service) {
    case "plumbing-quote":
      return getPlumbingCityPageContent(...p);
    case "repiping-quote":
      return getRepipingCityPageContent(...p);
    case "water-heater-replacement-quote":
      return getWaterHeaterCityPageContent(...p);
    case "sewer-line-replacement-quote":
      return getSewerLineCityPageContent(...p);
    case "drain-line-replacement-quote":
      return getDrainLineCityPageContent(...p);
    case "emergency-plumbing-quote":
      return getEmergencyPlumbingCityPageContent(...p);
    default:
      return getDrainLineCityPageContent(...p); // fallback
  }
}
