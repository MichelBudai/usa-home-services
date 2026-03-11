import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | USA Plumbing Quote",
  description: "Terms of use for USA Plumbing Quote.",
};

const styles = {
  wrap: { maxWidth: 720, margin: "0 auto", padding: "2rem 1rem" },
  h1: { fontSize: "1.75rem", fontWeight: 700, marginBottom: "1rem" },
  h2: { fontSize: "1.25rem", fontWeight: 600, marginTop: "1.5rem", marginBottom: "0.5rem" },
  p: { marginBottom: "1rem", lineHeight: 1.6 },
};

export default function TermsOfUsePage() {
  return (
    <article style={styles.wrap}>
      <h1 style={styles.h1}>Terms of Use</h1>
      <p style={styles.p}>Last updated: March 2025.</p>

      <h2 style={styles.h2}>1. Acceptance of Terms</h2>
      <p style={styles.p}>
        By using USA Plumbing Quote (“the Site”), you agree to these Terms of Use. If you do not agree, please do not use the Site.
      </p>

      <h2 style={styles.h2}>2. Description of Service</h2>
      <p style={styles.p}>
        The Site is a free referral and information service that helps homeowners connect with local plumbing and related service providers. We do not perform plumbing work, employ contractors, or guarantee the quality, pricing, or completion of any work performed by third parties.
      </p>

      <h2 style={styles.h2}>3. User Responsibilities</h2>
      <p style={styles.p}>
        You are responsible for your use of the Site and any information you submit. You agree to use the Site only for lawful purposes. It is your responsibility to verify that any contractor you hire is properly licensed and insured for the work being performed.
      </p>

      <h2 style={styles.h2}>4. No Professional Advice</h2>
      <p style={styles.p}>
        Content on the Site is for general information only and does not constitute professional advice. Always consult a qualified professional for your specific situation.
      </p>

      <h2 style={styles.h2}>5. Intellectual Property</h2>
      <p style={styles.p}>
        The Site and its content (including text, design, and layout) are owned by USA Plumbing Quote or its licensors. You may not copy, modify, or distribute our content without permission.
      </p>

      <h2 style={styles.h2}>6. Limitation of Liability</h2>
      <p style={styles.p}>
        To the fullest extent permitted by law, USA Plumbing Quote and its operators are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the Site or from any dealings with third-party service providers.
      </p>

      <h2 style={styles.h2}>7. Changes</h2>
      <p style={styles.p}>
        We may modify these Terms of Use at any time. Continued use of the Site after changes constitutes acceptance of the modified terms.
      </p>
    </article>
  );
}
