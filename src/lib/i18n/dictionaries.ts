import type { Locale } from "./config";
import da from "@/locales/da";
import en from "@/locales/en";

const dictionaries = { da, en } as const;

export type Dictionary = typeof da;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.da;
}
