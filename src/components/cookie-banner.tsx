"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "skovkrogen-cookie-consent";

type ConsentState = "unknown" | "accepted" | "declined";

/**
 * Cookie banner capturing simple analytics consent.
 */
export function CookieBanner(): JSX.Element | null {
  const [consent, setConsent] = useState<ConsentState>("unknown");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as ConsentState | null;
    if (stored) {
      setConsent(stored);
    }
  }, []);

  const updateConsent = (value: ConsentState) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  };

  if (consent !== "unknown") {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 rounded-2xl bg-primary p-6 text-white shadow-subtle">
      <p className="text-sm">
        Vi bruger kun cookies til anonymiseret statistik i Google Analytics 4. Acceptér for at hjælpe os med at forbedre oplevelsen.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          className="btn btn-secondary rounded-full border-white px-5 py-2 text-sm text-white"
          onClick={() => updateConsent("accepted")}
        >
          Acceptér
        </button>
        <button
          type="button"
          className="btn btn-secondary rounded-full border-white px-5 py-2 text-sm text-white/80"
          onClick={() => updateConsent("declined")}
        >
          Afvis
        </button>
      </div>
    </div>
  );
}
