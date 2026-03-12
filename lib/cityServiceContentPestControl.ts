/**
 * City page content for single-service pages:
 * termite, rodent, bed-bug, mosquito, wildlife.
 * Each service has its own template and copy.
 */
import type { CityMetadata } from "./cityMetadata";

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

export type ServiceContentParams = {
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
      `Many ${cityName} homes were built in the ${medianYear} era — local specialists are familiar with this housing stock and common pest entry points.`
    );
  }
  if (growthSnippet) {
    bullets.push(
      `${cityName} is ${growthSnippet}, so demand for quality pest control is high; getting a quote early helps secure a slot.`
    );
  }
  return bullets;
}

const EEAT_BULLETS = [
  "This guide is written for homeowners comparing local quotes — we focus on what actually affects your estimate.",
  "We don't charge pest control specialists for placement. The quotes you get are from licensed contractors, not pay-to-play leads.",
  "Cost ranges are based on typical project scope; your final quote depends on your home, infestation severity, and local regulations.",
];

// ——— Termite Treatment ———
export function getTermiteTreatmentCityPageContent(
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
  const homeValue = cityMetadata?.medianHomeValue;

  const introParagraphs: string[] = [];
  introParagraphs.push(
    `Get a free termite treatment quote in ${cityName}, ${stateName}. This page connects you with licensed termite specialists — liquid barrier, bait systems, and fumigation — no obligation.`
  );
  if (county || growthSnippet) {
    introParagraphs.push(
      county && growthSnippet
        ? `${cityName} is ${growthSnippet}. Termite pressure in ${county} is familiar to local specialists — a quick call gives you a real treatment estimate for your home.`
        : county
          ? `In ${county}, termite treatment regulations are handled by specialists who work the area regularly. A phone quote takes under 5 minutes.`
          : `${cityName} is ${growthSnippet}. Get a real termite treatment estimate from a specialist who serves your area.`
    );
  } else {
    introParagraphs.push(`A licensed termite specialist who serves ${cityName} can give you a straight treatment estimate over the phone in under 5 minutes.`);
  }

  const localParagraphs: string[] = [
    ...(county ? [`In ${county}, termite treatment regulations and seasonal activity patterns are well known to local specialists.`] : []),
    ...(medianYear ? [`With a median build year of ${medianYear}, many ${cityName} homes have wood framing and conditions that increase termite risk — early detection matters.`] : []),
    ...(homeValue ? [`With a median home value of $${homeValue.toLocaleString()} in ${cityName}, protecting your home from termite damage is one of the highest-ROI investments you can make.`] : []),
    ...(growthSnippet ? [`As ${growthSnippet}, ${cityName} sees steady demand for termite treatment as older inventory is updated and new construction expands.`] : []),
  ].filter(Boolean);
  if (!localParagraphs.length) localParagraphs.push(`A licensed ${cityName} termite specialist can give you a treatment quote tailored to your home.`);

  return {
    meta: {
      title: `Termite Treatment Quote, ${cityName} | Free Estimates, Licensed Local Exterminators`,
      description: `Free termite treatment quote in ${cityName}, ${stateName}. Liquid barrier, bait systems & fumigation from licensed specialists. Upfront pricing, no obligation.`,
    },
    hero: {
      h1: `Free Termite Treatment Quote in ${cityName}, ${stateName}`,
      sub: `Licensed ${cityName} termite specialists. Liquid barrier, bait systems, and fumigation. Honest estimates, no commitment.`,
      trustBullets: buildTrustBullets(stateAbbr, cityName, county),
      cta: "Get Your Free Termite Quote — Call Now",
    },
    intro: {
      h2: `Get a Real Termite Treatment Estimate in ${cityName}, ${stateName}`,
      paragraphs: introParagraphs,
      cta: `Call for a Free ${cityName} Termite Treatment Quote`,
    },
    costEstimator: {
      h2: `Termite Treatment Cost Estimator — ${cityName}, ${stateName}`,
      intro: `Use this tool for a ballpark before you call. Termite treatment costs depend on home size, infestation severity, and treatment method. Your exact ${cityName} quote may vary.`,
      ctaBelow: `Get Your Exact ${cityName} Termite Quote — Call Now`,
    },
    mainService: {
      h2: `Termite Treatment Quote in ${cityName}, ${stateAbbr}`,
      description: `Termite treatment is one of the most important investments a ${cityName} homeowner can make. Termites cause billions in structural damage annually across the US — damage not covered by most homeowner insurance policies. Treatment method depends on termite species, infestation severity, and home construction. Liquid barrier treatments, bait station systems, and fumigation each have different cost points and effectiveness profiles. A licensed ${cityName} termite specialist will assess your situation and recommend the right approach.`,
      localParagraphs,
      cost: `Typical ${cityName} termite treatment cost: $500 – $8,000+`,
      whatAffects: [
        "Termite species (subterranean vs. drywood)",
        "Treatment method (liquid barrier, bait system, fumigation)",
        "Home size and construction type",
        "Infestation severity and extent of damage",
      ],
      cta: `Get a Termite Treatment Quote in ${cityName} — Call Now`,
    },
    whyCall: {
      h2: `Why ${cityName} Homeowners Get a Termite Quote First`,
      paragraphs: [
        `A phone quote from a licensed ${cityName} termite specialist gives you three things no search result can: a realistic treatment budget, a clear method recommendation (liquid barrier vs. bait vs. fumigation), and the chance to compare before committing. Termite treatment costs${county ? ` in ${county}` : ""} vary significantly by method and home size — a 5-minute call gets you a number that reflects your actual situation.`,
        `It filters out the wrong contractors fast. Any ${cityName} specialist who won't give you a range over the phone before charging a dispatch fee is worth avoiding. Serious termite contractors are used to giving ballpark estimates; a free quote call tells you immediately who's worth your time.`,
        `Getting a quote before damage compounds is critical. Termite damage is not covered by most homeowner insurance policies — every month without treatment is additional structural damage entirely out of pocket. If you've seen mud tubes, hollow wood, or discarded wings, getting a quote now is the only smart move.`,
      ],
    },
    localSignals: {
      h2: `Termite Treatment Quote Service Areas Near ${cityName}, ${stateName}`,
      intro: `Licensed termite specialists available for quotes in ${cityName} and nearby communities including ${nearby1}, ${nearby2}, and ${nearby3}.`,
      bullets: buildLocalSignalsBullets(
        stateName,
        stateAbbr,
        cityName,
        [
          `All specialists are licensed under ${stateName} state requirements`,
          `Familiar with ${cityName}-area termite species and seasonal activity`,
          "Upfront pricing — no surprise fees after treatment begins",
          `Emergency availability in ${cityName} and surrounding ${stateAbbr} areas`,
        ],
        cityMetadata
      ),
    },
    eeat: { title: "Why trust this guide", bullets: EEAT_BULLETS },
    faq: {
      h2: `Termite Treatment Quote FAQ — ${cityName}, ${stateName}`,
      items: [
        {
          q: `How much does termite treatment cost in ${cityName}, ${stateAbbr}?`,
          a: `Termite treatment in ${cityName} typically ranges from $500 for a liquid barrier on a small home to $8,000+ for whole-structure fumigation. A licensed ${cityName} specialist can give you a project-specific quote over the phone.`,
        },
        {
          q: `Is the termite treatment quote in ${cityName} free?`,
          a: `Yes. A phone quote costs nothing. No obligation, no dispatch fee. You get a real estimate from a licensed ${cityName} specialist before any work begins.`,
        },
        {
          q: `Does homeowner insurance cover termite damage in ${cityName}?`,
          a: `Most standard homeowner insurance policies do not cover termite damage in ${cityName}, ${stateName}. It is considered a preventable maintenance issue. This makes early treatment critical.`,
        },
        {
          q: `How do I know if I have termites in my ${cityName} home?`,
          a: `Common signs include mud tubes along your foundation, hollow-sounding wood, discarded wings near windows, and small fecal pellets. A licensed ${cityName} termite specialist can confirm activity and assess damage in a single inspection.`,
        },
        {
          q: `What termite treatment is best for ${cityName}?`,
          a: `It depends on the termite species active in your area and your home's construction. A licensed ${cityName} specialist will recommend the appropriate method — liquid barrier, bait system, or fumigation — based on your specific situation.`,
        },
      ],
    },
    closing: {
      h2: `Get Your Free Termite Treatment Quote in ${cityName} Today`,
      text: `No forms. No waiting. No obligation. A licensed termite specialist serving ${cityName}, ${stateName} can give you an honest estimate in under 5 minutes.`,
      cta: `Call for Your Free ${cityName} Termite Quote`,
      sub: `Available 7 days a week · Same-day quote in ${cityName}`,
    },
    internalLinks: {
      otherServicesLabel: `Other services in ${cityName}:`,
      nearbyLabel: "Nearby cities:",
      backLabel: `← All cities in ${stateName}`,
    },
  };
}

