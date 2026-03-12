/**
 * Termite Treatment Quote service content — /termite-treatment-quote/
 */

import type { FullServiceContent } from "./fullServiceContentTypes";

export const TERMITE_TREATMENT_SERVICE_CONTENT: FullServiceContent = {
  meta: {
    title: "Free Termite Treatment Quotes from Licensed Local Exterminators — Compare Estimates by City",
    description:
      "Get free termite treatment quotes from licensed local exterminators in your city. Compare estimates for liquid barrier, bait systems, and fumigation — no obligation, upfront pricing.",
  },
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Termite Treatment Quote" }],
  hero: {
    h1: "Free Termite Treatment Quotes from Licensed Local Exterminators",
    sub: "Compare estimates from licensed termite specialists in your city — liquid barrier, bait systems, fumigation, and prevention plans. Free quotes, no commitment.",
    trustBar: [
      "Licensed & insured termite specialists nationwide",
      "Free estimates, no obligation",
      "Upfront pricing before any work starts",
      "4,100+ cities covered across all 50 states",
    ],
    cta: "Select Your State to Get Started",
  },
  intro: {
    h2: "Get a Real Termite Treatment Quote in Your City",
    paragraphs: [
      "Termite treatment costs vary dramatically by region, home size, infestation severity, and treatment method. A liquid barrier in Phoenix costs differently than tent fumigation in Miami. The only quote that matters is one from a licensed termite specialist who knows your local termite species and treatment requirements.",
      "This page connects homeowners across the US with licensed local termite specialists who understand subterranean vs. drywood termite pressure in your area, local treatment regulations, and realistic costs. You get an honest number before any work begins.",
      "Select your state below, then your city, to find local termite specialists and get a free estimate.",
    ],
    cta: "Find Termite Specialists in Your State",
  },
  why: {
    h2: "Why Homeowners Use This to Find Termite Treatment Quotes",
    items: [
      {
        h3: "Termite species vary by region — treatment must match",
        p: "Subterranean termites dominate most of the US, but drywood termites are prevalent in coastal and Southern states. Formosan termites create some of the most severe infestations in the Gulf Coast region. A licensed specialist in your area knows which species are active and which treatment methods are most effective.",
      },
      {
        h3: "Treatment method dramatically affects cost",
        p: "Liquid barrier treatments, bait station systems, and full fumigation (tenting) vary by thousands of dollars for the same home. Getting multiple quotes ensures you understand all your options before committing to the most expensive or least effective approach.",
      },
      {
        h3: "Early treatment prevents structural damage",
        p: "Termites cause an estimated $5 billion in structural damage annually in the US — damage not covered by most homeowner insurance policies. A termite inspection and treatment quote costs nothing; delaying treatment can cost tens of thousands in repairs.",
      },
      {
        h3: "No pay-to-play listings",
        p: "Termite specialists on this platform are not ranked by advertising spend. Quotes come from licensed contractors who serve your city — vetted for state licensing and insurance.",
      },
    ],
  },
  services: {
    h2: "Termite Treatment Options Available for Free Quotes",
    intro: "Select your state below to find local pricing on any of these treatment methods.",
    items: [
      {
        h3: "Liquid Barrier Treatment",
        description:
          "Liquid termiticide applied around the foundation creates a chemical barrier that kills and repels subterranean termites. Most effective for active infestations and prevention in high-risk areas. Treatment typically lasts 5–10 years.",
        range: "$500 – $2,500",
        linkLabel: "Find Liquid Barrier Quotes by State",
        href: "/termite-treatment-quote/#states",
      },
      {
        h3: "Bait Station System",
        description:
          "In-ground bait stations monitor for termite activity and deliver slow-acting bait that eliminates the colony over time. Lower disruption than liquid treatment, effective for long-term prevention and active infestations.",
        range: "$800 – $3,200 installed + annual monitoring",
        linkLabel: "Find Bait System Quotes by State",
        href: "/termite-treatment-quote/#states",
      },
      {
        h3: "Fumigation (Tenting)",
        description:
          "Whole-structure fumigation is the most comprehensive treatment for drywood termites and severe infestations. Requires vacating the home for 2–3 days. Most common in Florida, California, and Gulf Coast states.",
        range: "$1,500 – $8,000+",
        linkLabel: "Find Fumigation Quotes by State",
        href: "/termite-treatment-quote/#states",
      },
      {
        h3: "Termite Inspection",
        description:
          "A licensed termite inspection identifies active infestations, damage, and conducive conditions before treatment. Required by most mortgage lenders. Many exterminators offer free or low-cost inspections as part of the quote process.",
        range: "$75 – $150 (often free with treatment quote)",
        linkLabel: "Find Inspection Quotes by State",
        href: "/termite-treatment-quote/#states",
      },
      {
        h3: "Termite Prevention Plan",
        description:
          "Annual termite prevention plans include regular inspections, monitoring, and retreatment guarantees. Most cost-effective long-term approach for homes in high-termite-pressure areas.",
        range: "$200 – $600 per year",
        linkLabel: "Find Prevention Plan Quotes by State",
        href: "/termite-treatment-quote/#states",
      },
      {
        h3: "Post-Treatment Damage Repair",
        description:
          "After termite elimination, structural repairs to damaged wood, framing, or flooring are often required. A licensed contractor can assess damage and quote repairs alongside treatment.",
        range: "$500 – $10,000+ depending on damage",
        linkLabel: "Find Damage Repair Quotes by State",
        href: "/termite-treatment-quote/#states",
      },
    ],
  },
  stateGridIntro: {
    h2: "Find Termite Treatment Quotes in Your State",
    paragraphs: [
      "Licensed termite specialists available for free quotes in all 50 states. Select your state to browse cities and connect with local exterminators.",
      "Highest termite pressure states: Florida · Texas · California · Georgia · South Carolina · Louisiana · Alabama · Mississippi · Arizona · North Carolina",
      "Don't see your state listed prominently? Every US state is covered — select yours below.",
    ],
    cta: "Select Your State",
  },
  howItWorks: {
    h2: "How to Get a Free Termite Treatment Quote",
    steps: [
      {
        title: "Step 1 — Select your state and city",
        text: "Choose your state from the list below, then select your city. You'll land on a page with local termite treatment pricing and licensed specialists who serve your area.",
      },
      {
        title: "Step 2 — Use the cost estimator",
        text: "Each city page includes a cost estimator that adjusts for treatment method, home size, and local termite pressure — giving you a realistic ballpark before you call.",
      },
      {
        title: "Step 3 — Call for your exact quote",
        text: "A licensed termite specialist will assess your situation, recommend the appropriate treatment, and give you an honest estimate — in under 5 minutes, no obligation.",
      },
    ],
  },
  faq: {
    h2: "Termite Treatment Quote FAQ",
    items: [
      {
        q: "How much does termite treatment cost?",
        a: "Termite treatment costs range from $500 for a liquid barrier treatment on a small home to $8,000+ for whole-structure fumigation. Bait station systems typically run $800–$3,200 installed. Costs depend on treatment method, home size, infestation severity, and your city.",
      },
      {
        q: "How do I know if I have termites?",
        a: "Common signs include mud tubes along your foundation, hollow-sounding wood, discarded wings near windows and doors, and small fecal pellets (drywood termites). A licensed termite inspector can confirm activity and assess damage within a single visit.",
      },
      {
        q: "Is a termite inspection free?",
        a: "Many licensed exterminators offer free termite inspections as part of the quote process. Some charge $75–$150 for a standalone inspection. Select your state and city to find local exterminators who offer free inspections.",
      },
      {
        q: "Does homeowner insurance cover termite damage?",
        a: "Most standard homeowner insurance policies do not cover termite damage, as it is considered a preventable maintenance issue. This makes early detection and treatment critical — termite damage compounds quickly and repairs are entirely out of pocket.",
      },
      {
        q: "How long does termite treatment last?",
        a: "Liquid barrier treatments typically last 5–10 years. Bait station systems require annual monitoring and are effective indefinitely with proper maintenance. Fumigation eliminates active drywood termites but does not prevent reinfestation — a prevention plan is recommended afterward.",
      },
      {
        q: "Should I get multiple termite treatment quotes?",
        a: "Yes, especially for larger jobs. Treatment method recommendations and pricing vary significantly between companies. Getting two or three quotes ensures you understand all your options and aren't overpaying or choosing an inappropriate treatment method.",
      },
      {
        q: "How quickly can termite treatment begin?",
        a: "Most licensed exterminators can begin liquid barrier treatment within 1–3 days of the quote. Fumigation requires more scheduling and preparation — typically 1–2 weeks. Bait station installation can often begin same week.",
      },
    ],
  },
  closing: {
    h2: "Ready to Find a Termite Specialist in Your City?",
    paragraphs: [
      "Termites cause more structural damage than fires, floods, and storms combined in the US — and most homeowner insurance won't cover it. Getting a quote costs nothing. Waiting costs everything.",
      "Select your state, find your city, and get an honest estimate from a licensed local termite specialist.",
    ],
    cta: "Select Your State to Get Started",
  },
  internalLinks: {
    heading: "Other pest control services:",
    links: [
      { label: "Pest Control Quote — All States", href: "/pest-control-quote/" },
      { label: "Rodent Control Quote — All States", href: "/rodent-control-quote/" },
      { label: "Bed Bug Treatment Quote — All States", href: "/bed-bug-treatment-quote/" },
      { label: "Mosquito Control Quote — All States", href: "/mosquito-control-quote/" },
      { label: "Wildlife Removal Quote — All States", href: "/wildlife-removal-quote/" },
    ],
  },
};
