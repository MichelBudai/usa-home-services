import type { ServiceSlug } from "./data";
import { getCurrentSiteConfig } from "./getSiteConfig";
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
  "pest-control-quote": {
    description:
      "From one-time treatments to annual prevention programs, pest control costs vary by pest type, home size, and infestation severity. Connect with a licensed specialist in your city for an accurate estimate.",
    costRange: "Varies by job — get a free quote",
  },
  "termite-treatment-quote": {
    description:
      "Termite damage is not covered by most homeowner insurance policies. Treatment method — liquid barrier, bait system, or fumigation — depends on species and infestation severity. Early treatment protects your home's structural integrity.",
    costRange: "$500 – $8,000+",
  },
  "rodent-control-quote": {
    description:
      "Effective rodent control requires complete exclusion — sealing every entry point — not just trapping. Attic sanitization is often needed after an infestation. A licensed specialist provides a full exclusion quote.",
    costRange: "$300 – $2,500+",
  },
  "bed-bug-treatment-quote": {
    description:
      "Bed bug infestations require professional treatment — DIY approaches almost always fail and scatter the infestation. Heat treatment eliminates all bugs and eggs in one visit; chemical treatment requires multiple visits.",
    costRange: "$500 – $5,000+",
  },
  "mosquito-control-quote": {
    description:
      "Professional mosquito control reduces biting pressure by 70–90% with a consistent seasonal program. Barrier spray, seasonal programs, and automated misting systems are available based on property size and budget.",
    costRange: "$300 – $900 per season",
  },
  "wildlife-removal-quote": {
    description:
      "Wildlife removal is legally regulated in most states — always use a licensed specialist. Removal without exclusion guarantees re-entry. A licensed specialist handles permits, humane removal, and complete exclusion.",
    costRange: "$200 – $3,000+",
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
  const stateMeta = stateMetadataMap[stateSlug] ?? null;
  const topCityNames = stateMeta?.topCities.slice(0, 3).map((c) => c.name).join(", ") ?? "";

  return {
    metaTitle: `${serviceLabel} in ${stateName} | Free Quotes by City`,
    metaDescription: `Get free ${serviceLower} quotes from licensed pest control specialists in ${stateName}. Compare estimates by city. No obligation. Licensed & insured.`,

    heroTitle: `Free ${serviceLabel} in ${stateName}`,
    heroSub: `Connect with licensed ${stateName} pest control specialists in your city — get a free, no-obligation estimate for any pest, termite, rodent, or wildlife issue.`,

    trustBullets: [
      `Licensed & insured ${stateAbbr} pest control specialists`,
      "Free quotes, zero commitment",
      `Same-day service in most ${stateName} cities`,
      "Upfront pricing before any work starts",
    ],

    intro: {
      h2: `Get an Honest ${serviceLabel} from a${/^[AEIOU]/i.test(stateName) ? "n" : ""} ${stateName}-Licensed Specialist`,
      paragraphs: [
        `Pest control costs in ${stateName} vary more than most homeowners expect. Treatment methods, infestation severity, and local regulations all shift by city and county. The only quote that actually matters is one from a specialist who knows your area.`,
        ...(stateMeta?.pctPre1980
          ? [`${stateMeta.pctPre1980}% of ${stateName} cities have a median home build year before 1980 — meaning a large share of the housing stock has aging foundations, gaps, and wood framing that increase pest risk. Getting a quote before an infestation compounds is significantly cheaper than emergency treatment.`]
          : []),
        ...(stateMeta?.avgHomeownership
          ? [`With an average homeownership rate of ${stateMeta.avgHomeownership}% across ${stateName}, most residents have a direct financial stake in protecting their home from pest damage. A free quote takes less than 5 minutes and gives you a real number before spending anything.`]
          : []),
        `Select your ${stateName} city below and connect with a licensed local specialist who can give you an accurate, no-obligation estimate — whether it's a termite treatment, rodent exclusion, bed bug heat treatment, or wildlife removal.`,
      ],
      ctaText: "Select Your City Below",
    },

    why: {
      h2: `Why ${stateName} Homeowners Get a Pest Control Quote First`,
      points: [
        {
          h3: `${stateName} Pest Control Regulations Vary by County`,
          text: `Pest control licensing, treatment regulations, and wildlife removal permits differ by county in ${stateName}. A licensed ${stateName} specialist familiar with your city handles all regulatory requirements and factors permit costs into your quote upfront — no surprises on the invoice.`,
        },
        {
          h3: "Older Homes Have More Entry Points",
          text: `${stateMeta?.pctPre1980 ? `${stateMeta.pctPre1980}% of cities in ${stateName} have a median build year before 1980.` : `A significant share of homes in ${stateName} were built before 1980.`} Older homes have aging foundations, deteriorated soffits, and pipe penetrations that are common pest entry points. Getting a quote before an infestation grows is the difference between a targeted treatment and a full remediation — which costs two to three times more.`,
        },
        {
          h3: `${stateName} Pest Pressure Varies by Region`,
          text: `Pest species, termite pressure, mosquito season length, and wildlife activity are not consistent across ${stateName}. A quote from a specialist in your specific ${stateName} city reflects local pest pressure and seasonal timing — not a state or national average that may not apply to your situation.`,
        },
      ],
    },

    services: {
      h2: "Pest Control Services Available for Quotes Across " + stateName,
      intro: "Select your city to get a local quote on any of the services below.",
      items: (
        [
          "pest-control-quote",
          "termite-treatment-quote",
          "rodent-control-quote",
          "bed-bug-treatment-quote",
          "mosquito-control-quote",
          "wildlife-removal-quote",
        ] as ServiceSlug[]
      ).map((slug) => {
        const { description, costRange } = SERVICE_STATE_DESCRIPTIONS[slug];
        const title = `${getCurrentSiteConfig().services.find(s => s.slug === slug)?.label ?? slug} — ${stateName}`;
        return { slug, title, description, costRange };
      }),
    },

    cityIntro: {
      h2: `Find a ${serviceLabel} in Your ${stateName} City`,
      paragraph: `${stateName} pest control specialists are available for free quotes in ${stateMeta?.cityCount ?? "hundreds of"} cities statewide${topCityNames ? `, including ${topCityNames}` : ""}. Select your city below to get an estimate specific to your area.`,
      ctaText: "Select Your City",
    },

    faq: {
      h2: `${stateName} Pest Control Quote FAQ`,
      items: [
        {
          q: `How much does pest control cost in ${stateName}?`,
          a: `Pest control costs in ${stateName} vary widely by service. A one-time general treatment runs $150–$400; annual prevention programs run $400–$900 per year. Termite treatment ranges from $500 to $8,000+ depending on method; rodent exclusion runs $300–$2,500+. Select your city for a local estimate.`,
        },
        {
          q: `Do pest control specialists need a license in ${stateName}?`,
          a: `Yes. ${stateName} requires pest control applicators to be licensed by the state. Wildlife removal specialists require separate wildlife control permits for most species. Always verify licensing before hiring — all specialists connected through this page are licensed and insured.`,
        },
        {
          q: `How do I find a licensed pest control specialist in ${stateName}?`,
          a: `Select your city on this page to connect with licensed, insured specialists who operate in your area and are familiar with local pest species and regulations.`,
        },
        {
          q: `What pest problems are most common in ${stateName} homes?`,
          a: `Common issues vary by region but typically include termites, rodents (mice and rats), bed bugs, mosquitoes, and wildlife intrusions (raccoons, squirrels, bats). Older homes are particularly vulnerable to termite damage and rodent entry. Getting a quote first helps you plan and avoid overpaying.`,
        },
        {
          q: `Can I get a same-day pest control quote in ${stateName}?`,
          a: `In most ${stateName} cities, same-day phone quotes and same-day or next-day service are available for most pest control services. Select your city to check availability in your area.`,
        },
        {
          q: `Does homeowner insurance cover pest damage in ${stateName}?`,
          a: `Most standard homeowner insurance policies in ${stateName} do not cover termite damage, rodent damage, or wildlife intrusion damage — these are considered preventable maintenance issues. Early treatment is the most cost-effective protection.`,
        },
      ],
    },

    closing: {
      h2: `Ready to Find a Pest Control Specialist in Your ${stateName} City?`,
      text: `Homeowners across ${stateName} get pest control quotes through this page every day. It takes less than a minute — select your city, connect with a licensed local specialist, and get an honest estimate before spending a dollar. No forms. No wait. No obligation.`,
      ctaText: `Select Your ${stateName} City`,
    },

    internalLinks: {
      otherStatesLabel: "Other pest control quote states",
      viewAllStatesLabel: "View All States",
      otherServicesLabel: `Other services in ${stateName}`,
    },
  };
}
