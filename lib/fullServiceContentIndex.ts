/**
 * Registry of full service page content for all 6 services.
 * Used by app/[service]/page.tsx for the unified rich template.
 */

import type { ServiceSlug } from "./data";
import type { FullServiceContent } from "./fullServiceContentTypes";
import { PEST_CONTROL_SERVICE_CONTENT } from "./pestControlServiceContent";
import { TERMITE_TREATMENT_SERVICE_CONTENT } from "./termiteTreatmentServiceContent";
import { RODENT_CONTROL_SERVICE_CONTENT } from "./rodentControlServiceContent";
import { BED_BUG_TREATMENT_SERVICE_CONTENT } from "./bedBugTreatmentServiceContent";
import { MOSQUITO_CONTROL_SERVICE_CONTENT } from "./mosquitoControlServiceContent";
import { WILDLIFE_REMOVAL_SERVICE_CONTENT } from "./wildlifeRemovalServiceContent";

export const FULL_SERVICE_CONTENT: Record<ServiceSlug, FullServiceContent> = {
  "pest-control-quote": PEST_CONTROL_SERVICE_CONTENT as unknown as FullServiceContent,
  "termite-treatment-quote": TERMITE_TREATMENT_SERVICE_CONTENT,
  "rodent-control-quote": RODENT_CONTROL_SERVICE_CONTENT,
  "bed-bug-treatment-quote": BED_BUG_TREATMENT_SERVICE_CONTENT,
  "mosquito-control-quote": MOSQUITO_CONTROL_SERVICE_CONTENT,
  "wildlife-removal-quote": WILDLIFE_REMOVAL_SERVICE_CONTENT,
};
