import { getCurrentSiteConfig } from "@/lib/getSiteConfig";
import { stateSlugs } from "@/lib/data";
import { getTopCitiesForState } from "@/lib/censusData";

export const dynamic = "force-static";
export const revalidate = 2592000;

export function GET() {
  const config = getCurrentSiteConfig();
  const base = config.siteUrl;
  const SERVICE_SLUGS = config.services.map((s) => s.slug);
  const urls: string[] = [];

  for (const service of SERVICE_SLUGS) {
    urls.push(`<url><loc>${base}/${service}</loc><priority>1.0</priority></url>`);
  }
  for (const service of SERVICE_SLUGS) {
    for (const stateSlug of stateSlugs) {
      urls.push(`<url><loc>${base}/${service}/${stateSlug}</loc><priority>1.0</priority></url>`);
    }
  }
  for (const service of SERVICE_SLUGS) {
    for (const stateSlug of stateSlugs) {
      const topCities = getTopCitiesForState(stateSlug, 5);
      for (const city of topCities) {
        urls.push(`<url><loc>${base}/${service}/${stateSlug}/${city.slug}</loc><priority>1.0</priority></url>`);
      }
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ${urls.join("\n  ")}\n</urlset>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}

