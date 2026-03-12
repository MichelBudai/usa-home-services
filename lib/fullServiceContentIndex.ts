/**
 * Dynamic registry — loads the right content based on current site config.
 */
import type { FullServiceContent } from "./fullServiceContentTypes";
import { getCurrentSiteConfig } from "./getSiteConfig";
import { PEST_CONTROL_FULL_CONTENT } from "@/config/sites/pest-control-content";
import { PLUMBING_FULL_CONTENT } from "@/config/sites/plumbing-content";

const CONTENT_BY_NICHE: Record<string, Record<string, FullServiceContent>> = {
  "pest-control": PEST_CONTROL_FULL_CONTENT,
  "plumbing": PLUMBING_FULL_CONTENT,
};

export function getFullServiceContent(): Record<string, FullServiceContent> {
  const config = getCurrentSiteConfig();
  return CONTENT_BY_NICHE[config.slug] ?? PEST_CONTROL_FULL_CONTENT;
}

// Compatibilité — sera supprimé progressivement
export const FULL_SERVICE_CONTENT = PEST_CONTROL_FULL_CONTENT;
