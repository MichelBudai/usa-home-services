/**
 * Bed Bug Treatment Quote service content — /bed-bug-treatment-quote/
 */

import type { FullServiceContent } from "./fullServiceContentTypes";

export const BED_BUG_TREATMENT_SERVICE_CONTENT: FullServiceContent = {
  meta: {
    title: "Free Bed Bug Treatment Quotes from Licensed Local Exterminators — Compare Estimates by City",
    description:
      "Get free bed bug treatment quotes from licensed local exterminators in your city. Compare estimates for heat treatment, chemical treatment, and hybrid approaches — no obligation, upfront pricing.",
  },
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Bed Bug Treatment Quote" }],
  hero: {
    h1: "Free Bed Bug Treatment Quotes from Licensed Local Exterminators",
    sub: "Compare estimates from licensed bed bug specialists in your city — heat treatment, chemical treatment, cryonite, and hybrid approaches. Free quotes, no commitment.",
    trustBar: [
      "Licensed & insured bed bug specialists nationwide",
      "Free estimates, no obligation",
      "Upfront pricing before any work starts",
      "4,100+ cities covered across all 50 states",
    ],
    cta: "Select Your State to Get Started",
  },
  intro: {
    h2: "Get a Real Bed Bug Treatment Quote in Your City",
    paragraphs: [
      "Bed bugs are among the hardest household pests to eliminate — and among the most psychologically stressful. Treatment method, infestation severity, and home size all dramatically affect cost. Heat treatment, chemical treatment, and hybrid approaches each have different price points, effectiveness rates, and preparation requirements.",
      "This page connects homeowners across the US with licensed bed bug specialists who can assess your infestation and recommend the most effective treatment for your situation. You get an honest number before any work begins.",
      "Select your state below, then your city, to find local bed bug specialists and get a free estimate.",
    ],
    cta: "Find Bed Bug Specialists in Your State",
  },
  why: {
    h2: "Why Homeowners Use This to Find Bed Bug Treatment Quotes",
    items: [
      {
        h3: "Treatment method determines success rate",
        p: "Heat treatment eliminates bed bugs and eggs in a single visit by raising room temperature above 120°F. Chemical treatment requires multiple visits and leaves residual protection. The wrong method for your infestation type and home layout can mean a failed treatment and thousands more spent on retreatment.",
      },
      {
        h3: "Infestation severity changes the quote dramatically",
        p: "A localized infestation in a single bedroom costs far less to treat than a whole-home infestation that has spread to walls, furniture, and outlets. Getting a professional assessment — not a phone ballpark — is the only way to get an accurate quote.",
      },
      {
        h3: "DIY treatments almost always fail",
        p: "Over-the-counter sprays and DIY heat guns rarely reach the temperatures or penetration depth needed to eliminate bed bug eggs. Failed DIY attempts often scatter the infestation, making professional treatment harder and more expensive.",
      },
      {
        h3: "No pay-to-play listings",
        p: "Bed bug specialists on this platform are not ranked by advertising spend. Quotes come from licensed contractors who serve your city — vetted for state licensing and insurance.",
      },
    ],
  },
  services: {
    h2: "Bed Bug Treatment Options Available for Free Quotes",
    intro: "Select your state below to find local pricing on any of these treatment methods.",
    items: [
      {
        h3: "Heat Treatment (Thermal Remediation)",
        description:
          "Whole-room or whole-home heat treatment raises temperatures to 120–135°F, killing all bed bugs and eggs in a single visit. Most effective method for severe infestations. Requires preparation but no chemical exposure.",
        range: "$1,000 – $4,000+ per treatment",
        linkLabel: "Find Heat Treatment Quotes by State",
        href: "/bed-bug-treatment-quote/#states",
      },
      {
        h3: "Chemical Treatment",
        description:
          "Multiple-visit chemical treatment using EPA-registered pesticides. Typically requires 2–3 visits over 4–6 weeks. Lower upfront cost than heat treatment but requires more preparation and follow-up.",
        range: "$300 – $1,500 per treatment cycle",
        linkLabel: "Find Chemical Treatment Quotes by State",
        href: "/bed-bug-treatment-quote/#states",
      },
      {
        h3: "Hybrid Treatment",
        description:
          "Combination of heat and chemical treatment for severe or resistant infestations. Heat eliminates live bugs and eggs; chemical residual prevents reinfestation. Most comprehensive approach for heavy infestations.",
        range: "$1,500 – $5,000+",
        linkLabel: "Find Hybrid Treatment Quotes by State",
        href: "/bed-bug-treatment-quote/#states",
      },
      {
        h3: "Cryonite (Freezing) Treatment",
        description:
          "CO2 snow treatment that freezes bed bugs on contact. Chemical-free and non-toxic. Most effective for sensitive environments like healthcare facilities and homes with chemical sensitivities.",
        range: "$500 – $2,000",
        linkLabel: "Find Cryonite Treatment Quotes by State",
        href: "/bed-bug-treatment-quote/#states",
      },
      {
        h3: "Bed Bug Inspection",
        description:
          "Professional inspection with or without canine detection to confirm infestation and assess severity before treatment. Critical for accurate treatment planning and cost estimation.",
        range: "$100 – $300 (often free with treatment quote)",
        linkLabel: "Find Inspection Quotes by State",
        href: "/bed-bug-treatment-quote/#states",
      },
      {
        h3: "Follow-Up & Retreatment",
        description:
          "Most chemical treatments require 2–3 follow-up visits. Many specialists include follow-up in their initial quote. Confirm what's included before signing any service agreement.",
        range: "Included or $150 – $400 per visit",
        linkLabel: "Find Retreatment Quotes by State",
        href: "/bed-bug-treatment-quote/#states",
      },
    ],
  },
  stateGridIntro: {
    h2: "Find Bed Bug Treatment Quotes in Your State",
    paragraphs: [
      "Licensed bed bug specialists available for free quotes in all 50 states. Select your state to browse cities and connect with local exterminators.",
      "Highest bed bug pressure cities: New York · Chicago · Philadelphia · Detroit · Baltimore · Washington DC · Cleveland · Cincinnati · Columbus · Los Angeles",
      "Don't see your state listed prominently? Every US state is covered — select yours below.",
    ],
    cta: "Select Your State",
  },
  howItWorks: {
    h2: "How to Get a Free Bed Bug Treatment Quote",
    steps: [
      {
        title: "Step 1 — Select your state and city",
        text: "Choose your state from the list below, then select your city. You'll land on a page with local bed bug treatment pricing and licensed specialists who serve your area.",
      },
      {
        title: "Step 2 — Use the cost estimator",
        text: "Each city page includes a cost estimator that adjusts for treatment method, home size, and infestation severity — giving you a realistic ballpark before you call.",
      },
      {
        title: "Step 3 — Call for your exact quote",
        text: "A licensed bed bug specialist will assess your situation, recommend the appropriate treatment method, and give you an honest estimate — in under 5 minutes, no obligation.",
      },
    ],
  },
  faq: {
    h2: "Bed Bug Treatment Quote FAQ",
    items: [
      {
        q: "How much does bed bug treatment cost?",
        a: "Bed bug treatment costs range from $300 for a single-room chemical treatment to $5,000+ for whole-home heat treatment of a severe infestation. Most homeowners pay $800–$2,500. Cost depends on treatment method, number of rooms, and infestation severity.",
      },
      {
        q: "Is heat treatment worth the extra cost?",
        a: "For moderate to severe infestations, heat treatment is typically more cost-effective over time — it eliminates all bugs and eggs in one visit versus 3+ chemical treatment visits. For light, localized infestations, chemical treatment may be more appropriate.",
      },
      {
        q: "How do I know if I have bed bugs?",
        a: "Look for small rust-colored stains on sheets and mattress seams, tiny shed skins, and small dark spots (fecal matter) on bedding and furniture. Bites alone aren't definitive — a professional inspection with or without canine detection is the most reliable confirmation.",
      },
      {
        q: "Can I treat bed bugs myself?",
        a: "DIY treatments almost always fail to eliminate the infestation and often scatter bed bugs to new areas of the home, making professional treatment harder and more expensive. Professional treatment is strongly recommended for any confirmed bed bug infestation.",
      },
      {
        q: "How long does bed bug treatment take?",
        a: "Heat treatment is typically completed in 6–8 hours in a single visit. Chemical treatment requires 2–3 visits over 4–6 weeks. Whole-home infestations take longer regardless of method.",
      },
      {
        q: "Should I throw away my furniture?",
        a: "In most cases, no. Professional heat or chemical treatment can effectively treat mattresses, furniture, and box springs in place. Discarding furniture is rarely necessary and may spread the infestation to common areas or neighbors.",
      },
      {
        q: "Should I get multiple bed bug treatment quotes?",
        a: "Yes. Treatment method recommendations and pricing vary significantly between companies. Getting two or three quotes ensures you understand your options and choose the most appropriate treatment for your infestation — not the most profitable one for the exterminator.",
      },
    ],
  },
  closing: {
    h2: "Ready to Find a Bed Bug Specialist in Your City?",
    paragraphs: [
      "Bed bug infestations don't resolve on their own — they spread. Every day without professional treatment is another day of infestation growth. Getting a quote costs nothing.",
      "Select your state, find your city, and get an honest estimate from a licensed local bed bug specialist.",
    ],
    cta: "Select Your State to Get Started",
  },
  internalLinks: {
    heading: "Other pest control services:",
    links: [
      { label: "Pest Control Quote — All States", href: "/pest-control-quote/" },
      { label: "Termite Treatment Quote — All States", href: "/termite-treatment-quote/" },
      { label: "Rodent Control Quote — All States", href: "/rodent-control-quote/" },
      { label: "Mosquito Control Quote — All States", href: "/mosquito-control-quote/" },
      { label: "Wildlife Removal Quote — All States", href: "/wildlife-removal-quote/" },
    ],
  },
};
