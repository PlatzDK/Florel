import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { MapEmbed } from "@/components/map-embed";
import { siteConfig } from "@/lib/site-config";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/utils";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  return {
    title: "Kontakt",
    description: "Send en bookingforespørgsel til Skovkrogen 37 og få svar inden for 24 timer.",
    alternates: {
      canonical: localizePath(locale, "/kontakt")
    }
  };
}

export default function KontaktPage(): JSX.Element {
  return (
    <div className="bg-secondary py-16">
      <div className="container-responsive grid gap-12 lg:grid-cols-2">
        <section className="space-y-6">
          <header>
            <h1 className="section-title">Send forespørgsel</h1>
            <p className="section-subtitle">
              Udfyld formularen – vi bekræfter ledighed og pris hurtigst muligt. Du kan også ringe eller skrive direkte til os.
            </p>
          </header>
          <ContactForm />
        </section>
        <aside className="space-y-6">
          <div className="card space-y-3">
            <h2 className="font-heading text-xl text-primary">Kontaktoplysninger</h2>
            <p className="text-sm text-primary/80">
              Telefon: <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}>{siteConfig.contact.phone}</a>
              <br />
              E-mail: <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
              <br />
              Adresse: {siteConfig.address.streetAddress}, {siteConfig.address.postalCode} {siteConfig.address.addressLocality}
            </p>
          </div>
          <MapEmbed
            title="Skovkrogen 37 på kort"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2247.123456789!2d9.233!3d56.185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2sSkovkrogen%2037!5e0!3m2!1sda!2sdk!4v1700000000000"
          />
        </aside>
      </div>
    </div>
  );
}
