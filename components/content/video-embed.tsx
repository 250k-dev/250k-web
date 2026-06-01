import { IconBrandInstagram, IconExternalLink } from "@tabler/icons-react";
import { parseVideoUrl } from "@/lib/video";

/**
 * Embute um vídeo a partir da URL. YouTube/Vimeo viram iframe;
 * Instagram/outros viram um botão que abre o link em nova aba.
 */
export function VideoEmbed({
  url,
  title,
  className = "mt-10",
}: {
  url?: string | null;
  title?: string;
  className?: string;
}) {
  const parsed = parseVideoUrl(url);
  if (!parsed) return null;

  if (parsed.embedUrl) {
    return (
      <div
        className={`relative aspect-video w-full overflow-hidden rounded-3xl bg-muted ${className}`}
      >
        <iframe
          src={parsed.embedUrl}
          title={title ?? "Vídeo"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  // Sem embed (ex.: Reels do Instagram): link externo.
  return (
    <div className={className}>
      <a
        href={parsed.watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent/90"
      >
        {parsed.platform === "instagram" ? (
          <IconBrandInstagram className="size-4" stroke={2} />
        ) : (
          <IconExternalLink className="size-4" stroke={2} />
        )}
        Assistir ao vídeo
      </a>
    </div>
  );
}
