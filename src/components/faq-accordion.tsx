"use client";

import { useState } from "react";
import faqs from "../../data/faq.json";

/**
 * Accessible accordion for FAQ entries.
 */
export function FaqAccordion(): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="container-responsive space-y-6 py-16" aria-labelledby="faq-heading">
      <div>
        <h1 id="faq-heading" className="section-title">
          Ofte stillede spørgsmål
        </h1>
        <p className="section-subtitle">
          Her finder du svar på de mest almindelige spørgsmål om fiskeri, praktiske forhold og booking.
        </p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const buttonId = `faq-button-${index}`;
          const panelId = `faq-panel-${index}`;
          return (
            <div key={faq.question} className="card">
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 text-left"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="font-heading text-lg text-primary">{faq.question}</span>
                <span aria-hidden className="text-2xl text-accent">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`pt-4 text-sm text-primary/80 transition-all ${isOpen ? "block" : "hidden"}`}
              >
                {faq.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
