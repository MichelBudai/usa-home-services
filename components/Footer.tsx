import Link from "next/link";

interface Props {
  phoneTel: string;
  ctaLabel: string;
  services: readonly { slug: string; label: string }[];
}

export function Footer({ phoneTel, ctaLabel, services }: Props) {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-col footer-col-services">
          <h3 className="footer-heading">Services</h3>
          <ul className="footer-links">
            {services.map(({ slug, label }) => (
              <li key={slug}>
                <Link href={`/${slug}`} className="footer-link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col footer-col-legal">
          <h3 className="footer-heading">Legal</h3>
          <ul className="footer-links">
            <li><Link href="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
            <li><Link href="/terms-of-use" className="footer-link">Terms of Use</Link></li>
            <li><Link href="/disclaimer" className="footer-link">Disclaimer</Link></li>
          </ul>
        </div>

        <div className="footer-col footer-col-cta">
          <h3 className="footer-heading">Get a quote</h3>
          <a href={phoneTel} className="footer-cta">
            {ctaLabel}
          </a>
        </div>
      </div>
    </footer>
  );
}
