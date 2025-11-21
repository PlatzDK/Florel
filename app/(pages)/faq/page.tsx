import type { Metadata } from "next";
import { FaqAccordion } from "@/components/faq-accordion";
import faqs from "../../../data/faq.json";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Få svar på spørgsmål om fiskeri, booking, faciliteter og praktiske forhold i Skovkrogen 37.",
  alternates: {
    canonical: "/faq"
  }
};

export default function FaqPage(): JSX.Element {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  } as const;

  return (
    <div className="bg-secondary py-16">
      <FaqAccordion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}
