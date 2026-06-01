import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  IconArrowLeft,
  IconCalendarEvent,
  IconMapPin,
} from "@tabler/icons-react";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { PortableText } from "@/components/blog/portable-text";
import { VideoEmbed } from "@/components/content/video-embed";
import { sanityClient } from "@/lib/sanity/client";
import { EVENTO_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { parseVideoUrl } from "@/lib/video";
import type { Evento } from "@/lib/sanity/types";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://250k.com.br";

async function getEvento(slug: string): Promise<Evento | null> {
  return sanityClient.fetch<Evento | null>(EVENTO_BY_SLUG_QUERY, { slug });
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const evento = await getEvento(slug);
  if (!evento) {
    return { title: "Evento não encontrado" };
  }
  const description = evento.excerpt ?? undefined;
  const ogImage = evento.coverImage
    ? urlFor(evento.coverImage).width(1200).height(630).url()
    : undefined;
  return {
    title: `${evento.title} | Eventos 250K`,
    description,
    openGraph: {
      title: evento.title,
      description,
      type: "article",
      url: `${BASE_URL}/eventos/${evento.slug.current}`,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function EventoPage({ params }: PageProps) {
  const { slug } = await params;
  const evento = await getEvento(slug);
  if (!evento) notFound();

  const parsedVideo = parseVideoUrl(evento.videoUrl);
  const videoEmbeddable = Boolean(parsedVideo?.embedUrl);

  return (
    <article className="container mx-auto max-w-3xl px-4 pb-16 pt-10 md:pt-14">
      <Link
        href="/blog?tipo=evento"
        className="group inline-flex items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-brand-orange"
      >
        <IconArrowLeft className="size-4" stroke={2.2} />
        Voltar ao conteúdo
      </Link>

      {/* Cabeçalho centralizado */}
      <header className="mt-8 text-center">
        <Eyebrow plain className="justify-center">
          {evento.category?.title ?? "Evento"}
        </Eyebrow>
        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-primary md:text-5xl">
          {evento.title}
        </h1>
        {evento.excerpt && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {evento.excerpt}
          </p>
        )}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          {evento.status && (
            <span className="rounded-md bg-accent/15 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-brand-orange">
              {evento.status}
            </span>
          )}
          {evento.dateLabel && (
            <span className="inline-flex items-center gap-1.5">
              <IconCalendarEvent className="size-4" stroke={1.8} />
              {evento.dateLabel}
            </span>
          )}
          {evento.place && (
            <span className="inline-flex items-center gap-1.5">
              <IconMapPin className="size-4" stroke={1.8} />
              {evento.place}
            </span>
          )}
        </div>
      </header>

      {/* Mídia: vídeo embutido, senão imagem de capa */}
      {videoEmbeddable ? (
        <VideoEmbed url={evento.videoUrl} title={evento.title} />
      ) : (
        evento.coverImage && (
          <div className="relative mt-10 aspect-16/8 w-full overflow-hidden rounded-3xl bg-muted">
            <Image
              src={urlFor(evento.coverImage).width(1100).height(550).url()}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )
      )}

      {/* Vídeo sem embed (ex.: Reels do Instagram) → botão */}
      {parsedVideo && !parsedVideo.embedUrl && (
        <VideoEmbed url={evento.videoUrl} title={evento.title} className="mt-8" />
      )}

      {/* Conteúdo */}
      {evento.body && evento.body.length > 0 && (
        <div className="mt-10">
          <PortableText value={evento.body} />
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 rounded-2xl border border-border bg-card p-8 text-center">
        <p className="text-lg font-semibold text-primary">
          Quer participar dos próximos eventos da 250K?
        </p>
        <Link
          href="/contato"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent/90"
        >
          Fale com a gente
        </Link>
      </div>
    </article>
  );
}
