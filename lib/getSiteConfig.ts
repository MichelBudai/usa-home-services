import { getSiteConfigBySlug } from "@/config";

export function getCurrentSiteConfig() {
  const slug = process.env.SITE_SLUG ?? "pest-control";
  return getSiteConfigBySlug(slug);
}
