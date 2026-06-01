import { sanityClient } from "@/lib/sanity/client";
import {
  POSTS_FEED_QUERY,
  VIDEOS_LIST_QUERY,
  EVENTOS_LIST_QUERY,
} from "@/lib/sanity/queries";
import { parseVideoUrl } from "@/lib/video";
import type {
  PostListItem,
  VideoListItem,
  EventoListItem,
  FeedItem,
  FeaturedFields,
} from "@/lib/sanity/types";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Destaque vigente: o toggle precisa estar ligado e, se houver janela de datas,
 * o momento atual deve estar dentro dela.
 */
export function isCurrentlyFeatured(
  item: FeaturedFields,
  now: number = Date.now(),
): boolean {
  if (!item.featured) return false;
  if (item.featuredFrom && now < new Date(item.featuredFrom).getTime()) {
    return false;
  }
  if (item.featuredUntil && now > new Date(item.featuredUntil).getTime()) {
    return false;
  }
  return true;
}

export function postToFeedItem(post: PostListItem, now?: number): FeedItem {
  return {
    id: post._id,
    type: "artigo",
    title: post.title,
    excerpt: post.excerpt,
    category: post.category?.title,
    publishedAt: post.publishedAt,
    dateLabel: formatDate(post.publishedAt),
    href: `/blog/${post.slug.current}`,
    coverImage: post.coverImage,
    featured: isCurrentlyFeatured(post, now),
    author: post.author
      ? { name: post.author.name, image: post.author.image }
      : undefined,
  };
}

export function videoToFeedItem(video: VideoListItem, now?: number): FeedItem {
  const parsed = parseVideoUrl(video.videoUrl);
  return {
    id: video._id,
    type: "video",
    title: video.title,
    excerpt: video.excerpt,
    category: video.category?.title,
    publishedAt: video.publishedAt,
    dateLabel: formatDate(video.publishedAt),
    href: parsed?.watchUrl,
    coverImage: video.coverImage,
    thumbnailUrl: video.coverImage ? undefined : parsed?.thumbnailUrl,
    featured: isCurrentlyFeatured(video, now),
    platform: parsed?.platform === "instagram" ? "instagram" : "youtube",
    duration: video.duration,
  };
}

export function eventoToFeedItem(
  evento: EventoListItem,
  now?: number,
): FeedItem {
  const parsed = parseVideoUrl(evento.videoUrl);
  return {
    id: evento._id,
    type: "evento",
    title: evento.title,
    excerpt: evento.excerpt,
    category: evento.category?.title ?? "Evento",
    publishedAt: evento.publishedAt,
    dateLabel: evento.dateLabel ?? formatDate(evento.publishedAt),
    href: evento.slug?.current ? `/eventos/${evento.slug.current}` : undefined,
    coverImage: evento.coverImage,
    thumbnailUrl: evento.coverImage ? undefined : parsed?.thumbnailUrl,
    featured: isCurrentlyFeatured(evento, now),
    // Vídeo gravado → mostra a plataforma; senão, evento presencial.
    platform: parsed
      ? parsed.platform === "instagram"
        ? "instagram"
        : "youtube"
      : "presencial",
    status: evento.status,
    place: evento.place,
  };
}

/** Busca artigos, vídeos e eventos e devolve um feed único ordenado por data desc. */
export async function getFeed(): Promise<FeedItem[]> {
  const now = Date.now();
  const [posts, videos, eventos] = await Promise.all([
    sanityClient.fetch<PostListItem[]>(POSTS_FEED_QUERY),
    sanityClient.fetch<VideoListItem[]>(VIDEOS_LIST_QUERY),
    sanityClient.fetch<EventoListItem[]>(EVENTOS_LIST_QUERY),
  ]);

  return [
    ...posts.map((p) => postToFeedItem(p, now)),
    ...videos.map((v) => videoToFeedItem(v, now)),
    ...eventos.map((e) => eventoToFeedItem(e, now)),
  ].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