// ——— Rodent Control ———
export function getRodentControlCityPageContent(
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
  const homeValue = cityMetadata?.medianHomeValue;

  const introParagraphs: string[] = [];
  introParagraphs.push(
    `Get a free rodent control quote in ${cityName}, ${stateName}. This page connects you with licensed rodent specialists — inspection, exclusion, trapping, and sanitization — no obligation.`
  );
  if (county || growthSnippet) {
    introParagraphs.push(
      county && growthSnippet
        ? `${cityName} is ${growthSnippet}. Rodent pressure in ${county} is well known to local specialists who can give you a real exclusion estimate for your home.`
        : county
          ? `In ${county}, licensed rodent specialists work the area regularly and know local entry point patterns. A phone quote takes under 5 minutes.`
          : `${cityName} is ${growthSnippet}. Get a real rodent control estimate from a specialist who serves your area.`
    );
  } else {
    introParagraphs.push(`A licensed rodent specialist who serves ${cityName} can give you a straight exclusion estimate over the phone in under 5 minutes.`);
  }

  const localParagraphs: string[] = [
    ...(county ? [`In ${county}, rodent entry patterns vary by neighborhood and housing type — a local specialist knows where to look.`] : []),
    ...(medianYear ? [`With a median build year of ${medianYear}, many ${cityName} homes have foundation gaps, pipe penetrations, and aging soffits that are common rodent entry points.`] : []),
    ...(homeValue ? [`With a median home value of $${homeValue.toLocaleString()} in ${cityName}, addressing rodent intrusions quickly protects your investment from wiring damage and structural contamination.`] : []),
    ...(growthSnippet ? [`As ${growthSnippet}, ${cityName} sees steady rodent pressure as construction and development disturbs established rodent populations.`] : []),
  ].filter(Boolean);
  if (!localParagraphs.length) localParagraphs.push(`A licensed ${cityName} rodent specialist can give you an exclusion quote tailored to your home.`);

  return {
    meta: {
      title: `Rodent Control Quote, ${cityName} | Free Estimates, Licensed Local Exterminators`,
      description: `Free rodent control quote in ${cityName}, ${stateName}. Mouse & rat exclusion, trapping & sanitization from licensed specialists. Upfront pricing, no obligation.`,
    },
    hero: {
      h1: `Free Rodent Control Quote in ${cityName}, ${stateName}`,
      sub: `Licensed ${cityName} rodent specialists. Exclusion, trapping, and sanitization. Honest estimates, no commitment.`,
      trustBullets: buildTrustBullets(stateAbbr, cityName, county),
      cta: "Get Your Free Rodent Control Quote — Call Now",
    },
    intro: {
      h2: `Get a Real Rodent Control Estimate in ${cityName}, ${stateName}`,
      paragraphs: introParagraphs,
      cta: `Call for a Free ${cityName} Rodent Control Quote`,
    },
    costEstimator: {
      h2: `Rodent Control Cost Estimator — ${cityName}, ${stateName}`,
      intro: `Use this tool for a ballpark before you call. Rodent control costs depend on home size, infestation severity, and whether exclusion and sanitization are included. Your exact ${cityName} quote may vary.`,
      ctaBelow: `Get Your Exact ${cityName} Rodent Control Quote — Call Now`,
    },
    mainService: {
      h2: `Rodent Control Quote in ${cityName}, ${stateAbbr}`,
      description: `Rodent infestations in ${cityName} require more than traps — effective control means sealing every entry point to prevent re-entry. Mice can fit through a gap the size of a dime; rats through a quarter-sized hole. A licensed ${cityName} rodent specialist conducts a full inspection, identifies all entry points, and provides a complete exclusion quote that addresses the root cause — not just the visible symptoms. Attic sanitization and contaminated insulation removal are often required to eliminate health hazards and odors that attract new rodents.`,
      localParagraphs,
      cost: `Typical ${cityName} rodent control cost: $300 – $2,500+`,
      whatAffects: [
        "Infestation severity and species (mice vs. rats)",
        "Number and complexity of entry points",
        "Whether attic or crawl space sanitization is needed",
        "Home size and construction type",
      ],
      cta: `Get a Rodent Control Quote in ${cityName} — Call Now`,
    },
    whyCall: {
      h2: `Why ${cityName} Homeowners Get a Rodent Control Quote First`,
      paragraphs: [
        `A phone quote from a licensed ${cityName} rodent specialist gives you a realistic budget for exclusion — not just trapping. Rodent control costs${county ? ` in ${county}` : ""} depend on the number of entry points, home size, and whether attic sanitization is needed. A 5-minute call gets you a number that reflects your specific situation.`,
        `Trapping without exclusion is a temporary fix. Rodents re-enter through the same gaps within days — and they breed fast. Any ${cityName} specialist who focuses only on trapping without sealing entry points is not solving your problem. A free quote call tells you immediately who offers complete exclusion.`,
        `Rodent damage compounds quickly. Chewed wiring causes house fires. Contaminated insulation creates health hazards. The longer an infestation continues, the higher the total remediation cost. Getting a professional quote and starting exclusion now limits damage and limits cost.`,
      ],
    },
    localSignals: {
      h2: `Rodent Control Quote Service Areas Near ${cityName}, ${stateName}`,
      intro: `Licensed rodent specialists available for quotes in ${cityName} and nearby communities including ${nearby1}, ${nearby2}, and ${nearby3}.`,
      bullets: buildLocalSignalsBullets(
        stateName,
        stateAbbr,
        cityName,
        [
          `All specialists are licensed under ${stateName} state requirements`,
          `Familiar with ${cityName}-area rodent species and entry point patterns`,
          "Upfront pricing — no surprise fees after work begins",
          `Same-day availability in ${cityName} and surrounding ${stateAbbr} areas`,
        ],
        cityMetadata
      ),
    },
    eeat: { title: "Why trust this guide", bullets: EEAT_BULLETS },
    faq: {
      h2: `Rodent Control Quote FAQ — ${cityName}, ${stateName}`,
      items: [
        {
          q: `How much does rodent control cost in ${cityName}, ${stateAbbr}?`,
          a: `Rodent control in ${cityName} typically ranges from $300 for basic trapping to $2,500+ for full exclusion with attic sanitization. A licensed ${cityName} specialist can give you a project-specific quote over the phone.`,
        },
        {
          q: `Is the rodent control quote in ${cityName} free?`,
          a: `Yes. A phone quote costs nothing. No obligation, no dispatch fee. You get a real estimate from a licensed ${cityName} specialist before any work begins.`,
        },
        {
          q: `Can I handle rodent control myself in ${cityName}?`,
          a: `DIY trapping can reduce an active population temporarily, but without exclusion — sealing entry points — rodents will return within days. Professional exclusion is the only permanent solution in ${cityName}.`,
        },
        {
          q: `How do I know if I have rodents in my ${cityName} home?`,
          a: `Common signs include droppings along walls and in cabinets, gnaw marks on wiring or packaging, scratching sounds in walls at night, and nesting material in attics. A licensed ${cityName} specialist can confirm and assess severity in one inspection.`,
        },
        {
          q: `How quickly can rodent control begin in ${cityName}?`,
          a: `Most licensed ${cityName} specialists can begin within 1–3 days of the quote. Severe infestations can often be addressed same-day or next-day.`,
        },
      ],
    },
    closing: {
      h2: `Get Your Free Rodent Control Quote in ${cityName} Today`,
      text: `No forms. No waiting. No obligation. A licensed rodent specialist serving ${cityName}, ${stateName} can give you an honest estimate in under 5 minutes.`,
      cta: `Call for Your Free ${cityName} Rodent Control Quote`,
      sub: `Available 7 days a week · Same-day quote in ${cityName}`,
    },
    internalLinks: {
      otherServicesLabel: `Other services in ${cityName}:`,
      nearbyLabel: "Nearby cities:",
      backLabel: `← All cities in ${stateName}`,
    },
  };
}

