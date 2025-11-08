import { Fish, Home, Star } from "lucide-react";

/**
 * Displays quick proof points with icons.
 */
export function ProofBar(): JSX.Element {
  const items = [
    { icon: Fish, label: "100 m til sø" },
    { icon: Home, label: "Bådplads muligt" },
    { icon: Star, label: "Gode anmeldelser" }
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="card flex items-center gap-3">
          <item.icon className="h-6 w-6 text-accent" aria-hidden />
          <span className="text-sm font-medium text-primary">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
