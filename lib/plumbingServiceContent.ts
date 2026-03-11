/**
 * Plumbing Quote service homepage content — /plumbing-quote/
 * Template: service root (top of programmatic tree).
 */

export const PLUMBING_SERVICE_CONTENT = {
  meta: {
    title: "Free Plumbing Quotes from Licensed Local Plumbers — Compare Estimates by City",
    description:
      "Get free plumbing quotes from licensed local plumbers in your city. Compare estimates for repairs, water heaters, repiping, sewer lines, and drain lines — no obligation, upfront pricing.",
  },
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Plumbing Quote" }],
  hero: {
    h1: "Free Plumbing Quotes from Licensed Local Plumbers",
    sub: "Compare estimates from licensed plumbers in your city — repairs, installations, water heaters, repiping, sewer lines, and more. Free quotes, no commitment.",
    trustBar: [
      "Licensed & insured plumbers nationwide",
      "Free estimates, no obligation",
      "Upfront pricing before any work starts",
      "4,100+ cities covered across all 50 states",
    ],
    cta: "Select Your State to Get Started",
  },
  intro: {
    h2: "Get a Real Plumbing Quote in Your City",
    paragraphs: [
      "A plumbing estimate from a national average is close to useless. Labor rates, permit fees, and material costs vary city by city — what a water heater replacement costs in Houston is not what it costs in Hartford. The only quote that matters is one from a licensed plumber who works in your area.",
      "This page connects homeowners across the US with licensed local plumbers who know their city's permit requirements, labor market, and housing stock. You get an honest number before any work begins — no dispatch fee, no obligation, no pressure.",
      "Select your state below, then your city, to find local plumbers and get a free estimate on any plumbing job.",
    ],
    cta: "Find Plumbers in Your State",
  },
  why: {
    h2: "Why Homeowners Use This to Find Plumbing Quotes",
    items: [
      {
        h3: "Licensed plumbers who know your local codes",
        p: "Plumbing permits and inspection requirements aren't uniform across the US — they vary by state, county, and city. A licensed plumber in your area knows exactly what's required, pulls the permits for you, and includes those costs in your quote upfront. No surprises when the invoice arrives.",
      },
      {
        h3: "Compare before you commit",
        p: "Getting a single quote from a single plumber is how homeowners overpay. A free second or third estimate takes minutes and routinely saves hundreds — sometimes thousands — on larger jobs like repiping or sewer line replacement. This platform makes that comparison fast.",
      },
      {
        h3: "Upfront pricing, not hourly guesswork",
        p: "For most jobs — water heater replacement, sewer line work, drain line replacement, full repiping — licensed plumbers quote flat project rates, not open-ended hourly billing. You know what you're paying before a tool comes out of the truck.",
      },
      {
        h3: "No pay-to-play listings",
        p: "Plumbers on this platform are not ranked by how much they pay for placement. Quotes come from licensed contractors who serve your city — vetted for state licensing and insurance.",
      },
    ],
  },
  services: {
    h2: "Plumbing Services Available for Free Quotes",
    intro: "Select your state below to find local pricing on any of these services.",
    items: [
      {
        h3: "Plumbing Quote — General",
        description:
          "From leaking pipes and fixture replacements to full bathroom plumbing installations, a general plumbing quote covers the full range of residential work. Licensed plumbers in your city can assess any job over the phone and give you a range before scheduling a visit.",
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
        href: "/emergency-plumbing-quote/",
      },
      {
        h3: "Repiping Quote",
        description:
          "Whole-home repiping is the largest plumbing investment most homeowners make — and one of the most misquoted. Costs depend on home size, current pipe material, and local permit requirements. Homes built before 1980 with galvanized steel or polybutylene pipes are the most common candidates.",
        range: "$4,000 – $15,000+",
        linkLabel: "Find Repiping Quotes by State",
        href: "/repiping-quote/",
      },
      {
        h3: "Water Heater Replacement Quote",
        description:
          "Tank vs. tankless, gas vs. electric, 40-gallon vs. 80-gallon — water heater replacement costs vary more than most homeowners expect. Getting a quote before your unit fails avoids the emergency call-out premium that can add $150–$400 to any job.",
        range: "$900 – $3,200",
        linkLabel: "Find Water Heater Quotes by State",
        href: "/water-heater-replacement-quote/",
      },
      {
        h3: "Sewer Line Replacement Quote",
        description:
          "Tree root intrusion, pipe collapse, and corrosion are the leading causes of sewer line failure in older US homes. Trenchless sewer replacement is available in most cities and eliminates full yard excavation in many cases — but qualifying depends on pipe condition and access. A licensed plumber can confirm over the phone.",
        range: "$3,500 – $22,000",
        linkLabel: "Find Sewer Line Quotes by State",
        href: "/sewer-line-replacement-quote/",
      },
      {
        h3: "Drain Line Replacement Quote",
        description:
          "Recurring clogs, sewage odors, and slow drains throughout the home often point to a failing drain line rather than a simple blockage. A camera inspection is the fastest way to confirm — and most licensed plumbers include it in the quote process.",
        range: "$500 – $4,500",
        linkLabel: "Find Drain Line Quotes by State",
        href: "/drain-line-replacement-quote/",
      },
    ],
  },
  stateGridIntro: {
    h2: "Find Plumbing Quotes in Your State",
    paragraphs: [
      "Licensed plumbers available for free quotes in all 50 states — from major metros to smaller cities and suburbs. Select your state to browse cities and connect with local plumbers.",
      "Most active states for plumbing quotes: Texas · Florida · California · Georgia · North Carolina · Ohio · Pennsylvania · Illinois · Arizona · Michigan",
      "Don't see your state listed prominently? Every US state is covered — select yours below.",
    ],
    cta: "Select Your State",
  },
  howItWorks: {
    h2: "How to Get a Free Plumbing Quote",
    steps: [
      {
        title: "Step 1 — Select your state and city",
        text: "Choose your state from the list below, then select your city. You'll land on a page with local pricing ranges and licensed plumbers who serve your area.",
      },
      {
        title: "Step 2 — Use the cost estimator",
        text: "Each city page includes a cost estimator that adjusts for service type, home size, and home age — giving you a realistic ballpark before you call.",
      },
      {
        title: "Step 3 — Call for your exact quote",
        text: "A licensed local plumber will walk you through your issue, give you an honest estimate, and confirm availability — in under 5 minutes, no obligation.",
      },
    ],
  },
  faq: {
    h2: "Plumbing Quote FAQ",
    items: [
      {
        q: "How much does a plumber cost?",
        a: "Plumber hourly rates in the US range from $65 to $200 per hour depending on your city, the job type, and time of day. For larger projects — repiping, water heater replacement, sewer line work — most licensed plumbers quote a flat project rate. Select your state and city for a local estimate specific to your area.",
      },
      {
        q: "How do I find a licensed plumber in my city?",
        a: "Select your state below, then your city, to connect with licensed plumbers who operate in your area and are familiar with local permit requirements. All plumbers listed are state-licensed and insured.",
      },
      {
        q: "Is getting a plumbing quote really free?",
        a: "Yes. A phone quote costs nothing and takes under 5 minutes. No obligation to hire, no dispatch fee, no credit card required. You get a real number from a licensed plumber before any work begins.",
      },
      {
        q: "Should I get multiple plumbing quotes?",
        a: "For any job over $500, yes. Getting two or three estimates is standard practice in home services — it takes minutes and routinely surfaces a $200–$1,000 difference on the same scope of work. This platform makes it easy to compare local plumbers before committing.",
      },
      {
        q: "What plumbing jobs require a permit?",
        a: "Most significant plumbing work requires a permit — including water heater replacement, sewer line replacement, repiping, and new installations. Permit requirements vary by state, county, and city. A licensed plumber in your area handles the permit process and includes the cost in your quote.",
      },
      {
        q: "What's the difference between a plumbing quote and an estimate?",
        a: "In practice, both terms mean a price assessment before work begins. A quote is typically more specific and binding — a licensed plumber reviews your situation and gives you a defined price range or flat rate. An estimate is often a broader ballpark. On this platform, the goal is always to connect you with a licensed plumber who can give you a real quote, not a vague estimate.",
      },
      {
        q: "How quickly can I get a plumber?",
        a: "In most US cities, same-day and next-day service is available for standard jobs. Emergency plumbing — active leaks, sewer backups, no hot water — is typically available the same day. Availability varies by city; call to confirm current scheduling in your area.",
      },
    ],
  },
  closing: {
    h2: "Ready to Find a Plumber in Your City?",
    paragraphs: [
      "Thousands of homeowners use this platform every month to compare plumbing quotes before spending a dollar. It takes less than a minute — select your state, find your city, and get an honest estimate from a licensed local plumber.",
      "No forms. No waiting. No obligation.",
    ],
    cta: "Select Your State to Get Started",
  },
  internalLinks: {
    heading: "Other services:",
    links: [
      { label: "Repiping Quote — All States", href: "/repiping-quote/" },
      { label: "Water Heater Replacement Quote — All States", href: "/water-heater-replacement-quote/" },
      { label: "Sewer Line Replacement Quote — All States", href: "/sewer-line-replacement-quote/" },
      { label: "Drain Line Replacement Quote — All States", href: "/drain-line-replacement-quote/" },
      { label: "Emergency Plumbing Quote — All States", href: "/emergency-plumbing-quote/" },
    ],
  },
} as const;
