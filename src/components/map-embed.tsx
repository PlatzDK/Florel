/**
 * Simple responsive map embed for Google Maps iframe.
 */
interface MapEmbedProps {
  title: string;
  src: string;
}

export function MapEmbed({ title, src }: MapEmbedProps): JSX.Element {
  return (
    <div className="relative h-0 overflow-hidden rounded-2xl pb-[56.25%] shadow-subtle">
      <iframe
        title={title}
        src={src}
        className="absolute inset-0 h-full w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
