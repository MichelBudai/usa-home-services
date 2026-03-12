/**
 * Shared type for full service page content (rich template).
 * Used by pest control and all other service pages.
 */

export interface FullServiceContent {
  meta: {
    title: string;
    description: string;
  };
  breadcrumb: { label: string; href?: string }[];
  hero: {
    h1: string;
    sub: string;
    trustBar: string[];
    cta: string;
  };
  intro: {
    h2: string;
    paragraphs: string[];
    cta: string;
  };
  why: {
    h2: string;
    items: { h3: string; p: string }[];
  };
  services: {
    h2: string;
    intro: string;
    items: {
      h3: string;
      description: string;
      range: string;
      linkLabel: string;
      href: string;
    }[];
  };
  stateGridIntro: {
    h2: string;
    paragraphs: string[];
    cta: string;
  };
  howItWorks: {
    h2: string;
    steps: { title: string; text: string }[];
  };
  faq: {
    h2: string;
    items: { q: string; a: string }[];
  };
  closing: {
    h2: string;
    paragraphs: string[];
    cta: string;
  };
  internalLinks: {
    heading: string;
    links: { label: string; href: string }[];
  };
}
