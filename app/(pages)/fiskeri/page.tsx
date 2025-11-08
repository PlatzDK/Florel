import type { Metadata } from "next";
import Link from "next/link";
import fishing from "../../../data/fishing.json";

export const metadata: Metadata = {
  title: "Fiskeri",
  description: "Find de bedste put & take søer, å-stræk og søfiskeri indenfor 30 minutter fra Skovkrogen 37.",
  alternates: {
    canonical: "/fiskeri"
  }
};

export default function FiskeriPage(): JSX.Element {
  return (
    <div className="container-responsive space-y-12 py-16">
      <header className="space-y-4">
        <h1 className="section-title">Fiskeri i verdensklasse</h1>
        <p className="section-subtitle">
          Fra Skovkrogen 37 når du Midtjyllands stærkeste fiskevande på få minutter. Vi deler gerne kort, fangstrapporter og lokale tips.
        </p>
      </header>
      <section className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-4">
          <h2 className="font-heading text-xl text-primary">Put & take</h2>
          <ul className="space-y-4 text-sm text-primary/80">
            {fishing.putAndTake.map((spot) => (
              <li key={spot.name} className="card space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-primary">{spot.name}</p>
                  <span className="text-xs uppercase text-primary/60">{spot.distance}</span>
                </div>
                <p>{spot.description}</p>
                <Link className="text-sm text-accent" href={spot.link}>
                  Læs mere
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="font-heading text-xl text-primary">Å-fiskeri</h2>
          <ul className="space-y-4 text-sm text-primary/80">
            {fishing.rivers.map((spot) => (
              <li key={spot.name} className="card space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-primary">{spot.name}</p>
                  <span className="text-xs uppercase text-primary/60">{spot.distance}</span>
                </div>
                <p>{spot.description}</p>
                <Link className="text-sm text-accent" href={spot.link}>
                  Fiskekort
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="font-heading text-xl text-primary">Søfiskeri</h2>
          <ul className="space-y-4 text-sm text-primary/80">
            {fishing.lakes.map((spot) => (
              <li key={spot.name} className="card space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-primary">{spot.name}</p>
                  <span className="text-xs uppercase text-primary/60">{spot.distance}</span>
                </div>
                <p>{spot.description}</p>
                <Link className="text-sm text-accent" href={spot.link}>
                  Oplev søen
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="space-y-6">
        <h2 className="font-heading text-xl text-primary">Sæson og arter</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-primary/80">
          {fishing.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>
      <section className="space-y-4">
        <h2 className="font-heading text-xl text-primary">Kort over fiskepladser</h2>
        <div className="rounded-3xl bg-white p-6 shadow-subtle">
          <p className="text-sm text-primary/80">
            Se markeringer over de nævnte lokationer på det indlejrede kort. Klik på markører for at få rutevejledning.
          </p>
          <iframe
            title="Fiskekort Midtjylland"
            src="https://www.google.com/maps/d/embed?mid=1PJSq1q_eksempel"
            className="mt-4 h-96 w-full rounded-2xl"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  );
}
