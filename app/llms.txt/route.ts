import { NextResponse } from "next/server";
import { SITE_BASE_URL } from "@/lib/siteConfig";

const LLMS_CONTENT = `# USA Pest Control Quote

> Free pest control quotes from licensed local specialists across the United States. Compare estimates for termite, rodent, bed bug, mosquito, and wildlife services. 4,000+ cities, all 50 states. No obligation, upfront pricing.

## Services

- [Pest Control Quote](${SITE_BASE_URL}/pest-control-quote): General pest treatments and annual prevention programs
- [Termite Treatment Quote](${SITE_BASE_URL}/termite-treatment-quote): Liquid barrier, bait systems, and fumigation
- [Rodent Control Quote](${SITE_BASE_URL}/rodent-control-quote): Exclusion, trapping, and attic sanitization
- [Bed Bug Treatment Quote](${SITE_BASE_URL}/bed-bug-treatment-quote): Heat treatment, chemical, and hybrid approaches
- [Mosquito Control Quote](${SITE_BASE_URL}/mosquito-control-quote): Barrier spray, seasonal programs, and misting systems
- [Wildlife Removal Quote](${SITE_BASE_URL}/wildlife-removal-quote): Raccoon, squirrel, bat, snake, and opossum removal

## Coverage

- [Home](${SITE_BASE_URL}/): Compare local pest control specialists and get started
- All 50 states; select state then city for local quotes and cost estimates

## How it works

1. Select your state and city on the site
2. View local pricing ranges and use the cost estimator
3. Call for a free quote from a licensed local specialist — no obligation
`;

export function GET() {
  return new NextResponse(LLMS_CONTENT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
