import Link from "next/link";
import { SERVICE_SLUGS, SERVICE_LABELS, type ServiceSlug } from "@/lib/constants";
import { PHONE_TEL, CTA_CALL_LABEL } from "@/lib/siteConfig";

export function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-col footer-col-services">
          <h3 className="footer-heading">Services</h3>
          <ul className="footer-links">
            {SERVICE_SLUGS.map((slug) => (
              <li key={slug}>
                <Link href={`/${slug}`} className="footer-link">
                  {SERVICE_LABELS[slug as ServiceSlug]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col footer-col-legal">
          <h3 className="footer-heading">Legal</h3>
          <ul className="footer-links">
            <li>
              <Link href="/privacy-policy" className="footer-link">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-use" className="footer-link">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="footer-link">
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-col footer-col-cta">
          <h3 className="footer-heading">Get a quote</h3>
          <a href={PHONE_TEL} className="footer-cta">
            {CTA_CALL_LABEL}
          </a>
        </div>
      </div>
    </footer>
  );
}
