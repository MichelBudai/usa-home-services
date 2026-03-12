/**
 * Dynamic city service content — loads the right content based on current site.
 */
import { getCurrentSiteConfig } from "./getSiteConfig";
import { getServiceCityPageContent as getPestControlCityContent } from "./cityServiceContentPestControl";
import { getServiceCityPageContent as getPlumbingCityContent } from "./cityServiceContentPlumbing";

export type { ServiceCityContent } from "./cityServiceContentPestControl";
export type { ServiceContentParams } from "./cityServiceContentPestControl";

const CONTENT_BY_NICHE: Record<string, Function> = {
  "pest-control": getPestControlCityContent,
  "plumbing": getPlumbingCityContent,
};

export function getServiceCityPageContent(service: string, params: Record<string, unknown>) {
  const config = getCurrentSiteConfig();
  const fn = CONTENT_BY_NICHE[config.slug] ?? getPestControlCityContent;
  return fn(service, params);
}
