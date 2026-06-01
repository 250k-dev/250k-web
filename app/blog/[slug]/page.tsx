import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IconArrowLeft, IconClock } from "@tabler/icons-react";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { ContentCard } from "@/components/content/content-card";
import { VideoEmbed } from "@/components/content/video-embed";
import { PortableText } from "@/components/blog/portable-text";
import { sanityClient } from "@/lib/sanity/client";
import { POST_BY_SLUG_QUERY, RELATED_POSTS_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { postToFeedItem } from "@/lib/content/feed";
import type { Post, PostListItem } from "@/lib/sanity/types";
import type { PortableTextBlock } from "@portabletext/react";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://250k.com.br";

async function getPost(slug: string): Promise<Post | null> {
  return sanityClient.fetch<Post | null>(POST_BY_SLUG_QUERY, { slug });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/** Estimativa de tempo de leitura a partir do corpo (≈200 palavras/min). */
function readingTime(body: PortableTextBlock[] | undefined): string {
  if (!body) return "1 min de leitura";
  const words = body
    .filter((b) => b._type === "block")
    .flatMap((b) =>
      ((b as { children?: { text?: string }[] }).children ?? []).map(
        (c) => c.text ?? "",
      ),
    )
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min de leitura`;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return { title: "Post não encontrado" };
  }
  const title = post.metaTitle ?? post.title;
  const description = post.metaDescription ?? post.excerpt ?? undefined;
  const ogImage = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : undefined;
  return {
    title,
    description,
    openGraph: {
      title,
      description: description ?? undefined,
      type: "article",
      publishedTime: post.publishedAt,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
      url: `${BASE_URL}/blog/${post.slug.current}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description ?? undefined,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, related] = await Promise.all([
    getPost(slug),
    sanityClient.fetch<PostListItem[]>(RELATED_POSTS_QUERY, { slug }),
  ]);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription ?? post.excerpt,
    image: post.coverImage ? urlFor(post.coverImage).width(1200).url() : undefined,
    datePublished: post.publishedAt,
    author: post.author
      ? { "@type": "Person", name: post.author.name }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "250k",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/apple-icon.png` },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="container mx-auto max-w-3xl px-4 pb-16 pt-10 md:pt-14">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-brand-orange"
        >
          <IconArrowLeft className="size-4" stroke={2.2} />
          Voltar ao conteúdo
        </Link>

        {/* Cabeçalho centralizado */}
        <header className="mt-8 text-center">
          {post.category && (
            <Eyebrow plain className="justify-center">
              {post.category.title}
            </Eyebrow>
          )}
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-primary md:text-5xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {post.excerpt}
            </p>
          )}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {post.author && (
              <span className="flex items-center gap-2">
                {post.author.image ? (
                  <span className="relative size-7 overflow-hidden rounded-full bg-muted">
                    <Image
                      src={urlFor(post.author.image).width(56).height(56).url()}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="28px"
                    />
                  </span>
                ) : (
                  <span className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {post.author.name.charAt(0)}
                  </span>
                )}
                Por {post.author.name}
              </span>
            )}
            <span aria-hidden>·</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1.5">
              <IconClock className="size-4" stroke={1.8} />
              {readingTime(post.body)}
            </span>
          </div>
        </header>

        {/* Hero da matéria */}
        {post.coverImage && (
          <div className="relative mt-10 aspect-16/8 w-full overflow-hidden rounded-3xl bg-muted">
            <Image
              src={urlFor(post.coverImage).width(1100).height(550).url()}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        {/* Vídeo (opcional) */}
        <VideoEmbed url={post.videoUrl} title={post.title} />

        {/* Corpo */}
        <div className="mt-10">
          <PortableText value={post.body ?? undefined} />
        </div>
      </article>

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="container mx-auto max-w-6xl px-4 pb-20">
          <Eyebrow>Continue lendo</Eyebrow>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-primary md:text-3xl">
            Mais da 250K
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ContentCard key={item._id} item={postToFeedItem(item)} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
