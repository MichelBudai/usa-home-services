import type { MetadataRoute } from "next";
import { getSiteConfigValues } from "@/lib/siteConfig";

export default function robots(): MetadataRoute.Robots {
  const { SITE_BASE_URL } = getSiteConfigValues();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_BASE_URL}/sitemap.xml`,
  };
}
