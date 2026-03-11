import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  SERVICE_SLUGS,
  SERVICE_LABELS,
  stateSlugs,
  getStateBySlug,
  getCityName,
  getCitiesForState,
  getNearbyCities,
  isValidService,
  isValidStateSlug,
  isValidCitySlug,
  type ServiceSlug,
} from "@/lib/data";
import {
  getCityCensus,
  getCityCensusMetaSnippet,
  buildCityCensusStats,
  generateCityContextByService,
} from "@/lib/censusData";
import { getPlumbingCityPageContent } from "@/lib/cityPlumbingContent";
import { getServiceCityPageContent } from "@/lib/cityServiceContent";
import { getCityMetadata } from "@/lib/cityMetadata";
import { PHONE_TEL, CTA_CALL_LABEL, SITE_BASE_URL } from "@/lib/siteConfig";
import { Breadcrumb } from "@/components/Breadcrumb";
import { OtherServicesLinks } from "@/components/OtherServicesLinks";
import styles from "./page.module.css";

const PlumbingCostEstimator = dynamic(
  () => import("@/components/PlumbingCostEstimator").then((m) => m.PlumbingCostEstimator),
  { ssr: false }
);

const CostCalculator = dynamic(
  () => import("@/components/CostCalculator").then((m) => m.CostCalculator),
  { ssr: false }
);

const CensusStatsGrid = dynamic(
  () => import("@/components/CensusStatsGrid").then((m) => m.CensusStatsGrid),
  { ssr: false }
);

const CensusCtaBanner = dynamic(
  () => import("@/components/CensusCtaBanner").then((m) => m.CensusCtaBanner),
  { ssr: false }
);

export const revalidate = 2592000;

export function generateStaticParams() {
  const result: { service: string; state: string; city: string }[] = [];
  for (const service of SERVICE_SLUGS) {
    for (const stateSlug of stateSlugs) {
      const cities = getCitiesForState(stateSlug);
      for (const { slug: citySlug } of cities) {
        result.push({ service, state: stateSlug, city: citySlug });
      }
    }
  }
  return result;
}

function getCityPageContent(
  serviceLabel: string,
  stateName: string,
  cityName: string
) {
  const serviceLower = serviceLabel.toLowerCase();
  return {
    heroTitle: `${serviceLabel} quote in ${cityName}, ${stateName}`,
    heroSub: `Get free ${serviceLower} quotes from local plumbers in ${cityName}. Compare estimates with no obligation.`,
    metaTitle: `${serviceLabel}, ${cityName} | Free Estimates, Licensed Local Plumbers`,
    metaDescription: `Free ${serviceLower} in ${cityName}, ${stateName}. Licensed local plumbers, upfront pricing, no obligation. Compare estimates.`,
    intro: `Looking for a ${serviceLower} quote in ${cityName}? Get free estimates from local plumbers. Compare quotes with no obligation.`,
    whyTitle: `Why get a quote here in ${cityName}`,
    whyPoints: [
      `Free quotes from plumbers who serve ${cityName} and the surrounding area.`,
      "Compare multiple estimates to find the best price and fit.",
      "No obligation—you choose whether to hire after receiving quotes.",
    ],
    calculatorTitle: `Estimate your ${serviceLower} cost in ${cityName}`,
    ctaTitle: `Get your free ${serviceLower} quote in ${cityName}`,
    ctaSub: "Contact local plumbers for accurate pricing.",
  };
}

function PlumbingCitySchema({
  cityName,
  stateName,
  stateSlug,
  citySlug,
  breadcrumbItems,
  faqItems,
  geo,
}: {
  cityName: string;
  stateName: string;
  stateSlug: string;
  citySlug: string;
  breadcrumbItems: { name: string; item?: string }[];
  faqItems: { q: string; a: string }[];
  geo?: { latitude: number; longitude: number } | null;
}) {
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.item && { item: item.item }),
    })),
  };
  const faqPage = {
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
    name: "Plumbing Quote",
    areaServed: {
      "@type": "City",
      name: cityName,
      containedInPlace: { "@type": "State", name: stateName },
    },
  };
  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: cityName,
    containedInPlace: { "@type": "State", name: stateName },
    ...(geo &&
      typeof geo.latitude === "number" &&
      typeof geo.longitude === "number" && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: geo.latitude,
          longitude: geo.longitude,
        },
      }),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
    </>
  );
}

