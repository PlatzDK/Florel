import { defaultLocale, type Locale } from "./config";

export function localizePath(locale: Locale, path: string): string {
    if (locale === defaultLocale) {
        return path;
    }
    return `/${locale}${path}`;
}
