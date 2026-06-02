import type { PortableTextBlock } from "@portabletext/react";

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: { height: number; width: number; x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface Author {
  _id: string;
  _type: "author";
  name: string;
  slug: SanitySlug;
  image?: SanityImage;
  bio?: string;
}

export interface Category {
  _id: string;
  _type: "category";
  title: string;
  slug: SanitySlug;
}

/** Campos de destaque compartilhados entre os tipos de conteúdo. */
export interface FeaturedFields {
  featured?: boolean;
  featuredFrom?: string;
  featuredUntil?: string;
}

export interface Post extends FeaturedFields {
  _id: string;
  _type: "post";
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  coverImage?: SanityImage;
  publishedAt: string;
  author?: Author | null;
  category?: Category | null;
  body?: PortableTextBlock[];
  videoUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface PostListItem extends FeaturedFields {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: SanityImage;
  publishedAt: string;
  author?: { name: string; image?: SanityImage } | null;
  category?: { title: string; slug: { current: string } } | null;
  videoUrl?: string;
}

export interface PostSlugItem {
  slug: { current: string };
  publishedAt: string;
}

export interface VideoListItem extends FeaturedFields {
  _id: string;
  title: string;
  slug?: { current: string } | null;
  excerpt?: string;
  coverImage?: SanityImage;
  publishedAt: string;
  videoUrl: string;
  duration?: string;
  category?: { title: string; slug: { current: string } } | null;
}

export interface EventoListItem extends FeaturedFields {
  _id: string;
  title: string;
  slug?: { current: string } | null;
  excerpt?: string;
  coverImage?: SanityImage;
  publishedAt: string;
  status?: string;
  dateLabel?: string;
  place?: string;
  videoUrl?: string;
  category?: { title: string; slug: { current: string } } | null;
}

export interface Evento extends FeaturedFields {
  _id: string;
  _type: "evento";
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  coverImage?: SanityImage;
  publishedAt: string;
  status?: string;
  dateLabel?: string;
  place?: string;
  videoUrl?: string;
  body?: PortableTextBlock[];
  category?: { title: string; slug: { current: string } } | null;
}

export type TreinamentoTipo = "Palestra" | "Treinamento" | "Workshop";

export interface TreinamentoListItem {
  _id: string;
  title: string;
  slug: { current: string };
  tipo: TreinamentoTipo;
  summary?: string;
  date?: string;
  local?: string;
  audience?: string;
  participants?: string;
  coverImage?: SanityImage;
  publishedAt: string;
}

export interface Treinamento extends TreinamentoListItem {
  _type: "treinamento";
  videoUrl?: string;
  body?: PortableTextBlock[];
  highlights?: string[];
  gallery?: SanityImage[];
}

/** Item normalizado para o feed misto do Hub de Conteúdo. */
export interface FeedItem {
  id: string;
  type: "artigo" | "video" | "evento";
  title: string;
  excerpt?: string;
  category?: string;
  publishedAt: string;
  /** Rótulo de data já formatado para exibição. */
  dateLabel: string;
  href?: string;
  coverImage?: SanityImage;
  /** Miniatura externa (ex.: thumbnail do YouTube) usada quando não há coverImage. */
  thumbnailUrl?: string;
  featured?: boolean;
  /** artigo */
  author?: { name: string; image?: SanityImage };
  /** video / evento */
  platform?: "youtube" | "instagram" | "presencial";
  /** video */
  duration?: string;
  /** evento */
  status?: string;
  place?: string;
}
