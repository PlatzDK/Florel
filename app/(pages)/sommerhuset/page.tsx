import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { housePlaceholder } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Sommerhuset",
  description: "Moderne feriehus fra 2023 med tre soveværelser, stor terrasse og faciliteter til lystfiskere.",
  alternates: {
    canonical: "/sommerhuset"
  }
};

const facilities = [
  { name: "Fluefiskesæt", available: true },
  { name: "Grill", available: true },
  { name: "Terrasse", available: true },
  { name: "Wifi", available: true },
  { name: "Smart-TV", available: true },
  { name: "Opvaskemaskine", available: true }
];

export default function SommerhusetPage(): JSX.Element {
  return (
    <div className="container-responsive space-y-12 py-16">
      <header className="space-y-4">
        <h1 className="section-title">Sommerhuset</h1>
        <p className="section-subtitle">
          Skovkrogen 37 er bygget i 2023 og rummer 110 m² med tre soveværelser, to badeværelser og åbent køkken-alrum. Huset er isoleret til helårsbrug og har gulvvarme overalt.
        </p>
      </header>
      <section className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <Image
            src={housePlaceholder}
            alt="Illustration af sommerhuset set fra terrassen"
            width={960}
            height={640}
            unoptimized
            className="w-full rounded-3xl object-cover"
          />
          <p className="text-base text-primary/80">
            Indretningen er tænkt til lystfiskeren: redskabsrum med ophæng til stænger, tørreskab til waders og kummefryser til fangsten. Køkkenet har induktionsplader, stor ovn og alt nødvendigt service.
          </p>
          <p className="text-base text-primary/80">
            Stuen åbner ud til en sydvendt terrasse med loungemøbler, spisebord og gasgrill. I haven finder du bålplads, fiskerensebord og udsigt til skovkanten. Der er parkeringsplads til to biler og mulighed for at stille bådtrailer.
          </p>
        </div>
        <aside className="card space-y-4">
          <h2 className="font-heading text-xl text-primary">Faciliteter</h2>
          <table className="w-full text-sm text-primary/80">
            <tbody>
              {facilities.map((item) => (
                <tr key={item.name} className="border-b border-primary/10 last:border-0">
                  <td className="py-3 font-medium">{item.name}</td>
                  <td className="py-3 text-right">{item.available ? "✔" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href="/galleri" className="btn btn-primary w-full rounded-full px-5 py-3 text-sm">
            Se flere billeder
          </Link>
        </aside>
      </section>
      <section className="space-y-4">
        <h2 className="font-heading text-xl text-primary">Plantegning</h2>
        <div className="rounded-3xl bg-white p-10 text-center shadow-subtle">
          <p className="text-sm text-primary/70">Plantegning uploades snart – kontakt os for detaljeret oversigt.</p>
        </div>
      </section>
    </div>
  );
}
