import type { CityMetadata } from "./cityMetadata";

/**
 * City page content for plumbing-quote only. Template variables: CITY, STATE, STATE_ABBR, PHONE, NEARBY_1, NEARBY_2, NEARBY_3.
 * When cityMetadata is provided, intro/hero/FAQ and service blocks include local differentiation (county, median year, growth).
 */
export interface PlumbingCityContent {
  meta: { title: string; description: string };
  hero: { h1: string; sub: string; trustBullets: string[]; cta: string };
  intro: { h2: string; paragraphs: string[]; cta: string };
  costEstimator: { h2: string; intro: string; ctaBelow: string };
  services: {
    h2: string;
    items: {
      slug: string;
      h3: string;
      description: string;
      cost: string;
      whatAffects: string[];
      cta: string;
      /** 2–3 local sentences when cityMetadata is present; omitted otherwise. */
      localParagraphs?: string[];
    }[];
  };
  whyCall: { h2: string; paragraphs: string[] };
  localSignals: { h2: string; intro: string; bullets: string[] };
  faq: { h2: string; items: { q: string; a: string }[] };
  closing: { h2: string; text: string; cta: string; sub: string };
  internalLinks: {
    otherServicesLabel: string;
    nearbyLabel: string;
    backLabel: string;
  };
}

const PHONE_DEFAULT = "(555) 123-4567";

