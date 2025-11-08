import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookiepolitik",
  description: "Se hvilke cookies Skovkrogen 37 anvender på websitet.",
  alternates: {
    canonical: "/cookiepolitik"
  }
};

export default function CookiepolitikPage(): JSX.Element {
  return (
    <div className="bg-secondary py-16">
      <div className="container-responsive space-y-6">
        <h1 className="section-title">Cookiepolitik</h1>
        <p className="text-sm text-primary/80">
          Vi bruger kun nødvendige cookies til at huske dit samtykke og anonyme analysecookies, hvis du accepterer det.
        </p>
        <ul className="list-disc space-y-2 pl-6 text-sm text-primary/80">
          <li>Samtykkecookie gemmes i 12 måneder i din browser.</li>
          <li>Google Analytics 4 sættes først, når du accepterer cookies.</li>
          <li>Du kan altid ændre dit valg ved at rydde cookies eller kontakte os.</li>
        </ul>
      </div>
    </div>
  );
}
