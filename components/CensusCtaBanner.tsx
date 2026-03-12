"use client";

import type { CityCensus } from "@/lib/censusData";

const SENTINEL = -666666666;

function isValidNum(n: number | undefined): n is number {
  return typeof n === "number" && n !== SENTINEL && !Number.isNaN(n);
}

interface CensusCtaBannerProps {
  census: CityCensus | null;
  cityName: string;
  phone: { href: string; label: string };
  namePlural?: string;
}

export function CensusCtaBanner({ census, cityName, phone, namePlural = "specialists" }: CensusCtaBannerProps) {
  if (!census) return null;

  const year = census.median_year_built;
  const ownership = census.homeownership_rate_pct;
  const homeValue = census.median_home_value;
  const yearDisplay =
    typeof year === "number" && year !== SENTINEL
      ? census.display?.median_year_built ?? String(year)
      : null;
  const valueDisplay =
    typeof homeValue === "number" && homeValue !== SENTINEL
      ? census.display?.median_home_value ?? `$${homeValue.toLocaleString()}`
      : null;

  let message = "";
  if (isValidNum(year) && year < 1985) {
    message = `Homes in ${cityName} were built ${yearDisplay ?? year} on average — older homes need attention. Get a free inspection quote from local ${namePlural.toLowerCase()}.`;
  } else if (isValidNum(ownership) && ownership > 65) {
    message = `High homeownership in ${cityName} means protecting your home matters — get a free quote from local ${namePlural.toLowerCase()}.`;
  } else if (valueDisplay) {
    message = `Median home value in ${cityName} is ${valueDisplay} — protect your investment with a free quote from local ${namePlural.toLowerCase()}.`;
  }

  if (!message) return null;

  return (
    <div
      className="census-cta-banner"
      style={{
        marginTop: "1.5rem",
        padding: "1.25rem",
        borderRadius: "8px",
        backgroundColor: "var(--cta-bg, #eff6ff)",
        border: "1px solid var(--cta-border, #bfdbfe)",
      }}
    >
      <p style={{ margin: "0 0 1rem", fontSize: "1rem", lineHeight: 1.5 }}>
        {message}
      </p>
      <a
        href={phone.href}
        className="census-cta-phone"
        style={{
          display: "inline-block",
          fontWeight: 600,
          fontSize: "1.125rem",
          color: "var(--link-color, #1d4ed8)",
        }}
      >
        {phone.label}
      </a>
    </div>
  );
}
