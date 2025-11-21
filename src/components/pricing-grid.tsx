import Link from "next/link";
import pricing from "../../data/pricing.json";

/**
 * Pricing grid using data from /data/pricing.json.
 */
export function PricingGrid(): JSX.Element {
  return (
    <section className="container-responsive space-y-10 py-16">
      <div>
        <h1 className="section-title">Sæsonpriser</h1>
        <p className="section-subtitle">Vælg den periode der passer til jeres tur – vi tilpasser gerne opholdets længde.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {pricing.map((tier) => (
          <article key={tier.name} className="card space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">{tier.name}</p>
            <p className="font-heading text-2xl text-primary">{tier.price}</p>
            <p className="text-sm text-primary/80">{tier.description}</p>
            <p className="text-xs uppercase tracking-wide text-primary/60">Periode: {tier.period}</p>
            <Link href="/kontakt#booking" className="btn btn-primary mt-4 rounded-full px-5 py-3 text-sm">
              Send forespørgsel
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
