import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  SERVICE_SLUGS,
  SERVICE_LABELS,
  stateSlugs,
  getStateBySlug,
  getCitiesForState,
  isValidService,
  isValidStateSlug,
  type ServiceSlug,
} from "@/lib/data";
import { getStatePageContent } from "@/lib/statePageContent";
import {
  getStateCensus,
  getStateCensusMetaSnippet,
  buildStateCensusStats,
  getClimateContent,
  getPermitContent,
  getTopCitiesForState,
} from "@/lib/censusData";
import { SITE_BASE_URL } from "@/lib/siteConfig";
import { Breadcrumb } from "@/components/Breadcrumb";
import { OtherServicesLinks } from "@/components/OtherServicesLinks";
import { CensusStatsGrid } from "@/components/CensusStatsGrid";
import styles from "./page.module.css";

export const revalidate = 2592000;

export function generateStaticParams() {
  const result: { service: string; state: string }[] = [];
  for (const service of SERVICE_SLUGS) {
    for (const state of stateSlugs) {
      result.push({ service, state });
    }
  }
  return result;
}

export async function generateMetadata({
  params,
}: {
  params: { service: string; state: string };
}): Promise<Metadata> {
  const { service, state: stateSlug } = params;
  if (!isValidService(service) || !isValidStateSlug(stateSlug))
    return { title: "Not found" };
  const stateData = getStateBySlug(stateSlug);
  const stateName = stateData?.state ?? stateSlug;
  const stateAbbr = stateData?.abbr ?? "";
  const label = SERVICE_LABELS[service as ServiceSlug];
  const content = getStatePageContent(
    service as ServiceSlug,
    label,
    stateName,
    stateAbbr,
    stateSlug
  );
  const stateCensus = getStateCensus(stateSlug);
  const censusSnippet = getStateCensusMetaSnippet(stateName, stateCensus);
  const description =
    censusSnippet.trim().length > 0
      ? censusSnippet + content.metaDescription
      : content.metaDescription;
  return {
    title: content.metaTitle,
    description,
    alternates: { canonical: `/${service}/${stateSlug}` },
  };
}

