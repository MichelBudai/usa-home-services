import { pestControlConfig } from "./sites/pest-control";
import { plumbingConfig } from "./sites/plumbing";

const SITE_CONFIGS_BY_SLUG = {
  "pest-control": pestControlConfig,
  "plumbing": plumbingConfig,
} as const;

const SITE_CONFIGS_BY_HOST: Record<string, typeof pestControlConfig | typeof plumbingConfig> = {
  "usa-pest-control-quote.com": pestControlConfig,
  "www.usa-pest-control-quote.com": pestControlConfig,
  "usa-plumber-quote.com": plumbingConfig,
  "www.usa-plumber-quote.com": plumbingConfig,
  "localhost:3000": pestControlConfig,
};

export type SiteConfig = typeof pestControlConfig | typeof plumbingConfig;

export function getSiteConfig(hostname: string): SiteConfig {
  return SITE_CONFIGS_BY_HOST[hostname] ?? pestControlConfig;
}

export function getSiteConfigBySlug(slug: string): SiteConfig {
  return SITE_CONFIGS_BY_SLUG[slug as keyof typeof SITE_CONFIGS_BY_SLUG] ?? pestControlConfig;
}
