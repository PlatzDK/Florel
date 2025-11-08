"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/navigation";

/**
 * Props for the Header component.
 * Handles sticky navigation with mobile menu toggle and CTA button.
 */
export function Header(): JSX.Element {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
        <Link href="/" className="flex items-center gap-2 font-heading text-xl font-semibold">
          <span aria-hidden>🎣</span>
          Skovkrogen 37
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Hovednavigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                pathname === item.href ? "text-accent" : "text-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex">
          <Link href="/kontakt" className="btn btn-primary rounded-full px-5 py-2 text-sm">
            Send forespørgsel
          </Link>
        </div>
        <button
          type="button"
          className="lg:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Luk menu" : "Åbn menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
        </button>
      </div>
      <div
        id="mobile-menu"
        className={`lg:hidden ${mobileOpen ? "block" : "hidden"} border-t border-primary/10 bg-secondary`}
      >
        <nav className="container-responsive flex flex-col gap-4 py-6" aria-label="Mobilnavigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-base font-medium ${pathname === item.href ? "text-accent" : "text-primary"}`}
            >
              {item.name}
            </Link>
          ))}
          <Link href="/kontakt" className="btn btn-primary rounded-full px-5 py-3 text-center text-base">
            Send forespørgsel
          </Link>
        </nav>
      </div>
    </header>
  );
}