function ServiceCitySchema({
  serviceLabel,
  serviceSlug,
  cityName,
  stateName,
  stateSlug,
  citySlug,
  breadcrumbItems,
  faqItems,
  geo,
}: {
  serviceLabel: string;
  serviceSlug: string;
  cityName: string;
  stateName: string;
  stateSlug: string;
  citySlug: string;
  breadcrumbItems: { name: string; item?: string }[];
  faqItems: { q: string; a: string }[];
  geo?: { latitude: number; longitude: number } | null;
}) {
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.item && { item: item.item }),
    })),
  };
  const faqPage = {
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
    name: serviceLabel,
    areaServed: {
      "@type": "City",
      name: cityName,
      containedInPlace: { "@type": "State", name: stateName },
    },
  };
  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: cityName,
    containedInPlace: { "@type": "State", name: stateName },
    ...(geo &&
      typeof geo.latitude === "number" &&
      typeof geo.longitude === "number" && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: geo.latitude,
          longitude: geo.longitude,
        },
      }),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { service: string; state: string; city: string };
}): Promise<Metadata> {
  const { service, state: stateSlug, city: citySlug } = params;
  if (
    !isValidService(service) ||
    !isValidStateSlug(stateSlug) ||
    !isValidCitySlug(stateSlug, citySlug)
  ) {
    return { title: "Not found" };
  }
  const stateData = getStateBySlug(stateSlug);
  const stateName = stateData?.state ?? stateSlug;
  const stateAbbr = stateData?.abbr ?? "";
  const cityName = getCityName(stateSlug, citySlug) ?? citySlug;
  const label = SERVICE_LABELS[service as ServiceSlug];
  const cityCensus = getCityCensus(stateSlug, citySlug);
  const censusSnippet = getCityCensusMetaSnippet(cityName, stateName, cityCensus);

  if (service === "plumbing-quote") {
    const nearby = getNearbyCities(stateSlug, citySlug, 3);
    const cityMetadata = getCityMetadata(stateSlug, citySlug);
    const content = getPlumbingCityPageContent(
      cityName,
      stateName,
      stateAbbr,
      nearby[0]?.name ?? "nearby",
      nearby[1]?.name ?? "nearby",
      nearby[2]?.name ?? "nearby",
      undefined,
      cityMetadata
    );
    const description = censusSnippet.trim() ? censusSnippet + content.meta.description : content.meta.description;
    return {
      title: content.meta.title,
      description,
      alternates: { canonical: `/${service}/${stateSlug}/${citySlug}` },
    };
  }

  const otherServices: Array<"repiping-quote" | "water-heater-replacement-quote" | "sewer-line-replacement-quote" | "drain-line-replacement-quote" | "emergency-plumbing-quote"> = [
    "repiping-quote",
    "water-heater-replacement-quote",
    "sewer-line-replacement-quote",
    "drain-line-replacement-quote",
    "emergency-plumbing-quote",
  ];
  if (otherServices.includes(service as (typeof otherServices)[number])) {
    const nearby = getNearbyCities(stateSlug, citySlug, 3);
    const cityMetadata = getCityMetadata(stateSlug, citySlug);
    const content = getServiceCityPageContent(service as (typeof otherServices)[number], {
      cityName,
      stateName,
      stateAbbr,
      nearby1: nearby[0]?.name ?? "nearby",
      nearby2: nearby[1]?.name ?? "nearby",
      nearby3: nearby[2]?.name ?? "nearby",
      cityMetadata: cityMetadata ?? undefined,
    });
    const description = censusSnippet.trim() ? censusSnippet + content.meta.description : content.meta.description;
    return {
      title: content.meta.title,
      description,
      alternates: { canonical: `/${service}/${stateSlug}/${citySlug}` },
    };
  }

  const content = getCityPageContent(label, stateName, cityName);
  const description = censusSnippet.trim() ? censusSnippet + content.metaDescription : content.metaDescription;
  return {
    title: content.metaTitle,
    description,
    alternates: { canonical: `/${service}/${stateSlug}/${citySlug}` },
  };
}

