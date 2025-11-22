import Link from "next/link";
import { localizePath } from "@/lib/i18n/utils";
import type { Locale } from "@/lib/i18n/config";

const aboutContent: Record<Locale, {
  title: string;
  intro: string;
  overview: string[];
  facilities: string[];
  practical: string[];
  rules: string[];
  cta: string;
}> = {
  da: {
    title: "Om huset",
    intro:
      "Få et hurtigt overblik over planløsning, faciliteter og praktiske forhold, før du sender din forespørgsel.",
    overview: [
      "Størrelse: ca. 110 m² fra 2023",
      "Sovepladser: 6 (3 soveværelser)",
      "Badeværelser: 2 med bruser",
      "Køkken: fuldt udstyret med ovn, induktion og opvaskemaskine"
    ],
    facilities: [
      "Kummefryser til fangst og aflåst redskabsrum",
      "Vaskemaskine, tørretumbler og tørreskab til waders",
      "Sydvendt terrasse med grill og spiseplads",
      "Parkering ved huset med plads til bådtrailer"
    ],
    practical: [
      "Ankomst efter kl. 15, afrejse senest kl. 11",
      "Dyner og puder til 6 – medbring selv sengelinned",
      "Slutrengøring kan tilkøbes efter aftale",
      "Varmepumpe og gulvvarme i hele huset"
    ],
    rules: [
      "Rygning ikke tilladt indendørs",
      "Kæledyr efter aftale",
      "Respektér nabohensyn efter kl. 22",
      "Kontakt os ved særlige behov eller spørgsmål"
    ],
    cta: "Se flere billeder af huset"
  },
  en: {
    title: "About the house",
    intro: "A quick overview of layout, amenities, and practical details before you book.",
    overview: [
      "Size: approx. 110 m² built in 2023",
      "Sleeps: 6 (3 bedrooms)",
      "Bathrooms: 2 with showers",
      "Kitchen: fully equipped with oven, induction hob, and dishwasher"
    ],
    facilities: [
      "Chest freezer for your catch and lockable gear room",
      "Washer, dryer, and drying cabinet for waders",
      "South-facing terrace with grill and dining area",
      "Parking next to the house with room for a boat trailer"
    ],
    practical: [
      "Check-in after 3 PM, check-out by 11 AM",
      "Duvets and pillows for 6 – please bring your own bed linen",
      "Final cleaning can be added on request",
      "Heat pump and underfloor heating throughout"
    ],
    rules: [
      "No indoor smoking",
      "Pets by agreement",
      "Quiet hours after 22:00",
      "Tell us if you have special needs or questions"
    ],
    cta: "View more photos of the house"
  }
};

export function AboutHouseSection({ locale }: { locale: Locale }): JSX.Element {
  const content = aboutContent[locale];

  return (
    <section id="about-house" className="bg-white py-16">
      <div className="container-responsive space-y-8">
        <div className="space-y-3">
          <h2 className="section-title">{content.title}</h2>
          <p className="section-subtitle max-w-3xl">{content.intro}</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.05fr,1fr]">
          <div className="space-y-6 rounded-2xl bg-secondary p-8 shadow-subtle">
            <div className="space-y-3">
              <h3 className="font-heading text-xl text-primary">{locale === "da" ? "Overblik" : "Overview"}</h3>
              <ul className="list-disc space-y-2 pl-5 text-sm text-primary/80">
                {content.overview.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-heading text-xl text-primary">{locale === "da" ? "Faciliteter" : "Facilities"}</h3>
              <ul className="list-disc space-y-2 pl-5 text-sm text-primary/80">
                {content.facilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-6 rounded-2xl bg-secondary p-8 shadow-subtle">
            <div className="space-y-3">
              <h3 className="font-heading text-xl text-primary">{locale === "da" ? "Praktisk" : "Practical"}</h3>
              <ul className="list-disc space-y-2 pl-5 text-sm text-primary/80">
                {content.practical.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-heading text-xl text-primary">{locale === "da" ? "Regler" : "House rules"}</h3>
              <ul className="list-disc space-y-2 pl-5 text-sm text-primary/80">
                {content.rules.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <Link
              href={localizePath(locale, "/galleri")}
              className="btn btn-primary inline-flex w-full justify-center rounded-full px-5 py-3 text-sm"
            >
              {content.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
