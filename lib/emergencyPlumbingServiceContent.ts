/**
 * Emergency Plumbing Quote service homepage content — /emergency-plumbing-quote/
 */

import type { FullServiceContent } from "./fullServiceContentTypes";

export const EMERGENCY_PLUMBING_SERVICE_CONTENT: FullServiceContent = {
  meta: {
    title: "Free Emergency Plumbing Quotes | 24/7 Licensed Plumbers by City",
    description:
      "Get free emergency plumbing quotes from licensed local plumbers. Leaks, sewer backups, no hot water — same-day and after-hours. No obligation. Available in 4,100+ cities.",
  },
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Emergency Plumbing Quote" }],
  hero: {
    h1: "Free Emergency Plumbing Quotes from Licensed Local Plumbers",
    sub: "Leaks, sewer backups, no hot water — connect with licensed plumbers who offer same-day and after-hours service. Free quote, no commitment.",
    trustBar: [
      "Licensed & insured plumbers nationwide",
      "Same-day and after-hours availability",
      "Free estimates, no obligation",
      "4,100+ cities covered across all 50 states",
    ],
    cta: "Select Your State to Get Started",
  },
  intro: {
    h2: "Get a Real Emergency Plumbing Quote in Your City",
    paragraphs: [
      "When a pipe bursts, the sewer backs up, or you have no hot water, you need a number you can call — and a realistic idea of what emergency service will cost. Labor rates and after-hours premiums vary by city; the only useful quote is from a licensed plumber who serves your area.",
      "This page connects homeowners across the US with licensed local plumbers who offer emergency and same-day service. You get an honest estimate before any work begins — no dispatch fee, no obligation.",
      "Select your state below, then your city, to find local emergency plumbers and get a free quote.",
    ],
    cta: "Find Emergency Plumbers in Your State",
  },
  why: {
    h2: "Why Homeowners Use This for Emergency Plumbing Quotes",
    items: [
      {
        h3: "Licensed plumbers who respond when you need them",
        p: "Emergency plumbing often means nights, weekends, or holidays. Licensed plumbers in your area know local permit rules and typical after-hours premiums — and can give you a straight quote over the phone so you're not surprised by the bill.",
      },
      {
        h3: "Upfront pricing, not open-ended hourly",
        p: "Many emergency jobs — leak repair, water heater failure, sewer backup — are quoted as a flat rate or clear range. You know what you're paying before a truck rolls. After-hours call-out typically adds $150–$400; your plumber can confirm when you call.",
      },
      {
        h3: "Compare before you commit",
        p: "If the situation isn't life-threatening, a quick call to two local plumbers can surface a real price difference. This platform makes it easy to connect with licensed emergency plumbers in your city.",
      },
      {
        h3: "No pay-to-play listings",
        p: "Plumbers listed here are not ranked by ad spend. You get quotes from licensed contractors who serve your city — vetted for state licensing and insurance.",
      },
    ],
  },
  services: {
    h2: "Plumbing Services Available for Free Quotes",
    intro: "Select your state below to find local pricing on emergency work and related services.",
    items: [
      {
        h3: "Plumbing Quote — General",
        description:
          "From leaking pipes and fixture replacements to full bathroom plumbing. Licensed plumbers in your city can assess any job over the phone and give you a range before scheduling a visit.",
        range: "$150 – $5,000+ depending on scope",
        linkLabel: "Find Plumbing Quotes by State",
        href: "/plumbing-quote/#states",
      },
      {
        h3: "Emergency Plumbing Quote",
        description:
          "Same-day and after-hours service for leaks, sewer backups, no hot water, and burst pipes. Emergency call-out often adds $150–$400; get a quote before work starts.",
        range: "Varies — emergency premium often $150–$400",
        linkLabel: "Find Emergency Plumbing Quotes by State",
        href: "/emergency-plumbing-quote/#states",
      },
      {
        h3: "Repiping Quote",
        description:
          "Whole-home repiping. Getting a quote before pipes fail avoids emergency pricing. Local plumbers quote based on home size and pipe material.",
        range: "$4,000 – $15,000+",
        linkLabel: "Find Repiping Quotes by State",
        href: "/repiping-quote/",
      },
      {
        h3: "Water Heater Replacement Quote",
        description:
          "Tank or tankless. No hot water is a common emergency; getting a quote before failure avoids after-hours premiums.",
        range: "$900 – $3,200",
        linkLabel: "Find Water Heater Quotes by State",
        href: "/water-heater-replacement-quote/",
      },
      {
        h3: "Sewer Line Replacement Quote",
        description:
          "Sewer backups and main line issues. Trenchless options in many areas. Local plumbers assess and quote.",
        range: "$3,500 – $22,000",
        linkLabel: "Find Sewer Line Quotes by State",
        href: "/sewer-line-replacement-quote/",
      },
      {
        h3: "Drain Line Replacement Quote",
        description:
          "Recurring clogs or failing drain lines. Camera inspection and clear pricing from local plumbers who do drain repair and replacement.",
        range: "$500 – $4,500",
        linkLabel: "Find Drain Line Quotes by State",
        href: "/drain-line-replacement-quote/",
      },
    ],
  },
  stateGridIntro: {
    h2: "Find Emergency Plumbing Quotes in Your State",
    paragraphs: [
      "Licensed emergency plumbers available for free quotes in all 50 states. Select your state to browse cities and connect with local plumbers who offer same-day and after-hours service.",
      "Most active states: Texas · Florida · California · Georgia · North Carolina · Ohio · Pennsylvania · Illinois · Arizona · Michigan",
      "Every US state is covered — select yours below to get started.",
    ],
    cta: "Select Your State",
  },
  howItWorks: {
    h2: "How to Get a Free Emergency Plumbing Quote",
    steps: [
      {
        title: "Step 1 — Select your state and city",
        text: "Choose your state from the list below, then your city. You'll see local pricing ranges and licensed plumbers who offer emergency service in your area.",
      },
      {
        title: "Step 2 — Use the cost estimator",
        text: "City pages include a cost estimator that adjusts for emergency type and after-hours — giving you a ballpark before you call.",
      },
      {
        title: "Step 3 — Call for your exact quote",
        text: "A licensed local plumber will walk you through your situation, give you an honest estimate, and confirm availability — in under 5 minutes, no obligation.",
      },
    ],
  },
  faq: {
    h2: "Emergency Plumbing Quote FAQ",
    items: [
      {
        q: "How much does emergency plumbing cost?",
        a: "Emergency and after-hours plumbing in the US typically adds $150–$400 to the base job. The total depends on the work — a leak repair, water heater replacement, or sewer backup — and your city's labor rates. Select your state and city for local estimates.",
      },
      {
        q: "Can I get a plumber same day?",
        a: "In most US cities, same-day and after-hours service is available for emergencies — active leaks, sewer backups, no hot water. Availability varies by area; call to confirm current scheduling.",
      },
      {
        q: "Is an emergency plumbing quote free?",
        a: "Yes. A phone quote is free and takes under 5 minutes. No obligation, no dispatch fee. You get a real estimate — including any after-hours premium — before any work begins.",
      },
      {
        q: "What counts as a plumbing emergency?",
        a: "Common emergencies include major leaks, burst pipes, sewer backups, no water, and no hot water. If you're unsure, call; a licensed plumber can tell you whether it's urgent and give you a quote.",
      },
      {
        q: "Do emergency plumbers charge more?",
        a: "Yes. After-hours, night, weekend, and holiday call-outs typically add $150–$400 to the job. A quick phone quote tells you exactly what to expect before you commit.",
      },
      {
        q: "How do I find a licensed emergency plumber in my city?",
        a: "Select your state below, then your city, to connect with licensed plumbers who offer emergency service in your area. All are vetted for state licensing and insurance.",
      },
    ],
  },
  closing: {
    h2: "Ready to Get an Emergency Plumbing Quote in Your City?",
    paragraphs: [
      "When you need a plumber fast, get a real number first. Select your state, find your city, and get an honest estimate from a licensed local plumber — same-day and after-hours.",
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
      { label: "Sewer Line Replacement Quote — All States", href: "/sewer-line-replacement-quote/" },
      { label: "Drain Line Replacement Quote — All States", href: "/drain-line-replacement-quote/" },
    ],
  },
};