// ——— Bed Bug Treatment ———
export function getBedBugTreatmentCityPageContent(
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

  const introParagraphs: string[] = [];
  introParagraphs.push(
    `Get a free bed bug treatment quote in ${cityName}, ${stateName}. This page connects you with licensed bed bug specialists — heat treatment, chemical treatment, and hybrid approaches — no obligation.`
  );
  if (county || growthSnippet) {
    introParagraphs.push(
      county && growthSnippet
        ? `${cityName} is ${growthSnippet}. Bed bug specialists serving ${county} can give you a real treatment estimate and method recommendation for your home.`
        : county
          ? `In ${county}, licensed bed bug specialists work the area regularly. A phone quote and method recommendation takes under 5 minutes.`
          : `${cityName} is ${growthSnippet}. Get a real bed bug treatment estimate from a specialist who serves your area.`
    );
  } else {
    introParagraphs.push(`A licensed bed bug specialist who serves ${cityName} can recommend the right treatment method and give you an honest estimate over the phone.`);
  }

  const localParagraphs: string[] = [
    ...(county ? [`Bed bug specialists serving ${county} are familiar with local housing types and treatment requirements.`] : []),
    ...(medianYear ? [`${cityName} homes built around ${medianYear} often have construction features — wall cavities, baseboard gaps — that make thorough bed bug treatment more complex; a professional assessment is essential.`] : []),
    ...(growthSnippet ? [`As ${growthSnippet}, ${cityName} has active rental and hospitality markets that increase bed bug transmission risk.`] : []),
  ].filter(Boolean);
  if (!localParagraphs.length) localParagraphs.push(`A licensed ${cityName} bed bug specialist can give you a treatment quote tailored to your home.`);

  return {
    meta: {
      title: `Bed Bug Treatment Quote, ${cityName} | Free Estimates, Licensed Local Exterminators`,
      description: `Free bed bug treatment quote in ${cityName}, ${stateName}. Heat treatment, chemical & hybrid from licensed specialists. Upfront pricing, no obligation.`,
    },
    hero: {
      h1: `Free Bed Bug Treatment Quote in ${cityName}, ${stateName}`,
      sub: `Licensed ${cityName} bed bug specialists. Heat treatment, chemical, and hybrid approaches. Honest estimates, no commitment.`,
      trustBullets: buildTrustBullets(stateAbbr, cityName, county),
      cta: "Get Your Free Bed Bug Quote — Call Now",
    },
    intro: {
      h2: `Get a Real Bed Bug Treatment Estimate in ${cityName}, ${stateName}`,
      paragraphs: introParagraphs,
      cta: `Call for a Free ${cityName} Bed Bug Treatment Quote`,
    },
    costEstimator: {
      h2: `Bed Bug Treatment Cost Estimator — ${cityName}, ${stateName}`,
      intro: `Use this tool for a ballpark before you call. Bed bug treatment costs depend on treatment method, number of rooms, and infestation severity. Your exact ${cityName} quote may vary.`,
      ctaBelow: `Get Your Exact ${cityName} Bed Bug Quote — Call Now`,
    },
    mainService: {
      h2: `Bed Bug Treatment Quote in ${cityName}, ${stateAbbr}`,
      description: `Bed bugs are among the hardest pests to eliminate without professional treatment in ${cityName}. DIY approaches almost always fail — over-the-counter sprays don't reach eggs, and improper treatment scatters the infestation to new areas of the home, making professional remediation harder and more expensive. Heat treatment eliminates all bed bugs and eggs in a single visit; chemical treatment requires multiple visits over several weeks. A licensed ${cityName} specialist will recommend the right method based on your infestation severity and home layout.`,
      localParagraphs,
      cost: `Typical ${cityName} bed bug treatment cost: $500 – $5,000+`,
      whatAffects: [
        "Treatment method (heat vs. chemical vs. hybrid)",
        "Number of rooms and infestation severity",
        "Home size and layout complexity",
        "Whether follow-up visits are included",
      ],
      cta: `Get a Bed Bug Treatment Quote in ${cityName} — Call Now`,
    },
    whyCall: {
      h2: `Why ${cityName} Homeowners Get a Bed Bug Quote First`,
      paragraphs: [
        `A phone quote from a licensed ${cityName} bed bug specialist gives you a realistic budget and a clear method recommendation. Heat treatment vs. chemical treatment can mean a $1,000+ difference for the same home${county ? ` in ${county}` : ""}. A 5-minute call gets you options and pricing before you commit.`,
        `It filters out the wrong approach fast. Any ${cityName} specialist who recommends only chemical treatment for a severe infestation — without discussing heat treatment — may not be giving you the most effective option. A free quote call lets you compare methods and contractors.`,
        `Bed bug infestations don't resolve on their own — they spread. Every day without professional treatment is another day of infestation growth. Getting a quote now limits the scope of treatment required and the total cost.`,
      ],
    },
    localSignals: {
      h2: `Bed Bug Treatment Quote Service Areas Near ${cityName}, ${stateName}`,
      intro: `Licensed bed bug specialists available for quotes in ${cityName} and nearby communities including ${nearby1}, ${nearby2}, and ${nearby3}.`,
      bullets: buildLocalSignalsBullets(
        stateName,
        stateAbbr,
        cityName,
        [
          `All specialists are licensed under ${stateName} state requirements`,
          `Familiar with ${cityName}-area housing types and treatment requirements`,
          "Upfront pricing — no surprise fees after treatment begins",
          `Same-day and next-day availability in ${cityName} and surrounding ${stateAbbr} areas`,
        ],
        cityMetadata
      ),
    },
    eeat: { title: "Why trust this guide", bullets: EEAT_BULLETS },
    faq: {
      h2: `Bed Bug Treatment Quote FAQ — ${cityName}, ${stateName}`,
      items: [
        {
          q: `How much does bed bug treatment cost in ${cityName}, ${stateAbbr}?`,
          a: `Bed bug treatment in ${cityName} ranges from $500 for a single-room chemical treatment to $5,000+ for whole-home heat treatment of a severe infestation. A licensed ${cityName} specialist can give you a method-specific quote over the phone.`,
        },
        {
          q: `Is the bed bug treatment quote in ${cityName} free?`,
          a: `Yes. A phone quote costs nothing. No obligation, no dispatch fee. You get a real estimate from a licensed ${cityName} specialist before any work begins.`,
        },
        {
          q: `Is heat treatment worth the extra cost in ${cityName}?`,
          a: `For moderate to severe infestations in ${cityName}, heat treatment is typically more cost-effective over time — it eliminates all bugs and eggs in one visit versus 3+ chemical visits. A local specialist can advise based on your specific infestation.`,
        },
        {
          q: `Should I throw away my furniture if I have bed bugs in ${cityName}?`,
          a: `In most cases, no. Professional heat or chemical treatment can effectively treat mattresses and furniture in place. Discarding furniture is rarely necessary and may spread the infestation.`,
        },
        {
          q: `How quickly can bed bug treatment begin in ${cityName}?`,
          a: `Most licensed ${cityName} bed bug specialists can begin chemical treatment within 1–3 days. Heat treatment typically requires 3–7 days for scheduling and preparation.`,
        },
      ],
    },
    closing: {
      h2: `Get Your Free Bed Bug Treatment Quote in ${cityName} Today`,
      text: `No forms. No waiting. No obligation. A licensed bed bug specialist serving ${cityName}, ${stateName} can give you an honest estimate in under 5 minutes.`,
      cta: `Call for Your Free ${cityName} Bed Bug Quote`,
      sub: `Available 7 days a week · Same-day quote in ${cityName}`,
    },
    internalLinks: {
      otherServicesLabel: `Other services in ${cityName}:`,
      nearbyLabel: "Nearby cities:",
      backLabel: `← All cities in ${stateName}`,
    },
  };
}

