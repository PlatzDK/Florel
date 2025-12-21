import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { siteConfig } from "@/lib/site-config";
import { heroPlaceholder } from "@/lib/placeholders";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/utils";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  return {
    title: "Skovkrogen 37 | Sommerhus i særklasse",
    description: "Bo tæt på søer, åer og put & take – med plads til familie, udstyr og ro i Skovkrogen 37 i Midtjylland.",
    alternates: {
      canonical: localizePath(locale, "/")
    }
  };
}

export default function HomePage({ params }: { params: { locale: Locale } }): JSX.Element {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;

  return (
    <div className="flex flex-col min-h-screen">
      <Hero
        title="Lystfiskerens Paradis"
        subtitle="Drømmer du om den store fangst? Skovkrogen 37 tilbyder den perfekte base med renserum, fryser og kort afstand til Gudenåen."
        primaryCta={{ label: "Se Dage & Priser", href: localizePath(locale, "/booking") }}
        secondaryCta={{ label: "Læs om huset", href: localizePath(locale, "/huset") }}
        imageSrc={heroPlaceholder}
        imageAlt="Skovkrogen 37 facade"
      />

      {/* Tightened Feature Section */}
      <section className="py-24 bg-white">
        <div className="container-responsive">
          <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/20 text-secondary mb-4">
                🎣
              </div>
              <h3 className="text-xl font-bold text-primary">Fiskeri i verdensklasse</h3>
              <p className="text-primary/70 leading-relaxed">
                Med Gudenåen i baghaven og Silkeborgsøerne tæt på, er du garanteret smukke naturoplevelser og gode chancer for fangst.
              </p>
            </div>
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/20 text-secondary mb-4">
                🏡
              </div>
              <h3 className="text-xl font-bold text-primary">Faciliteter i top</h3>
              <p className="text-primary/70 leading-relaxed">
                Huset er indrettet til lystfiskere: Stort grovkøkken, dybfryser til fangsten og tørrerum til waders og udstyr.
              </p>
            </div>
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/20 text-secondary mb-4">
                🔥
              </div>
              <h3 className="text-xl font-bold text-primary">Hygge & Afslapning</h3>
              <p className="text-primary/70 leading-relaxed">
                Når stængerne er pakket væk, kan du nyde brændeovnen, varmepumpen og den lynhurtige fiberforbindelse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">Oplev stemningen</h2>
            <p className="text-primary/70 max-w-2xl mx-auto">
              Et kig indenfor i Skovkrogen 37 og den omkringliggende natur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="relative aspect-square overflow-hidden rounded-xl shadow-md group">
                <img
                  src={`/images/gallery/gallery-00${num}.webp`}
                  alt={`Skovkrogen galleribillede ${num}`}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-primary">
        <div className="container-responsive text-center">
          <h2 className="text-3xl font-bold mb-6">Klar til din næste tur?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg opacity-90">
            Skovkrogen 37 er populær i sæsonen. Tjek kalenderen og book din uge før den er væk.
          </p>
          <a
            href={localizePath(locale, "/booking")}
            className="inline-block bg-primary text-white font-bold py-4 px-8 rounded-lg hover:bg-primary/90 transition-colors shadow-lg"
          >
            Se ledighed & Book
          </a>
        </div>
      </section>
    </div>
  );
}

