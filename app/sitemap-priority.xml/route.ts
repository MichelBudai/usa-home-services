import { getCurrentSiteConfig } from "@/lib/getSiteConfig";
import { stateSlugs, getCitiesForState } from "@/lib/data";
import { getCityMetadata } from "@/lib/cityMetadata";

export const dynamic = "force-static";
export const revalidate = 2592000;

const PRIORITY_POPULATION = 100_000; // villes > 100k — 334 villes nationales

export function GET() {
  const config = getCurrentSiteConfig();
  const base = config.siteUrl;
  const SERVICE_SLUGS = config.services.map((s) => s.slug);
  const urls: string[] = [];

  // Services root — priority 0.9
  for (const service of SERVICE_SLUGS) {
    urls.push(`<url><loc>${base}/${service}</loc><priority>0.9</priority></url>`);
  }

  // State pages — priority 0.8
  for (const service of SERVICE_SLUGS) {
    for (const stateSlug of stateSlugs) {
      urls.push(`<url><loc>${base}/${service}/${stateSlug}</loc><priority>0.8</priority></url>`);
    }
  }

  // Top cities nationales (population > 100k) — priority 1.0
  // Indépendamment de l'état — ce sont les plus grandes villes USA
  for (const service of SERVICE_SLUGS) {
    for (const stateSlug of stateSlugs) {
      const cities = getCitiesForState(stateSlug);
      for (const city of cities) {
        const meta = getCityMetadata(stateSlug, city.slug);
        if ((meta?.population ?? 0) >= PRIORITY_POPULATION) {
          urls.push(`<url><loc>${base}/${service}/${stateSlug}/${city.slug}</loc><priority>1.0</priority></url>`);
        }
      }
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ${urls.join("\n  ")}\n</urlset>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
