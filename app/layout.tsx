import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { Analytics } from "@/components/analytics";
import { siteConfig } from "@/lib/site-config";
import Script from "next/script";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins", display: "swap" });

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale: Locale = isLocale(params?.locale) ? params.locale : defaultLocale;
  const dictionary = getDictionary(locale);
  const ogLocale = locale === "da" ? "da_DK" : "en_US";

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s | ${dictionary.common.brand}`
    },
    description: dictionary.common.siteDescription,
    openGraph: {
      title: siteConfig.name,
      description: dictionary.common.siteDescription,
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.shortName,
      locale: ogLocale,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: dictionary.common.ogAlt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: dictionary.common.siteDescription,
      images: ["/opengraph-image"]
    }
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}): Promise<JSX.Element> {
  const locale: Locale = isLocale(params?.locale) ? params.locale : defaultLocale;
  const dictionary = getDictionary(locale);

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
    <html lang={locale} className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          {dictionary.common.skipLink}
        </a>
        <Analytics />
        <CookieBanner />
        <Header locale={locale} dictionary={dictionary.common} />
        <main id="main">{children}</main>
        <Footer dictionary={dictionary.common} locale={locale} />
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
