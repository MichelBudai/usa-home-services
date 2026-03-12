"use client";

import { useState, useMemo } from "react";
import {
  CALCULATOR_CONFIG,
  getRangeForSingle,
  getRangeForMulti,
  type SingleSelectConfig,
  type MultiSelectConfig,
} from "@/lib/calculatorRanges";
import type { ServiceSlug } from "@/lib/data";
import { CTA_CALL_LABEL } from "@/lib/siteConfig";
import styles from "./PlumbingCostEstimator.module.css";

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
  serviceSlug: ServiceSlug;
  phoneHref?: string;
  className?: string;
};

export function PlumbingCostEstimator({
  cityName,
  serviceSlug,
  phoneHref = "tel:+10000000000",
  className = "",
}: Props) {
  const config = CALCULATOR_CONFIG[serviceSlug];

  const [value1, setValue1] = useState<string>(config.options[0].value);
  const [value2, setValue2] = useState<string>(
    config.kind === "multi" && config.secondOptions
      ? config.secondOptions[0].value
      : ""
  );

  const range = useMemo((): [number, number] | null => {
    if (config.kind === "single") {
      return getRangeForSingle(config as SingleSelectConfig, value1);
    }
    return getRangeForMulti(config as MultiSelectConfig, value1, value2);
  }, [config, value1, value2]);

  return (
    <div className={`${styles.estimator} ${className}`.trim()}>
      <div className={styles.step}>
        <h3 className={styles.stepTitle}>
          Step 1: {config.label}
        </h3>
        <select
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          className={styles.select}
          aria-label={config.label}
        >
          {config.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {config.kind === "multi" && config.secondOptions && (
        <div className={styles.step}>
          <h3 className={styles.stepTitle}>
            Step 2: {config.secondLabel}
          </h3>
          <select
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            className={styles.select}
            aria-label={config.secondLabel}
          >
            {config.secondOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className={styles.result}>
        <p className={styles.resultLabel}>
          Estimated range for {cityName}:
        </p>
        <p className={styles.resultRange}>
          {range ? `${formatMoney(range[0])} – ${formatMoney(range[1])}` : "—"}
        </p>
        <p className={styles.disclaimer}>
          This is a starting estimate. For an accurate {cityName} quote that
          accounts for your specific situation — call now. It takes less than 5
          minutes.
        </p>
        <a href={phoneHref} className={styles.cta}>
          {CTA_CALL_LABEL}
        </a>
      </div>
    </div>
  );
}
