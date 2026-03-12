export type { CalculatorServiceConfig } from "./calculatorRangesPestControl";
export type {
  CalculatorOption,
  SingleSelectConfig,
  MultiSelectConfig,
} from "./calculatorRangesPestControl";
export { getRangeForSingle, getRangeForMulti } from "./calculatorRangesPestControl";
export { CALCULATOR_CONFIG as PEST_CONTROL_CALCULATOR } from "./calculatorRangesPestControl";
export { CALCULATOR_CONFIG as PLUMBING_CALCULATOR } from "./calculatorRangesPlumbing";

import type { CalculatorServiceConfig } from "./calculatorRangesPestControl";
import { CALCULATOR_CONFIG as PEST_CONTROL_CALCULATOR } from "./calculatorRangesPestControl";
import { CALCULATOR_CONFIG as PLUMBING_CALCULATOR } from "./calculatorRangesPlumbing";

const CALCULATOR_BY_NICHE: Record<string, Record<string, CalculatorServiceConfig>> = {
  "pest-control": PEST_CONTROL_CALCULATOR,
  "plumbing": PLUMBING_CALCULATOR,
};

export function getCalculatorConfig(nicheSlug: string): Record<string, CalculatorServiceConfig> {
  return CALCULATOR_BY_NICHE[nicheSlug] ?? PEST_CONTROL_CALCULATOR;
}

// Compatibilité
export const CALCULATOR_CONFIG = PEST_CONTROL_CALCULATOR;
