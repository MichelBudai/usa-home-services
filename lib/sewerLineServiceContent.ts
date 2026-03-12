/**
 * Sewer Line Replacement Quote service homepage content — /sewer-line-replacement-quote/
 */

import type { FullServiceContent } from "./fullServiceContentTypes";

export const SEWER_LINE_SERVICE_CONTENT: FullServiceContent = {
  meta: {
    title: "Free Sewer Line Replacement Quotes | Compare Main Line Costs by City",
    description:
      "Get free sewer line replacement and repair quotes from licensed plumbers in your city. Compare trenchless and traditional options. No obligation. Available in 4,100+ cities.",
  },
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Sewer Line Replacement Quote" }],
  hero: {
    h1: "Free Sewer Line Replacement Quotes from Licensed Local Plumbers",
    sub: "Compare main line and sewer repair or replacement estimates from licensed plumbers in your city. Free quotes, no commitment. Know your cost before any work starts.",
    trustBar: [
      "Licensed plumbers who do sewer and main line work",
      "Free estimates, no obligation",
      "Upfront pricing — repair vs. replacement, trenchless options",
      "4,100+ cities covered across all 50 states",
    ],
    cta: "Select Your State to Get Started",
  },
  intro: {
    h2: "Get a Real Sewer Line Quote in Your City",
    paragraphs: [
      "Sewer line repair or replacement is a major expense, and costs vary significantly by city — labor, equipment, and permit requirements differ from one area to the next. National averages are unreliable. The only useful quote is from a licensed plumber who regularly does sewer and main line work in your area.",
      "This page connects you with local plumbers who can assess your situation (including trenchless options where available), explain repair vs. full replacement, and give you an honest price before any work begins.",
      "Select your state below, then your city, to find local sewer line specialists and get a free estimate.",
    ],
    cta: "Find Sewer Line Quotes in Your State",
  },
  why: {
    h2: "Why Homeowners Use This to Find Sewer Line Quotes",
    items: [
      {
        h3: "Licensed plumbers who know local sewer requirements",
        p: "Sewer work often requires permits, inspections, and sometimes coordination with municipal lines. A licensed plumber in your area knows the process and includes those costs in your quote upfront.",
      },
      {
        h3: "Compare before you commit",
        p: "Sewer line replacement can range from a few thousand to over $20,000. Getting two or three free quotes helps you understand repair vs. replacement options and avoid overpaying. This platform makes comparison easy.",
      },
      {
        h3: "Upfront project pricing",
        p: "Sewer work is typically quoted as a project price based on scope — repair, replacement, trenchless vs. traditional — not open-ended hourly billing. You know the cost before digging starts.",
      },
      {
        h3: "No pay-to-play listings",
        p: "Plumbers listed here are not ranked by ad spend. You get quotes from licensed contractors who serve your city and are vetted for state licensing and insurance.",
      },
    ],
  },
  services: {
    h2: "Related Plumbing Services — Free Quotes",
    intro: "Select your state below to find local pricing on sewer line work and related services.",
    items: [
      {
        h3: "Plumbing Quote — General",
        description:
          "Leaks, fixtures, and general plumbing. Licensed plumbers in your city can give you a range for any job before scheduling a visit.",
        range: "$150 – $5,000+ depending on scope",
        linkLabel: "Find Plumbing Quotes by State",
        href: "/plumbing-quote/#states",
      },
      {
        h3: "Emergency Plumbing Quote",
        description:
          "Same-day and after-hours service for sewer backups, leaks, no hot water. Emergency call-out often adds $150–$400; get a quote before work starts.",
        range: "Varies — emergency premium often $150–$400",
        linkLabel: "Find Emergency Plumbing Quotes by State",
        href: "/emergency-plumbing-quote/",
      },
      {
        h3: "Repiping Quote",
        description:
          "Whole-home or partial repiping. For failing supply pipes. Local plumbers quote based on home size and pipe material.",
        range: "$4,000 – $15,000+",
        linkLabel: "Find Repiping Quotes by State",
        href: "/repiping-quote/",
      },
      {
        h3: "Water Heater Replacement Quote",
        description:
          "Tank or tankless installation. Local installers know your area's codes and options. Get a quote before your unit fails.",
        range: "$900 – $3,200",
        linkLabel: "Find Water Heater Quotes by State",
        href: "/water-heater-replacement-quote/",
      },
      {
        h3: "Sewer Line Replacement Quote",
        description:
          "Main line and sewer repair or replacement. Trenchless options in many cities. Local plumbers assess and quote repair vs. full replacement.",
        range: "$3,500 – $22,000",
        linkLabel: "Find Sewer Line Quotes by State",
        href: "/sewer-line-replacement-quote/#states",
      },
      {
        h3: "Drain Line Replacement Quote",
        description:
          "Recurring clogs or failing drain lines. Camera inspection and clear pricing from local plumbers who handle drain repair and replacement.",
        range: "$500 – $4,500",
        linkLabel: "Find Drain Line Quotes by State",
        href: "/drain-line-replacement-quote/",
      },
    ],
  },
  stateGridIntro: {
    h2: "Find Sewer Line Quotes in Your State",
    paragraphs: [
      "Licensed sewer and main line specialists available for free quotes in all 50 states. Select your state to browse cities and connect with local plumbers.",
      "Sewer work is common in older neighborhoods: Texas · Florida · California · Ohio · Pennsylvania · New York · Illinois · Michigan · Georgia · Arizona.",
      "Every US state is covered — select yours below to get started.",
    ],
    cta: "Select Your State",
  },
  howItWorks: {
    h2: "How to Get a Free Sewer Line Quote",
    steps: [
      {
        title: "Step 1 — Select your state and city",
        text: "Choose your state from the list below, then your city. You'll see local pricing ranges and licensed plumbers who do sewer work in your area.",
      },
      {
        title: "Step 2 — Use the cost estimator",
        text: "City pages include a cost estimator that adjusts for scope and home — giving you a ballpark for sewer work before you call.",
      },
      {
        title: "Step 3 — Call for your exact quote",
        text: "A licensed local plumber will discuss your situation, repair vs. replacement, and trenchless options, and give you an honest estimate — in under 5 minutes, no obligation.",
      },
    ],
  },
  faq: {
    h2: "Sewer Line Replacement Quote FAQ",
    items: [
      {
        q: "How much does sewer line replacement cost?",
        a: "Sewer line replacement in the US typically ranges from $3,500 to $22,000+ depending on length, depth, access, and whether trenchless methods can be used. Repair is often less. Select your state and city for local estimates.",
      },
      {
        q: "What is trenchless sewer replacement?",
        a: "Trenchless methods (e.g., pipe bursting, CIPP) replace or reline the pipe with minimal digging. Not every situation qualifies — it depends on pipe condition and access. A licensed plumber can assess and quote both trenchless and traditional options.",
      },
      {
        q: "Repair vs. replacement — how do I know?",
        a: "A camera inspection shows the condition of your line. Based on that, a licensed plumber can recommend spot repair vs. full replacement and give you clear pricing for each option.",
      },
      {
        q: "Do I need a permit for sewer line work?",
        a: "Most jurisdictions require a permit for sewer line repair or replacement. A licensed plumber will pull the permit and include permit and inspection costs in your quote.",
      },
      {
        q: "Is a sewer line quote free?",
        a: "Yes. A phone quote is free and takes under 5 minutes. No obligation, no dispatch fee. You get a real estimate from a licensed plumber before any work begins.",
      },
      {
        q: "Should I get multiple sewer line quotes?",
        a: "Yes. Sewer work is a major expense. Getting two or three quotes helps you compare repair vs. replacement options and pricing. This platform makes it easy to connect with local specialists.",
      },
    ],
  },
  closing: {
    h2: "Ready to Get a Sewer Line Quote in Your City?",
    paragraphs: [
      "Thousands of homeowners compare sewer line quotes here before committing. Select your state, find your city, and get an honest estimate from a licensed local plumber.",
      "No forms. No waiting. No obligation.",
    ],
    cta: "Select Your State to Get Started",
  },
  internalLinks: {
    heading: "Other services:",
    links: [
      { label: "Plumbing Quote — All States", href: "/plumbing-quote/" },
      { label: "Repiping Quote — All States", href: "/repiping-quote/" },
      { label: "Water Heater Replacement Quote — All States", href: "/water-heater-replacement-quote/" },
      { label: "Drain Line Replacement Quote — All States", href: "/drain-line-replacement-quote/" },
      { label: "Emergency Plumbing Quote — All States", href: "/emergency-plumbing-quote/" },
    ],
  },
};
