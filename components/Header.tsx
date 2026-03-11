"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { SERVICE_SLUGS, type ServiceSlug } from "@/lib/constants";
import { PHONE_TEL, CTA_CALL_LABEL } from "@/lib/siteConfig";

const NAV_LABELS: Record<ServiceSlug, string> = {
  "plumbing-quote": "Plumbing",
  "repiping-quote": "Repiping",
  "water-heater-replacement-quote": "Water Heater",
  "sewer-line-replacement-quote": "Sewer Line",
  "drain-line-replacement-quote": "Drain Line",
  "emergency-plumbing-quote": "Emergency",
};

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setDrawerOpen((o) => !o), []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo" aria-label="USA Plumbing Quote home">
          <span className="navbar-logo-icon" aria-hidden>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 14h4l2 6 2-6h4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="8" r="1.5" fill="currentColor" />
            </svg>
          </span>
          <span className="navbar-logo-text">USA Plumbing Quote</span>
        </Link>

        <nav className="navbar-center" aria-label="Services">
          {SERVICE_SLUGS.map((slug) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="navbar-link"
            >
              {NAV_LABELS[slug as ServiceSlug]}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="navbar-toggle"
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={drawerOpen}
          onClick={toggleDrawer}
        >
          <svg className="navbar-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            {drawerOpen ? (
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <>
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
              </>
            )}
          </svg>
        </button>

        <a href={PHONE_TEL} className="navbar-cta">
          {CTA_CALL_LABEL}
        </a>
      </div>

      <div
        className={`navbar-backdrop ${drawerOpen ? "is-open" : ""}`}
        aria-hidden="true"
        onClick={closeDrawer}
      />

      <nav
        className={`navbar-drawer ${drawerOpen ? "is-open" : ""}`}
        aria-label="Services menu"
        aria-hidden={!drawerOpen}
      >
        <p className="navbar-drawer-title">Services</p>
        <div className="navbar-drawer-links">
          {SERVICE_SLUGS.map((slug) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="navbar-drawer-link"
              onClick={closeDrawer}
            >
              {NAV_LABELS[slug as ServiceSlug]}
            </Link>
          ))}
        </div>
        <div className="navbar-drawer-cta">
          <a href={PHONE_TEL} className="navbar-cta" onClick={closeDrawer}>
            {CTA_CALL_LABEL}
          </a>
        </div>
      </nav>
    </header>
  );
}
