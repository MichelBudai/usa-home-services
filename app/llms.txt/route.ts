import { NextResponse } from "next/server";
import { SITE_BASE_URL } from "@/lib/siteConfig";

const LLMS_CONTENT = `# USA Plumber Quote

> Free plumbing quotes from licensed local plumbers across the United States. Compare estimates in 4,100+ cities, all 50 states. No obligation, upfront pricing.

## Services

- [Plumbing Quote](${SITE_BASE_URL}/plumbing-quote): General plumbing, repairs, installations
- [Repiping Quote](${SITE_BASE_URL}/repiping-quote): Whole-house and partial repiping
- [Water Heater Replacement Quote](${SITE_BASE_URL}/water-heater-replacement-quote): Tank and tankless installation
- [Sewer Line Replacement Quote](${SITE_BASE_URL}/sewer-line-replacement-quote): Main line and sewer repair or replacement
- [Drain Line Replacement Quote](${SITE_BASE_URL}/drain-line-replacement-quote): Drain line repair and replacement

## Coverage

- [Home](${SITE_BASE_URL}/): Compare local plumbers and get started
- All 50 states; select state then city for local quotes and cost estimates

## How it works

1. Select your state and city on the site
2. View local pricing ranges and use the cost estimator
3. Call for a free quote from a licensed local plumber — no obligation
`;

export function GET() {
  return new NextResponse(LLMS_CONTENT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
