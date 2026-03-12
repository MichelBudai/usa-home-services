import { getCurrentSiteConfig } from "@/lib/getSiteConfig";

export const dynamic = "force-static";

export function GET() {
  const config = getCurrentSiteConfig();
  const base = config.siteUrl;
  const serviceLines = config.services
    .map((s) => `- [${s.label}](${base}/${s.slug}): Free quotes from local ${config.namePlural.toLowerCase()}`)
    .join("\n");
  const content = `# ${config.siteName}
> Free ${config.name.toLowerCase()} quotes from licensed local ${config.namePlural.toLowerCase()} across the United States. 4,000+ cities, all 50 states. No obligation, upfront pricing.
## Services
${serviceLines}
## Coverage
- [Home](${base}/): Compare local ${config.namePlural.toLowerCase()} and get started
- All 50 states; select state then city for local quotes and cost estimates
## How it works
1. Select your state and city on the site
2. View local pricing ranges and use the cost estimator
3. Call for a free quote from a licensed local ${config.name.toLowerCase()} — no obligation
`;
  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
