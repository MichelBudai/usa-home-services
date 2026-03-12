import { getCurrentSiteConfig } from "./getSiteConfig";

export function getSiteConfigValues() {
  const config = getCurrentSiteConfig();
  return {
    SITE_BASE_URL: process.env.NEXT_PUBLIC_SITE_URL || config.siteUrl,
    PHONE_TEL: config.phoneTel,
    PHONE_DISPLAY: config.phoneDisplay,
    CTA_CALL_LABEL: `Call Now - ${config.phoneDisplay}`,
    GA4_ID: config.ga4Id,
    SITE_NAME: config.siteName,
  };
}

// Pour compatibilité — Server Components uniquement
export const SITE_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";
export const PHONE_TEL = "";
export const PHONE_DISPLAY = "";
export const CTA_CALL_LABEL = "";
