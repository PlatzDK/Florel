import { Leaf, Map, Utensils } from "lucide-react";

/**
 * FeatureCards highlight key benefits with iconography.
 */
export function FeatureCards(): JSX.Element {
  const features = [
    {
      title: "Fiskeri i topklasse",
      description: "Put & take, sø og å indenfor 10 km – vi giver dig de lokale tips til hver destination.",
      icon: Map
    },
    {
      title: "Komfortabel base",
      description: "Nyt hus med kvalitetsmadrasser, stor terrasse med grill og redskabsrum til udstyr.",
      icon: Utensils
    },
    {
      title: "Familievenligt",
      description: "Plads til 6 personer, højstol og brætspil – tæt på Silkeborg, Himmelbjerget og legepladser.",
      icon: Leaf
    }
  ];

  return (
    <section className="container-responsive space-y-8 py-16">
      <div>
        <h2 className="section-title">Nøglefordele</h2>
        <p className="section-subtitle">
          Skovkrogen 37 er indrettet til fiskere, familier og par, der vil have naturen tæt på uden at gå på kompromis med komforten.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="card space-y-4">
            <feature.icon className="h-8 w-8 text-accent" aria-hidden />
            <h3 className="font-heading text-xl text-primary">
              {feature.title}
            </h3>
            <p className="text-sm text-primary/80">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
