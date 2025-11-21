"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n/config";

/**
 * Props for the Header component.
 * Handles sticky navigation with mobile menu toggle and CTA button.
 */
type HeaderProps = {
  locale: Locale;
  dictionary: {
    brand: string;
    tagline: string;
    navigation: { name: string; href: string }[];
    headerCta: string;
    mobileNavLabel: string;
    mainNavLabel: string;
    menu: { open: string; close: string };
    language: { label: string; da: string; en: string };
  };
};

export function Header({ locale, dictionary }: HeaderProps): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const localizedPath = (href: string) => {
    if (href === "/") return `/${locale}`;
    return `/${locale}${href}`;
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-primary/10 bg-secondary/95 backdrop-blur transition-shadow ${
        isScrolled ? "shadow-subtle" : "shadow-none"
      }`}
    >
      <div className="container-responsive flex items-center justify-between py-4">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-heading text-xl font-semibold">
          <span aria-hidden>🎣</span>
          {dictionary.brand}
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label={dictionary.mainNavLabel}>
          {dictionary.navigation.map((item) => (
            <Link
              key={item.href}
              href={localizedPath(item.href)}
              className={`text-sm font-medium transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                pathname === localizedPath(item.href) ? "text-accent" : "text-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <label className="sr-only" htmlFor="locale-switcher">
            {dictionary.language.label}
          </label>
          <select
            id="locale-switcher"
            className="rounded-full border border-primary/20 bg-white px-3 py-2 text-sm text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
            value={locale}
            onChange={(event) => {
              const targetLocale = event.target.value as Locale;
              const segments = pathname.split("/").filter(Boolean);
              const rest = segments.slice(1).join("/");
              const nextPath = `/${targetLocale}${rest ? `/${rest}` : ""}`;
              router.push(nextPath);
            }}
          >
            <option value="da">{dictionary.language.da}</option>
            <option value="en">{dictionary.language.en}</option>
          </select>
          <Link href={localizedPath("/kontakt")} className="btn btn-primary rounded-full px-5 py-2 text-sm">
            {dictionary.headerCta}
          </Link>
        </div>
        <button
          type="button"
          className="lg:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? dictionary.menu.close : dictionary.menu.open}
        >
          {mobileOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
        </button>
      </div>
      <div
        id="mobile-menu"
        className={`lg:hidden ${mobileOpen ? "block" : "hidden"} border-t border-primary/10 bg-secondary`}
      >
        <nav className="container-responsive flex flex-col gap-4 py-6" aria-label={dictionary.mobileNavLabel}>
          {dictionary.navigation.map((item) => (
            <Link
              key={item.href}
              href={localizedPath(item.href)}
              className={`text-base font-medium ${
                pathname === localizedPath(item.href) ? "text-accent" : "text-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center justify-between">
            <label className="text-sm text-primary" htmlFor="locale-switcher-mobile">
              {dictionary.language.label}
            </label>
            <select
              id="locale-switcher-mobile"
              className="rounded-full border border-primary/20 bg-white px-3 py-2 text-sm text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
              value={locale}
              onChange={(event) => {
                const targetLocale = event.target.value as Locale;
                const segments = pathname.split("/").filter(Boolean);
                const rest = segments.slice(1).join("/");
                const nextPath = `/${targetLocale}${rest ? `/${rest}` : ""}`;
                router.push(nextPath);
              }}
            >
              <option value="da">{dictionary.language.da}</option>
              <option value="en">{dictionary.language.en}</option>
            </select>
          </div>
          <Link href={localizedPath("/kontakt")} className="btn btn-primary rounded-full px-5 py-3 text-center text-base">
            {dictionary.headerCta}
          </Link>
        </nav>
      </div>
    </header>
  );
}
