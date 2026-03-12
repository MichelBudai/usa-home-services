/**
 * Dynamic city service content — loads the right content based on current site.
 */
import { getCurrentSiteConfig } from "./getSiteConfig";
import { getServiceCityPageContent as getPestControlCityContent } from "./cityServiceContentPestControl";
import { getServiceCityPageContent as getPlumbingCityContent } from "./cityServiceContentPlumbing";

export type { ServiceCityContent } from "./cityServiceContentPestControl";

const CONTENT_BY_NICHE: Record<string, typeof getPestControlCityContent> = {
  "pest-control": getPestControlCityContent,
  "plumbing": getPlumbingCityContent,
};

export function getServiceCityPageContent(
  serviceSlug: string,
  cityName: string,
  stateName: string,
  stateAbbr: string,
  citySlug?: string,
  stateSlug?: string
) {
  const config = getCurrentSiteConfig();
  const fn = CONTENT_BY_NICHE[config.slug] ?? getPestControlCityContent;
  return fn(serviceSlug as never, cityName, stateName, stateAbbr, citySlug, stateSlug);
}
