import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  IconArrowLeft,
  IconCalendarEvent,
  IconCheck,
  IconMapPin,
  IconUsers,
} from "@tabler/icons-react";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { SolCta } from "@/components/solucoes/sol-cta";
import { VideoEmbed } from "@/components/content/video-embed";
import { PortableText } from "@/components/blog/portable-text";
import { TreinamentoCard } from "@/components/treinamentos/treinamento-card";
import { sanityClient } from "@/lib/sanity/client";
import {
  TREINAMENTO_BY_SLUG_QUERY,
  OTHER_TREINAMENTOS_QUERY,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { parseVideoUrl } from "@/lib/video";
import { archivoSolutionTitle } from "@/lib/fonts/archivo-solution-title";
import type { Treinamento, TreinamentoListItem } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

export const revalidate = 3600;

const displayFont = {
  className: archivoSolutionTitle.className,
  style: { fontVariationSettings: "'wght' 800" } as const,
};

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getTreinamento(slug: string): Promise<Treinamento | null> {
  return sanityClient.fetch<Treinamento | null>(TREINAMENTO_BY_SLUG_QUERY, {
    slug,
  });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const treinamento = await getTreinamento(id);
  if (!treinamento) {
    return { title: "Treinamento não encontrado" };
  }
  return {
    title: `${treinamento.title} | Treinamentos 250K`,
    description: treinamento.summary,
  };
}

export default async function TreinamentoDetailPage({ params }: PageProps) {
  const { id } = await params;
  const [treinamento, others] = await Promise.all([
    getTreinamento(id),
    sanityClient.fetch<TreinamentoListItem[]>(OTHER_TREINAMENTOS_QUERY, {
      slug: id,
    }),
  ]);
  if (!treinamento) notFound();

  const videoEmbeddable = Boolean(parseVideoUrl(treinamento.videoUrl)?.embedUrl);

  const meta = [
    { value: treinamento.date, icon: IconCalendarEvent },
    { value: treinamento.local, icon: IconMapPin },
    { value: treinamento.participants ?? treinamento.audience, icon: IconUsers },
  ].filter((m) => Boolean(m.value));

  return (
    <div className="container mx-auto min-w-0 max-w-5xl px-4 pb-20 pt-4 sm:px-5 sm:pt-6 md:pt-8">
      <Link
        href="/treinamentos"
        className="group inline-flex min-w-0 items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-brand-orange"
      >
        <IconArrowLeft className="size-4 shrink-0" stroke={2.2} />
        <span className="truncate">Todos os treinamentos</span>
      </Link>

      {/* Cabeçalho */}
      <header className="mt-6 min-w-0 max-w-3xl sm:mt-8">
        <Eyebrow className="whitespace-normal">
          {treinamento.tipo} · 250K
        </Eyebrow>
        <h1
          className={cn(
            displayFont.className,
            "mt-4 break-words text-3xl leading-tight tracking-tight text-primary sm:mt-5 sm:text-4xl md:text-6xl",
          )}
          style={displayFont.style}
        >
          {treinamento.title}
        </h1>
        {treinamento.summary && (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg md:text-xl">
            {treinamento.summary}
          </p>
        )}
        {meta.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {meta.map(({ icon: Icon, value }) => (
              <span key={value} className="inline-flex items-center gap-1.5">
                <Icon className="size-4" stroke={1.8} />
                {value}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Mídia: vídeo embutido ou imagem de capa */}
      {videoEmbeddable ? (
        <VideoEmbed url={treinamento.videoUrl} title={treinamento.title} />
      ) : (
        treinamento.coverImage && (
          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl bg-muted sm:mt-10 sm:rounded-3xl">
            <Image
              src={urlFor(treinamento.coverImage).width(1024).height(576).url()}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        )
      )}

      {/* Vídeo sem embed (ex.: Reels) → botão */}
      {treinamento.videoUrl && !videoEmbeddable && (
        <VideoEmbed
          url={treinamento.videoUrl}
          title={treinamento.title}
          className="mt-8"
        />
      )}

      {/* Corpo + tópicos */}
      {(treinamento.body?.length || treinamento.highlights?.length) && (
        <div className="mt-8 grid min-w-0 gap-8 sm:mt-10 sm:gap-10 md:grid-cols-[1.6fr_1fr]">
          <div className="min-w-0">
            <PortableText value={treinamento.body} />
          </div>

          {treinamento.highlights && treinamento.highlights.length > 0 && (
            <aside className="h-fit min-w-0 rounded-2xl border border-border bg-card p-5 sm:p-7">
              <h2 className="text-sm font-bold uppercase tracking-widest text-brand-orange">
                O que foi abordado
              </h2>
              <ul className="mt-4 space-y-3">
                {treinamento.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-foreground"
                  >
                    <IconCheck
                      className="mt-0.5 size-4 shrink-0 text-brand-orange"
                      stroke={2.4}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      )}

      {/* Galeria */}
      {treinamento.gallery && treinamento.gallery.length > 0 && (
        <section className="mt-14">
          <Eyebrow>Galeria</Eyebrow>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {treinamento.gallery.map((image, i) => (
              <div
                key={i}
                className="relative aspect-4/3 overflow-hidden rounded-xl bg-muted"
              >
                <Image
                  src={urlFor(image).width(600).height(450).url()}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Outros treinamentos */}
      {others.length > 0 && (
        <section className="mt-20">
          <Eyebrow>Continue explorando</Eyebrow>
          <h2
            className={cn(
              displayFont.className,
              "mt-3 break-words text-2xl leading-tight tracking-tight text-primary sm:mt-4 sm:text-3xl md:text-4xl",
            )}
            style={displayFont.style}
          >
            Outros treinamentos
          </h2>
          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {others.map((other) => (
              <TreinamentoCard key={other._id} treinamento={other} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mt-20">
        <SolCta
          title="Quer levar este conteúdo para a sua equipe?"
          ctaLabel="Falar com a gente"
          href="/contato"
        />
      </section>
    </div>
  );
}