export function getPlumbingCityPageContent(
  cityName: string,
  stateName: string,
  stateAbbr: string,
  nearby1: string,
  nearby2: string,
  nearby3: string,
  phone: string = PHONE_DEFAULT,
  cityMetadata?: CityMetadata | null
): PlumbingCityContent {
  const county = cityMetadata?.county;
  const medianYear = cityMetadata?.medianYearBuilt;
  const growthSnippet = cityMetadata?.growthSnippet;
  const income = cityMetadata?.medianHouseholdIncome;
  const homeValue = cityMetadata?.medianHomeValue;
  const homeownershipRate = cityMetadata?.homeownershipRate;

  const introParagraphs: string[] = [];
  if (growthSnippet) {
    introParagraphs.push(
      `${cityName} is ${growthSnippet}. Plumbing costs in ${cityName} reflect local demand and labor — get a real estimate from a plumber who serves the area.`
    );
  }
  introParagraphs.push(
    `Plumbing costs in ${cityName} aren't what you'll find on a national average chart. Local labor rates, ${stateName} permit fees${county ? ` and ${county} permit timelines` : ""}, and the specific age and condition of homes in ${cityName} all push numbers up or down in ways that a generic estimate can't capture.`
  );
  introParagraphs.push(
    `This page connects ${cityName} homeowners directly with licensed local plumbers who know the area, know the permit process, and will give you a straight price before a single tool comes out of the truck. Whether you need a drain line looked at, a water heater replaced, or you're weighing a full repipe — a call takes less than 5 minutes and costs nothing.`
  );

  const trustBullets = [
    `Licensed & insured in ${stateAbbr}`,
    "Free estimates, no obligation",
    `Same-day availability in ${cityName}`,
    "Upfront pricing before any work begins",
  ];
  if (county) {
    trustBullets.push(`Serving ${cityName} and ${county}`);
  }

  return {
    meta: {
      title: `Plumbing Quote, ${cityName} | Free Estimates, Licensed Local Plumbers`,
      description: `Free plumbing quote in ${cityName}, ${stateName}. Licensed local plumbers, upfront pricing, no obligation. Repiping, water heater, sewer & drain estimates.`,
    },
    hero: {
      h1: `Free Plumbing Quote in ${cityName}, ${stateName}`,
      sub: `Licensed ${cityName} plumbers. Honest estimates. No commitment until you're ready to hire.`,
      trustBullets,
      cta: "Get Your Free Quote — Call Now",
    },
    intro: {
      h2: `Get a Real Plumbing Estimate in ${cityName}, ${stateName}`,
      paragraphs: introParagraphs,
      cta: `Call for a Free ${cityName} Plumbing Quote`,
    },
    costEstimator: {
      h2: `Plumbing Cost Estimator — ${cityName}, ${stateName}`,
      intro: `Use this tool for a ballpark figure before you call. All ranges are based on ${cityName}-area pricing. Your exact quote depends on home size, pipe access, materials, and current ${stateAbbr} permit costs.`,
      ctaBelow: `Get Your Exact ${cityName} Quote — Call Now`,
    },
    services: {
      h2: `Plumbing Services Available for Quotes in ${cityName}, ${stateName}`,
      items: [
        {
          slug: "repiping-quote",
          h3: `Repiping Quote in ${cityName}, ${stateAbbr}`,
          description: `Whole-home repiping is the most significant plumbing project most ${cityName} homeowners will ever undertake — and one of the most misquoted. Costs depend on your home's square footage, the current pipe material, wall and crawl space accessibility, and ${stateName} permit requirements that vary by county. Homes in ${cityName} built before 1980 are the most common candidates. If you're seeing rust-colored water, frequent leaks in multiple spots, or persistent low pressure throughout the house, a repiping quote is the first call to make — before a failure forces an emergency situation that costs two to three times more.`,
          cost: `Typical ${cityName} repiping cost: $4,000 – $15,000+`,
          whatAffects: [
            "Home size and number of fixtures",
            "Current pipe material (galvanized steel, polybutylene, copper)",
            "Accessibility — slab vs. crawl space vs. basement",
            `${stateAbbr} permit and inspection requirements`,
          ],
          cta: `Get a Repiping Quote in ${cityName} — Call Now`,
          ...(cityMetadata &&
            (medianYear || growthSnippet) && {
              localParagraphs: [
                ...(county
                  ? [
                      `In ${county}, permit timelines for repiping can affect scheduling — a licensed plumber familiar with the area will factor that into your quote.`,
                    ]
                  : []),
                ...(medianYear
                  ? [
                      `With a median build year of ${medianYear}, many ${cityName} repiping quotes involve homes with galvanized or polybutylene systems that are past their lifespan.`,
                    ]
                  : []),
                ...(homeownershipRate
                  ? [
                      `With a homeownership rate of ${homeownershipRate}% in ${cityName}, most residents have a direct financial stake in keeping their plumbing up to date — repiping is one of the highest-ROI investments before a sale.`,
                    ]
                  : []),
                ...(growthSnippet
                  ? [
                      `As ${growthSnippet}, ${cityName} sees strong demand for repiping as older inventory is updated.`,
                    ]
                  : []),
              ].filter(Boolean),
            }),
          ...(!cityMetadata && {
            localParagraphs: [
              `A licensed ${cityName} plumber can give you a quote tailored to your home.`,
            ],
          }),
        },
        {
          slug: "water-heater-replacement-quote",
          h3: `Water Heater Replacement Quote in ${cityName}, ${stateAbbr}`,
          description: `Water heater replacements are among the most common plumbing jobs in ${cityName} — and among the most price-variable. Tank vs. tankless, gas vs. electric, capacity, and the condition of existing connections all affect what you'll actually pay. Getting a quote before yours fails entirely saves ${cityName} homeowners the emergency call-out premium that can add $150–$400 to any job. ${stateName} utility rebates may apply to qualifying tankless or high-efficiency installations. A licensed ${cityName} plumber will tell you what you're eligible for when you call.`,
          cost: `Typical ${cityName} water heater replacement cost: $900 – $3,200`,
          whatAffects: [
            "Tank vs. tankless unit",
            "Gas vs. electric connection",
            "Tank capacity (40, 50, 80 gallon)",
            "Ease of access and existing connection compatibility",
          ],
          cta: `Get a Water Heater Quote in ${cityName} — Call Now`,
          ...(cityMetadata &&
            (medianYear || growthSnippet) && {
              localParagraphs: [
                ...(county
                  ? [
                      `${county} permit requirements for water heater replacement are straightforward; a local plumber can outline the process when you call.`,
                    ]
                  : []),
                ...(medianYear
                  ? [
                      `Homes in ${cityName} built around ${medianYear} often have water heaters nearing end-of-life — getting a quote now avoids emergency pricing.`,
                    ]
                  : []),
                ...(income
                  ? [
                      `With a median household income of $${income.toLocaleString()} in ${cityName}, getting a flat-rate quote before work starts ensures no surprises on the final invoice.`,
                    ]
                  : []),
                ...(growthSnippet
                  ? [
                      `${cityName} is ${growthSnippet}, so same-day and next-day installs are in high demand; booking ahead often saves money.`,
                    ]
                  : []),
              ].filter(Boolean),
            }),
          ...(!cityMetadata && {
            localParagraphs: [
              `A licensed ${cityName} plumber can give you a quote tailored to your home.`,
            ],
          }),
        },
        {
          slug: "sewer-line-replacement-quote",
          h3: `Sewer Line Replacement Quote in ${cityName}, ${stateAbbr}`,
          description: `Sewer line issues are the plumbing problem ${cityName} homeowners are most likely to delay — and the one where delay costs the most. Tree root intrusion, pipe collapse, and corrosion are common in older ${cityName} neighborhoods, and the longer they're ignored, the more excavation becomes unavoidable. Trenchless sewer line replacement is available in most ${cityName} areas and can eliminate the need for full yard excavation. It costs less, takes less time, and leaves your landscaping intact. A licensed ${cityName} plumber will tell you whether your property and pipe condition qualify when you call.`,
          cost: `Typical ${cityName} sewer line replacement cost: $3,500 – $22,000`,
          whatAffects: [
            "Length and depth of the affected run",
            "Trenchless vs. traditional excavation",
            "Current pipe material (clay, cast iron, ABS)",
            `Distance to the city main and ${stateAbbr} permit fees`,
          ],
          cta: `Get a Sewer Line Quote in ${cityName} — Call Now`,
          ...(cityMetadata &&
            (medianYear || growthSnippet) && {
              localParagraphs: [
                ...(county
                  ? [
                      `In ${county}, sewer work typically requires permits and inspections; a plumber who regularly works the area can streamline the process.`,
                    ]
                  : []),
                ...(medianYear
                  ? [
                      `Older ${cityName} neighborhoods, including many homes built before ${medianYear}, frequently have clay or cast-iron sewer lines that are prime candidates for replacement or trenchless repair.`,
                    ]
                  : []),
                ...(homeValue
                  ? [
                      `With a median home value of $${homeValue.toLocaleString()} in ${cityName}, addressing sewer line issues before they escalate protects one of your largest assets.`,
                    ]
                  : []),
                ...(growthSnippet
                  ? [
                      `As ${growthSnippet}, ${cityName} has a mix of older and newer infrastructure — a camera inspection will show whether you need a full replacement or a targeted repair.`,
                    ]
                  : []),
              ].filter(Boolean),
            }),
          ...(!cityMetadata && {
            localParagraphs: [
              `A licensed ${cityName} plumber can give you a quote tailored to your home.`,
            ],
          }),
        },
        {
          slug: "drain-line-replacement-quote",
          h3: `Drain Line Replacement Quote in ${cityName}, ${stateAbbr}`,
          description: `Recurring clogs, slow drains, and sewage odors in your ${cityName} home are often symptoms of a failing drain line — not a clog that a snake can fix permanently. If you've had the same drain cleaned more than twice in 12 months, a replacement quote is the smarter next step. A camera inspection is the fastest way to get an accurate drain line quote in ${cityName} — it shows exactly where the problem is, so you're not paying to replace pipe that doesn't need replacing. Most ${cityName} plumbers include the camera inspection in their quote process.`,
          cost: `Typical ${cityName} drain line replacement cost: $500 – $4,500`,
          whatAffects: [
            "Location of the damaged section (under slab, in wall, exterior)",
            "Pipe diameter and material",
            "Whether a camera inspection is needed",
            `${stateAbbr} permit requirements for your city`,
          ],
          cta: `Get a Drain Line Quote in ${cityName} — Call Now`,
          ...(cityMetadata &&
            (medianYear || growthSnippet) && {
              localParagraphs: [
                ...(county
                  ? [
                      `Drain line work in ${county} may require a permit depending on scope; a licensed ${cityName} plumber can confirm when you call.`,
                    ]
                  : []),
                ...(medianYear
                  ? [
                      `With many ${cityName} homes built around ${medianYear}, drain line replacement quotes often involve older materials and access challenges that affect the final price.`,
                    ]
                  : []),
                ...(income
                  ? [
                      `${cityName} homeowners with a median household income of $${income.toLocaleString()} find that getting a drain line quote early — before a failure — is the most cost-effective approach.`,
                    ]
                  : []),
                ...(growthSnippet
                  ? [
                      `In ${cityName}, ${growthSnippet}, demand for drain and sewer services is steady — getting a quote early helps secure a slot without emergency fees.`,
                    ]
                  : []),
              ].filter(Boolean),
            }),
          ...(!cityMetadata && {
            localParagraphs: [
              `A licensed ${cityName} plumber can give you a quote tailored to your home.`,
            ],
          }),
        },
      ],
    },
    whyCall: {
      h2: `Why ${cityName} Homeowners Call for a Quote Before Hiring`,
      paragraphs: [
        `A phone quote from a licensed ${cityName} plumber gives you three things that no search result can: a realistic budget for your specific home, a clear scope of work, and the confidence to compare if you want to. It takes less than 5 minutes. A licensed plumber serving ${cityName} can assess your situation over the phone, give you a range, and confirm same-day or next-day availability — all before you've committed to anything.`,
        `It filters out the wrong plumbers fast. Any ${cityName} plumber who won't give you a range over the phone before charging a dispatch fee is a plumber worth avoiding. A free quote call tells you immediately who's worth your time.`,
        `It often changes the diagnosis. What sounds like a sewer line problem is sometimes a drain line issue that costs a fraction of the price. A licensed ${cityName} plumber can often tell the difference from a 3-minute conversation — saving you from an unnecessary service call.`,
      ],
    },
    localSignals: {
      h2: `Plumbing Quote Service Areas Near ${cityName}, ${stateName}`,
      intro: `Licensed plumbers available for free quotes in ${cityName} and nearby communities including ${nearby1}, ${nearby2}, and ${nearby3}.`,
      bullets: [
        `All plumbers are licensed under ${stateName} state requirements`,
        `Familiar with ${cityName}-area permit processes and inspection timelines`,
        "Upfront pricing — no surprise fees after the job starts",
        `Emergency availability in ${cityName} and surrounding ${stateAbbr} areas`,
      ],
    },
    faq: {
      h2: `Plumbing Quote FAQ — ${cityName}, ${stateName}`,
      items: [
        {
          q: `How much does a plumber cost in ${cityName}, ${stateAbbr}?`,
          a: `Plumber rates in ${cityName} typically range from $75 to $185 per hour for standard jobs. For larger projects — repiping, sewer line replacement, water heater installation — most ${cityName} plumbers quote a flat project rate. Emergency and after-hours calls in ${cityName} generally add $150–$400 to any estimate. Call for a rate specific to your job.`,
        },
        {
          q: `Is the plumbing quote in ${cityName} actually free?`,
          a: `Yes. A phone quote costs nothing and takes under 5 minutes. No obligation to hire, no dispatch fee, no credit card required. You get a real estimate from a licensed ${cityName} plumber before any work begins.`,
        },
        {
          q: `Do plumbers in ${cityName} pull permits?`,
          a: `Licensed plumbers in ${cityName}, ${stateName} are required to pull permits for most major work — water heater replacements, sewer line work, repiping, and new installations.${county ? ` In ${county}, permit timelines and fees are set at the county level — your plumber will include them in your quote.` : ""} A licensed ${cityName} plumber handles the permit process and includes the cost in your quote. Be cautious of any contractor who suggests skipping the permit — it creates liability for you as the homeowner.`,
        },
        {
          q: `How quickly can I get a plumber in ${cityName}?`,
          a: `In ${cityName}, same-day and next-day service is available for most jobs through licensed local plumbers. Emergency plumbing — active leaks, sewer backups, no hot water — is typically addressable the same day. Call to confirm current availability.`,
        },
        {
          q: `What's the most common plumbing issue in ${cityName} homes?`,
          a: `The most common plumbing issues ${cityName} homeowners call about are drain line clogs and failures, water heater replacements (especially in homes over 10 years old), and sewer line problems in older neighborhoods. Homes built before 1980 in ${cityName} also frequently need repiping consultations due to aging galvanized or polybutylene pipes.`,
        },
        {
          q: `How do I know if I need repiping in my ${cityName} home?`,
          a: `The most common signs include rust-colored or discolored water, frequent leaks in multiple locations, consistently low water pressure throughout the home, and pipes that are 40+ years old. If your ${cityName} home was built before 1975 with original galvanized pipes, a repiping quote is worth getting now — before a failure forces an emergency repair.`,
        },
        {
          q: `Can I get quotes for multiple services at once in ${cityName}?`,
          a: `Yes. When you call, tell the plumber everything you've noticed — multiple issues are often related, and a licensed ${cityName} plumber can quote all relevant work in a single call. Bundling repairs often saves on labor cost compared to separate service visits.`,
        },
      ],
    },
    closing: {
      h2: `Get Your Free Plumbing Quote in ${cityName} Today`,
      text: `No forms. No waiting. No obligation. A licensed plumber serving ${cityName}, ${stateName} is ready to give you an honest estimate in under 5 minutes — so you know exactly what you're looking at before any work begins.`,
      cta: `Call for Your Free ${cityName} Plumbing Quote`,
      sub: `Available 7 days a week · Same-day service in ${cityName}`,
    },
    internalLinks: {
      otherServicesLabel: `Other services in ${cityName}:`,
      nearbyLabel: "Nearby cities:",
      backLabel: `← All cities in ${stateName}`,
    },
  };
}
