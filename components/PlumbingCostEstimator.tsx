"use client";

import { useState, useMemo } from "react";
import { getPlumbingRange, EMERGENCY_ADD } from "@/lib/plumbingEstimatorRanges";
import { CTA_CALL_LABEL } from "@/lib/siteConfig";
import styles from "./PlumbingCostEstimator.module.css";

const SERVICE_OPTIONS = [
  { value: "drain", label: "Drain Line Replacement" },
  { value: "waterheater", label: "Water Heater Replacement" },
  { value: "sewer", label: "Sewer Line Replacement" },
  { value: "repiping", label: "Repiping (whole home)" },
  { value: "minor", label: "Minor repair (leak, fixture)" },
] as const;

const SIZE_OPTIONS = [
  { value: "under1k", label: "Under 1,000 sq ft" },
  { value: "1k2k", label: "1,000 – 2,000 sq ft" },
  { value: "2k35k", label: "2,000 – 3,500 sq ft" },
  { value: "35kplus", label: "3,500+ sq ft" },
] as const;

const AGE_OPTIONS = [
  { value: "pre1970", label: "Built before 1970" },
  { value: "1970_1990", label: "1970 – 1990" },
  { value: "after1990", label: "After 1990" },
] as const;

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(n);
}

type Props = {
  cityName: string;
  phoneHref?: string;
  className?: string;
};

export function PlumbingCostEstimator({
  cityName,
  phoneHref = "tel:+15551234567",
  className = "",
}: Props) {
  const [service, setService] = useState<string>(SERVICE_OPTIONS[0].value);
  const [size, setSize] = useState<string>(SIZE_OPTIONS[0].value);
  const [age, setAge] = useState<string>(AGE_OPTIONS[0].value);
  const [emergency, setEmergency] = useState(false);

  const range = useMemo(() => {
    const [min, max] = getPlumbingRange(service, size, age);
    if (emergency) {
      return [min + EMERGENCY_ADD.min, max + EMERGENCY_ADD.max] as [number, number];
    }
    return [min, max] as [number, number];
  }, [service, size, age, emergency]);

  return (
    <div className={`${styles.estimator} ${className}`.trim()}>
      <div className={styles.step}>
        <h3 className={styles.stepTitle}>
          Step 1: What service do you need?
        </h3>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={styles.select}
          aria-label="Service type"
        >
          {SERVICE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <p className={styles.note}>
          Emergency / after-hours: add $150 – $400 to any service
        </p>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={emergency}
            onChange={(e) => setEmergency(e.target.checked)}
          />
          Add after-hours / emergency fee
        </label>
      </div>

      <div className={styles.step}>
        <h3 className={styles.stepTitle}>Step 2: Home size</h3>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className={styles.select}
          aria-label="Home size"
        >
          {SIZE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <p className={styles.hint}>
          Under 1,000 sq ft → lower end of range · 1,000 – 2,000 → mid · 2,000 –
          3,500 → mid-high · 3,500+ → upper end
        </p>
      </div>

      <div className={styles.step}>
        <h3 className={styles.stepTitle}>Step 3: Home age</h3>
        <select
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className={styles.select}
          aria-label="Home age"
        >
          {AGE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <p className={styles.hint}>
          Before 1970 → add 15–25% · 1970–1990 → standard · After 1990 →
          standard to lower end
        </p>
      </div>

      <div className={styles.result}>
        <p className={styles.resultLabel}>
          Estimated range for your {cityName} home:
        </p>
        <p className={styles.resultRange}>
          {formatMoney(range[0])} – {formatMoney(range[1])}
        </p>
        <p className={styles.disclaimer}>
          This is a starting estimate. For an accurate {cityName} quote that
          accounts for your home&apos;s specific conditions — call now. It
          takes less than 5 minutes.
        </p>
        <a href={phoneHref} className={styles.cta}>
          {CTA_CALL_LABEL}
        </a>
      </div>
    </div>
  );
}
