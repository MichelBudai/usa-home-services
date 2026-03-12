/**
 * Dynamic state page content — loads the right content based on current site.
 */
import { getCurrentSiteConfig } from "./getSiteConfig";
import { getStatePageContent as getPestControlStatePageContent } from "./statePageContentPestControl";
import { getStatePageContent as getPlumbingStatePageContent } from "./statePageContentPlumbing";
export type { StatePageContent } from "./statePageContentPestControl";

const CONTENT_BY_NICHE: Record<string, typeof getPestControlStatePageContent> = {
  "pest-control": getPestControlStatePageContent,
  "plumbing": getPlumbingStatePageContent,
};

export function getStatePageContent(
  serviceSlug: string,
  serviceLabel: string,
  stateName: string,
  stateAbbr: string,
  stateSlug: string
) {
  const config = getCurrentSiteConfig();
  const fn = CONTENT_BY_NICHE[config.slug] ?? getPestControlStatePageContent;
  return fn(serviceSlug as never, serviceLabel, stateName, stateAbbr, stateSlug);
}
