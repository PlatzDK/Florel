"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import galleryItems from "../../data/gallery.json";
import { Lightbox } from "./lightbox";
import { getGalleryPlaceholder, type GalleryAspect } from "@/lib/placeholders";

interface GalleryItem {
  title: string;
  alt: string;
  aspect: GalleryAspect;
  src: string | null;
}

/**
 * Props for GalleryGrid component.
 * @property tags Categories used for filtering labels.
 */
interface GalleryGridProps {
  tags: string[];
}

const items = (galleryItems as GalleryItem[]).map((item, index) => {
  const placeholder = getGalleryPlaceholder(index, item.title, item.aspect);
  return {
    ...item,
    placeholder,
    imageSrc: item.src ?? placeholder
  };
});

const aspectClass: Record<GalleryAspect, string> = {
  landscape: "aspect-[3/2]",
  classic: "aspect-[4/3]"
};

export function GalleryGrid({ tags }: GalleryGridProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const lightboxImages = useMemo(
    () =>
      items.map((item) => ({
        src: item.imageSrc,
        alt: item.alt,
        caption: item.title,
        aspect: item.aspect
      })),
    []
  );

  return (
    <section className="container-responsive space-y-6 py-16">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="badge">
            {tag}
          </span>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`group relative overflow-hidden rounded-2xl bg-primary/10 focus-visible:outline-accent ${aspectClass[item.aspect]}`}
            aria-label={`Åbn ${item.alt} i lightbox`}
          >
            <Image
              src={item.imageSrc}
              alt={item.alt}
              fill
              unoptimized={!item.src}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              placeholder="blur"
              blurDataURL={item.placeholder}
            />
            <span className="pointer-events-none absolute inset-x-4 bottom-4 rounded-full bg-black/40 px-4 py-1 text-center text-xs font-medium uppercase tracking-wide text-white">
              {item.title}
            </span>
          </button>
        ))}
      </div>
      <Lightbox
        images={lightboxImages}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={(direction) =>
          setActiveIndex((prev) => {
            if (prev === null) return prev;
            const nextIndex = (prev + direction + items.length) % items.length;
            return nextIndex;
          })
        }
      />
    </section>
  );
}
