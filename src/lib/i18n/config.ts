export const defaultLocale = "da";
export const locales = ["da", "en", "de"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: any): value is Locale {
    return locales.includes(value);
}
