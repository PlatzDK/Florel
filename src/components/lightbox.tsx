"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import type { GalleryAspect } from "@/lib/placeholders";

interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
  aspect: GalleryAspect;
}

/**
 * Props for Lightbox component controlling overlay display.
 */
interface LightboxProps {
  images: LightboxImage[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (direction: 1 | -1) => void;
}

const aspectClass: Record<GalleryAspect, string> = {
  landscape: "aspect-[3/2]",
  classic: "aspect-[4/3]"
};

export function Lightbox({ images, activeIndex, onClose, onNavigate }: LightboxProps): JSX.Element | null {
  const isOpen = activeIndex !== null;

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowRight") {
        onNavigate(1);
      }
      if (event.key === "ArrowLeft") {
        onNavigate(-1);
      }
    },
    [isOpen, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  if (!isOpen || activeIndex === null) {
    return null;
  }

  const image = images[activeIndex];
  const isDataUrl = image.src.startsWith("data:");

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6"
    >
      <div className="relative w-full max-w-5xl">
        <button
          type="button"
          className="btn btn-secondary absolute right-4 top-4 rounded-full border-white text-white"
          onClick={onClose}
        >
          Luk
        </button>
        <div className={`relative w-full overflow-hidden rounded-2xl bg-black ${aspectClass[image.aspect]}`}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            unoptimized={isDataUrl}
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 960px"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-white">
          <button
            type="button"
            className="btn btn-secondary rounded-full border-white text-white"
            onClick={() => onNavigate(-1)}
          >
            Forrige
          </button>
          <p className="flex-1 text-center text-sm text-white/90">
            {image.caption ?? image.alt}
          </p>
          <button
            type="button"
            className="btn btn-secondary rounded-full border-white text-white"
            onClick={() => onNavigate(1)}
          >
            Næste
          </button>
        </div>
      </div>
    </div>
  );
}
