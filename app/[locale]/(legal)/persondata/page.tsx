import type { Metadata } from "next";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/utils";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  return {
    title: "Persondatapolitik",
    description: "Læs hvordan Skovkrogen 37 behandler personoplysninger.",
    alternates: {
      canonical: localizePath(locale, "/persondata")
    }
  };
}

export default function PersondataPage(): JSX.Element {
  return (
    <div className="bg-secondary py-16">
      <div className="container-responsive space-y-6">
        <h1 className="section-title">Persondatapolitik</h1>
        <p className="text-sm text-primary/80">
          Vi indsamler kun de oplysninger, der er nødvendige for at håndtere din bookingforespørgsel og ophold.
        </p>
        <ul className="list-disc space-y-2 pl-6 text-sm text-primary/80">
          <li>Vi gemmer kontaktoplysninger i op til 12 måneder i et sikkert bookingsystem.</li>
          <li>Du kan til enhver tid anmode om indsigt, rettelse eller sletning af dine data.</li>
          <li>Data deles ikke med tredjepart, medmindre loven kræver det.</li>
        </ul>
      </div>
    </div>
  );
}
