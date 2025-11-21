import type { Metadata } from "next";
import { PricingGrid } from "@/components/pricing-grid";
import { CtaBanner } from "@/components/cta-banner";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/utils";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  return {
    title: "Priser",
    description: "Sæsonpriser for Skovkrogen 37 med mulighed for fleksible ophold og skræddersyede fiskepakker.",
    alternates: {
      canonical: localizePath(locale, "/priser")
    }
  };
}

export default function PriserPage(): JSX.Element {
  return (
    <div className="space-y-6 bg-secondary py-16">
      <PricingGrid />
      <CtaBanner />
    </div>
  );
}
