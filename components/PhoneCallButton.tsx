"use client";

import { PHONE_TEL, CTA_CALL_LABEL } from "@/lib/siteConfig";

const styles = {
  wrapper: {
    position: "fixed" as const,
    bottom: "max(1rem, env(safe-area-inset-bottom))",
    right: "max(1rem, env(safe-area-inset-right))",
    zIndex: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    minWidth: 48,
    minHeight: 48,
    borderRadius: "50%",
    backgroundColor: "#fff",
    boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
  },
  link: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    minWidth: 48,
    minHeight: 48,
    borderRadius: "50%",
    backgroundColor: "#1a1a1a",
    color: "#fafafa",
    textDecoration: "none",
  },
  svg: {
    width: 24,
    height: 24,
  },
};

export function PhoneCallButton() {
  return (
    <div style={styles.wrapper}>
      <a
        href={PHONE_TEL}
        style={styles.link}
        aria-label={CTA_CALL_LABEL}
        className="phone-cta-button"
      >
        <svg
          style={styles.svg}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
    </div>
  );
}
