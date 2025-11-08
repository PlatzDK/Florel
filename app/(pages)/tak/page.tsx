import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tak for din forespørgsel",
  description: "Vi har modtaget din besked og vender tilbage inden for 24 timer.",
  alternates: {
    canonical: "/tak"
  }
};

export default function TakPage(): JSX.Element {
  return (
    <div className="bg-secondary py-24">
      <div className="container-responsive space-y-6 text-center">
        <h1 className="section-title">Tak for din forespørgsel</h1>
        <p className="section-subtitle">
          Vi sender svar hurtigst muligt. Du er altid velkommen til at ringe, hvis du har spørgsmål i mellemtiden.
        </p>
        <Link href="/" className="btn btn-primary inline-flex rounded-full px-6 py-3 text-base">
          Tilbage til forsiden
        </Link>
      </div>
    </div>
  );
}
