import type { Metadata } from "next";
import { FaqAccordion } from "@/components/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Få svar på spørgsmål om fiskeri, booking, faciliteter og praktiske forhold i Skovkrogen 37.",
  alternates: {
    canonical: "/faq"
  }
};

export default function FaqPage(): JSX.Element {
  return (
    <div className="bg-secondary py-16">
      <FaqAccordion />
    </div>
  );
}
