import Link from "next/link";

export type BreadcrumbItem = { label: string; href?: string };

const styles = {
  nav: {
    fontSize: "clamp(0.8125rem, 2vw, 0.875rem)",
    marginBottom: "1rem",
    wordBreak: "break-word" as const,
  },
  sep: {
    margin: "0 0.35rem",
    color: "#666",
  },
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" style={styles.nav}>
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span style={styles.sep}> &gt; </span>}
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