// ——— Mosquito Control ———
export function getMosquitoControlCityPageContent(
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
    `Get a free mosquito control quote in ${cityName}, ${stateName}. This page connects you with licensed mosquito specialists — barrier spray, seasonal programs, and misting systems — no obligation.`
  );
  if (county || growthSnippet) {
    introParagraphs.push(
      county && growthSnippet
        ? `${cityName} is ${growthSnippet}. Mosquito pressure in ${county} is seasonal and species-specific — a local specialist can give you a real program estimate for your property.`
        : county
          ? `In ${county}, mosquito specialists know local seasonal patterns and effective treatment windows. A phone quote takes under 5 minutes.`
          : `${cityName} is ${growthSnippet}. Get a real mosquito control estimate from a specialist who knows your area's seasonal pressure.`
    );
  } else {
    introParagraphs.push(`A licensed mosquito specialist who serves ${cityName} can recommend the right program and give you an honest seasonal estimate over the phone.`);
  }

  const localParagraphs: string[] = [
    ...(county ? [`In ${county}, mosquito season timing and species pressure are well known to local specialists who can optimize your treatment schedule.`] : []),
    ...(growthSnippet ? [`As ${growthSnippet}, ${cityName} has active outdoor lifestyles and events — professional mosquito control makes your yard usable through the season.`] : []),
  ].filter(Boolean);
  if (!localParagraphs.length) localParagraphs.push(`A licensed ${cityName} mosquito specialist can give you a program quote tailored to your property.`);

  return {
    meta: {
      title: `Mosquito Control Quote, ${cityName} | Free Estimates, Licensed Local Exterminators`,
      description: `Free mosquito control quote in ${cityName}, ${stateName}. Barrier spray, seasonal programs & misting systems from licensed specialists. Upfront pricing, no obligation.`,
    },
    hero: {
      h1: `Free Mosquito Control Quote in ${cityName}, ${stateName}`,
      sub: `Licensed ${cityName} mosquito specialists. Barrier spray, seasonal programs, and misting systems. Honest estimates, no commitment.`,
      trustBullets: buildTrustBullets(stateAbbr, cityName, county),
      cta: "Get Your Free Mosquito Control Quote — Call Now",
    },
    intro: {
      h2: `Get a Real Mosquito Control Estimate in ${cityName}, ${stateName}`,
      paragraphs: introParagraphs,
      cta: `Call for a Free ${cityName} Mosquito Control Quote`,
    },
    costEstimator: {
      h2: `Mosquito Control Cost Estimator — ${cityName}, ${stateName}`,
      intro: `Use this tool for a ballpark before you call. Mosquito control costs depend on property size, treatment type, and seasonal program length. Your exact ${cityName} quote may vary.`,
      ctaBelow: `Get Your Exact ${cityName} Mosquito Control Quote — Call Now`,
    },
    mainService: {
      h2: `Mosquito Control Quote in ${cityName}, ${stateAbbr}`,
      description: `Professional mosquito control in ${cityName} reduces biting pressure by 70–90% with a consistent seasonal program — making your outdoor space genuinely usable through peak season. Barrier spray treatments applied every 3–4 weeks provide residual protection; automated misting systems offer hands-free control for larger properties. A licensed ${cityName} mosquito specialist will assess your property size, standing water sources, and local mosquito pressure to recommend the most cost-effective program.`,
      localParagraphs,
      cost: `Typical ${cityName} mosquito control cost: $300 – $900 per season`,
      whatAffects: [
        "Property size and layout",
        "Treatment type (barrier spray vs. misting system)",
        "Number of treatments per season",
        "Standing water sources on or near the property",
      ],
      cta: `Get a Mosquito Control Quote in ${cityName} — Call Now`,
    },
    whyCall: {
      h2: `Why ${cityName} Homeowners Get a Mosquito Control Quote First`,
      paragraphs: [
        `A phone quote from a licensed ${cityName} mosquito specialist gives you a seasonal program price — how many treatments, what method, and total cost for the season. Program structures and pricing vary significantly between companies${county ? ` in ${county}` : ""}. A 5-minute call gets you options you can actually compare.`,
        `Starting before peak season is more cost-effective. In ${cityName}, starting a mosquito program before the season — rather than mid-summer — means fewer catch-up treatments and better overall protection. A licensed specialist can advise on optimal timing for your area.`,
        `Mosquitoes aren't just a nuisance in ${cityName} — they're vectors for West Nile virus, dengue, and other diseases. Professional control reduces real health risk, not just discomfort.`,
      ],
    },
    localSignals: {
      h2: `Mosquito Control Quote Service Areas Near ${cityName}, ${stateName}`,
      intro: `Licensed mosquito specialists available for quotes in ${cityName} and nearby communities including ${nearby1}, ${nearby2}, and ${nearby3}.`,
      bullets: buildLocalSignalsBullets(
        stateName,
        stateAbbr,
        cityName,
        [
          `All specialists are licensed under ${stateName} state requirements`,
          `Familiar with ${cityName}-area mosquito species and seasonal pressure`,
          "Upfront seasonal pricing — no surprise fees",
          `Serving ${cityName} and surrounding ${stateAbbr} areas`,
        ],
        cityMetadata
      ),
    },
    eeat: { title: "Why trust this guide", bullets: EEAT_BULLETS },
    faq: {
      h2: `Mosquito Control Quote FAQ — ${cityName}, ${stateName}`,
      items: [
        {
          q: `How much does mosquito control cost in ${cityName}, ${stateAbbr}?`,
          a: `A seasonal mosquito control program in ${cityName} typically runs $300–$900. Individual barrier spray treatments cost $50–$150. Misting system installation ranges from $1,500–$5,000. A licensed specialist can give you a property-specific quote.`,
        },
        {
          q: `Is the mosquito control quote in ${cityName} free?`,
          a: `Yes. A phone quote costs nothing. No obligation, no dispatch fee. You get a real estimate from a licensed ${cityName} specialist before any work begins.`,
        },
        {
          q: `When should I start mosquito control in ${cityName}?`,
          a: `Starting before peak mosquito season — typically April or May in ${stateName} — is more cost-effective and provides better season-long protection. A local specialist can advise on optimal timing for ${cityName}.`,
        },
        {
          q: `Are mosquito treatments safe for children and pets in ${cityName}?`,
          a: `Most licensed mosquito treatments use pyrethrins or synthetic pyrethroids that are safe for humans and pets once dried — typically within 30 minutes to 2 hours. Ask your ${cityName} specialist about re-entry times.`,
        },
        {
          q: `Is an automated misting system worth the cost in ${cityName}?`,
          a: `For high-pressure properties, waterfront homes, or homeowners who want hands-free convenience, automated misting systems can pay for themselves over 3–5 seasons compared to annual barrier spray programs. A local specialist can assess your property.`,
        },
      ],
    },
    closing: {
      h2: `Get Your Free Mosquito Control Quote in ${cityName} Today`,
      text: `No forms. No waiting. No obligation. A licensed mosquito specialist serving ${cityName}, ${stateName} can give you an honest seasonal estimate in under 5 minutes.`,
      cta: `Call for Your Free ${cityName} Mosquito Control Quote`,
      sub: `Available 7 days a week · Same-day quote in ${cityName}`,
    },
    internalLinks: {
      otherServicesLabel: `Other services in ${cityName}:`,
      nearbyLabel: "Nearby cities:",
      backLabel: `← All cities in ${stateName}`,
    },
  };
}

