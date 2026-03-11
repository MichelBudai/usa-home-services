import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PhoneCallButton } from "@/components/PhoneCallButton";
import { SITE_BASE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_BASE_URL),
  title: "Free Plumbing Quotes | Licensed Local Plumbers | USA Plumber Quote",
  description:
    "Get free plumbing quotes from licensed local plumbers across the US. Compare estimates in 4,100+ cities. No obligation.",
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
          src="https://www.googletagmanager.com/gtag/js?id=G-VLTS29LH71"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VLTS29LH71');
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
