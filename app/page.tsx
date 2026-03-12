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
  title: "Free Pest Control Quotes | Compare Local Specialists USA",
  description:
    "Get free pest control quotes from local licensed specialists. Compare offers for termite treatment, rodent control, bed bugs, mosquito control, and wildlife removal. No obligation. 4,000+ cities nationwide.",
  alternates: { canonical: "/" },
};

const SERVICE_DESCRIPTIONS: Record<ServiceSlug, string> = {
  "pest-control-quote": "General pest treatments and annual prevention programs. Get free estimates from local specialists.",
  "termite-treatment-quote": "Liquid barrier, bait systems, and fumigation. Compare termite treatment quotes in your area.",
  "rodent-control-quote": "Mouse and rat exclusion, trapping, and sanitization. Free quotes from licensed rodent specialists.",
  "bed-bug-treatment-quote": "Heat treatment, chemical, and hybrid approaches. Get local quotes for bed bug elimination.",
  "mosquito-control-quote": "Barrier spray, seasonal programs, and misting systems. Find mosquito control near you.",
  "wildlife-removal-quote": "Raccoon, squirrel, bat, and snake removal. Humane removal and exclusion quotes near you.",
};

export default function HomePage() {
  return (
    <div className={styles.wrapper}>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <p className={styles.heroBadge}>Free quotes • No obligation</p>
        <h1 id="hero-title" className={styles.heroTitle}>
          Get a free pest control quote from <span>local specialists</span>
        </h1>
        <p className={styles.heroSub}>
          Compare offers from licensed pest control specialists in your area. Choose your service and location — get free estimates in minutes.
        </p>
        <div className={styles.heroCtas}>
          <Link href="/pest-control-quote" className={styles.heroCtaPrimary}>
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
          Three simple steps to get competitive pest control quotes from local licensed specialists.
        </p>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNum} aria-hidden>1</div>
            <h3 className={styles.stepTitle}>Choose your service</h3>
            <p className={styles.stepText}>Select the pest control service you need — from general treatment to termite, rodent, bed bug, mosquito, or wildlife.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum} aria-hidden>2</div>
            <h3 className={styles.stepTitle}>Pick your city</h3>
            <p className={styles.stepText}>Enter your state and city so we connect you with specialists who serve your area and know local pest pressure.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum} aria-hidden>3</div>
            <h3 className={styles.stepTitle}>Get free quotes</h3>
            <p className={styles.stepText}>Receive no-obligation quotes from local specialists. Compare treatment methods and pricing before you commit.</p>
          </div>
        </div>
      </section>

      {/* Services we cover */}
      <section className={styles.section} aria-labelledby="services-title">
        <h2 id="services-title" className={styles.sectionTitle}>
          Pest control services we cover
        </h2>
        <p className={styles.sectionIntro}>
          Get free quotes for the most common pest control needs. Click your service to find local specialists by city.
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
          Why get your pest control quote here
        </h2>
        <p className={styles.sectionIntro}>
          We help homeowners compare local pest control specialists quickly and with no pressure.
        </p>
        <div className={styles.benefits}>
          <div className={styles.benefit}>
            <h3 className={styles.benefitTitle}>Free, no-obligation quotes</h3>
            <p className={styles.benefitText}>Request quotes at no cost. You're not committed until you choose a specialist.</p>
          </div>
          <div className={styles.benefit}>
            <h3 className={styles.benefitTitle}>Local licensed specialists</h3>
            <p className={styles.benefitText}>We connect you with specialists who serve your city and know local pest species and regulations.</p>
          </div>
          <div className={styles.benefit}>
            <h3 className={styles.benefitTitle}>Compare and save</h3>
            <p className={styles.benefitText}>Get multiple offers so you can compare treatment methods, pricing, and programs before committing.</p>
          </div>
        </div>
      </section>

      {/* Nationwide coverage */}
      <section className={styles.section} aria-labelledby="coverage-title">
        <h2 id="coverage-title" className={styles.sectionTitle}>
          Nationwide coverage
        </h2>
        <p className={styles.sectionIntro}>
          We serve 4,000+ cities across all 50 states. Find pest control quotes whether you're in Texas, California, Florida, or anywhere else in the US.
        </p>
        <Link href="/pest-control-quote" className={styles.coverageCta}>
          Browse by state and city
        </Link>
      </section>

      {/* Final CTA */}
      <section className={styles.section} aria-labelledby="final-cta-title">
        <div className={styles.finalCta}>
          <h2 id="final-cta-title" className={styles.finalCtaTitle}>
            Ready for your free pest control quote?
          </h2>
          <p className={styles.finalCtaSub}>
            Choose a service and your location to get started.
          </p>
          <Link href="/pest-control-quote" className={styles.finalCtaBtn}>
            Get your free quote
          </Link>
        </div>
      </section>
    </div>
  );
}
