import type { ReactNode } from "react";
import { locales } from "@/lib/i18n/config";

export function generateStaticParams(): { locale: string }[] {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({ children }: { children: ReactNode }): ReactNode {
  return children;
}
