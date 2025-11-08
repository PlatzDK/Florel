import Link from "next/link";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

/**
 * Footer with contact details, policies and social media links.
 */
export function Footer(): JSX.Element {
  return (
    <footer className="border-t border-primary/10 bg-white">
      <div className="container-responsive grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="font-heading text-xl font-semibold text-primary">{siteConfig.shortName}</p>
          <p className="mt-3 text-sm text-primary/80">
            © 2025 Skovkrogen 37 – Sommerhus for lystfiskere
          </p>
          <address className="mt-4 not-italic text-sm text-primary/80">
            {siteConfig.address.streetAddress}
            <br />
            {siteConfig.address.postalCode} {siteConfig.address.addressLocality}
          </address>
        </div>
        <div className="space-y-3 text-sm text-primary/80">
          <p className="font-semibold text-primary">Kontakt</p>
          <Link href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`} className="flex items-center gap-2">
            <Phone className="h-4 w-4" aria-hidden />
            <span>{siteConfig.contact.phone}</span>
          </Link>
          <Link href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2">
            <Mail className="h-4 w-4" aria-hidden />
            <span>{siteConfig.contact.email}</span>
          </Link>
        </div>
        <div className="space-y-3 text-sm text-primary/80">
          <p className="font-semibold text-primary">Information</p>
          <div className="flex flex-col gap-2">
            <Link href="/vilkaar" className="hover:text-accent">
              Vilkår
            </Link>
            <Link href="/persondata" className="hover:text-accent">
              Persondata
            </Link>
            <Link href="/cookiepolitik" className="hover:text-accent">
              Cookiepolitik
            </Link>
          </div>
          <div className="flex gap-3 pt-2">
            <Link href={siteConfig.social.facebook} aria-label="Facebook">
              <Facebook className="h-5 w-5" aria-hidden />
            </Link>
            <Link href={siteConfig.social.instagram} aria-label="Instagram">
              <Instagram className="h-5 w-5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
