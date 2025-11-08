import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { ProofBar } from "@/components/proof-bar";
import { FeatureCards } from "@/components/feature-cards";
import { FeatureSections } from "@/components/feature-sections";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { CtaBanner } from "@/components/cta-banner";
import { LogoRow } from "@/components/logo-row";
import { siteConfig } from "@/lib/site-config";
import { heroPlaceholder } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Sommerhus for lystfiskere midt i naturen",
  description:
    "Bo tæt på søer, åer og put & take – med plads til familie, udstyr og ro i Skovkrogen 37 i Midtjylland.",
  alternates: {
    canonical: "/"
  }
};

export default function HomePage(): JSX.Element {
  return (
    <div className="space-y-12">
      <section className="bg-secondary">
        <Hero
          title="Sommerhus for lystfiskere midt i naturen"
          subtitle="Bo tæt på søer, åer og put & take – med plads til familie, udstyr og ro."
          primaryCta={{ label: "Se huset", href: "/sommerhuset" }}
          secondaryCta={{ label: "Kontakt os", href: "/kontakt" }}
          imageSrc={heroPlaceholder}
          imageAlt="Illustreret fisker der gør fluen klar ved søbredden"
          proof={<LogoRow />}
        />
        <div className="container-responsive pb-16">
          <ProofBar />
        </div>
      </section>
      <FeatureCards />
      <FeatureSections />
      <section className="container-responsive space-y-8 py-16">
        <div>
          <h2 className="section-title">Hvorfor vælge Skovkrogen 37?</h2>
          <p className="section-subtitle">
            {siteConfig.shortName} er bygget i 2023 og indrettet til fiskere med grej, familie og behov for komfort. Du får en rolig base og let adgang til Midtjyllands bedste spots.
          </p>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          <li className="card space-y-2">
            <h3 className="font-heading text-xl text-primary">Fiskeri i topklasse</h3>
            <p className="text-sm text-primary/80">Put & take, sø og å indenfor 10 km – og vi deler gerne vores favoritpladser.</p>
          </li>
          <li className="card space-y-2">
            <h3 className="font-heading text-xl text-primary">Komfortabel base</h3>
            <p className="text-sm text-primary/80">Nyt hus med gode senge, stor terrasse, grill og redskabsrum med lås.</p>
          </li>
          <li className="card space-y-2">
            <h3 className="font-heading text-xl text-primary">Familievenligt</h3>
            <p className="text-sm text-primary/80">Plads til 6 personer, højstol og brætspil – tæt på Silkeborg og Himmelbjerget.</p>
          </li>
        </ul>
      </section>
      <TestimonialSlider />
      <CtaBanner />
    </div>
  );
}
