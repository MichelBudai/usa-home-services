import type { Metadata } from "next";
import Link from "next/link";
import {
  SERVICE_SLUGS,
  SERVICE_LABELS,
  type ServiceSlug,
} from "@/lib/data";
import { PHONE_TEL, CTA_CALL_LABEL } from "@/lib/siteConfig";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Free Plumbing Quotes | Compare Local Plumbers USA",
  description:
    "Get free plumbing quotes from local licensed plumbers. Compare offers for repairs, repiping, water heater replacement, and more. No obligation. 4,000+ cities nationwide.",
  alternates: { canonical: "/" },
};

const SERVICE_DESCRIPTIONS: Record<ServiceSlug, string> = {
  "plumbing-quote": "Repairs, installations, and general plumbing. Get free estimates from local plumbers.",
  "repiping-quote": "Whole-house or partial repiping. Compare quotes for pipe replacement in your area.",
  "water-heater-replacement-quote": "Tank or tankless water heater replacement. Free quotes from qualified installers.",
  "sewer-line-replacement-quote": "Sewer line repair and replacement. Get local quotes for sewer services.",
  "drain-line-replacement-quote": "Drain line repair and replacement. Find trusted plumbers near you.",
  "emergency-plumbing-quote": "Emergency and after-hours plumbing. Get same-day quotes from local plumbers.",
};

export default function HomePage() {
  return (
    <div className={styles.wrapper}>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <p className={styles.heroBadge}>Free quotes • No obligation</p>
        <h1 id="hero-title" className={styles.heroTitle}>
          Get a free plumbing quote from <span>local plumbers</span>
        </h1>
        <p className={styles.heroSub}>
          Compare offers from licensed plumbers in your area. Choose your service and location—get free estimates in minutes.
        </p>
        <div className={styles.heroCtas}>
          <Link href="/plumbing-quote" className={styles.heroCtaPrimary}>
            Get your free quote
          </Link>
          <a href={PHONE_TEL} className={styles.heroCtaSecondary}>
            {CTA_CALL_LABEL}
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="how-title">
        <h2 id="how-title" className={styles.sectionTitle}>
          How it works
        </h2>
        <p className={styles.sectionIntro}>
          Three simple steps to get competitive plumbing quotes from local professionals.
        </p>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNum} aria-hidden>1</div>
            <h3 className={styles.stepTitle}>Choose your service</h3>
            <p className={styles.stepText}>Select the plumbing service you need—from general repairs to repiping or water heater replacement.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum} aria-hidden>2</div>
            <h3 className={styles.stepTitle}>Pick your city</h3>
            <p className={styles.stepText}>Enter your state and city so we connect you with plumbers who serve your area.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum} aria-hidden>3</div>
            <h3 className={styles.stepTitle}>Get free quotes</h3>
            <p className={styles.stepText}>Receive no-obligation quotes from local plumbers. Compare and choose the best option.</p>
          </div>
        </div>
      </section>

      {/* Services we cover */}
      <section className={styles.section} aria-labelledby="services-title">
        <h2 id="services-title" className={styles.sectionTitle}>
          Plumbing services we cover
        </h2>
        <p className={styles.sectionIntro}>
          Get free quotes for the most common plumbing needs. Click your service to find local plumbers by city.
        </p>
        <div className={styles.servicesGrid}>
          {SERVICE_SLUGS.map((slug) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className={styles.serviceCard}
            >
              <div className={styles.serviceCardTitle}>
                {SERVICE_LABELS[slug as ServiceSlug]}
              </div>
              <p className={styles.serviceCardDesc}>
                {SERVICE_DESCRIPTIONS[slug as ServiceSlug]}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why get a quote with us */}
      <section className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="why-title">
        <h2 id="why-title" className={styles.sectionTitle}>
          Why get your plumbing quote here
        </h2>
        <p className={styles.sectionIntro}>
          We help homeowners compare local plumbers quickly and with no pressure.
        </p>
        <div className={styles.benefits}>
          <div className={styles.benefit}>
            <h3 className={styles.benefitTitle}>Free, no-obligation quotes</h3>
            <p className={styles.benefitText}>Request quotes at no cost. You’re not committed until you choose a plumber.</p>
          </div>
          <div className={styles.benefit}>
            <h3 className={styles.benefitTitle}>Local licensed plumbers</h3>
            <p className={styles.benefitText}>We connect you with plumbers who serve your city and understand local codes.</p>
          </div>
          <div className={styles.benefit}>
            <h3 className={styles.benefitTitle}>Compare and save</h3>
            <p className={styles.benefitText}>Get multiple offers so you can compare pricing and choose what works for you.</p>
          </div>
        </div>
      </section>

      {/* Nationwide coverage */}
      <section className={styles.section} aria-labelledby="coverage-title">
        <h2 id="coverage-title" className={styles.sectionTitle}>
          Nationwide coverage
        </h2>
        <p className={styles.sectionIntro}>
          We serve 4,000+ cities across all 50 states. Find plumbing quotes whether you’re in Texas, California, Florida, or anywhere else in the US.
        </p>
        <Link href="/plumbing-quote" className={styles.coverageCta}>
          Browse by state and city
        </Link>
      </section>

      {/* Final CTA */}
      <section className={styles.section} aria-labelledby="final-cta-title">
        <div className={styles.finalCta}>
          <h2 id="final-cta-title" className={styles.finalCtaTitle}>
            Ready for your free plumbing quote?
          </h2>
          <p className={styles.finalCtaSub}>
            Choose a service and your location to get started.
          </p>
          <Link href="/plumbing-quote" className={styles.finalCtaBtn}>
            Get your free quote
          </Link>
        </div>
      </section>
    </div>
  );
}
