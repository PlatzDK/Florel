"use client";

import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/utils";

/**
 * Contact form for booking enquiries with client-side validation.
 */
export function ContactForm(): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const locale: Locale = useMemo(() => {
    const segment = pathname.split("/").filter(Boolean)[0];
    return isLocale(segment) ? segment : defaultLocale;
  }, [pathname]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      arrival: String(formData.get("arrival") ?? ""),
      departure: String(formData.get("departure") ?? ""),
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on"
    };

    const newErrors: Record<string, string> = {};

    if (!data.name.trim()) newErrors.name = "Angiv dit navn";
    if (!data.email.includes("@")) newErrors.email = "Angiv en gyldig e-mail";
    if (!data.message.trim()) newErrors.message = "Fortæl os om dine planer";
    if (!data.consent) newErrors.consent = "Vi skal bruge dit samtykke";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      const errorFieldId: Record<string, string> = {
        name: "name",
        email: "email",
        message: "message",
        consent: "consent"
      };
      const targetId = errorFieldId[firstErrorKey];
      if (targetId) {
        document.getElementById(targetId)?.focus();
      }
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Serverfejl");
      }

      router.push(localizePath(locale, "/tak"));
    } catch (error) {
      setErrors({ general: "Noget gik galt. Prøv igen eller kontakt os direkte." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      {errors.general && (
        <p className="text-sm text-red-600" role="alert">
          {errors.general}
        </p>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-primary">
          Navn
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="mt-1 w-full rounded-lg border border-primary/20 bg-white px-4 py-3 text-sm shadow-sm"
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600" id="name-error" role="alert">
            {errors.name}
          </p>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-primary">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 w-full rounded-lg border border-primary/20 bg-white px-4 py-3 text-sm shadow-sm"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600" id="email-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-primary">
            Telefon
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-1 w-full rounded-lg border border-primary/20 bg-white px-4 py-3 text-sm shadow-sm"
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="arrival" className="block text-sm font-medium text-primary">
            Ankomstdato
          </label>
          <input
            id="arrival"
            name="arrival"
            type="date"
            className="mt-1 w-full rounded-lg border border-primary/20 bg-white px-4 py-3 text-sm shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="departure" className="block text-sm font-medium text-primary">
            Afrejsedato
          </label>
          <input
            id="departure"
            name="departure"
            type="date"
            className="mt-1 w-full rounded-lg border border-primary/20 bg-white px-4 py-3 text-sm shadow-sm"
          />
        </div>
      </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-primary">
            Besked
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-1 w-full rounded-lg border border-primary/20 bg-white px-4 py-3 text-sm shadow-sm"
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
        {errors.message && (
          <p className="mt-1 text-xs text-red-600" id="message-error" role="alert">
            {errors.message}
          </p>
        )}
      </div>
      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          className="mt-1 h-5 w-5 rounded border-primary/30 text-primary focus:ring-accent"
          required
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "consent-error" : "consent-helper"}
        />
        <label htmlFor="consent" className="text-sm text-primary/80">
          Jeg accepterer, at Skovkrogen 37 må kontakte mig om min forespørgsel og gemme mine oplysninger.
          <span className="mt-1 block text-xs text-primary/70" id="consent-helper">
            Vi kan først sende din forespørgsel, når felterne er udfyldt og du har givet samtykke.
          </span>
        </label>
      </div>
      {errors.consent && (
        <p className="text-xs text-red-600" id="consent-error" role="alert">
          {errors.consent}
        </p>
      )}
      <button
        type="submit"
        className="btn btn-primary rounded-full px-6 py-3 text-base"
        disabled={submitting}
        aria-disabled={submitting}
      >
        {submitting ? "Sender..." : "Send forespørgsel"}
      </button>
    </form>
  );
}
