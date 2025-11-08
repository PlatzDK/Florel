import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { Analytics } from "@/components/analytics";
import { siteConfig } from "@/lib/site-config";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: "%s | Skovkrogen 37"
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    locale: "da_DK",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Skovkrogen 37 – Sommerhus for lystfiskere"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/opengraph-image"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/opengraph-image`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      postalCode: siteConfig.address.postalCode,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      addressCountry: siteConfig.address.addressCountry
    },
    sameAs: Object.values(siteConfig.social)
  } as const;

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/?s={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  } as const;

  return (
    <html lang="da" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Spring til indhold
        </a>
        <Analytics />
        <CookieBanner />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Script id="schema-organization" type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </Script>
        <Script id="schema-website" type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </Script>
      </body>
    </html>
  );
}
