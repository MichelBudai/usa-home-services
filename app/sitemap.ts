import type { MetadataRoute } from "next";
import { getSiteConfigValues } from "@/lib/siteConfig";
import { stateSlugs, getCitiesForState } from "@/lib/data";
import { getServiceConstants } from "@/lib/constants";
import { getCityMetadata } from "@/lib/cityMetadata";

/** Priority dynamique selon la population.
 *  Les grandes villes sont crawlées en priorité par Google.
 */
function getCityPriority(population: number | undefined): number {
  if (!population)        return 0.5;
  if (population >= 500_000) return 0.9;
  if (population >= 100_000) return 0.8;
  if (population >=  50_000) return 0.7;
  if (population >=  10_000) return 0.6;
  return 0.5;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const { SITE_BASE_URL } = getSiteConfigValues();
  const { SERVICE_SLUGS } = getServiceConstants();
  const lastMod = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Homepage
  entries.push({
    url: SITE_BASE_URL,
    lastModified: lastMod,
    changeFrequency: "yearly",
    priority: 1,
  });

  // Service root pages
  for (const service of SERVICE_SLUGS) {
    entries.push({
      url: `${SITE_BASE_URL}/${service}`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  // State pages
  for (const service of SERVICE_SLUGS) {
    for (const stateSlug of stateSlugs) {
      entries.push({
        url: `${SITE_BASE_URL}/${service}/${stateSlug}`,
        lastModified: lastMod,
        changeFrequency: "yearly",
        priority: 0.8,
      });
    }
  }

  // City pages — priority basée sur la population
  for (const service of SERVICE_SLUGS) {
    for (const stateSlug of stateSlugs) {
      const cities = getCitiesForState(stateSlug);
      for (const city of cities) {
        const meta = getCityMetadata(stateSlug, city.slug);
        const priority = getCityPriority(meta?.population);
        entries.push({
          url: `${SITE_BASE_URL}/${service}/${stateSlug}/${city.slug}`,
          lastModified: lastMod,
          changeFrequency: "yearly",
          priority,
        });
      }
    }
  }

  return entries;
}