// ——— Wildlife Removal ———
export function getWildlifeRemovalCityPageContent(
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
  const homeValue = cityMetadata?.medianHomeValue;

  const introParagraphs: string[] = [];
  introParagraphs.push(
    `Get a free wildlife removal quote in ${cityName}, ${stateName}. This page connects you with licensed wildlife specialists — raccoons, squirrels, bats, opossums, snakes, and more — humane removal, no obligation.`
  );
  if (county || growthSnippet) {
    introParagraphs.push(
      county && growthSnippet
        ? `${cityName} is ${growthSnippet}. Wildlife specialists serving ${county} know local species regulations and humane removal requirements — a quick call gives you a real estimate.`
        : county
          ? `In ${county}, wildlife removal regulations vary by species; a licensed specialist who works the area handles permits and legal relocation. A phone quote takes under 5 minutes.`
          : `${cityName} is ${growthSnippet}. Get a real wildlife removal estimate from a licensed specialist who serves your area.`
    );
  } else {
    introParagraphs.push(`A licensed wildlife specialist who serves ${cityName} can give you an honest removal and exclusion estimate over the phone in under 5 minutes.`);
  }

  const localParagraphs: string[] = [
    ...(county ? [`In ${county}, wildlife removal requires permits for many species; a licensed ${cityName} specialist handles all legal requirements as part of the job.`] : []),
    ...(medianYear ? [`${cityName} homes built around ${medianYear} often have aging soffits, fascia, and roof vents that are common wildlife entry points — exclusion is essential after removal.`] : []),
    ...(homeValue ? [`With a median home value of $${homeValue.toLocaleString()} in ${cityName}, addressing wildlife intrusions quickly limits structural damage and protects your investment.`] : []),
    ...(growthSnippet ? [`As ${growthSnippet}, ${cityName}'s expanding development displaces wildlife populations — intrusions into homes and attics are increasingly common.`] : []),
  ].filter(Boolean);
  if (!localParagraphs.length) localParagraphs.push(`A licensed ${cityName} wildlife specialist can give you a removal and exclusion quote tailored to your home.`);

  return {
    meta: {
      title: `Wildlife Removal Quote, ${cityName} | Free Estimates, Licensed Local Specialists`,
      description: `Free wildlife removal quote in ${cityName}, ${stateName}. Raccoon, squirrel, bat & snake removal from licensed specialists. Humane, upfront pricing, no obligation.`,
    },
    hero: {
      h1: `Free Wildlife Removal Quote in ${cityName}, ${stateName}`,
      sub: `Licensed ${cityName} wildlife specialists. Raccoons, squirrels, bats, opossums, snakes. Humane removal and exclusion. Honest estimates, no commitment.`,
      trustBullets: buildTrustBullets(stateAbbr, cityName, county),
      cta: "Get Your Free Wildlife Removal Quote — Call Now",
    },
    intro: {
      h2: `Get a Real Wildlife Removal Estimate in ${cityName}, ${stateName}`,
      paragraphs: introParagraphs,
      cta: `Call for a Free ${cityName} Wildlife Removal Quote`,
    },
    costEstimator: {
      h2: `Wildlife Removal Cost Estimator — ${cityName}, ${stateName}`,
      intro: `Use this tool for a ballpark before you call. Wildlife removal costs depend on animal species, intrusion scope, and whether exclusion and attic remediation are required. Your exact ${cityName} quote may vary.`,
      ctaBelow: `Get Your Exact ${cityName} Wildlife Removal Quote — Call Now`,
    },
    mainService: {
      h2: `Wildlife Removal Quote in ${cityName}, ${stateAbbr}`,
      description: `Wildlife removal in ${cityName} is regulated — most species require a licensed specialist for legal trapping, relocation, and exclusion. Removing an animal without sealing entry points guarantees the same problem within weeks. A licensed ${cityName} wildlife specialist identifies every entry point, handles all permits and legal relocation, and provides a complete exclusion quote. Attic remediation — removal of contaminated insulation and droppings — is often required after raccoon or bat intrusions to eliminate health hazards and odors that attract new animals.`,
      localParagraphs,
      cost: `Typical ${cityName} wildlife removal cost: $200 – $3,000+`,
      whatAffects: [
        "Animal species and number of animals",
        "Entry points and exclusion complexity",
        "Whether attic or crawl space remediation is needed",
        `${stateAbbr} wildlife removal permit requirements`,
      ],
      cta: `Get a Wildlife Removal Quote in ${cityName} — Call Now`,
    },
    whyCall: {
      h2: `Why ${cityName} Homeowners Get a Wildlife Removal Quote First`,
      paragraphs: [
        `A phone quote from a licensed ${cityName} wildlife specialist gives you a realistic budget for removal and exclusion. Wildlife removal costs${county ? ` in ${county}` : ""} depend on the species, number of animals, entry point complexity, and whether attic remediation is needed. A 5-minute call gets you a number that reflects your specific situation — not a national average.`,
        `Removal without exclusion is a temporary fix. Wildlife re-enters through the same gaps within weeks. Any ${cityName} specialist who offers removal-only without sealing entry points is not solving your problem permanently. A free quote call lets you identify who offers complete exclusion.`,
        `Wildlife removal is legally regulated in ${stateName}. Attempting to trap and relocate raccoons, bats, or squirrels without a license can result in fines — and mishandling bats creates serious rabies exposure risk. A licensed ${cityName} specialist handles all legal requirements as part of the job.`,
      ],
    },
    localSignals: {
      h2: `Wildlife Removal Quote Service Areas Near ${cityName}, ${stateName}`,
      intro: `Licensed wildlife specialists available for quotes in ${cityName} and nearby communities including ${nearby1}, ${nearby2}, and ${nearby3}.`,
      bullets: buildLocalSignalsBullets(
        stateName,
        stateAbbr,
        cityName,
        [
          `All specialists are licensed under ${stateName} wildlife removal requirements`,
          `Familiar with ${cityName}-area wildlife species and local regulations`,
          "Humane removal methods — upfront pricing",
          `Emergency availability in ${cityName} and surrounding ${stateAbbr} areas`,
        ],
        cityMetadata
      ),
    },
    eeat: { title: "Why trust this guide", bullets: EEAT_BULLETS },
    faq: {
      h2: `Wildlife Removal Quote FAQ — ${cityName}, ${stateName}`,
      items: [
        {
          q: `How much does wildlife removal cost in ${cityName}, ${stateAbbr}?`,
          a: `Wildlife removal in ${cityName} typically ranges from $200 for a single opossum removal to $3,000+ for raccoon exclusion with attic remediation. A licensed ${cityName} specialist can give you a species-specific quote over the phone.`,
        },
        {
          q: `Is the wildlife removal quote in ${cityName} free?`,
          a: `Yes. A phone quote costs nothing. No obligation, no dispatch fee. You get a real estimate from a licensed ${cityName} specialist before any work begins.`,
        },
        {
          q: `Can I remove wildlife myself in ${cityName}?`,
          a: `Most wildlife removal in ${stateName} requires a state license. Trapping and relocating raccoons, bats, and squirrels without permits is illegal in most circumstances. Always use a licensed specialist in ${cityName}.`,
        },
        {
          q: `When can bats be removed in ${cityName}, ${stateAbbr}?`,
          a: `Bat exclusion in ${stateName} can only be performed outside the maternity season — when baby bats are present and cannot fly. A licensed ${cityName} specialist knows your state's specific exclusion windows.`,
        },
        {
          q: `How quickly can wildlife removal begin in ${cityName}?`,
          a: `Most licensed ${cityName} wildlife specialists can begin within 1–3 days of the quote. Urgent situations — active raccoon in the attic, snake in the living space — are often addressed same-day or next-day.`,
        },
      ],
    },
    closing: {
      h2: `Get Your Free Wildlife Removal Quote in ${cityName} Today`,
      text: `No forms. No waiting. No obligation. A licensed wildlife specialist serving ${cityName}, ${stateName} can give you an honest removal and exclusion estimate in under 5 minutes.`,
      cta: `Call for Your Free ${cityName} Wildlife Removal Quote`,
      sub: `Available 7 days a week · Same-day quote in ${cityName}`,
    },
    internalLinks: {
      otherServicesLabel: `Other services in ${cityName}:`,
      nearbyLabel: "Nearby cities:",
      backLabel: `← All cities in ${stateName}`,
    },
  };
}

