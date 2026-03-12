import type { ServiceSlug } from "./data";

export interface ServiceContent {
  heroTitle: string;
  heroSub: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  whyTitle: string;
  whyPoints: string[];
  ctaTitle: string;
  ctaSub: string;
}

export const SERVICE_CONTENT: Record<ServiceSlug, ServiceContent> = {
  "pest-control-quote": {
    heroTitle: "Free pest control quotes from local specialists",
    heroSub:
      "Compare estimates for inspections, treatments, and prevention programs. Get free quotes from licensed pest control specialists in your area—no obligation.",
    metaTitle: "Free Pest Control Quotes | Compare Local Specialists by City",
    metaDescription:
      "Get free pest control quotes from local licensed specialists. Compare estimates for inspections, treatments, and prevention. Available in 4,000+ cities across the US.",
    intro:
      "Whether you need a one-time treatment, an annual prevention program, or a full inspection, getting multiple quotes helps you find the right price and the right specialist. Select your state below to find local pest control quotes in your city.",
    whyTitle: "Why get a pest control quote here",
    whyPoints: [
      "Free, no-obligation estimates from local licensed specialists.",
      "Compare pricing and treatment approaches before you commit.",
      "Licensed professionals who know your area's pest species and regulations.",
    ],
    ctaTitle: "Find pest control quotes in your city",
    ctaSub: "Select your state, then choose your city to get started.",
  },

  "termite-treatment-quote": {
    heroTitle: "Termite treatment quotes from local specialists",
    heroSub:
      "Liquid barrier, bait systems, or fumigation? Get free estimates from licensed termite specialists. Compare treatment costs and methods in your area.",
    metaTitle: "Free Termite Treatment Quotes | Compare Costs by City",
    metaDescription:
      "Get free termite treatment quotes from local specialists. Compare liquid barrier, bait system, and fumigation costs. Available in 4,000+ cities across the US.",
    intro:
      "Termite damage is not covered by most homeowner insurance policies — early treatment protects your home and your investment. Get free quotes from local termite specialists who know your area's termite species and treatment options. Select your state to find quotes near you.",
    whyTitle: "Why compare termite treatment quotes",
    whyPoints: [
      "Treatment method and cost vary significantly by termite species and infestation severity.",
      "Multiple quotes help you choose the best approach — liquid barrier, bait, or fumigation.",
      "Local specialists know your area's termite pressure and seasonal activity.",
    ],
    ctaTitle: "Get termite treatment quotes in your area",
    ctaSub: "Choose your state and city to see local termite specialists.",
  },

  "rodent-control-quote": {
    heroTitle: "Rodent control quotes from local specialists",
    heroSub:
      "Mice, rats, or other rodents? Get free estimates from licensed specialists. Compare exclusion, trapping, and sanitization costs in your area.",
    metaTitle: "Free Rodent Control Quotes | Compare Costs by City",
    metaDescription:
      "Get free rodent control quotes from local specialists. Compare exclusion, trapping, and sanitization estimates. Available in 4,000+ cities across the US.",
    intro:
      "Effective rodent control means more than traps — it requires sealing every entry point to prevent re-entry. Get free quotes from local specialists who provide complete exclusion. Select your state below to find rodent control quotes in your city.",
    whyTitle: "Why get multiple rodent control quotes",
    whyPoints: [
      "Complete exclusion — not just trapping — is the only permanent solution.",
      "Comparing quotes helps you identify specialists who offer full exclusion.",
      "Local specialists know common rodent entry points in your area's housing stock.",
    ],
    ctaTitle: "Find rodent control quotes in your city",
    ctaSub: "Select your state and city to connect with local specialists.",
  },

  "bed-bug-treatment-quote": {
    heroTitle: "Bed bug treatment quotes from local specialists",
    heroSub:
      "Heat treatment, chemical, or hybrid? Get free estimates from licensed bed bug specialists. Compare treatment costs and methods in your area.",
    metaTitle: "Free Bed Bug Treatment Quotes | Compare Costs by City",
    metaDescription:
      "Get free bed bug treatment quotes from local specialists. Compare heat treatment, chemical, and hybrid costs. Available in 4,000+ cities across the US.",
    intro:
      "Bed bug infestations don't resolve on their own — and DIY approaches almost always fail, scattering the infestation and making professional treatment more expensive. Get free quotes from local bed bug specialists before the problem grows. Select your state to find quotes near you.",
    whyTitle: "Why compare bed bug treatment quotes",
    whyPoints: [
      "Heat vs. chemical treatment can mean a $1,000+ difference for the same home.",
      "Comparing quotes helps you find the most effective method for your infestation.",
      "Local specialists know your area's housing types and treatment requirements.",
    ],
    ctaTitle: "Get bed bug treatment quotes in your area",
    ctaSub: "Choose your state and city to see local bed bug specialists.",
  },

  "mosquito-control-quote": {
    heroTitle: "Mosquito control quotes from local specialists",
    heroSub:
      "Barrier spray, seasonal programs, or misting systems? Get free estimates from licensed mosquito specialists. Compare costs and programs in your area.",
    metaTitle: "Free Mosquito Control Quotes | Compare Costs by City",
    metaDescription:
      "Get free mosquito control quotes from local specialists. Compare barrier spray, seasonal programs, and misting system costs. Available in 4,000+ cities across the US.",
    intro:
      "Professional mosquito control reduces biting pressure by 70–90% and makes your outdoor space genuinely usable through peak season. Get free quotes from local specialists and compare seasonal program costs. Select your state below to get started.",
    whyTitle: "Why get mosquito control quotes",
    whyPoints: [
      "Seasonal program pricing and treatment frequency vary by company.",
      "Starting before peak season is more cost-effective and provides better protection.",
      "Local specialists know your area's mosquito species and peak season timing.",
    ],
    ctaTitle: "Find mosquito control quotes in your city",
    ctaSub: "Select your state and city to get started.",
  },

  "wildlife-removal-quote": {
    heroTitle: "Wildlife removal quotes from local specialists",
    heroSub:
      "Raccoons, squirrels, bats, or snakes? Get free estimates from licensed wildlife specialists. Humane removal and exclusion in your area.",
    metaTitle: "Free Wildlife Removal Quotes | Compare Costs by City",
    metaDescription:
      "Get free wildlife removal quotes from local licensed specialists. Compare raccoon, squirrel, bat, and snake removal costs. Available in 4,000+ cities across the US.",
    intro:
      "Wildlife removal in most states requires a licensed specialist — and removing an animal without sealing entry points guarantees the same problem within weeks. Get free quotes from local wildlife specialists who provide complete removal and exclusion. Select your state to find quotes near you.",
    whyTitle: "Why get wildlife removal quotes",
    whyPoints: [
      "Most wildlife removal is legally regulated — always use a licensed specialist.",
      "Complete exclusion after removal is essential to prevent re-entry.",
      "Local specialists know your area's wildlife species and state permit requirements.",
    ],
    ctaTitle: "Get wildlife removal quotes in your city",
    ctaSub: "Select your state and city to connect with local specialists.",
  },
};
