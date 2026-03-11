import { NICHE } from "./niche";

export const SITE_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || NICHE.siteUrl;
export const PHONE_TEL = NICHE.phoneTel;
export const PHONE_DISPLAY = NICHE.phoneDisplay;
export const CTA_CALL_LABEL = `Call Now - ${PHONE_DISPLAY}`;
