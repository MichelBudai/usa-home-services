import { pestControlConfig } from "./sites/pest-control";
import { plumbingConfig } from "./sites/plumbing";

const SITE_CONFIGS = {
  "usa-pest-control-quote.com": pestControlConfig,
  "www.usa-pest-control-quote.com": pestControlConfig,
  "usa-plumber-quote.com": plumbingConfig,
  "www.usa-plumber-quote.com": plumbingConfig,
  // localhost dev — change selon le site que tu développes
  "localhost:3000": pestControlConfig,
} as const;

type SiteConfig = typeof pestControlConfig | typeof plumbingConfig;

export function getSiteConfig(hostname: string): SiteConfig {
  return SITE_CONFIGS[hostname as keyof typeof SITE_CONFIGS] ?? pestControlConfig;
}

// Type utilitaire
export type { SiteConfig };
