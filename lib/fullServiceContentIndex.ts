/**
 * Registry of full service page content for all 6 services.
 * Used by app/[service]/page.tsx for the unified rich template.
 */

import type { ServiceSlug } from "./data";
import type { FullServiceContent } from "./fullServiceContentTypes";
import { PLUMBING_SERVICE_CONTENT } from "./plumbingServiceContent";
import { REPIPING_SERVICE_CONTENT } from "./repipingServiceContent";
import { WATER_HEATER_SERVICE_CONTENT } from "./waterHeaterServiceContent";
import { SEWER_LINE_SERVICE_CONTENT } from "./sewerLineServiceContent";
import { DRAIN_LINE_SERVICE_CONTENT } from "./drainLineServiceContent";
import { EMERGENCY_PLUMBING_SERVICE_CONTENT } from "./emergencyPlumbingServiceContent";

export const FULL_SERVICE_CONTENT: Record<ServiceSlug, FullServiceContent> = {
  "plumbing-quote": PLUMBING_SERVICE_CONTENT as unknown as FullServiceContent,
  "repiping-quote": REPIPING_SERVICE_CONTENT,
  "water-heater-replacement-quote": WATER_HEATER_SERVICE_CONTENT,
  "sewer-line-replacement-quote": SEWER_LINE_SERVICE_CONTENT,
  "drain-line-replacement-quote": DRAIN_LINE_SERVICE_CONTENT,
  "emergency-plumbing-quote": EMERGENCY_PLUMBING_SERVICE_CONTENT,
};
