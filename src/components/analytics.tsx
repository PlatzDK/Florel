"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const STORAGE_KEY = "skovkrogen-cookie-consent";
const GA_ID = "G-XXXXXXX";

/**
 * Loads Google Analytics only when consent is granted.
 */
export function Analytics(): JSX.Element | null {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted") {
      setEnabled(true);
    }

    const handleStorage = () => {
      const value = window.localStorage.getItem(STORAGE_KEY);
      setEnabled(value === "accepted");
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-setup" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
