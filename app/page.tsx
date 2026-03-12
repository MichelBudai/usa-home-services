import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentSiteConfig } from "@/lib/getSiteConfig";
import { getSiteConfigValues } from "@/lib/siteConfig";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const config = getCurrentSiteConfig();
  return {
    title: `Free ${config.name} Quotes | Compare Local ${config.namePlural} USA`,
    description: `Get free ${config.name.toLowerCase()} quotes from local licensed ${config.namePlural.toLowerCase()}. Compare offers for ${config.services.map(s => s.label).join(", ")}. No obligation. 4,000+ cities nationwide.`,
    alternates: { canonical: "/" },
  };
}

export default function HomePage() {
  const config = getCurrentSiteConfig();
  const { PHONE_TEL, CTA_CALL_LABEL } = getSiteConfigValues();
  const firstService = config.services[0]?.slug ?? "/";

  return (
    <div className={styles.wrapper}>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <p className={styles.heroBadge}>Free quotes • No obligation</p>
        <h1 id="hero-title" className={styles.heroTitle}>
          Get a free {config.name.toLowerCase()} quote from <span>local {config.namePlural.toLowerCase()}</span>
        </h1>
        <p className={styles.heroSub}>
          Compare offers from licensed {config.namePlural.toLowerCase()} in your area. Choose your service and location — get free estimates in minutes.
        </p>
        <div className={styles.heroCtas}>
          <Link href={`/${firstService}`} className={styles.heroCtaPrimary}>
            Get your free quote
          </Link>
          <a href={PHONE_TEL} className={styles.heroCtaSecondary}>
            {CTA_CALL_LABEL}
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="how-title">
        <h2 id="how-title" className={styles.sectionTitle}>How it works</h2>
        <p className={styles.sectionIntro}>
          Three simple steps to get competitive {config.name.toLowerCase()} quotes from local licensed {config.namePlural.toLowerCase()}.
        </p>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNum} aria-hidden>1</div>
            <h3 className={styles.stepTitle}>Choose your service</h3>
            <p className={styles.stepText}>Select the {config.name.toLowerCase()} service you need from our list of {config.services.length} specialties.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum} aria-hidden>2</div>
            <h3 className={styles.stepTitle}>Pick your city</h3>
            <p className={styles.stepText}>Enter your state and city so we connect you with {config.namePlural.toLowerCase()} who serve your area.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum} aria-hidden>3</div>
            <h3 className={styles.stepTitle}>Get free quotes</h3>
            <p className={styles.stepText}>Receive no-obligation quotes from local {config.namePlural.toLowerCase()}. Compare pricing before you commit.</p>
          </div>
        </div>
      </section>

      {/* Services we cover */}
      <section className={styles.section} aria-labelledby="services-title">
        <h2 id="services-title" className={styles.sectionTitle}>
          {config.name} services we cover
        </h2>
        <p className={styles.sectionIntro}>
          Get free quotes for the most common {config.name.toLowerCase()} needs. Click your service to find local {config.namePlural.toLowerCase()} by city.
        </p>
        <div className={styles.servicesGrid}>
          {config.services.map(({ slug, label }) => (
            <Link key={slug} href={`/${slug}`} className={styles.serviceCard}>
              <div className={styles.serviceCardTitle}>{label}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why get a quote with us */}
      <section className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="why-title">
        <h2 id="why-title" className={styles.sectionTitle}>
          Why get your {config.name.toLowerCase()} quote here
        </h2>
        <p className={styles.sectionIntro}>
          We help homeowners compare local {config.namePlural.toLowerCase()} quickly and with no pressure.
        </p>
        <div className={styles.benefits}>
          <div className={styles.benefit}>
            <h3 className={styles.benefitTitle}>Free, no-obligation quotes</h3>
            <p className={styles.benefitText}>Request quotes at no cost. You're not committed until you choose a {config.name.toLowerCase()}.</p>
          </div>
          <div className={styles.benefit}>
            <h3 className={styles.benefitTitle}>Local licensed {config.namePlural.toLowerCase()}</h3>
            <p className={styles.benefitText}>We connect you with {config.namePlural.toLowerCase()} who serve your city and understand local conditions.</p>
          </div>
          <div className={styles.benefit}>
            <h3 className={styles.benefitTitle}>Compare and save</h3>
            <p className={styles.benefitText}>Get multiple offers so you can compare pricing and choose what works for you.</p>
          </div>
        </div>
      </section>

      {/* Nationwide coverage */}
      <section className={styles.section} aria-labelledby="coverage-title">
        <h2 id="coverage-title" className={styles.sectionTitle}>Nationwide coverage</h2>
        <p className={styles.sectionIntro}>
          We serve 4,000+ cities across all 50 states. Find {config.name.toLowerCase()} quotes whether you're in Texas, California, Florida, or anywhere else in the US.
        </p>
        <Link href={`/${firstService}`} className={styles.coverageCta}>
          Browse by state and city
        </Link>
      </section>

      {/* Final CTA */}
      <section className={styles.section} aria-labelledby="final-cta-title">
        <div className={styles.finalCta}>
          <h2 id="final-cta-title" className={styles.finalCtaTitle}>
            Ready for your free {config.name.toLowerCase()} quote?
          </h2>
          <p className={styles.finalCtaSub}>Choose a service and your location to get started.</p>
          <Link href={`/${firstService}`} className={styles.finalCtaBtn}>
            Get your free quote
          </Link>
        </div>
      </section>
    </div>
  );
}
