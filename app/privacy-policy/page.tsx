import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | USA Pest Control Quote",
  description: "Privacy policy for USA Pest Control Quote.",
};

const styles = {
  wrap: { maxWidth: 720, margin: "0 auto", padding: "2rem 1rem" },
  h1: { fontSize: "1.75rem", fontWeight: 700, marginBottom: "1rem" },
  h2: { fontSize: "1.25rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.5rem" },
  p: { marginBottom: "1rem", lineHeight: 1.6 },
};

export default function PrivacyPolicyPage() {
  return (
    <article style={styles.wrap}>
      <h1 style={styles.h1}>Privacy Policy</h1>
      <p style={styles.p}>Last updated: March 2025.</p>

      <h2 style={styles.h2}>1. Information We Collect</h2>
      <p style={styles.p}>
        When you use USA Pest Control Quote, we may collect information you provide, such as when you request a quote or contact a service provider. We may also collect usage data, including IP address, browser type, and pages visited, to improve our service.
      </p>

      <h2 style={styles.h2}>2. How We Use Your Information</h2>
      <p style={styles.p}>
        We use the information we collect to connect you with local pest control service providers, to improve our website and services, and to communicate with you when necessary. We do not sell your personal information to third parties for marketing purposes.
      </p>

      <h2 style={styles.h2}>3. Sharing of Information</h2>
      <p style={styles.p}>
        We may share your information with service providers you choose to contact through our site. We may also share information when required by law or to protect our rights and safety.
      </p>

      <h2 style={styles.h2}>4. Cookies and Similar Technologies</h2>
      <p style={styles.p}>
        We may use cookies and similar technologies to operate our website and analyze usage. You can adjust your browser settings to limit or block cookies.
      </p>

      <h2 style={styles.h2}>5. Data Security</h2>
      <p style={styles.p}>
        We take reasonable measures to protect your personal information. No transmission over the internet is fully secure; you provide information at your own risk.
      </p>

      <h2 style={styles.h2}>6. Your Rights</h2>
      <p style={styles.p}>
        Depending on your location, you may have rights to access, correct, or delete your personal information. Contact us if you wish to exercise these rights.
      </p>

      <h2 style={styles.h2}>7. Changes to This Policy</h2>
      <p style={styles.p}>
        We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised “Last updated” date.
      </p>
    </article>
  );
}
