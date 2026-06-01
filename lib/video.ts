export type VideoPlatform = "youtube" | "instagram" | "vimeo" | "other";

export interface ParsedVideo {
  platform: VideoPlatform;
  /** ID do vídeo na plataforma (quando aplicável). */
  id?: string;
  /** URL para embed em <iframe> (quando suportado). */
  embedUrl?: string;
  /** URL original para abrir em nova aba. */
  watchUrl: string;
  /** Miniatura derivada (quando a plataforma expõe, ex.: YouTube). */
  thumbnailUrl?: string;
}

/**
 * Interpreta uma URL de vídeo (YouTube, Vimeo, Instagram…) e devolve a melhor
 * forma de exibi-la — embed quando possível, senão link externo.
 */
export function parseVideoUrl(url?: string | null): ParsedVideo | null {
  if (!url) return null;

  const youtube = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/,
  );
  if (youtube) {
    return {
      platform: "youtube",
      id: youtube[1],
      embedUrl: `https://www.youtube.com/embed/${youtube[1]}`,
      watchUrl: url,
      thumbnailUrl: `https://i.ytimg.com/vi/${youtube[1]}/hqdefault.jpg`,
    };
  }

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) {
    return {
      platform: "vimeo",
      id: vimeo[1],
      embedUrl: `https://player.vimeo.com/video/${vimeo[1]}`,
      watchUrl: url,
    };
  }

  if (/instagram\.com\//.test(url)) {
    // Reels do Instagram não têm embed via iframe sem o script oficial: link externo.
    return { platform: "instagram", watchUrl: url };
  }

  return { platform: "other", watchUrl: url };
}