export default function CityPage({
  params,
}: {
  params: { service: string; state: string; city: string };
}) {
  const { service, state: stateSlug, city: citySlug } = params;
  if (
    !isValidService(service) ||
    !isValidStateSlug(stateSlug) ||
    !isValidCitySlug(stateSlug, citySlug)
  ) {
    notFound();
  }

  const stateData = getStateBySlug(stateSlug);
  const stateName = stateData?.state ?? stateSlug;
  const stateAbbr = stateData?.abbr ?? "";
  const cityName = getCityName(stateSlug, citySlug) ?? citySlug;
  const label = SERVICE_LABELS[service as ServiceSlug];
  const isPlumbing = service === "plumbing-quote";

  const nearby = getNearbyCities(stateSlug, citySlug, 3);
  const cityMetadata = getCityMetadata(stateSlug, citySlug);
  const plumbingContent = isPlumbing
    ? getPlumbingCityPageContent(
        cityName,
        stateName,
        stateAbbr,
        nearby[0]?.name ?? "nearby",
        nearby[1]?.name ?? "nearby",
        nearby[2]?.name ?? "nearby",
        undefined,
        cityMetadata ?? undefined
      )
    : null;

  const otherServiceSlugs = [
    "repiping-quote",
    "water-heater-replacement-quote",
    "sewer-line-replacement-quote",
    "drain-line-replacement-quote",
    "emergency-plumbing-quote",
  ] as const;
  const isOtherService = otherServiceSlugs.includes(service as (typeof otherServiceSlugs)[number]);
  const serviceCityContent =
    isOtherService && !isPlumbing
      ? getServiceCityPageContent(service as (typeof otherServiceSlugs)[number], {
          cityName,
          stateName,
          stateAbbr,
          nearby1: nearby[0]?.name ?? "nearby",
          nearby2: nearby[1]?.name ?? "nearby",
          nearby3: nearby[2]?.name ?? "nearby",
          cityMetadata: cityMetadata ?? undefined,
        })
      : null;

  const genericContent = !isPlumbing && !serviceCityContent
    ? getCityPageContent(label, stateName, cityName)
    : null;

  const cityCensus = getCityCensus(stateSlug, citySlug);
  const cityCensusStats = buildCityCensusStats(cityCensus);
  const contextSentence = generateCityContextByService(
    cityCensus,
    cityName,
    service as ServiceSlug
  );
  const placeGeo =
    cityCensus &&
    typeof cityCensus.latitude === "number" &&
    typeof cityCensus.longitude === "number"
      ? { latitude: cityCensus.latitude, longitude: cityCensus.longitude }
      : null;

  if (isPlumbing && plumbingContent) {
    return (
      <div className={styles.wrapper}>
        <PlumbingCitySchema
          cityName={cityName}
          stateName={stateName}
          stateSlug={stateSlug}
          citySlug={citySlug}
          breadcrumbItems={[
            { name: "Home", item: `${SITE_BASE_URL}/` },
            { name: "Plumbing Quote", item: `${SITE_BASE_URL}/plumbing-quote` },
            { name: stateName, item: `${SITE_BASE_URL}/plumbing-quote/${stateSlug}` },
            { name: cityName },
          ]}
          faqItems={plumbingContent.faq.items}
          geo={placeGeo}
        />
        <div className={styles.breadcrumbWrap}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Plumbing Quote", href: "/plumbing-quote" },
              { label: stateName, href: `/plumbing-quote/${stateSlug}` },
              { label: cityName },
            ]}
          />
        </div>

        {/* Hero */}
        <section className={styles.hero} aria-labelledby="city-hero-title">
          <p className={styles.heroBadge}>Free quote • {cityName}</p>
          <h1 id="city-hero-title" className={styles.heroTitle}>
            {plumbingContent.hero.h1}
          </h1>
          <p className={styles.heroSub}>{plumbingContent.hero.sub}</p>
          <ul className={styles.trustBar} aria-label="Trust points">
            {plumbingContent.hero.trustBullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
          <a href={PHONE_TEL} className={styles.heroCta}>
            {CTA_CALL_LABEL}
          </a>
        </section>

        {/* Section 1 — Intro */}
        <section className={styles.section} aria-labelledby="intro-title">
          <h2 id="intro-title" className={styles.sectionTitle}>
            {plumbingContent.intro.h2}
          </h2>
          {plumbingContent.intro.paragraphs.map((para, i) => (
            <p key={i} className={styles.sectionIntro}>
              {para}
            </p>
          ))}
          {contextSentence && (
            <p className={styles.sectionIntro}>{contextSentence}</p>
          )}
          <a href={PHONE_TEL} className={styles.heroCta}>
            {CTA_CALL_LABEL}
          </a>
        </section>

        {cityCensus && (
          <CensusCtaBanner
            census={cityCensus}
            cityName={cityName}
            phone={{ href: PHONE_TEL, label: CTA_CALL_LABEL }}
          />
        )}

        {/* Local Housing Facts (Census) */}
        {cityCensusStats.length > 0 && (
          <section className={styles.section} aria-labelledby="local-housing-title">
            <h2 id="local-housing-title" className={styles.sectionTitle}>
              Local Housing Facts
            </h2>
            <CensusStatsGrid stats={cityCensusStats} variant="city" />
            <p className={styles.sectionIntro} style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#6b7280" }}>
              Source: US Census Bureau, American Community Survey 5-Year Estimates.
            </p>
          </section>
        )}

        {/* Section 2 — Cost Estimator */}
        <section
          id="calculator"
          className={styles.calculatorSection}
          aria-labelledby="calculator-title"
        >
          <h2 id="calculator-title" className={styles.sectionTitle}>
            {plumbingContent.costEstimator.h2}
          </h2>
          <p className={styles.sectionIntro}>
            {plumbingContent.costEstimator.intro}
          </p>
          <div className={styles.calculatorWrap}>
            <PlumbingCostEstimator
              cityName={cityName}
              phoneHref={PHONE_TEL}
            />
          </div>
        </section>

        {/* Section 3 — Services */}
        <section className={styles.section} aria-labelledby="services-title">
          <h2 id="services-title" className={styles.sectionTitle}>
            {plumbingContent.services.h2}
          </h2>
          {plumbingContent.services.items.map((item) => (
            <div key={item.slug} className={styles.serviceBlock}>
              <h3 className={styles.serviceBlockH3}>{item.h3}</h3>
              <p className={styles.serviceBlockDesc}>{item.description}</p>
              {item.localParagraphs?.length ? (
                item.localParagraphs.map((para, i) => (
                  <p key={i} className={styles.serviceBlockDesc}>
                    {para}
                  </p>
                ))
              ) : null}
              <p className={styles.serviceBlockCost}>{item.cost}</p>
              <div className={styles.serviceBlockWhat}>
                What affects your {cityName} quote:
                <ul>
                  {item.whatAffects.map((affect, i) => (
                    <li key={i}>{affect}</li>
                  ))}
                </ul>
              </div>
              <a href={PHONE_TEL} className={styles.serviceBlockCta}>
                {CTA_CALL_LABEL}
              </a>
            </div>
          ))}
        </section>

        {/* Section 4 — Why Call First */}
        <section
          className={`${styles.section} ${styles.sectionAlt}`}
          aria-labelledby="why-title"
        >
          <h2 id="why-title" className={styles.sectionTitle}>
            {plumbingContent.whyCall.h2}
          </h2>
          {plumbingContent.whyCall.paragraphs.map((para, i) => (
            <p key={i} className={styles.sectionIntro}>
              {para}
            </p>
          ))}
        </section>

        {/* Section 5 — Local Signals */}
        <section className={styles.section} aria-labelledby="local-title">
          <h2 id="local-title" className={styles.sectionTitle}>
            {plumbingContent.localSignals.h2}
          </h2>
          <p className={styles.localSignalsIntro}>
            {plumbingContent.localSignals.intro}
          </p>
          <ul className={styles.localSignalsList}>
            {plumbingContent.localSignals.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </section>

        {/* Section 6 — FAQ */}
        <section
          className={`${styles.section} ${styles.sectionAlt}`}
          aria-labelledby="faq-title"
        >
          <h2 id="faq-title" className={styles.sectionTitle}>
            {plumbingContent.faq.h2}
          </h2>
          <dl className={styles.faqList}>
            {plumbingContent.faq.items.map((item, i) => (
              <div key={i} className={styles.faqItem}>
                <dt className={styles.faqQ}>{item.q}</dt>
                <dd className={styles.faqA}>{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Section 7 — Closing CTA */}
        <section className={styles.section} aria-labelledby="closing-title">
          <div className={styles.finalCta}>
            <h2 id="closing-title" className={styles.finalCtaTitle}>
              {plumbingContent.closing.h2}
            </h2>
            <p className={styles.finalCtaSub}>{plumbingContent.closing.text}</p>
            <a href={PHONE_TEL} className={styles.finalCtaBtn}>
              {CTA_CALL_LABEL}
            </a>
            <p className={styles.finalCtaSub} style={{ marginTop: "0.5rem", marginBottom: 0 }}>
              {plumbingContent.closing.sub}
            </p>
          </div>
        </section>

        {/* Section 8 — Internal Links */}
        <div className={styles.internalLinksSection}>
          <OtherServicesLinks
            currentService="plumbing-quote"
            stateSlug={stateSlug}
            citySlug={citySlug}
            stateName={stateName}
            cityName={cityName}
          />
          <p className={`${styles.internalLinksLabel} ${styles.nearbyLinks}`}>
            {plumbingContent.internalLinks.nearbyLabel}
          </p>
          <p className={styles.sectionIntro} style={{ marginBottom: "0.5rem" }}>
            {nearby.length > 0 ? (
              <>
                <Link href={`/plumbing-quote/${stateSlug}/${nearby[0].slug}`}>
                  Plumbing Quote in {nearby[0].name}, {stateAbbr}
                </Link>
                {nearby[1] && (
                  <>
                    {" · "}
                    <Link href={`/plumbing-quote/${stateSlug}/${nearby[1].slug}`}>
                      Plumbing Quote in {nearby[1].name}, {stateAbbr}
                    </Link>
                  </>
                )}
                {nearby[2] && (
                  <>
                    {" · "}
                    <Link href={`/plumbing-quote/${stateSlug}/${nearby[2].slug}`}>
                      Plumbing Quote in {nearby[2].name}, {stateAbbr}
                    </Link>
                  </>
                )}
              </>
            ) : (
              <Link href={`/plumbing-quote/${stateSlug}`}>
                All cities in {stateName}
              </Link>
            )}
          </p>
          <Link href={`/plumbing-quote/${stateSlug}`} className={styles.backLink}>
            {plumbingContent.internalLinks.backLabel}
          </Link>
        </div>
      </div>
    );
  }

  // Repiping, Water Heater, Sewer, Drain: full service-specific template
  if (serviceCityContent) {
    const c = serviceCityContent;
    return (
      <div className={styles.wrapper}>
        <ServiceCitySchema
          serviceLabel={label}
          serviceSlug={service}
          cityName={cityName}
          stateName={stateName}
          stateSlug={stateSlug}
          citySlug={citySlug}
          breadcrumbItems={[
            { name: "Home", item: `${SITE_BASE_URL}/` },
            { name: label, item: `${SITE_BASE_URL}/${service}` },
            { name: stateName, item: `${SITE_BASE_URL}/${service}/${stateSlug}` },
            { name: cityName },
          ]}
          faqItems={c.faq.items}
          geo={placeGeo}
        />
        <div className={styles.breadcrumbWrap}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label, href: `/${service}` },
              { label: stateName, href: `/${service}/${stateSlug}` },
              { label: cityName },
            ]}
          />
        </div>

        <section className={styles.hero} aria-labelledby="city-hero-title">
          <p className={styles.heroBadge}>Free quote • {cityName}</p>
          <h1 id="city-hero-title" className={styles.heroTitle}>
            {c.hero.h1}
          </h1>
          <p className={styles.heroSub}>{c.hero.sub}</p>
          <ul className={styles.trustBar} aria-label="Trust points">
            {c.hero.trustBullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
          <a href={PHONE_TEL} className={styles.heroCta}>
            {CTA_CALL_LABEL}
          </a>
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
          {contextSentence && (
            <p className={styles.sectionIntro}>{contextSentence}</p>
          )}
          <a href={PHONE_TEL} className={styles.heroCta}>
            {CTA_CALL_LABEL}
          </a>
        </section>

        {cityCensus && (
          <CensusCtaBanner
            census={cityCensus}
            cityName={cityName}
            phone={{ href: PHONE_TEL, label: CTA_CALL_LABEL }}
          />
        )}

        {cityCensusStats.length > 0 && (
          <section className={styles.section} aria-labelledby="local-housing-title">
            <h2 id="local-housing-title" className={styles.sectionTitle}>
              Local Housing Facts
            </h2>
            <CensusStatsGrid stats={cityCensusStats} variant="city" />
            <p className={styles.sectionIntro} style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#6b7280" }}>
              Source: US Census Bureau, American Community Survey 5-Year Estimates.
            </p>
          </section>
        )}

        <section
          id="calculator"
          className={styles.calculatorSection}
          aria-labelledby="calculator-title"
        >
          <h2 id="calculator-title" className={styles.sectionTitle}>
            {c.costEstimator.h2}
          </h2>
          <p className={styles.sectionIntro}>
            {c.costEstimator.intro}
          </p>
          <div className={styles.calculatorWrap}>
            <CostCalculator
              service={service as ServiceSlug}
              cityName={cityName}
              stateName={stateName}
            />
          </div>
          <a href={PHONE_TEL} className={styles.heroCta} style={{ display: "inline-block", marginTop: "1rem" }}>
            {CTA_CALL_LABEL}
          </a>
        </section>

        <section className={styles.section} aria-labelledby="main-service-title">
          <h2 id="main-service-title" className={styles.sectionTitle}>
            {c.mainService.h2}
          </h2>
          <p className={styles.serviceBlockDesc}>{c.mainService.description}</p>
          {c.mainService.localParagraphs?.length
            ? c.mainService.localParagraphs.map((para, i) => (
                <p key={i} className={styles.serviceBlockDesc}>
                  {para}
                </p>
              ))
            : null}
          <p className={styles.serviceBlockCost}>{c.mainService.cost}</p>
          <div className={styles.serviceBlockWhat}>
            What affects your {cityName} quote:
            <ul>
              {c.mainService.whatAffects.map((affect, i) => (
                <li key={i}>{affect}</li>
              ))}
            </ul>
          </div>
          <a href={PHONE_TEL} className={styles.serviceBlockCta}>
            {CTA_CALL_LABEL}
          </a>
        </section>

        <section
          className={`${styles.section} ${styles.sectionAlt}`}
          aria-labelledby="why-title"
        >
          <h2 id="why-title" className={styles.sectionTitle}>
            {c.whyCall.h2}
          </h2>
          {c.whyCall.paragraphs.map((para, i) => (
            <p key={i} className={styles.sectionIntro}>
              {para}
            </p>
          ))}
        </section>

        <section className={styles.section} aria-labelledby="local-title">
          <h2 id="local-title" className={styles.sectionTitle}>
            {c.localSignals.h2}
          </h2>
          <p className={styles.localSignalsIntro}>
            {c.localSignals.intro}
          </p>
          <ul className={styles.localSignalsList}>
            {c.localSignals.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </section>

        {c.eeat && (
          <section
            className={styles.section}
            aria-labelledby="eeat-title"
          >
            <h2 id="eeat-title" className={styles.sectionTitle}>
              {c.eeat.title}
            </h2>
            <ul className={styles.localSignalsList}>
              {c.eeat.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </section>
        )}

        <section
          className={`${styles.section} ${styles.sectionAlt}`}
          aria-labelledby="faq-title"
        >
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
            <p className={styles.finalCtaSub}>{c.closing.text}</p>
            <a href={PHONE_TEL} className={styles.finalCtaBtn}>
              {CTA_CALL_LABEL}
            </a>
            <p className={styles.finalCtaSub} style={{ marginTop: "0.5rem", marginBottom: 0 }}>
              {c.closing.sub}
            </p>
          </div>
        </section>

        <div className={styles.internalLinksSection}>
          <OtherServicesLinks
            currentService={service as ServiceSlug}
            stateSlug={stateSlug}
            citySlug={citySlug}
            stateName={stateName}
            cityName={cityName}
          />
          <p className={`${styles.internalLinksLabel} ${styles.nearbyLinks}`}>
            {c.internalLinks.nearbyLabel}
          </p>
          <p className={styles.sectionIntro} style={{ marginBottom: "0.5rem" }}>
            {nearby.length > 0 ? (
              <>
                <Link href={`/${service}/${stateSlug}/${nearby[0].slug}`}>
                  {label} in {nearby[0].name}, {stateAbbr}
                </Link>
                {nearby[1] && (
                  <>
                    {" · "}
                    <Link href={`/${service}/${stateSlug}/${nearby[1].slug}`}>
                      {label} in {nearby[1].name}, {stateAbbr}
                    </Link>
                  </>
                )}
                {nearby[2] && (
                  <>
                    {" · "}
                    <Link href={`/${service}/${stateSlug}/${nearby[2].slug}`}>
                      {label} in {nearby[2].name}, {stateAbbr}
                    </Link>
                  </>
                )}
              </>
            ) : (
              <Link href={`/${service}/${stateSlug}`}>
                All cities in {stateName}
              </Link>
            )}
          </p>
          <Link href={`/${service}/${stateSlug}`} className={styles.backLink}>
            {c.internalLinks.backLabel}
          </Link>
        </div>
      </div>
    );
  }

  // Fallback: minimal generic city page (should not hit for the 5 known services)
  const genericBreadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: label, item: `${SITE_BASE_URL}/${service}` },
      { "@type": "ListItem", position: 3, name: stateName, item: `${SITE_BASE_URL}/${service}/${stateSlug}` },
      { "@type": "ListItem", position: 4, name: cityName },
    ],
  };
  const genericServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: label,
    areaServed: {
      "@type": "City",
      name: cityName,
      containedInPlace: { "@type": "State", name: stateName },
    },
  };
  const genericPlaceSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: cityName,
    containedInPlace: { "@type": "State", name: stateName },
    ...(placeGeo &&
      typeof placeGeo.latitude === "number" &&
      typeof placeGeo.longitude === "number" && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: placeGeo.latitude,
          longitude: placeGeo.longitude,
        },
      }),
  };

  return (
    <div className={styles.wrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(genericBreadcrumbList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(genericServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(genericPlaceSchema) }}
      />
      <div className={styles.breadcrumbWrap}>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label, href: `/${service}` },
            { label: stateName, href: `/${service}/${stateSlug}` },
            { label: cityName },
          ]}
        />
      </div>

      <section className={styles.hero} aria-labelledby="city-hero-title">
        <p className={styles.heroBadge}>Free quote • {cityName}</p>
        <h1 id="city-hero-title" className={styles.heroTitle}>
          {genericContent!.heroTitle}
        </h1>
        <p className={styles.heroSub}>{genericContent!.heroSub}</p>
        <a href="#calculator" className={styles.heroCta}>
          Get your free quote
        </a>
      </section>

      <section className={styles.section} aria-labelledby="intro-title">
        <h2 id="intro-title" className={styles.sectionTitle}>
          {label} in {cityName}
        </h2>
        <p className={styles.sectionIntro}>{genericContent!.intro}</p>
        {contextSentence && (
          <p className={styles.sectionIntro}>{contextSentence}</p>
        )}
      </section>

      {cityCensus && (
        <CensusCtaBanner
          census={cityCensus}
          cityName={cityName}
          phone={{ href: PHONE_TEL, label: CTA_CALL_LABEL }}
        />
      )}

      {cityCensusStats.length > 0 && (
        <section className={styles.section} aria-labelledby="local-housing-title">
          <h2 id="local-housing-title" className={styles.sectionTitle}>
            Local Housing Facts
          </h2>
          <CensusStatsGrid stats={cityCensusStats} variant="city" />
          <p className={styles.sectionIntro} style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#6b7280" }}>
            Source: US Census Bureau, American Community Survey 5-Year Estimates.
          </p>
        </section>
      )}

      <section
        className={`${styles.section} ${styles.sectionAlt}`}
        aria-labelledby="why-title"
      >
        <h2 id="why-title" className={styles.sectionTitle}>
          {genericContent!.whyTitle}
        </h2>
        <ul className={styles.whyList}>
          {genericContent!.whyPoints.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </section>

      <section
        id="calculator"
        className={styles.calculatorSection}
        aria-labelledby="calculator-title"
      >
        <h2 id="calculator-title" className={styles.sectionTitle}>
          {genericContent!.calculatorTitle}
        </h2>
        <div className={styles.calculatorWrap}>
          <CostCalculator
            service={service as ServiceSlug}
            cityName={cityName}
            stateName={stateName}
          />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="final-cta-title">
        <div className={styles.finalCta}>
          <h2 id="final-cta-title" className={styles.finalCtaTitle}>
            {genericContent!.ctaTitle}
          </h2>
          <p className={styles.finalCtaSub}>{genericContent!.ctaSub}</p>
          <a href={PHONE_TEL} className={styles.finalCtaBtn}>
            {CTA_CALL_LABEL}
          </a>
        </div>
      </section>

      <div className={styles.otherServicesWrap}>
        <OtherServicesLinks
          currentService={service as ServiceSlug}
          stateSlug={stateSlug}
          citySlug={citySlug}
          stateName={stateName}
          cityName={cityName}
        />
      </div>

      <div className={styles.section}>
        <Link href={`/${service}/${stateSlug}`} className={styles.backLink}>
          ← All cities in {stateName}
        </Link>
      </div>
    </div>
  );
}
