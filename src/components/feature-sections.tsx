import { Compass, Trees, Wrench } from "lucide-react";

/**
 * FeatureSections detail practical info, nature and local area.
 */
export function FeatureSections(): JSX.Element {
  const sections = [
    {
      title: "Alt det praktiske",
      description:
        "Fuldt udstyret køkken med induktion og ovn, redskabsrum med stænger og waders, stor kummefryser og vaskemaskine.",
      bullets: [
        "Åbent køkken-alrum med spiseplads til 8",
        "Redskabsrum med aflåst opbevaring",
        "Udendørs bruser til udstyr og vaders"
      ],
      icon: Wrench
    },
    {
      title: "Naturen lige udenfor",
      description:
        "Stierne begynder ved havelågen – gå direkte til Bølling Sø, hop på cyklen mod Silkeborgskovene eller nyd morgensolen på terrassen.",
      bullets: [
        "Morgensang fra skoven og udsigt til søen",
        "Markerede cykel- og vandreruter",
        "Mulighed for guidede naturture"
      ],
      icon: Trees
    },
    {
      title: "Området",
      description:
        "Engesvang byder på indkøb og hyggelige spisesteder. Kør 15 minutter til Silkeborg, oplev Himmelbjerget eller læg vejen forbi Ikast.",
      bullets: [
        "Silkeborgs cafeer og kultur indenfor 15 min",
        "Himmelbjerget og kano på Gudenåen",
        "Ikast og Herning for shopping og events"
      ],
      icon: Compass
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="container-responsive space-y-12">
        {sections.map((section) => (
          <article key={section.title} className="grid gap-6 md:grid-cols-[auto,1fr]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <section.icon className="h-7 w-7 text-primary" aria-hidden />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-heading text-2xl text-primary">{section.title}</h3>
                <p className="text-base text-primary/80">{section.description}</p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-sm text-primary/80">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
