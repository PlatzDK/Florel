import Link from "next/link";

/**
 * CTA banner encouraging booking enquiries.
 */
export function CtaBanner(): JSX.Element {
  return (
    <section className="py-16">
      <div className="container-responsive">
        <div className="card flex flex-col items-start gap-4 bg-primary text-white md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-semibold">Klar til næste fisketur?</h2>
            <p className="text-sm text-white/80">Send en forespørgsel, så vender vi tilbage inden for ét døgn.</p>
          </div>
          <Link href="/kontakt" className="btn btn-secondary rounded-full border-white px-6 py-3 text-base text-white">
            Send forespørgsel nu
          </Link>
        </div>
      </div>
    </section>
  );
}
