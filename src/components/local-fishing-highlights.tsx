import Link from "next/link";
import fishing from "../../data/fishing.json";
import { localizePath } from "@/lib/i18n/utils";
import type { Locale } from "@/lib/i18n/config";

const copy = {
  da: {
    title: "Lokale fiskesteder",
    intro: "Kort afstand til søer, åer og put & take – her er et udvalg, du kan nå på få minutter.",
    cta: "Se flere fiskesteder",
    readMore: "Læs mere"
  },
  en: {
    title: "Local fishing spots",
    intro: "Close to lakes, rivers, and put & take waters – here are a few highlights within minutes.",
    cta: "See more fishing spots",
    readMore: "Read more"
  }
} as const;

export function LocalFishingHighlights({ locale }: { locale: Locale }): JSX.Element {
  const content = copy[locale];
  const highlights = [...fishing.putAndTake.slice(0, 2), ...fishing.rivers.slice(0, 1)];

  return (
    <section id="local-fishing" className="bg-secondary py-16">
      <div className="container-responsive space-y-6">
        <div className="space-y-3">
          <h2 className="section-title">{content.title}</h2>
          <p className="section-subtitle max-w-3xl">{content.intro}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((spot) => (
            <article key={spot.name} className="card space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-heading text-lg text-primary">{spot.name}</h3>
                <span className="text-xs uppercase text-primary/60">{spot.distance}</span>
              </div>
              <p className="text-sm text-primary/80">{spot.description}</p>
              <Link className="text-sm font-semibold text-accent" href={spot.link}>
                {content.readMore}
              </Link>
            </article>
          ))}
        </div>
        <div>
          <Link
            className="btn btn-primary rounded-full px-6 py-3 text-sm"
            href={localizePath(locale, "/fiskeri")}
          >
            {content.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
