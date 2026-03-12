import type { ServiceSlug } from "./data";
import { getServiceLabels } from "./data";
import stateMetadataJson from "../data/state_metadata.json";

interface StateMetadata {
  cityCount: number;
  pctPre1980: number | null;
  avgMedianYear: number | null;
  avgHomeownership: number | null;
  topCities: { name: string; population: number }[];
}
const stateMetadataMap = stateMetadataJson as Record<string, StateMetadata>;

export interface StatePageContent {
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSub: string;
  trustBullets: string[];
  intro: {
    h2: string;
    paragraphs: string[];
    ctaText: string;
  };
  why: {
    h2: string;
    points: { h3: string; text: string }[];
  };
  services: {
    h2: string;
    intro: string;
    items: { slug: ServiceSlug; title: string; description: string; costRange: string }[];
  };
  cityIntro: {
    h2: string;
    paragraph: string;
    ctaText: string;
  };
  faq: {
    h2: string;
    items: { q: string; a: string }[];
  };
  closing: {
    h2: string;
    text: string;
    ctaText: string;
  };
  internalLinks: {
    otherStatesLabel: string;
    viewAllStatesLabel: string;
    otherServicesLabel: string;
  };
}

const SERVICE_STATE_DESCRIPTIONS: Record<
  ServiceSlug,
  { description: string; costRange: string }
> = {
  "plumbing-quote": {
    description:
      "From minor repairs to new installations, plumbing costs vary by job type and scope. Connect with a licensed plumber in your city for an accurate estimate.",
    costRange: "Varies by job — get a free quote",
  },
  "repiping-quote": {
    description:
      "Whole-home repiping is one of the largest plumbing investments. Costs depend on your home's square footage, pipe material, and local permit requirements. Older homes with galvanized steel or polybutylene pipes are the most likely candidates.",
    costRange: "$4,000 – $15,000+",
  },
  "water-heater-replacement-quote": {
    description:
      "Water heater replacements are among the most common plumbing jobs. Tank size, fuel type (gas vs. electric), and labor affect the final price. Switching to tankless may qualify for energy efficiency rebates in some areas.",
    costRange: "$900 – $3,200",
  },
  "sewer-line-replacement-quote": {
    description:
      "Aging clay and cast iron sewer lines are vulnerable to root intrusion and collapse. Trenchless replacement is available in most metro areas and often avoids full yard excavation.",
    costRange: "$3,500 – $22,000",
  },
  "drain-line-replacement-quote": {
    description:
      "Persistent slow drains and recurring clogs often point to a damaged or deteriorated drain line. A camera inspection is the fastest way to confirm, and most plumbers include it in their quote process.",
    costRange: "$500 – $4,500",
  },
  "emergency-plumbing-quote": {
    description:
      "Emergency and after-hours plumbing — leaks, sewer backups, no hot water — available from licensed plumbers in your city. Same-day and after-hours call-out typically adds $150–$400; get a quote before work starts.",
    costRange: "Varies — emergency call-out often adds $150–$400",
  },
};

