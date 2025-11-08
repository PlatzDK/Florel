import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";

export const metadata: Metadata = {
  title: "Galleri",
  description: "Se stemninger fra Skovkrogen 37, naturen omkring Bølling Sø og fiskerioplevelser.",
  alternates: {
    canonical: "/galleri"
  }
};

export default function GalleriPage(): JSX.Element {
  return (
    <div className="space-y-6 bg-secondary py-16">
      <div className="container-responsive space-y-4">
        <h1 className="section-title">Galleri</h1>
        <p className="section-subtitle">
          Få et indtryk af huset, naturen og fangsterne. Alle billeder kan åbnes i fuld størrelse og navigeres med tastatur.
        </p>
      </div>
      <GalleryGrid tags={["Natur", "Fiskeri", "Sommerhus", "Område"]} />
    </div>
  );
}
