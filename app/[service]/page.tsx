import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  stateSlugs,
  getStateBySlug,
  isValidService,
  getServiceSlugs,
} from "@/lib/data";
import { getFullServiceContent } from "@/lib/fullServiceContentIndex";
import { getCurrentSiteConfig } from "@/lib/getSiteConfig";
import { getSiteConfigValues } from "@/lib/siteConfig";
import { Breadcrumb } from "@/components/Breadcrumb";
import styles from "./page.module.css";

export const revalidate = 2592000;

export function generateStaticParams() {
  return getServiceSlugs().map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: { service: string };
}): Promise<Metadata> {
  const { service } = params;
  if (!isValidService(service)) return { title: "Not found" };
  const content = getFullServiceContent()[service];
  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: { canonical: `/${service}` },
  };
}

function ServicePageSchema({
  serviceName,
  serviceDescription,
  faqItems,
  serviceSlug,
}: {
  serviceName: string;
  serviceDescription: string;
  faqItems: { q: string; a: string }[];
  serviceSlug: string;
}) {
  const { SITE_BASE_URL } = getSiteConfigValues();
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: serviceName, item: `${SITE_BASE_URL}/${serviceSlug}` },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: serviceDescription,
    areaServed: { "@type": "Country", name: "United States" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </>
  );
}

export default function ServicePage({
  params,
}: {
  params: { service: string };
}) {
  const { service } = params;
  if (!isValidService(service)) notFound();

  const c = getFullServiceContent()[service];

  return (
    <div className={styles.wrapper}>
      <ServicePageSchema
        serviceName={c.breadcrumb[c.breadcrumb.length - 1]?.label ?? c.meta.title}
        serviceDescription={c.meta.description}
        faqItems={c.faq.items}
        serviceSlug={service}
      />
      <div className={styles.breadcrumbWrap}>
        <Breadcrumb items={c.breadcrumb} />
      </div>

      <section className={styles.hero} aria-labelledby="service-hero-title">
        <h1 id="service-hero-title" className={styles.heroTitle}>
          {c.hero.h1}
        </h1>
        <p className={styles.heroSub}>{c.hero.sub}</p>
        <ul className={styles.trustBar} aria-label="Trust points">
          {c.hero.trustBar.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
        <Link href="#states" className={styles.heroCta}>
          {c.hero.cta} →
        </Link>
      </section>

      <section className={styles.section} aria-labelledby="intro-title">
        <h2 id="intro-title" className={styles.sectionTitle}>
          {c.intro.h2}
        </h2>
        {c.intro.paragraphs.map((para, i) => (
          <p key={i} className={styles.sectionIntro}>
            {para}
          </p>
        ))}
        <Link href="#states" className={styles.heroCta}>
          {c.intro.cta} →
        </Link>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="why-title">
        <h2 id="why-title" className={styles.sectionTitle}>
          {c.why.h2}
        </h2>
        {c.why.items.map((item, i) => (
          <div key={i} className={styles.whyBlock}>
            <h3 className={styles.whyBlockH3}>{item.h3}</h3>
            <p className={styles.whyBlockP}>{item.p}</p>
          </div>
        ))}
      </section>

      <section className={styles.section} aria-labelledby="services-title">
        <h2 id="services-title" className={styles.sectionTitle}>
          {c.services.h2}
        </h2>
        <p className={styles.sectionIntro}>{c.services.intro}</p>
        {c.services.items.map((item, i) => (
          <div key={i} className={styles.serviceBlock}>
            <h3 className={styles.serviceBlockH3}>{item.h3}</h3>
            <p className={styles.serviceBlockP}>{item.description}</p>
            <p className={styles.serviceBlockRange}>
              <strong>Typical national range:</strong> {item.range}
            </p>
            <Link href={item.href} className={styles.serviceBlockLink}>
              {item.linkLabel} →
            </Link>
          </div>
        ))}
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="state-grid-title">
        <h2 id="state-grid-title" className={styles.sectionTitle}>
          {c.stateGridIntro.h2}
        </h2>
        {c.stateGridIntro.paragraphs.map((para, i) => (
          <p key={i} className={styles.sectionIntro}>
            {para}
          </p>
        ))}
        <Link href="#states" className={styles.heroCta} style={{ display: "inline-block", marginBottom: "1rem" }}>
          {c.stateGridIntro.cta} →
        </Link>
        <div id="states" className={styles.statesGrid}>
          {stateSlugs.map((stateSlug) => {
            const stateData = getStateBySlug(stateSlug);
            const name = stateData?.state ?? stateSlug;
            return (
              <Link
                key={stateSlug}
                href={`/${service}/${stateSlug}`}
                className={styles.stateLink}
              >
                {name}
              </Link>
            );
          })}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="how-title">
        <h2 id="how-title" className={styles.sectionTitle}>
          {c.howItWorks.h2}
        </h2>
        <div className={styles.howSteps}>
          {c.howItWorks.steps.map((step, i) => (
            <div key={i} className={styles.howStep}>
              <h3 className={styles.howStepTitle}>{step.title}</h3>
              <p className={styles.howStepText}>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="faq-title">
        <h2 id="faq-title" className={styles.sectionTitle}>
          {c.faq.h2}
        </h2>
        <dl className={styles.faqList}>
          {c.faq.items.map((item, i) => (
            <div key={i} className={styles.faqItem}>
              <dt className={styles.faqQ}>{item.q}</dt>
              <dd className={styles.faqA}>{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.section} aria-labelledby="closing-title">
        <div className={styles.finalCta}>
          <h2 id="closing-title" className={styles.finalCtaTitle}>
            {c.closing.h2}
          </h2>
          {c.closing.paragraphs.map((para, i) => (
            <p key={i} className={styles.finalCtaSub} style={i > 0 ? { marginTop: "0.5rem" } : undefined}>
              {para}
            </p>
          ))}
          <Link href="#states" className={styles.finalCtaBtn}>
            {c.closing.cta} →
          </Link>
        </div>
      </section>

      <div className={styles.internalLinksSection}>
        <p className={styles.internalLinksHeading}>{c.internalLinks.heading}</p>
        <ul className={styles.internalLinksList}>
          {c.internalLinks.links.map((link, i) => (
            <li key={i}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
