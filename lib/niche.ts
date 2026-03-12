/**
 * NICHE CONFIG — seul fichier à modifier pour chaque nouveau site.
 * Tout le reste du code est générique.
 */

export const NICHE = {
  name: "Pest Control Specialist",
  namePlural: "Pest Control Specialists",
  slug: "pest-control",

  siteUrl: "https://usa-pest-control-quote.com",
  siteName: "USA Pest Control Quote",

  phoneTel: "tel:+10000000000",
  phoneDisplay: "(000) 000-0000",

  ga4Id: "",

  services: [
    { slug: "pest-control-quote",           label: "Pest Control Quote" },
    { slug: "termite-treatment-quote",      label: "Termite Treatment Quote" },
    { slug: "rodent-control-quote",         label: "Rodent Control Quote" },
    { slug: "bed-bug-treatment-quote",      label: "Bed Bug Treatment Quote" },
    { slug: "mosquito-control-quote",       label: "Mosquito Control Quote" },
    { slug: "wildlife-removal-quote",       label: "Wildlife Removal Quote" },
  ],
} as const;

// Types dérivés automatiquement
export type ServiceSlug = (typeof NICHE.services)[number]["slug"];
export const SERVICE_SLUGS = NICHE.services.map((s) => s.slug) as unknown as readonly ServiceSlug[];
export const SERVICE_LABELS = Object.fromEntries(
  NICHE.services.map((s) => [s.slug, s.label])
) as Record<ServiceSlug, string>;
