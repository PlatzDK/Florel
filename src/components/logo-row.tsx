import { Fish, Mountain, Sailboat } from "lucide-react";

/**
 * Displays quick reassurance icons beneath hero.
 */
export function LogoRow(): JSX.Element {
  const logos = [
    { icon: Fish, label: "Karup Å" },
    { icon: Sailboat, label: "Bølling Sø" },
    { icon: Mountain, label: "Himmelbjerget" }
  ];

  return (
    <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-primary/70">
      {logos.map((logo) => (
        <span key={logo.label} className="flex items-center gap-2">
          <logo.icon className="h-5 w-5 text-accent" aria-hidden />
          {logo.label}
        </span>
      ))}
    </div>
  );
}
