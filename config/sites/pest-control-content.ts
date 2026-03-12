import type { FullServiceContent } from "@/lib/fullServiceContentTypes";
import { PEST_CONTROL_SERVICE_CONTENT } from "@/lib/pestControlServiceContent";
import { TERMITE_TREATMENT_SERVICE_CONTENT } from "@/lib/termiteTreatmentServiceContent";
import { RODENT_CONTROL_SERVICE_CONTENT } from "@/lib/rodentControlServiceContent";
import { BED_BUG_TREATMENT_SERVICE_CONTENT } from "@/lib/bedBugTreatmentServiceContent";
import { MOSQUITO_CONTROL_SERVICE_CONTENT } from "@/lib/mosquitoControlServiceContent";
import { WILDLIFE_REMOVAL_SERVICE_CONTENT } from "@/lib/wildlifeRemovalServiceContent";

export const PEST_CONTROL_FULL_CONTENT: Record<string, FullServiceContent> = {
  "pest-control-quote": PEST_CONTROL_SERVICE_CONTENT as unknown as FullServiceContent,
  "termite-treatment-quote": TERMITE_TREATMENT_SERVICE_CONTENT,
  "rodent-control-quote": RODENT_CONTROL_SERVICE_CONTENT,
  "bed-bug-treatment-quote": BED_BUG_TREATMENT_SERVICE_CONTENT,
  "mosquito-control-quote": MOSQUITO_CONTROL_SERVICE_CONTENT,
  "wildlife-removal-quote": WILDLIFE_REMOVAL_SERVICE_CONTENT,
};
