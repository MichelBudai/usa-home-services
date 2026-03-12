import { NextResponse } from "next/server";
import { SERVICE_SLUGS, stateSlugs } from "@/lib/data";
import { getTopCitiesForState } from "@/lib/censusData";
import { SITE_BASE_URL } from "@/lib/siteConfig";

export const revalidate = 2592000;

export function GET() {
  const urls: string[] = [];

  // Service pages — priority 1.0
  for (const service of SERVICE_SLUGS) {
    urls.push(`<url><loc>${SITE_BASE_URL}/${service}</loc><priority>1.0</priority></url>`);
  }

  // State pages — priority 1.0
  for (const service of SERVICE_SLUGS) {
    for (const stateSlug of stateSlugs) {
      urls.push(`<url><loc>${SITE_BASE_URL}/${service}/${stateSlug}</loc><priority>1.0</priority></url>`);
    }
  }

  // Top 5 cities per state — priority 1.0
  for (const service of SERVICE_SLUGS) {
    for (const stateSlug of stateSlugs) {
      const topCities = getTopCitiesForState(stateSlug, 5);
      for (const city of topCities) {
        urls.push(`<url><loc>${SITE_BASE_URL}/${service}/${stateSlug}/${city.slug}</loc><priority>1.0</priority></url>`);
      }
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ${urls.join("\n  ")}\n</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
