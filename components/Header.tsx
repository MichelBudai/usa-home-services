"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";

interface Props {
  phoneTel: string;
  ctaLabel: string;
  siteName: string;
  services: readonly { slug: string; label: string }[];
}

export function Header({ phoneTel, ctaLabel, siteName, services }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setDrawerOpen((o) => !o), []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo" aria-label={`${siteName} home`}>
          <span className="navbar-logo-icon" aria-hidden>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="navbar-logo-text">{siteName}</span>
        </Link>

        <nav className="navbar-center" aria-label="Services">
          {services.map(({ slug, label }) => (
            <Link key={slug} href={`/${slug}`} className="navbar-link">
              {label}
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
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </button>

        <a href={phoneTel} className="navbar-cta">{ctaLabel}</a>
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
          {services.map(({ slug, label }) => (
            <Link key={slug} href={`/${slug}`} className="navbar-drawer-link" onClick={closeDrawer}>
              {label}
            </Link>
          ))}
        </div>
        <div className="navbar-drawer-cta">
          <a href={phoneTel} className="navbar-cta" onClick={closeDrawer}>
            {ctaLabel}
          </a>
        </div>
      </nav>
    </header>
  );
}