/** Dispatcher: returns city page content for the given pest control service. */
export function getServiceCityPageContent(
  service:
    | "pest-control-quote"
    | "termite-treatment-quote"
    | "rodent-control-quote"
    | "bed-bug-treatment-quote"
    | "mosquito-control-quote"
    | "wildlife-removal-quote",
  params: ServiceContentParams
): ServiceCityContent {
  const { cityName, stateName, stateAbbr, nearby1, nearby2, nearby3, phone, cityMetadata } = params;
  const p = [cityName, stateName, stateAbbr, nearby1, nearby2, nearby3, phone ?? PHONE_DEFAULT, cityMetadata] as const;
  switch (service) {
    case "pest-control-quote":
      return getTermiteTreatmentCityPageContent(...p); // contenu le plus proche
    case "termite-treatment-quote":
      return getTermiteTreatmentCityPageContent(...p);
    case "rodent-control-quote":
      return getRodentControlCityPageContent(...p);
    case "bed-bug-treatment-quote":
      return getBedBugTreatmentCityPageContent(...p);
    case "mosquito-control-quote":
      return getMosquitoControlCityPageContent(...p);
    case "wildlife-removal-quote":
      return getWildlifeRemovalCityPageContent(...p);
    default:
      return getTermiteTreatmentCityPageContent(...p); // fallback
  }
}
