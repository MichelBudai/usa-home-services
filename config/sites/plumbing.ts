export const plumbingConfig = {
  name: "Plumber",
  namePlural: "Plumbers",
  slug: "plumbing",

  siteUrl: "https://usa-plumber-quote.com",
  siteName: "USA Plumber Quote",

  phoneTel: "tel:+18552352002",
  phoneDisplay: "(855) 235-2002",

  ga4Id: "G-VLTS29LH71",

  services: [
    { slug: "plumbing-quote",                    label: "Plumbing Quote" },
    { slug: "repiping-quote",                    label: "Repiping Quote" },
    { slug: "water-heater-replacement-quote",    label: "Water Heater Replacement Quote" },
    { slug: "sewer-line-replacement-quote",      label: "Sewer Line Replacement Quote" },
    { slug: "drain-line-replacement-quote",      label: "Drain Line Replacement Quote" },
    { slug: "emergency-plumbing-quote",          label: "Emergency Plumbing Quote" },
  ],
} as const;
