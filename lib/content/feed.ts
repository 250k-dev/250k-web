import { sanityClient } from "@/lib/sanity/client";
import {
  POSTS_FEED_QUERY,
  VIDEOS_LIST_QUERY,
  EVENTOS_LIST_QUERY,
} from "@/lib/sanity/queries";
import type {
  PostListItem,
  VideoListItem,
  EventoListItem,
  FeedItem,
} from "@/lib/sanity/types";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function postToFeedItem(post: PostListItem): FeedItem {
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
    featured: post.featured,
    author: post.author
      ? { name: post.author.name, image: post.author.image }
      : undefined,
  };
}

function videoHref(video: VideoListItem): string | undefined {
  if (video.platform === "youtube" && video.youtubeId) {
    return `https://www.youtube.com/watch?v=${video.youtubeId}`;
  }
  return video.externalUrl;
}

export function videoToFeedItem(video: VideoListItem): FeedItem {
  return {
    id: video._id,
    type: "video",
    title: video.title,
    excerpt: video.excerpt,
    category: video.category?.title,
    publishedAt: video.publishedAt,
    dateLabel: formatDate(video.publishedAt),
    href: videoHref(video),
    coverImage: video.coverImage,
    featured: video.featured,
    platform: video.platform,
    duration: video.duration,
  };
}

export function eventoToFeedItem(evento: EventoListItem): FeedItem {
  const href =
    evento.platform === "youtube" && evento.youtubeId
      ? `https://www.youtube.com/watch?v=${evento.youtubeId}`
      : undefined;
  return {
    id: evento._id,
    type: "evento",
    title: evento.title,
    excerpt: evento.excerpt,
    category: evento.category?.title ?? "Evento",
    publishedAt: evento.publishedAt,
    dateLabel: evento.dateLabel ?? formatDate(evento.publishedAt),
    href,
    coverImage: evento.coverImage,
    platform: evento.platform === "youtube" ? "youtube" : "presencial",
    status: evento.status,
    place: evento.place,
  };
}

/** Busca artigos, vídeos e eventos e devolve um feed único ordenado por data desc. */
export async function getFeed(): Promise<FeedItem[]> {
  const [posts, videos, eventos] = await Promise.all([
    sanityClient.fetch<PostListItem[]>(POSTS_FEED_QUERY),
    sanityClient.fetch<VideoListItem[]>(VIDEOS_LIST_QUERY),
    sanityClient.fetch<EventoListItem[]>(EVENTOS_LIST_QUERY),
  ]);

  return [
    ...posts.map(postToFeedItem),
    ...videos.map(videoToFeedItem),
    ...eventos.map(eventoToFeedItem),
  ].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
