export const pestControlConfig = {
  name: "Pest Control Specialist",
  namePlural: "Pest Control Specialists",
  slug: "pest-control",

  siteUrl: "https://usa-pest-control-quote.com",
  siteName: "USA Pest Control Quote",

  phoneTel: "tel:+18442130383",
  phoneDisplay: "(844) 213-0383",

  ga4Id: "G-ZCV2C6T5TW",

  services: [
    { slug: "pest-control-quote",        label: "Pest Control Quote" },
    { slug: "termite-treatment-quote",   label: "Termite Treatment Quote" },
    { slug: "rodent-control-quote",      label: "Rodent Control Quote" },
    { slug: "bed-bug-treatment-quote",   label: "Bed Bug Treatment Quote" },
    { slug: "mosquito-control-quote",    label: "Mosquito Control Quote" },
    { slug: "wildlife-removal-quote",    label: "Wildlife Removal Quote" },
  ],
} as const;
