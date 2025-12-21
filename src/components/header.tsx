import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Header({ locale, dictionary }: { locale: string; dictionary: any }) {
    return (
        <header className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container-responsive flex h-16 items-center justify-between">
                <Link href={`/${locale}`} className="font-heading text-xl font-bold text-primary">
                    {siteConfig.name}
                </Link>
                <nav className="flex gap-6 text-sm font-medium">
                    <Link href={`/${locale}/sommerhuset`} className="hover:text-primary/80">
                        {dictionary?.theHouse || "Sommerhuset"}
                    </Link>
                    <Link href={`/${locale}/omrade`} className="hover:text-primary/80">
                        {dictionary?.area || "Området"}
                    </Link>
                    <Link href={`/${locale}/kontakt`} className="btn btn-primary h-9 rounded-full px-4 text-xs text-white">
                        {dictionary?.bookNow || "Book Nu"}
                    </Link>
                </nav>
            </div>
        </header>
    );
}
