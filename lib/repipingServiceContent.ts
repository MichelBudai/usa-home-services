/**
 * Repiping Quote service homepage content — /repiping-quote/
 */

import type { FullServiceContent } from "./fullServiceContentTypes";

export const REPIPING_SERVICE_CONTENT: FullServiceContent = {
  meta: {
    title: "Free Repiping Quotes from Licensed Local Plumbers — Compare Repipe Costs by City",
    description:
      "Get free repiping quotes from licensed plumbers in your city. Compare whole-house and partial repipe costs. No obligation, upfront pricing. Available in 4,100+ cities.",
  },
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Repiping Quote" }],
  hero: {
    h1: "Free Repiping Quotes from Licensed Local Plumbers",
    sub: "Compare whole-house and partial repiping estimates from licensed plumbers in your city. Free quotes, no commitment. Know your repipe cost before any work starts.",
    trustBar: [
      "Licensed plumbers who specialize in repiping",
      "Free estimates, no obligation",
      "Upfront project pricing, not hourly guesswork",
      "4,100+ cities covered across all 50 states",
    ],
    cta: "Select Your State to Get Started",
  },
  intro: {
    h2: "Get a Real Repiping Quote in Your City",
    paragraphs: [
      "Repiping is one of the largest plumbing investments a homeowner can make. National averages are misleading — labor rates, permit costs, and access conditions vary dramatically by city and home type. The only useful quote is from a licensed plumber who regularly does repiping in your area.",
      "This page connects you with local plumbers who understand your home's pipe material, wall access, and local permit requirements. You get an honest project price before any work begins — no dispatch fee, no obligation.",
      "Select your state below, then your city, to find local repiping contractors and get a free estimate.",
    ],
    cta: "Find Repiping Quotes in Your State",
  },
  why: {
    h2: "Why Homeowners Use This to Find Repiping Quotes",
    items: [
      {
        h3: "Licensed plumbers who know local repipe requirements",
        p: "Repiping often requires permits and inspections that vary by state and municipality. A licensed plumber in your area handles permits, knows inspection timelines, and includes those costs in your quote upfront.",
      },
      {
        h3: "Compare before you commit",
        p: "Repiping costs can differ by thousands between contractors for the same scope. Getting two or three free quotes takes minutes and routinely saves $1,000 or more. This platform makes it easy to compare local repiping specialists.",
      },
      {
        h3: "Upfront project pricing",
        p: "Repiping is typically quoted as a flat project rate based on home size, pipe material, and access — not open-ended hourly billing. You know the total cost before any work starts.",
      },
      {
        h3: "No pay-to-play listings",
        p: "Contractors listed here are not ranked by ad spend. You get quotes from licensed plumbers who serve your city and are vetted for state licensing and insurance.",
      },
    ],
  },
  services: {
    h2: "Related Plumbing Services — Free Quotes",
    intro: "Select your state below to find local pricing on repiping and related work.",
    items: [
      {
        h3: "Plumbing Quote — General",
        description:
          "From leaks and fixture replacements to full bathroom work. Licensed plumbers in your city can give you a range for any job before scheduling a visit.",
        range: "$150 – $5,000+ depending on scope",
        linkLabel: "Find Plumbing Quotes by State",
        href: "/plumbing-quote/#states",
      },
      {
        h3: "Emergency Plumbing Quote",
        description:
          "Same-day and after-hours service for leaks, sewer backups, no hot water. Emergency call-out often adds $150–$400; get a quote before work starts.",
        range: "Varies — emergency premium often $150–$400",
        linkLabel: "Find Emergency Plumbing Quotes by State",
        href: "/emergency-plumbing-quote/",
      },
      {
        h3: "Repiping Quote",
        description:
          "Whole-home or partial repiping. Costs depend on home size, pipe material, and local permits. Common for homes with galvanized steel or polybutylene pipes.",
        range: "$4,000 – $15,000+",
        linkLabel: "Find Repiping Quotes by State",
        href: "/repiping-quote/#states",
      },
      {
        h3: "Water Heater Replacement Quote",
        description:
          "Tank or tankless, gas or electric. Getting a quote before your unit fails avoids emergency premiums. Local installers know your area's codes and options.",
        range: "$900 – $3,200",
        linkLabel: "Find Water Heater Quotes by State",
        href: "/water-heater-replacement-quote/",
      },
      {
        h3: "Sewer Line Replacement Quote",
        description:
          "Main line and sewer work. Trenchless options available in many areas. Local plumbers can assess repair vs. replacement and give you a clear quote.",
        range: "$3,500 – $22,000",
        linkLabel: "Find Sewer Line Quotes by State",
        href: "/sewer-line-replacement-quote/",
      },
      {
        h3: "Drain Line Replacement Quote",
        description:
          "Recurring clogs or failing drain lines. Camera inspection and clear pricing from local plumbers who handle drain line repair and replacement.",
        range: "$500 – $4,500",
        linkLabel: "Find Drain Line Quotes by State",
        href: "/drain-line-replacement-quote/",
      },
    ],
  },
  stateGridIntro: {
    h2: "Find Repiping Quotes in Your State",
    paragraphs: [
      "Licensed repiping contractors available for free quotes in all 50 states. Select your state to browse cities and connect with local plumbers who do repiping.",
      "Repiping demand is high in older housing stock: Texas · Florida · California · Ohio · Pennsylvania · New York · Illinois · Michigan · Georgia · North Carolina.",
      "Every US state is covered — select yours below to get started.",
    ],
    cta: "Select Your State",
  },
  howItWorks: {
    h2: "How to Get a Free Repiping Quote",
    steps: [
      {
        title: "Step 1 — Select your state and city",
        text: "Choose your state from the list below, then your city. You'll see local pricing ranges and licensed plumbers who do repiping in your area.",
      },
      {
        title: "Step 2 — Use the cost estimator",
        text: "City pages include a cost estimator that adjusts for home size and age — giving you a realistic ballpark for repiping before you call.",
      },
      {
        title: "Step 3 — Call for your exact quote",
        text: "A licensed local plumber will discuss your home's pipes, access, and timeline, and give you an honest repiping estimate — in under 5 minutes, no obligation.",
      },
    ],
  },
  faq: {
    h2: "Repiping Quote FAQ",
    items: [
      {
        q: "How much does repiping cost?",
        a: "Whole-house repiping in the US typically ranges from $4,000 to $15,000+ depending on home size, pipe material, number of bathrooms, and local labor rates. Partial repiping costs less. Select your state and city for local estimates.",
      },
      {
        q: "When should I consider repiping?",
        a: "Signs include recurring leaks, low water pressure, discolored water, or pipes that are galvanized steel, polybutylene, or lead. A licensed plumber can inspect and recommend repair vs. full repiping.",
      },
      {
        q: "How long does repiping take?",
        a: "A full repipe can take one to several days depending on home size and access. Your plumber will give you a timeline as part of the quote. Many homeowners schedule it when they can be without water for a short period.",
      },
      {
        q: "Do I need a permit for repiping?",
        a: "Most jurisdictions require a permit for repiping. A licensed plumber in your area will pull the permit and include permit and inspection costs in your quote.",
      },
      {
        q: "Is a repiping quote free?",
        a: "Yes. A phone quote is free and takes under 5 minutes. No obligation, no dispatch fee. You get a real estimate from a licensed plumber before any work begins.",
      },
      {
        q: "Should I get multiple repiping quotes?",
        a: "Yes. Repiping is a major investment. Getting two or three quotes routinely reveals significant price differences for the same scope. This platform makes it easy to compare local repiping contractors.",
      },
    ],
  },
  closing: {
    h2: "Ready to Get a Repiping Quote in Your City?",
    paragraphs: [
      "Thousands of homeowners compare repiping quotes here before committing. Select your state, find your city, and get an honest estimate from a licensed local plumber.",
      "No forms. No waiting. No obligation.",
    ],
    cta: "Select Your State to Get Started",
  },
  internalLinks: {
    heading: "Other services:",
    links: [
      { label: "Plumbing Quote — All States", href: "/plumbing-quote/" },
      { label: "Water Heater Replacement Quote — All States", href: "/water-heater-replacement-quote/" },
      { label: "Sewer Line Replacement Quote — All States", href: "/sewer-line-replacement-quote/" },
      { label: "Drain Line Replacement Quote — All States", href: "/drain-line-replacement-quote/" },
      { label: "Emergency Plumbing Quote — All States", href: "/emergency-plumbing-quote/" },
    ],
  },
};
