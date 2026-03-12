import { getSiteConfigBySlug, getSiteConfig } from "@/config";

export function getCurrentSiteConfig() {
  // En build/prod : SITE_SLUG défini par l'environnement
  if (process.env.SITE_SLUG) {
    return getSiteConfigBySlug(process.env.SITE_SLUG);
  }
  // En dev : utilise le hostname pour déterminer le site
  // (localhost:3000 → config/index.ts fallback)
  if (typeof window !== "undefined") {
    return getSiteConfig(window.location.host);
  }
  // SSR dev : fallback config/index.ts via localhost
  return getSiteConfig("localhost:3000");
}
