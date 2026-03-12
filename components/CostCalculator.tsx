"use client";

import { useState, useMemo } from "react";
import {
  getRangeForSingle,
  getRangeForMulti,
  type CalculatorServiceConfig,
  type SingleSelectConfig,
  type MultiSelectConfig,
} from "@/lib/calculatorRanges";
import calcStyles from "./CostCalculator.module.css";

function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(n);
}

type Props = {
  service: string;
  cityName: string;
  stateName?: string;
  calculatorConfig: CalculatorServiceConfig;
  className?: string;
};

export function CostCalculator({ service, cityName, stateName, calculatorConfig, className = "" }: Props) {
  const config = calculatorConfig;
  const [singleValue, setSingleValue] = useState<string>(
    config.kind === "single" ? config.options[0]?.value ?? "" : ""
  );
  const [multiValue1, setMultiValue1] = useState<string>(
    config.kind === "multi" ? config.options[0]?.value ?? "" : ""
  );
  const [multiValue2, setMultiValue2] = useState<string>(
    config.kind === "multi" && config.secondOptions?.length
      ? config.secondOptions[0].value
      : ""
  );

  const range = useMemo((): [number, number] | null => {
    if (config.kind === "single") {
      return getRangeForSingle(config as SingleSelectConfig, singleValue);
    }
    const multi = config as MultiSelectConfig;
    return getRangeForMulti(multi, multiValue1, multiValue2);
  }, [config, singleValue, multiValue1, multiValue2]);

  const locationLabel = stateName ? `${cityName}, ${stateName}` : cityName;

  return (
    <div className={`${calcStyles.wrapper} ${className}`.trim()} data-cost-calculator>
      <div className={calcStyles.inner}>
        {config.kind === "single" && (
          <div className={calcStyles.field}>
            <label htmlFor="calc-single">{config.label}</label>
            <select
              id="calc-single"
              value={singleValue}
              onChange={(e) => setSingleValue(e.target.value)}
              className={calcStyles.select}
            >
              {config.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {config.kind === "multi" && (
          <>
            <div className={calcStyles.field}>
              <label htmlFor="calc-multi1">{config.label}</label>
              <select
                id="calc-multi1"
                value={multiValue1}
                onChange={(e) => setMultiValue1(e.target.value)}
                className={calcStyles.select}
              >
                {config.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            {config.secondLabel && config.secondOptions && (
              <div className={calcStyles.field}>
                <label htmlFor="calc-multi2">{config.secondLabel}</label>
                <select
                  id="calc-multi2"
                  value={multiValue2}
                  onChange={(e) => setMultiValue2(e.target.value)}
                  className={calcStyles.select}
                >
                  {config.secondOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}

        {range && (
          <div className={calcStyles.result}>
            <p className={calcStyles.resultLabel}>Estimated range</p>
            <p className={calcStyles.resultRange}>
              {formatMoney(range[0])} – {formatMoney(range[1])}
            </p>
            <p className={calcStyles.disclaimer}>
              This is an estimate. Get free quotes from local pest control specialists in {locationLabel} for accurate pricing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
