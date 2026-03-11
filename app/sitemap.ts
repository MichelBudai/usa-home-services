import type { MetadataRoute } from "next";
import {
  SITE_BASE_URL,
} from "@/lib/siteConfig";
import {
  SERVICE_SLUGS,
  stateSlugs,
  getCitiesForState,
} from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Home
  entries.push({
    url: SITE_BASE_URL,
    lastModified: lastMod,
    changeFrequency: "yearly",
    priority: 1,
  });

  // Service pages
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

  // City pages
  for (const service of SERVICE_SLUGS) {
    for (const stateSlug of stateSlugs) {
      const cities = getCitiesForState(stateSlug);
      for (const city of cities) {
        entries.push({
          url: `${SITE_BASE_URL}/${service}/${stateSlug}/${city.slug}`,
          lastModified: lastMod,
          changeFrequency: "yearly",
          priority: 0.7,
        });
      }
    }
  }

  return entries;
}
