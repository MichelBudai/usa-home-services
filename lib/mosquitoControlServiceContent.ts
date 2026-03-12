/**
 * Mosquito Control Quote service content — /mosquito-control-quote/
 */

import type { FullServiceContent } from "./fullServiceContentTypes";

export const MOSQUITO_CONTROL_SERVICE_CONTENT: FullServiceContent = {
  meta: {
    title: "Free Mosquito Control Quotes from Licensed Local Exterminators — Compare Estimates by City",
    description:
      "Get free mosquito control quotes from licensed local exterminators in your city. Compare estimates for barrier spray, misting systems, and larvicide programs — no obligation, upfront pricing.",
  },
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Mosquito Control Quote" }],
  hero: {
    h1: "Free Mosquito Control Quotes from Licensed Local Exterminators",
    sub: "Compare estimates from licensed mosquito control specialists in your city — barrier spray, automated misting systems, larvicide programs, and seasonal plans. Free quotes, no commitment.",
    trustBar: [
      "Licensed & insured mosquito specialists nationwide",
      "Free estimates, no obligation",
      "Upfront pricing before any work starts",
      "4,100+ cities covered across all 50 states",
    ],
    cta: "Select Your State to Get Started",
  },
  intro: {
    h2: "Get a Real Mosquito Control Quote in Your City",
    paragraphs: [
      "Mosquito pressure varies dramatically by region, season, and property type. A barrier spray program for a quarter-acre suburban lot in Georgia is priced and structured very differently from a misting system installation on a waterfront property in Florida. The only quote that matters is one from a licensed mosquito specialist who knows your local mosquito species and seasonal patterns.",
      "This page connects homeowners across the US with licensed local mosquito control specialists who understand regional mosquito pressure, approved treatment methods, and realistic seasonal costs. You get an honest number before any work begins.",
      "Select your state below, then your city, to find local mosquito specialists and get a free estimate.",
    ],
    cta: "Find Mosquito Control Specialists in Your State",
  },
  why: {
    h2: "Why Homeowners Use This to Find Mosquito Control Quotes",
    items: [
      {
        h3: "Mosquito species and pressure vary by region",
        p: "Aedes aegypti (dengue, Zika vector) dominates in the South and Gulf Coast. Culex mosquitoes (West Nile vector) are prevalent nationwide. Asian tiger mosquitoes have expanded across the Eastern US. A licensed specialist in your area knows which species are active and which treatment methods are most effective for your region.",
      },
      {
        h3: "Property type determines the best approach",
        p: "Small suburban lots benefit most from barrier spray programs. Properties near standing water or in high-pressure areas often need larvicide treatment in addition to adult mosquito control. Large properties with wooded areas or water features may justify a permanent misting system installation.",
      },
      {
        h3: "Seasonal timing matters for cost-effectiveness",
        p: "Starting a mosquito control program before peak season — typically April or May in most US regions — is more cost-effective than starting mid-summer. A licensed specialist can advise on optimal timing for your area.",
      },
      {
        h3: "No pay-to-play listings",
        p: "Mosquito specialists on this platform are not ranked by advertising spend. Quotes come from licensed contractors who serve your city — vetted for state licensing and insurance.",
      },
    ],
  },
  services: {
    h2: "Mosquito Control Services Available for Free Quotes",
    intro: "Select your state below to find local pricing on any of these services.",
    items: [
      {
        h3: "Barrier Spray Treatment",
        description:
          "Pyrethrin or synthetic pyrethroid spray applied to foliage, lawn perimeter, and resting areas kills adult mosquitoes on contact and leaves residual protection for 3–4 weeks. Most popular seasonal treatment for residential properties.",
        range: "$50 – $150 per treatment",
        linkLabel: "Find Barrier Spray Quotes by State",
        href: "/mosquito-control-quote/#states",
      },
      {
        h3: "Seasonal Mosquito Program",
        description:
          "Monthly or bi-monthly barrier spray treatments throughout mosquito season (typically April–October). Most cost-effective approach for consistent protection. Many companies offer season-long guarantees.",
        range: "$300 – $900 per season",
        linkLabel: "Find Seasonal Program Quotes by State",
        href: "/mosquito-control-quote/#states",
      },
      {
        h3: "Automated Misting System",
        description:
          "Permanently installed system with nozzles around the property perimeter that automatically spray on a timer. Best for high-pressure properties, waterfront homes, and homeowners who want hands-free control. Higher upfront cost but lower per-treatment cost over time.",
        range: "$1,500 – $5,000 installed",
        linkLabel: "Find Misting System Quotes by State",
        href: "/mosquito-control-quote/#states",
      },
      {
        h3: "Larvicide Treatment",
        description:
          "Biological or chemical larvicide applied to standing water sources — gutters, ornamental ponds, drainage areas — kills mosquito larvae before they become biting adults. Often combined with barrier spray for comprehensive control.",
        range: "$75 – $200 per treatment",
        linkLabel: "Find Larvicide Quotes by State",
        href: "/mosquito-control-quote/#states",
      },
      {
        h3: "In2Care Mosquito Trap System",
        description:
          "EPA-approved biological trap system that uses a fungal larvicide to kill Aedes mosquitoes and spread treatment to nearby breeding sites. Chemical-free option for homeowners with sensitivities or near natural water features.",
        range: "$200 – $600 installed + monthly service",
        linkLabel: "Find Trap System Quotes by State",
        href: "/mosquito-control-quote/#states",
      },
      {
        h3: "Special Event Mosquito Treatment",
        description:
          "One-time barrier spray treatment timed for outdoor events — weddings, parties, graduations. Applied 24–48 hours before the event for maximum residual protection.",
        range: "$75 – $250 per treatment",
        linkLabel: "Find Event Treatment Quotes by State",
        href: "/mosquito-control-quote/#states",
      },
    ],
  },
  stateGridIntro: {
    h2: "Find Mosquito Control Quotes in Your State",
    paragraphs: [
      "Licensed mosquito control specialists available for free quotes in all 50 states. Select your state to browse cities and connect with local exterminators.",
      "Highest mosquito pressure states: Florida · Texas · Louisiana · Georgia · Alabama · Mississippi · South Carolina · North Carolina · Tennessee · Virginia",
      "Don't see your state listed prominently? Every US state is covered — select yours below.",
    ],
    cta: "Select Your State",
  },
  howItWorks: {
    h2: "How to Get a Free Mosquito Control Quote",
    steps: [
      {
        title: "Step 1 — Select your state and city",
        text: "Choose your state from the list below, then select your city. You'll land on a page with local mosquito control pricing and licensed specialists who serve your area.",
      },
      {
        title: "Step 2 — Use the cost estimator",
        text: "Each city page includes a cost estimator that adjusts for treatment type, property size, and local mosquito pressure — giving you a realistic ballpark before you call.",
      },
      {
        title: "Step 3 — Call for your exact quote",
        text: "A licensed mosquito specialist will assess your property, recommend the appropriate treatment approach, and give you an honest estimate — in under 5 minutes, no obligation.",
      },
    ],
  },
  faq: {
    h2: "Mosquito Control Quote FAQ",
    items: [
      {
        q: "How much does mosquito control cost?",
        a: "A single barrier spray treatment typically costs $50–$150. A full seasonal program (6–8 treatments) runs $300–$900. Automated misting system installation costs $1,500–$5,000. Costs depend on property size, treatment type, and your city.",
      },
      {
        q: "How long does a barrier spray last?",
        a: "A standard barrier spray treatment remains effective for 3–4 weeks under normal weather conditions. Rain and high heat can reduce effectiveness. Seasonal programs schedule treatments every 3–4 weeks through mosquito season for consistent protection.",
      },
      {
        q: "Are mosquito treatments safe for children and pets?",
        a: "Most licensed mosquito treatments use pyrethrin (plant-derived) or synthetic pyrethroids, which are safe for humans and pets once dried — typically within 30 minutes to 2 hours. Always ask your specialist about re-entry times and any precautions for sensitive individuals or pets.",
      },
      {
        q: "When should I start mosquito control?",
        a: "Starting before peak season — typically April in Southern states, May in Northern states — is more cost-effective and provides better season-long control. Waiting until you're already battling heavy mosquito pressure makes treatment harder and requires more applications.",
      },
      {
        q: "Does mosquito control eliminate all mosquitoes?",
        a: "No treatment eliminates 100% of mosquitoes — new adults constantly emerge from untreated areas nearby. Professional mosquito control reduces biting pressure by 70–90% with consistent seasonal treatment. Larvicide treatment of standing water on your property significantly boosts effectiveness.",
      },
      {
        q: "Is an automated misting system worth the cost?",
        a: "For high-pressure properties, waterfront homes, or homeowners who want set-and-forget convenience, automated misting systems pay for themselves over 3–5 seasons compared to annual barrier spray programs. Best for properties over half an acre or near persistent standing water.",
      },
      {
        q: "Should I get multiple mosquito control quotes?",
        a: "Yes. Program structures, treatment frequencies, and seasonal pricing vary significantly between companies. Getting two or three quotes ensures you're comparing equivalent programs and not paying for more treatments than your property actually needs.",
      },
    ],
  },
  closing: {
    h2: "Ready to Find a Mosquito Control Specialist in Your City?",
    paragraphs: [
      "Mosquitoes aren't just a nuisance — they're vectors for West Nile virus, dengue, Zika, and other diseases. Professional mosquito control reclaims your outdoor space and reduces real health risk.",
      "Select your state, find your city, and get an honest estimate from a licensed local mosquito specialist.",
    ],
    cta: "Select Your State to Get Started",
  },
  internalLinks: {
    heading: "Other pest control services:",
    links: [
      { label: "Pest Control Quote — All States", href: "/pest-control-quote/" },
      { label: "Termite Treatment Quote — All States", href: "/termite-treatment-quote/" },
      { label: "Rodent Control Quote — All States", href: "/rodent-control-quote/" },
      { label: "Bed Bug Treatment Quote — All States", href: "/bed-bug-treatment-quote/" },
      { label: "Wildlife Removal Quote — All States", href: "/wildlife-removal-quote/" },
    ],
  },
};
