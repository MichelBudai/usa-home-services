import type { ServiceSlug } from "./data";

export interface CalculatorOption {
  label: string;
  value: string;
  min: number;
  max: number;
}

export interface CalculatorConfig {
  label: string;
  options: CalculatorOption[];
}

/** Single-select: one choice drives the range */
export interface SingleSelectConfig extends CalculatorConfig {
  kind: "single";
}

/** Multi-select: combine two dimensions */
export interface MultiSelectConfig extends CalculatorConfig {
  kind: "multi";
  secondLabel?: string;
  secondOptions?: CalculatorOption[];
  /** key: "option1_value|option2_value", value: [min, max] */
  ranges?: Record<string, [number, number]>;
}

export type CalculatorServiceConfig = SingleSelectConfig | MultiSelectConfig;

const pestControlOptions: CalculatorOption[] = [
  { label: "One-time treatment (general pests)", value: "onetime", min: 150, max: 400 },
  { label: "Annual prevention program", value: "annual", min: 400, max: 900 },
  { label: "Inspection only", value: "inspection", min: 75, max: 200 },
  { label: "Severe infestation treatment", value: "severe", min: 400, max: 1200 },
];

const termiteSizeOptions: CalculatorOption[] = [
  { label: "Under 1,500 sq ft", value: "small", min: 0, max: 0 },
  { label: "1,500 – 3,000 sq ft", value: "medium", min: 0, max: 0 },
  { label: "3,000+ sq ft", value: "large", min: 0, max: 0 },
];

const termiteMethodOptions: CalculatorOption[] = [
  { label: "Liquid barrier", value: "liquid", min: 0, max: 0 },
  { label: "Bait system", value: "bait", min: 0, max: 0 },
  { label: "Fumigation", value: "fumigation", min: 0, max: 0 },
];

const termiteRanges: Record<string, [number, number]> = {
  "small|liquid": [500, 1500],
  "small|bait": [800, 2000],
  "small|fumigation": [1200, 2500],
  "medium|liquid": [800, 2500],
  "medium|bait": [1200, 3000],
  "medium|fumigation": [2000, 4500],
  "large|liquid": [1200, 4000],
  "large|bait": [2000, 5000],
  "large|fumigation": [3500, 8000],
};

const rodentOptions: CalculatorOption[] = [
  { label: "Trapping only", value: "trapping", min: 150, max: 500 },
  { label: "Exclusion (entry point sealing)", value: "exclusion", min: 500, max: 1500 },
  { label: "Full exclusion + sanitization", value: "full", min: 1000, max: 2500 },
];

const bedBugOptions: CalculatorOption[] = [
  { label: "Chemical treatment (1–2 rooms)", value: "chemical_small", min: 300, max: 800 },
  { label: "Chemical treatment (whole home)", value: "chemical_full", min: 800, max: 2000 },
  { label: "Heat treatment (whole home)", value: "heat", min: 1500, max: 5000 },
  { label: "Hybrid (heat + chemical)", value: "hybrid", min: 1200, max: 3500 },
];

const mosquitoOptions: CalculatorOption[] = [
  { label: "Single barrier spray treatment", value: "single", min: 50, max: 150 },
  { label: "Seasonal program (6–8 treatments)", value: "seasonal", min: 300, max: 700 },
  { label: "Full season program (10+ treatments)", value: "full_season", min: 600, max: 900 },
  { label: "Automated misting system (install)", value: "misting", min: 1500, max: 5000 },
];

const wildlifeOptions: CalculatorOption[] = [
  { label: "Single animal removal", value: "single", min: 150, max: 500 },
  { label: "Removal + exclusion", value: "exclusion", min: 500, max: 1500 },
  { label: "Full exclusion + attic remediation", value: "full", min: 1000, max: 3000 },
];

export const CALCULATOR_CONFIG: Record<ServiceSlug, CalculatorServiceConfig> = {
  "pest-control-quote": {
    kind: "single",
    label: "Type of service",
    options: pestControlOptions,
  },
  "termite-treatment-quote": {
    kind: "multi",
    label: "Home size",
    options: termiteSizeOptions,
    secondLabel: "Treatment method",
    secondOptions: termiteMethodOptions,
    ranges: termiteRanges,
  },
  "rodent-control-quote": {
    kind: "single",
    label: "Scope of work",
    options: rodentOptions,
  },
  "bed-bug-treatment-quote": {
    kind: "single",
    label: "Treatment type",
    options: bedBugOptions,
  },
  "mosquito-control-quote": {
    kind: "single",
    label: "Program type",
    options: mosquitoOptions,
  },
  "wildlife-removal-quote": {
    kind: "single",
    label: "Scope of work",
    options: wildlifeOptions,
  },
};

export function getRangeForSingle(
  config: SingleSelectConfig,
  value: string
): [number, number] | null {
  const opt = config.options.find((o) => o.value === value);
  return opt ? [opt.min, opt.max] : null;
}

export function getRangeForMulti(
  config: MultiSelectConfig,
  value1: string,
  value2: string
): [number, number] | null {
  if (!config.ranges) return null;
  const key = `${value1}|${value2}`;
  return config.ranges[key] ?? null;
}
