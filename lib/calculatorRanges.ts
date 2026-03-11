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

/** Multi-select: combine two dimensions (e.g. size + material) */
export interface MultiSelectConfig extends CalculatorConfig {
  kind: "multi";
  secondLabel?: string;
  secondOptions?: CalculatorOption[];
  /** key: "option1_value|option2_value", value: [min, max] */
  ranges?: Record<string, [number, number]>;
}

export type CalculatorServiceConfig = SingleSelectConfig | MultiSelectConfig;

const plumbingOptions: CalculatorOption[] = [
  { label: "Minor repair (leak, fixture)", value: "minor", min: 150, max: 500 },
  { label: "Medium job (multiple fixtures)", value: "medium", min: 400, max: 1200 },
  { label: "Major repair or installation", value: "major", min: 1000, max: 3500 },
  { label: "New installation (e.g. bathroom)", value: "installation", min: 500, max: 2500 },
  { label: "Emergency / after-hours", value: "emergency", min: 200, max: 600 },
];

const repipingSizeOptions: CalculatorOption[] = [
  { label: "1–2 bedrooms", value: "small", min: 2000, max: 5000 },
  { label: "3–4 bedrooms", value: "medium", min: 4000, max: 8000 },
  { label: "5+ bedrooms / large home", value: "large", min: 6000, max: 12000 },
];

const repipingMaterialOptions: CalculatorOption[] = [
  { label: "PEX", value: "pex", min: 0, max: 0 },
  { label: "Copper", value: "copper", min: 0, max: 0 },
];

const repipingRanges: Record<string, [number, number]> = {
  "small|pex": [2000, 5000],
  "small|copper": [4000, 9000],
  "medium|pex": [4000, 8000],
  "medium|copper": [7000, 14000],
  "large|pex": [6000, 12000],
  "large|copper": [10000, 20000],
};

const waterHeaterOptions: CalculatorOption[] = [
  { label: "Tank 40 gal", value: "tank40", min: 800, max: 1500 },
  { label: "Tank 50 gal", value: "tank50", min: 1000, max: 2000 },
  { label: "Tank 75+ gal", value: "tank75", min: 1200, max: 2800 },
  { label: "Tankless", value: "tankless", min: 1500, max: 3500 },
];

const sewerOptions: CalculatorOption[] = [
  { label: "Repair (lining or spot repair)", value: "repair", min: 2500, max: 7000 },
  { label: "Full replacement", value: "replace", min: 5000, max: 15000 },
];

const drainOptions: CalculatorOption[] = [
  { label: "Cleanout / clearing", value: "cleanout", min: 150, max: 450 },
  { label: "Repair (section)", value: "repair", min: 500, max: 2500 },
  { label: "Full replacement", value: "replace", min: 1000, max: 6000 },
];

const emergencyPlumbingOptions: CalculatorOption[] = [
  { label: "Minor emergency (leak, clog)", value: "minor", min: 200, max: 600 },
  { label: "Major (sewer backup, no water)", value: "major", min: 500, max: 2000 },
  { label: "After-hours / night or weekend", value: "afterhours", min: 350, max: 800 },
  { label: "Holiday or extended after-hours", value: "holiday", min: 400, max: 1000 },
];

export const CALCULATOR_CONFIG: Record<ServiceSlug, CalculatorServiceConfig> = {
  "plumbing-quote": {
    kind: "single",
    label: "Type of job",
    options: plumbingOptions,
  },
  "repiping-quote": {
    kind: "multi",
    label: "Home size",
    options: repipingSizeOptions,
    secondLabel: "Pipe material",
    secondOptions: repipingMaterialOptions,
    ranges: repipingRanges,
  },
  "water-heater-replacement-quote": {
    kind: "single",
    label: "Water heater type",
    options: waterHeaterOptions,
  },
  "sewer-line-replacement-quote": {
    kind: "single",
    label: "Scope of work",
    options: sewerOptions,
  },
  "drain-line-replacement-quote": {
    kind: "single",
    label: "Scope of work",
    options: drainOptions,
  },
  "emergency-plumbing-quote": {
    kind: "single",
    label: "Type of emergency",
    options: emergencyPlumbingOptions,
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