export default function StatePage({
  params,
}: {
  params: { service: string; state: string };
}) {
  const { service, state: stateSlug } = params;
  if (!isValidService(service) || !isValidStateSlug(stateSlug)) notFound();

  const stateData = getStateBySlug(stateSlug);
  const stateName = stateData?.state ?? stateSlug;
  const stateAbbr = stateData?.abbr ?? "";
  const cities = getCitiesForState(stateSlug);
  const label = SERVICE_LABELS[service as ServiceSlug];
  const content = getStatePageContent(
    service as ServiceSlug,
    label,
    stateName,
    stateAbbr,
    stateSlug
  );

  const stateCensus = getStateCensus(stateSlug);
  const stateCensusStats = buildStateCensusStats(
    stateCensus,
    stateData?.city_count
  );
  const climateContent = getClimateContent(stateSlug);
  const permitContent = getPermitContent(stateSlug);
  const topCities = getTopCitiesForState(stateSlug, 10);

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: label, item: `${SITE_BASE_URL}/${service}` },
      { "@type": "ListItem", position: 3, name: stateName },
    ],
  };
  const faqPage =
    content.faq.items.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.faq.items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: label,
    areaServed: { "@type": "State", name: stateName },
  };

  return (
    <div className={styles.wrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
      {faqPage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className={styles.breadcrumbWrap}>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label, href: `/${service}` },
            { label: stateName },
          ]}
        />
      </div>

      {/* Hero */}
      <section className={styles.hero} aria-labelledby="state-hero-title">
        <p className={styles.heroBadge}>Free quotes • {stateName}</p>
        <h1 id="state-hero-title" className={styles.heroTitle}>
          {content.heroTitle}
        </h1>
        <p className={styles.heroSub}>{content.heroSub}</p>
        <ul className={styles.trustBar} aria-label="Trust points">
          {content.trustBullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
        <Link href="#cities" className={styles.heroCta}>
          Select Your City to Get a Free Quote →
        </Link>
      </section>

      {/* Section 1 — Intro */}
      <section className={styles.section} aria-labelledby="intro-title">
        <h2 id="intro-title" className={styles.sectionTitle}>
          {content.intro.h2}
        </h2>
        {content.intro.paragraphs.map((para, i) => (
          <p key={i} className={styles.sectionIntro}>
            {para}
          </p>
        ))}
        <Link href="#cities" className={styles.inlineCta}>
          {content.intro.ctaText} →
        </Link>
      </section>

      {/* Housing & Market Overview (Census) */}
      {stateCensus && stateCensusStats.length > 0 && (
        <section className={styles.section} aria-labelledby="housing-overview-title">
          <h2 id="housing-overview-title" className={styles.sectionTitle}>
            Housing &amp; Market Overview
          </h2>
          <CensusStatsGrid stats={stateCensusStats} variant="state" />
          <p className={styles.sectionIntro} style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#6b7280" }}>
            Source: US Census Bureau, American Community Survey 5-Year Estimates.
          </p>
        </section>
      )}

      {/* How [State] Climate Affects Your Plumbing */}
      {climateContent && (
        <section className={`${styles.section} ${styles.sectionAlt}`} aria-labelledby="climate-title">
          <h2 id="climate-title" className={styles.sectionTitle}>
            How {stateName} Climate Affects Your Plumbing
          </h2>
          <p className={styles.sectionIntro}>{climateContent.plumbingNote}</p>
          {climateContent.primaryRisks.length > 0 && (
            <ul className={styles.sectionIntro} style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
              {climateContent.primaryRisks.map((risk, i) => (
                <li key={i}>{risk}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Plumbing Permits in [State] */}
      {permitContent && (
        <section className={styles.section} aria-labelledby="permits-title">
          <h2 id="permits-title" className={styles.sectionTitle}>
            Plumbing Permits in {stateName}
          </h2>
          <p className={styles.sectionIntro}>{permitContent}</p>
        </section>
      )}

      {/* Section 2 — Why get a quote */}
      <section
        className={`${styles.section} ${styles.sectionAlt}`}
        aria-labelledby="why-title"
      >
        <h2 id="why-title" className={styles.sectionTitle}>
          {content.why.h2}
        </h2>
        <div className={styles.whyBlocks}>
          {content.why.points.map((point, i) => (
            <div key={i} className={styles.whyBlock}>
              <h3 className={styles.whyH3}>{point.h3}</h3>
              <p className={styles.whyText}>{point.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 — Services */}
      <section className={styles.section} aria-labelledby="services-title">
        <h2 id="services-title" className={styles.sectionTitle}>
          {content.services.h2}
        </h2>
        <p className={styles.sectionIntro}>{content.services.intro}</p>
        <div className={styles.serviceBlocks}>
          {content.services.items.map((item) => (
            <div key={item.slug} className={styles.serviceBlock}>
              <h3 className={styles.serviceBlockH3}>{item.title}</h3>
              <p className={styles.serviceBlockDesc}>{item.description}</p>
              <p className={styles.serviceBlockCost}>
                Typical cost range: {item.costRange}
              </p>
              <Link
                href={`/${item.slug}/${stateSlug}`}
                className={styles.serviceBlockLink}
              >
                Select your {stateName} city → get a local quote
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 — City intro + grid */}
      <section
        id="cities"
        className={styles.citiesSection}
        aria-labelledby="cities-title"
      >
        <h2 id="cities-title" className={styles.sectionTitle}>
          {content.cityIntro.h2}
        </h2>
        <p className={styles.sectionIntro}>{content.cityIntro.paragraph}</p>
        {topCities.length > 0 && (
          <p className={styles.topCities}>
            Cities with highest plumbing demand in {stateName}:{" "}
            {topCities.map((c) => c.name).join(" · ")}
          </p>
        )}
        <p className={styles.sectionIntro}>
          Don&apos;t see your city? Browse the full list below — we cover all of{" "}
          {stateName}.
        </p>
        <Link href="#cities-grid" className={styles.inlineCta}>
          {content.cityIntro.ctaText} →
        </Link>
        <h3 id="cities-grid" className={styles.citiesGridTitle}>
          Select your city
        </h3>
        <div className={styles.citiesGrid}>
          {cities.map(({ slug, name }) => (
            <Link
              key={slug}
              href={`/${service}/${stateSlug}/${slug}`}
              className={styles.cityLink}
            >
              {name}
            </Link>
          ))}
        </div>
      </section>

      {/* Section 5 — FAQ */}
      <section
        className={`${styles.section} ${styles.sectionAlt}`}
        aria-labelledby="faq-title"
      >
        <h2 id="faq-title" className={styles.sectionTitle}>
          {content.faq.h2}
        </h2>
        <dl className={styles.faqList}>
          {content.faq.items.map((item, i) => (
            <div key={i} className={styles.faqItem}>
              <dt className={styles.faqQ}>{item.q}</dt>
              <dd className={styles.faqA}>{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Section 6 — Closing CTA */}
      <section className={styles.section} aria-labelledby="closing-title">
        <div className={styles.finalCta}>
          <h2 id="closing-title" className={styles.finalCtaTitle}>
            {content.closing.h2}
          </h2>
          <p className={styles.finalCtaSub}>{content.closing.text}</p>
          <Link href="#cities" className={styles.finalCtaBtn}>
            {content.closing.ctaText} →
          </Link>
        </div>
      </section>

      {/* Section 7 — Internal links */}
      <section className={styles.section} aria-labelledby="links-title">
        <h2 id="links-title" className={styles.visuallyHidden}>
          Internal links
        </h2>
        <p className={styles.internalLinksLabel}>
          {content.internalLinks.otherStatesLabel}:
        </p>
        <p className={styles.internalLinksPara}>
          <Link href={`/${service}`}>{content.internalLinks.viewAllStatesLabel}</Link>
        </p>
        <div className={styles.otherServicesWrap}>
          <OtherServicesLinks
            currentService={service as ServiceSlug}
            stateSlug={stateSlug}
            stateName={stateName}
          />
        </div>
      </section>
    </div>
  );
}