export function getStatePageContent(
  serviceSlug: ServiceSlug,
  serviceLabel: string,
  stateName: string,
  stateAbbr: string,
  stateSlug: string
): StatePageContent {
  const serviceLower = serviceLabel.toLowerCase();
  const serviceClean = serviceLower.replace(/\s*quote\s*$/i, "").trim();
  const stateMeta = stateMetadataMap[stateSlug] ?? null;
  const topCityNames = stateMeta?.topCities.slice(0, 3).map((c) => c.name).join(", ") ?? "";

  return {
    metaTitle: `${serviceLabel} in ${stateName} | Free Quotes by City`,
    metaDescription: `Get free ${serviceClean} quotes from licensed plumbers in ${stateName}. Compare estimates by city. No obligation. Licensed & insured.`,

    heroTitle: `Free ${serviceLabel} in ${stateName}`,
    heroSub: `Connect with licensed ${stateName} plumbers in your city — get a free, no-obligation estimate for any plumbing job, big or small.`,

    trustBullets: [
      `Licensed & insured ${stateAbbr} plumbers`,
      "Free quotes, zero commitment",
      `Same-day service in most ${stateName} cities`,
      "Upfront pricing before any work starts",
    ],

    intro: {
      h2: `Get an Honest ${serviceLabel} from a${/^[AEIOU]/i.test(stateName) ? "n" : ""} ${stateName}-Licensed Plumber`,
      paragraphs: [
        `Plumbing costs in ${stateName} vary more than most homeowners expect. Labor rates, permit fees, and material costs all shift by city and county. The only quote that actually matters is one from a plumber who knows your area.`,
        ...(stateMeta?.pctPre1980
          ? [`${stateMeta.pctPre1980}% of ${stateName} cities have a median home build year before 1980 — meaning a large share of the housing stock has aging pipes, outdated water heaters, and sewer lines that are past their expected service life. Getting a quote before a failure happens is significantly cheaper than an emergency call.`]
          : []),
        ...(stateMeta?.avgHomeownership
          ? [`With an average homeownership rate of ${stateMeta.avgHomeownership}% across ${stateName}, most residents have a direct financial stake in keeping their plumbing in good shape. A free quote takes less than 5 minutes and gives you a real number before spending anything.`]
          : []),
        `Select your ${stateName} city below and connect with a licensed local plumber who can give you an accurate, no-obligation estimate — whether it's a drain line replacement, a full repipe, or a water heater swap.`,
      ],
      ctaText: "Select Your City Below",
    },

    why: {
      h2: `Why ${stateName} Homeowners Get a Plumbing Quote First`,
      points: [
        {
          h3: `${stateName} Plumbing Permits Vary by County`,
          text: `Most significant plumbing work in ${stateName} — sewer line replacement, repiping, water heater installation — requires a permit. Permit costs and processing times differ by county. A licensed ${stateName} plumber familiar with your city handles this for you and factors it into your quote upfront, so there are no surprises when the invoice arrives.`,
        },
        {
          h3: "Older Homes Come With Older Pipes",
          text: `${stateMeta?.pctPre1980 ? `${stateMeta.pctPre1980}% of cities in ${stateName} have a median build year before 1980.` : `A significant share of homes in ${stateName} were built before 1980.`} Older homes often contain galvanized steel or polybutylene pipes that are past their service life. Getting a quote before a failure happens is the difference between a planned repair and an emergency one — emergency plumbing typically costs two to three times more than scheduled work.`,
        },
        {
          h3: `${stateName} Labor Rates Vary by City`,
          text: `Plumbing labor costs in ${stateName} are not consistent across the state. Metro areas often trend higher than rural counties due to demand and cost of living. A quote from a plumber in your specific ${stateName} city gives you the real number — not a state or national average that may be off by $1,000 or more.`,
        },
      ],
    },

    services: {
      h2: "Plumbing Services Available for Quotes Across " + stateName,
      intro: "Select your city to get a local quote on any of the services below.",
      items: (["plumbing-quote", "repiping-quote", "water-heater-replacement-quote", "sewer-line-replacement-quote", "drain-line-replacement-quote", "emergency-plumbing-quote"] as ServiceSlug[]).map(
        (slug) => {
          const { description, costRange } = SERVICE_STATE_DESCRIPTIONS[slug];
          const title = `${getServiceLabels()[slug]} — ${stateName}`;
          return { slug, title, description, costRange };
        }
      ),
    },

    cityIntro: {
      h2: `Find a ${serviceLabel} in Your ${stateName} City`,
      paragraph: `${stateName} plumbers are available for free quotes in ${stateMeta?.cityCount ?? "hundreds of"} cities statewide${topCityNames ? `, including ${topCityNames}` : ""}. Select your city below to get an estimate specific to your area.`,
      ctaText: "Select Your City",
    },

    faq: {
      h2: `${stateName} Plumbing Quote FAQ`,
      items: [
        {
          q: `How much does a plumber cost in ${stateName}?`,
          a: `Plumber hourly rates in ${stateName} typically range from $65 to $175 per hour, depending on the city and job type. For larger projects — repiping, sewer line replacement, water heater installation — most ${stateName} plumbers quote a flat project rate rather than hourly. Select your city for a local estimate.`,
        },
        {
          q: `Do I need a permit for plumbing work in ${stateName}?`,
          a: `Yes, for most major plumbing work. ${stateName} requires permits for water heater replacements, sewer line work, and whole-home repiping. Permit requirements and fees vary by city and county — a licensed ${stateName} plumber will pull the necessary permits and include that cost in your quote.`,
        },
        {
          q: `How do I find a licensed plumber in ${stateName}?`,
          a: `Select your city on this page to connect with licensed, insured plumbers who operate in your area and are familiar with local permit requirements.`,
        },
        {
          q: `What plumbing problems are most common in ${stateName} homes?`,
          a: `Common issues include corroded galvanized pipes in pre-1980 homes, tree root intrusion in sewer lines, water heater failures, and drain line deterioration in homes on older municipal systems. Getting a quote first helps you plan and avoid overpaying.`,
        },
        {
          q: `Can I get a same-day plumbing quote in ${stateName}?`,
          a: `In most ${stateName} cities, same-day phone quotes and same-day or next-day service are available. Select your city to check availability in your area.`,
        },
        {
          q: `What's the cheapest plumbing service to get quoted in ${stateName}?`,
          a: `Drain line repairs and minor pipe fixes are typically the lowest-cost plumbing quotes, often starting under $500. Water heater replacements and sewer line work represent the mid-to-high end. Getting a quote first — before any work begins — ensures you're not overpaying regardless of the service.`,
        },
      ],
    },

    closing: {
      h2: `Ready to Find a Plumber in Your ${stateName} City?`,
      text: `Hundreds of ${stateName} homeowners get plumbing quotes through this page every month. It takes less than a minute — select your city, connect with a licensed local plumber, and get an honest estimate before spending a dollar. No forms. No wait. No obligation.`,
      ctaText: `Select Your ${stateName} City`,
    },

    internalLinks: {
      otherStatesLabel: "Other plumbing quote states",
      viewAllStatesLabel: "View All States",
      otherServicesLabel: `Other services in ${stateName}`,
    },
  };
}
