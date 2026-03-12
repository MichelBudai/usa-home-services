import type { MetadataRoute } from "next";
import { getSiteConfigValues } from "@/lib/siteConfig";
import { stateSlugs, getCitiesForState } from "@/lib/data";
import { getServiceConstants } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const { SITE_BASE_URL } = getSiteConfigValues();
  const { SERVICE_SLUGS } = getServiceConstants();
  const lastMod = new Date();
  const entries: MetadataRoute.Sitemap = [];

  entries.push({
    url: SITE_BASE_URL,
    lastModified: lastMod,
    changeFrequency: "yearly",
    priority: 1,
  });

  for (const service of SERVICE_SLUGS) {
    entries.push({
      url: `${SITE_BASE_URL}/${service}`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

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
