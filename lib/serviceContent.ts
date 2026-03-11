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
  "plumbing-quote": {
    heroTitle: "Free plumbing quotes from local plumbers",
    heroSub:
      "Compare estimates for repairs, installations, and general plumbing. Get free quotes from licensed plumbers in your area—no obligation.",
    metaTitle: "Free Plumbing Quotes | Compare Local Plumbers by City",
    metaDescription:
      "Get free plumbing quotes from local licensed plumbers. Compare estimates for repairs, installations, and more. Available in 4,000+ cities across the US.",
    intro:
      "Whether you need a leak fixed, a new fixture installed, or a full plumbing inspection, getting multiple quotes helps you find the right price and the right plumber. Select your state below to find local plumbing quotes in your city.",
    whyTitle: "Why get a plumbing quote here",
    whyPoints: [
      "Free, no-obligation estimates from local plumbers.",
      "Compare pricing and reviews before you commit.",
      "Licensed professionals who know your area and local codes.",
    ],
    ctaTitle: "Find plumbing quotes in your city",
    ctaSub: "Select your state, then choose your city to get started.",
  },

  "repiping-quote": {
    heroTitle: "Repiping quotes from local contractors",
    heroSub:
      "Whole-house or partial repiping? Get free estimates from qualified plumbers. Compare repiping costs and timelines in your area.",
    metaTitle: "Free Repiping Quotes | Compare Repipe Costs by City",
    metaDescription:
      "Get free repiping quotes from local plumbers. Compare whole-house and partial repipe costs. Available in 4,000+ cities across the US.",
    intro:
      "Old or failing pipes can lead to leaks, low pressure, and water quality issues. Repiping gives you peace of mind and often improves home value. Get free quotes from local plumbers who specialize in repiping—select your state to find options near you.",
    whyTitle: "Why compare repiping quotes",
    whyPoints: [
      "Repiping costs vary by home size, materials, and location.",
      "Multiple quotes help you choose the best value and timeline.",
      "Local plumbers understand your area’s common issues and codes.",
    ],
    ctaTitle: "Get repiping quotes in your area",
    ctaSub: "Choose your state and city to see local repiping contractors.",
  },

  "water-heater-replacement-quote": {
    heroTitle: "Water heater replacement quotes near you",
    heroSub:
      "Tank or tankless? Get free estimates from local installers. Compare water heater replacement costs and find the right unit for your home.",
    metaTitle: "Water Heater Replacement Quotes | Compare Costs by City",
    metaDescription:
      "Get free water heater replacement quotes from local plumbers. Compare tank and tankless options. Available in 4,000+ cities across the US.",
    intro:
      "When your water heater is failing or you want to upgrade, getting a few quotes helps you compare brands, sizes, and installation costs. Select your state below to find local water heater replacement quotes and certified installers.",
    whyTitle: "Why get multiple water heater quotes",
    whyPoints: [
      "Installation cost and unit choice depend on your home and usage.",
      "Comparing quotes helps you balance upfront cost and efficiency.",
      "Local installers can recommend the best options for your climate.",
    ],
    ctaTitle: "Find water heater replacement quotes",
    ctaSub: "Select your state and city to connect with local installers.",
  },

  "sewer-line-replacement-quote": {
    heroTitle: "Sewer line replacement quotes from local pros",
    heroSub:
      "Sewer line repair or full replacement? Get free estimates from plumbers who handle sewer and main line work in your area.",
    metaTitle: "Sewer Line Replacement Quotes | Compare by City",
    metaDescription:
      "Get free sewer line replacement and repair quotes from local plumbers. Compare costs for main line and sewer work. Available in 4,000+ cities across the US.",
    intro:
      "Sewer line issues—from backups to tree root damage—often need a specialist. Getting quotes from local plumbers who do sewer work helps you understand repair vs. replacement options and costs. Choose your state to find sewer line quotes near you.",
    whyTitle: "Why compare sewer line quotes",
    whyPoints: [
      "Sewer repair vs. replacement costs depend on the scope of damage.",
      "Local plumbers can assess your line and recommend the best approach.",
      "Multiple quotes help you avoid overpaying for major sewer work.",
    ],
    ctaTitle: "Get sewer line quotes in your city",
    ctaSub: "Select your state and city to find local sewer line specialists.",
  },

  "drain-line-replacement-quote": {
    heroTitle: "Drain line replacement and repair quotes",
    heroSub:
      "Drain line issues or full replacement? Get free estimates from local plumbers. Compare drain line repair and replacement costs in your area.",
    metaTitle: "Drain Line Replacement Quotes | Compare by City",
    metaDescription:
      "Get free drain line replacement and repair quotes from local plumbers. Compare costs for drain repairs and replacement. Available in 4,000+ cities across the US.",
    intro:
      "Persistent clogs, slow drains, or damaged drain lines may need repair or replacement. Local plumbers can diagnose the issue and provide clear quotes. Select your state below to find drain line quotes from plumbers who serve your city.",
    whyTitle: "Why get drain line quotes",
    whyPoints: [
      "Drain line work can range from clearing blockages to full replacement.",
      "Comparing quotes ensures you get a fair price for the scope of work.",
      "Local plumbers know common drain issues in your area.",
    ],
    ctaTitle: "Find drain line quotes near you",
    ctaSub: "Choose your state and city to get started.",
  },

  "emergency-plumbing-quote": {
    heroTitle: "Emergency plumbing quotes from local plumbers",
    heroSub:
      "Leaks, sewer backups, no hot water? Get free estimates from licensed plumbers who offer same-day and after-hours service in your area.",
    metaTitle: "Free Emergency Plumbing Quotes | 24/7 Plumbers by City",
    metaDescription:
      "Get free emergency plumbing quotes from licensed local plumbers. Same-day and after-hours. Available in 4,000+ cities across the US.",
    intro:
      "When you need a plumber fast — burst pipe, sewer backup, no hot water — a quick phone quote tells you what to expect. Emergency and after-hours premiums vary by city. Select your state below to find licensed emergency plumbers and get a free quote.",
    whyTitle: "Why get an emergency plumbing quote first",
    whyPoints: [
      "Emergency call-out often adds $150–$400; a quote confirms the total before work starts.",
      "Licensed plumbers in your area know local after-hours rates and availability.",
      "Comparing two quick calls can save you money even in an emergency.",
    ],
    ctaTitle: "Find emergency plumbing quotes near you",
    ctaSub: "Select your state and city to get started.",
  },
};
