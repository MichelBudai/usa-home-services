/**
 * NICHE CONFIG — seul fichier à modifier pour chaque nouveau site.
 * Tout le reste du code est générique.
 */

export const NICHE = {
  // Identité
  name: "Plumber",                          // "Electrician", "HVAC"...
  namePlural: "Plumbers",                   // "Electricians"...
  slug: "plumber",                          // "electrician", "hvac"...

  // Site
  siteUrl: "https://usa-plumber-quote.com",
  siteName: "USA Plumber Quote",

  // Téléphone
  phoneTel: "tel:+18552352002",
  phoneDisplay: "(855) 235-2002",

  // GA4
  ga4Id: "G-VLTS29LH71",

  // Services (slug + label)
  services: [
    { slug: "plumbing-quote",                    label: "Plumbing Quote" },
    { slug: "repiping-quote",                    label: "Repiping Quote" },
    { slug: "water-heater-replacement-quote",    label: "Water Heater Replacement Quote" },
    { slug: "sewer-line-replacement-quote",      label: "Sewer Line Replacement Quote" },
    { slug: "drain-line-replacement-quote",      label: "Drain Line Replacement Quote" },
    { slug: "emergency-plumbing-quote",          label: "Emergency Plumbing Quote" },
  ],
} as const;

// Types dérivés automatiquement
export type ServiceSlug = (typeof NICHE.services)[number]["slug"];
export const SERVICE_SLUGS = NICHE.services.map((s) => s.slug) as unknown as readonly ServiceSlug[];
export const SERVICE_LABELS = Object.fromEntries(
  NICHE.services.map((s) => [s.slug, s.label])
) as Record<ServiceSlug, string>;
