import { getCurrentSiteConfig } from "./getSiteConfig";

export type ServiceSlug = string;

export function getServiceConstants() {
  const config = getCurrentSiteConfig();
  const SERVICE_SLUGS = config.services.map((s) => s.slug) as readonly string[];
  const SERVICE_LABELS = Object.fromEntries(
    config.services.map((s) => [s.slug, s.label])
  ) as Record<string, string>;
  return { SERVICE_SLUGS, SERVICE_LABELS };
}

// Re-exports pour compatibilité progressive
export { getCurrentSiteConfig };
