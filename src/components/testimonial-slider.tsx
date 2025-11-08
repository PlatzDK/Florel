"use client";

import { useId, useState } from "react";
import testimonials from "../../data/testimonials.json";

/**
 * Accessible testimonial slider with keyboard support.
 */
export function TestimonialSlider(): JSX.Element {
  const [index, setIndex] = useState(0);
  const listId = useId();

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[index];

  return (
    <section className="bg-secondary py-16">
      <div className="container-responsive">
        <div className="card space-y-6" aria-live="polite">
          <div className="flex items-center justify-between">
            <h2 className="section-title">Gæsterne siger</h2>
            <div className="flex gap-2" role="group" aria-label="Skift anmeldelse">
              <button
                type="button"
                onClick={prev}
                className="btn btn-secondary rounded-full px-4 py-2 text-sm"
              >
                Forrige
              </button>
              <button
                type="button"
                onClick={next}
                className="btn btn-secondary rounded-full px-4 py-2 text-sm"
              >
                Næste
              </button>
            </div>
          </div>
          <div role="list" aria-labelledby={listId}>
            <div role="listitem" id={listId}>
              <p className="text-lg text-primary/90">“{current.quote}”</p>
              <p className="mt-4 text-sm font-semibold text-primary">{current.name}</p>
              <p className="text-sm text-primary/70">{current.role}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {testimonials.map((_, dotIndex) => (
              <span
                key={_.name}
                className={`h-2 w-2 rounded-full ${dotIndex === index ? "bg-accent" : "bg-primary/20"}`}
                aria-hidden
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
