import type { FullServiceContent } from "@/lib/fullServiceContentTypes";
import { PLUMBING_SERVICE_CONTENT } from "@/lib/plumbingServiceContent";
import { REPIPING_SERVICE_CONTENT } from "@/lib/repipingServiceContent";
import { WATER_HEATER_SERVICE_CONTENT } from "@/lib/waterHeaterServiceContent";
import { SEWER_LINE_SERVICE_CONTENT } from "@/lib/sewerLineServiceContent";
import { DRAIN_LINE_SERVICE_CONTENT } from "@/lib/drainLineServiceContent";
import { EMERGENCY_PLUMBING_SERVICE_CONTENT } from "@/lib/emergencyPlumbingServiceContent";

export const PLUMBING_FULL_CONTENT: Record<string, FullServiceContent> = {
  "plumbing-quote": PLUMBING_SERVICE_CONTENT as unknown as FullServiceContent,
  "repiping-quote": REPIPING_SERVICE_CONTENT,
  "water-heater-replacement-quote": WATER_HEATER_SERVICE_CONTENT,
  "sewer-line-replacement-quote": SEWER_LINE_SERVICE_CONTENT,
  "drain-line-replacement-quote": DRAIN_LINE_SERVICE_CONTENT,
  "emergency-plumbing-quote": EMERGENCY_PLUMBING_SERVICE_CONTENT,
};
