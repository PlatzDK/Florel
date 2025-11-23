import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

/**
 * Props for the Hero component.
 * @property title Main heading text.
 * @property subtitle Supporting paragraph.
 * @property primaryCta CTA configuration for the primary button.
 * @property secondaryCta CTA configuration for the secondary button.
 * @property imageSrc Source path for the hero image.
 * @property imageAlt Accessible alt text for the hero image.
 */
interface HeroProps {
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  imageSrc: string;
  imageAlt: string;
  proof?: ReactNode;
}

export function Hero({ title, subtitle, primaryCta, secondaryCta, imageSrc, imageAlt, proof }: HeroProps) {
  return (
    <section className="container-responsive grid items-center gap-10 pb-16 pt-12 md:grid-cols-2 md:pt-20">
      <div className="space-y-6">
        <h1 className="font-heading text-4xl font-semibold text-primary md:text-5xl">{title}</h1>
        <p className="text-lg text-primary/80">{subtitle}</p>
        <div style={{ marginTop: '20px' }}>
          <a href="mailto:DIN_EMAIL@HER.DK?subject=Forespørgsel på Sommerhus" className="cta-button">
            Send Forespørgsel
          </a>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href={primaryCta.href} className="btn btn-primary rounded-full px-6 py-3 text-base">
            {primaryCta.label}
          </Link>
          <Link href={secondaryCta.href} className="btn btn-secondary rounded-full px-6 py-3 text-base">
            {secondaryCta.label}
          </Link>
        </div>
        {proof}
      </div>
      <div className="relative">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={720}
          height={540}
          unoptimized
          className="h-full w-full rounded-3xl object-cover"
          priority
        />
      </div>
    </section>
  );
}
