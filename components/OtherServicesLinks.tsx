import Link from "next/link";
import { getCurrentSiteConfig } from "@/lib/getSiteConfig";

const styles = {
  section: {
    marginTop: "1.5rem",
    padding: "1rem",
    border: "1px solid #e0e0e0",
    borderRadius: 4,
  },
  title: {
    fontSize: "0.875rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
  },
  list: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "0.5rem 1rem",
  },
};

type Props = {
  currentService: string;
  stateSlug?: string;
  citySlug?: string;
  stateName?: string;
  cityName?: string;
};

export function OtherServicesLinks({
  currentService,
  stateSlug,
  citySlug,
  stateName,
  cityName,
}: Props) {
  const config = getCurrentSiteConfig();
  const others = config.services.filter((s) => s.slug !== currentService);
  if (others.length === 0) return null;

  const title = cityName && stateSlug && citySlug
    ? `Other services in ${cityName}`
    : stateName && stateSlug
      ? `Other services in ${stateName}`
      : "Other services";

  return (
    <div style={styles.section}>
      <p style={styles.title}>{title}</p>
      <div style={styles.list}>
        {others.map(({ slug, label }) => {
          const href = stateSlug
            ? citySlug
              ? `/${slug}/${stateSlug}/${citySlug}`
              : `/${slug}/${stateSlug}`
            : `/${slug}`;
          return (
            <Link key={slug} href={href}>
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
