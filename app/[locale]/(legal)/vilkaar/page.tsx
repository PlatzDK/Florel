import type { Metadata } from "next";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/utils";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  return {
    title: "Lejebetingelser",
    description: "Læs vilkår for leje af Skovkrogen 37.",
    alternates: {
      canonical: localizePath(locale, "/vilkaar")
    }
  };
}

export default function VilkaarPage(): JSX.Element {
  return (
    <div className="bg-secondary py-16">
      <div className="container-responsive space-y-6">
        <h1 className="section-title">Lejebetingelser</h1>
        <p className="text-sm text-primary/80">
          Her finder du vores standardvilkår for leje af Skovkrogen 37. Kontakt os gerne for spørgsmål eller særlige aftaler.
        </p>
        <ul className="list-disc space-y-2 pl-6 text-sm text-primary/80">
          <li>Depositum på 1.500 kr. betales ved bekræftelse af booking.</li>
          <li>Slutrengøring er inkluderet i prisen – vi forventer, at huset efterlades ryddeligt.</li>
          <li>Afbestilling senest 30 dage før ankomst refunderes fuldt ud.</li>
        </ul>
      </div>
    </div>
  );
}
