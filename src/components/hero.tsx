import Link from "next/link";
import Image from "next/image";

interface HeroProps {
    title: string;
    subtitle: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    imageSrc: string;
    imageAlt: string;
    proof?: React.ReactNode;
}

export function Hero({
    title,
    subtitle,
    primaryCta,
    secondaryCta,
    imageSrc,
    imageAlt,
    proof,
}: HeroProps) {
    return (
        <div className="relative isolate overflow-hidden bg-secondary pt-14">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl font-heading">
                        {title}
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-primary/80">
                        {subtitle}
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href={primaryCta.href}
                            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            {primaryCta.label}
                        </Link>
                        <Link href={secondaryCta.href} className="text-sm font-semibold leading-6 text-primary">
                            {secondaryCta.label} <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </div>
            {/* Background illustration or image would go here */}
        </div>
    );
}
