import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PhoneCallButton } from "@/components/PhoneCallButton";
import { SITE_BASE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_BASE_URL),
  title: "Free Pest Control Quotes | Licensed Local Specialists | USA Pest Control Quote",
  description:
    "Get free pest control quotes from licensed local specialists across the US. Compare estimates for termite, rodent, bed bug, mosquito & wildlife. No obligation.",
  verification: {
    google: "ckod_5zAhfgl96Eq6KAkO4vakw8GluUJ2n0GnF-YxqQ",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZCV2C6T5TW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZCV2C6T5TW');
          `}
        </Script>
        <Header />
        <main className="main-content">
          {children}
        </main>
        <Footer />
        <PhoneCallButton />
      </body>
    </html>
  );
}
