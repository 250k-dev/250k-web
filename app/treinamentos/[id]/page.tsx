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
import { TreinamentoCard } from "@/components/treinamentos/treinamento-card";
import {
  TREINAMENTOS,
  getTreinamento,
  getOtherTreinamentos,
} from "@/lib/treinamentos/data";
import { parseVideoUrl } from "@/lib/video";
import { archivoSolutionTitle } from "@/lib/fonts/archivo-solution-title";
import { cn } from "@/lib/utils";

const displayFont = {
  className: archivoSolutionTitle.className,
  style: { fontVariationSettings: "'wght' 800" } as const,
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return TREINAMENTOS.map((t) => ({ id: t.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const treinamento = getTreinamento(id);
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
  const treinamento = getTreinamento(id);
  if (!treinamento) notFound();

  const others = getOtherTreinamentos(id);
  const videoEmbeddable = Boolean(parseVideoUrl(treinamento.videoUrl)?.embedUrl);

  const meta = [
    { icon: IconCalendarEvent, value: treinamento.date },
    { icon: IconMapPin, value: treinamento.local },
    { icon: IconUsers, value: treinamento.participants ?? treinamento.audience },
  ];

  return (
    <div className="container mx-auto max-w-5xl px-4 pb-20 pt-10 md:pt-14">
      <Link
        href="/treinamentos"
        className="group inline-flex items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-brand-orange"
      >
        <IconArrowLeft className="size-4" stroke={2.2} />
        Todos os treinamentos
      </Link>

      {/* Cabeçalho */}
      <header className="mt-8 max-w-3xl">
        <Eyebrow>{treinamento.tipo} · 250K</Eyebrow>
        <h1
          className={cn(
            displayFont.className,
            "mt-5 text-4xl leading-[1] tracking-tight text-primary md:text-6xl",
          )}
          style={displayFont.style}
        >
          {treinamento.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
          {treinamento.summary}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {meta.map(({ icon: Icon, value }) => (
            <span key={value} className="inline-flex items-center gap-1.5">
              <Icon className="size-4" stroke={1.8} />
              {value}
            </span>
          ))}
        </div>
      </header>

      {/* Mídia: vídeo embutido ou imagem de capa */}
      {videoEmbeddable ? (
        <VideoEmbed url={treinamento.videoUrl} title={treinamento.title} />
      ) : (
        <div className="relative mt-10 aspect-16/9 w-full overflow-hidden rounded-3xl bg-muted">
          <Image
            src={treinamento.coverImage}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
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
      <div className="mt-10 grid gap-10 md:grid-cols-[1.6fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-foreground">
          {treinamento.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {treinamento.highlights && treinamento.highlights.length > 0 && (
          <aside className="h-fit rounded-2xl border border-border bg-card p-7">
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

      {/* Galeria */}
      {treinamento.gallery && treinamento.gallery.length > 0 && (
        <section className="mt-14">
          <Eyebrow>Galeria</Eyebrow>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {treinamento.gallery.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative aspect-4/3 overflow-hidden rounded-xl bg-muted"
              >
                <Image
                  src={src}
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
              "mt-4 text-3xl leading-tight tracking-tight text-primary md:text-4xl",
            )}
            style={displayFont.style}
          >
            Outros treinamentos
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <TreinamentoCard key={other.id} treinamento={other} />
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
