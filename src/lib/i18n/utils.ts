import type { Locale } from "./config";

export function localizePath(locale: Locale, path: string): string {
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}
