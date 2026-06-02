import Link from "next/link";
import Image from "next/image";
import { IconArrowLeft, IconArrowRight, IconCheck } from "@tabler/icons-react";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { Stat } from "@/components/marketing/stat";
import { BrandName } from "@/components/marketing/brand-name";
import { LinkArrow } from "@/components/marketing/link-arrow";
import { SolCta } from "@/components/solucoes/sol-cta";
import { archivoSolutionTitle } from "@/lib/fonts/archivo-solution-title";
import type { Solucao } from "@/lib/solucoes/data";
import { cn } from "@/lib/utils";

const displayFont = {
  className: archivoSolutionTitle.className,
  style: { fontVariationSettings: "'wght' 800" } as const,
};

export function SolucaoDetail({
  solucao,
  others,
}: {
  solucao: Solucao;
  others: Solucao[];
}) {
  const { detail } = solucao;
  const plainName = solucao.name;
  const primaryCta = detail.cta;

  return (
    <div className="container mx-auto min-w-0 max-w-6xl px-4 pb-8 pt-4 sm:px-5 sm:pb-10 sm:pt-6 md:pb-14 md:pt-8">
      {/* Top */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <Link
          href="/solucoes"
          className="group inline-flex min-w-0 items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-brand-orange"
        >
          <IconArrowLeft className="size-4 shrink-0" stroke={2.2} />
          <span className="truncate">Todas as soluções</span>
        </Link>
        <Eyebrow
          plain
          className="shrink-0 self-start whitespace-normal text-muted-foreground sm:self-auto"
        >
          Ecossistema 250K
        </Eyebrow>
      </div>

      {/* Hero */}
      <section className="mt-6 grid min-w-0 items-center gap-8 sm:mt-8 md:mt-12 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
        <div className="min-w-0 order-2 md:order-1">
          <Eyebrow className="whitespace-normal">{solucao.idLabel}</Eyebrow>
          <h1
            className={cn(
              displayFont.className,
              "mt-3 break-words text-3xl leading-[0.98] tracking-tight text-primary sm:mt-4 sm:text-4xl md:text-5xl lg:text-7xl",
            )}
            style={displayFont.style}
          >
            <BrandName name={solucao.name} />
          </h1>
          <p className="mt-4 text-lg font-bold leading-snug text-primary sm:mt-5 sm:text-xl md:text-2xl">
            {solucao.tagline}
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg">
            {detail.lead}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            {primaryCta ? (
              <Link
                href={primaryCta.href}
                target={primaryCta.external ? "_blank" : undefined}
                rel={primaryCta.external ? "noopener noreferrer" : undefined}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent/90 sm:w-auto sm:px-6"
              >
                {primaryCta.label}
                <IconArrowRight className="size-4 shrink-0" stroke={2.2} />
              </Link>
            ) : (
              <Link
                href="/contato"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent/90 sm:w-auto sm:px-6"
              >
                Falar com um consultor
                <IconArrowRight className="size-4 shrink-0" stroke={2.2} />
              </Link>
            )}
          </div>
        </div>

        <div className="relative order-1 min-w-0 aspect-video overflow-hidden rounded-2xl bg-muted shadow-lg sm:rounded-3xl md:order-2 md:aspect-4/5">
          {solucao.video ? (
            <iframe
              src={`https://www.youtube.com/embed/${solucao.video}`}
              title={`Vídeo — ${plainName}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <Image
              src={solucao.imageSrc}
              alt={solucao.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
              quality={90}
            />
          )}
        </div>
      </section>

      {/* Intro paras */}
      {detail.paras.length > 0 && (
        <section className="mt-10 min-w-0 max-w-[760px] space-y-4 sm:mt-14 sm:space-y-5 md:mt-20">
          {detail.paras.map((para, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-foreground sm:text-lg"
            >
              {para}
            </p>
          ))}
        </section>
      )}

      {/* Factors */}
      {detail.factors && (
        <section className="mt-10 min-w-0 max-w-[760px] sm:mt-12">
          {detail.factors.title && (
            <p className="text-base leading-relaxed text-foreground sm:text-lg">
              {detail.factors.title}
            </p>
          )}
          <ul className="mt-4 flex flex-wrap gap-2">
            {detail.factors.items.map((item) => (
              <li
                key={item}
                className="max-w-full rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground sm:px-4 sm:py-2 sm:text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Stats strip */}
      {detail.stats && detail.stats.length > 0 && (
        <section className="mt-10 grid divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card sm:mt-14 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:mt-20">
          {detail.stats.map((stat) => (
            <Stat
              key={stat.label}
              {...stat}
              className="px-5 py-6 sm:px-8 sm:py-8"
            />
          ))}
        </section>
      )}

      {/* Como funciona */}
      {detail.steps && detail.steps.length > 0 && (
        <section className="mt-12 min-w-0 md:mt-24">
          <Eyebrow className="whitespace-normal">Como funciona</Eyebrow>
          <h2
            className={cn(
              displayFont.className,
              "mt-3 break-words text-2xl leading-tight tracking-tight text-primary sm:mt-4 sm:text-3xl md:max-w-[18ch] md:text-4xl",
            )}
            style={displayFont.style}
          >
            {detail.stepsTitle ?? "O processo, etapa a etapa."}
          </h2>
          <div className="mt-6 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2">
            {detail.steps.map((step, i) => (
              <article
                key={step.title}
                className="flex min-w-0 items-start gap-4 rounded-2xl border border-border bg-card p-4 sm:gap-5 sm:p-7"
              >
                <span
                  className={cn(
                    displayFont.className,
                    "flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-lg text-brand-orange",
                  )}
                  style={displayFont.style}
                >
                  {`0${i + 1}`}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-primary">
                    {step.title}
                  </h3>
                  {step.desc && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.desc}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Highlights */}
      {detail.highlights && detail.highlights.length > 0 && (
        <section className="mt-10 grid min-w-0 gap-4 sm:mt-12 sm:gap-6 md:mt-16 md:grid-cols-2">
          {detail.highlights.map((highlight) => (
            <div
              key={highlight.title}
              className="min-w-0 rounded-2xl border border-brand-orange/30 bg-accent/[0.04] p-4 sm:p-7"
            >
              <h3 className="text-xs font-bold uppercase leading-snug tracking-wide text-brand-orange sm:text-sm sm:tracking-widest">
                {highlight.title}
              </h3>
              {highlight.body && (
                <p className="mt-3 text-base leading-relaxed text-foreground">
                  {highlight.body}
                </p>
              )}
              {highlight.items && (
                <ul className="mt-4 space-y-2">
                  {highlight.items.map((item) => (
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
              )}
              {highlight.note && (
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {highlight.note}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Deliverables + quote */}
      {(detail.deliverables?.length || detail.quote) && (
        <section className="mt-10 grid min-w-0 gap-4 sm:mt-14 sm:gap-6 md:mt-20 md:grid-cols-2">
          {detail.deliverables && detail.deliverables.length > 0 && (
            <div className="min-w-0 rounded-2xl border border-border bg-card p-5 sm:p-9">
              <h3
                className={cn(
                  displayFont.className,
                  "text-xl text-primary sm:text-2xl",
                )}
                style={displayFont.style}
              >
                O que você recebe
              </h3>
              <ul className="mt-6 space-y-4">
                {detail.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground">
                    <IconCheck
                      className="mt-1 size-5 shrink-0 text-brand-orange"
                      stroke={2.4}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {detail.quote && (
            <div className="flex min-w-0 flex-col justify-center rounded-2xl bg-primary p-6 text-primary-foreground sm:p-10">
              <span
                className={cn(
                  displayFont.className,
                  "text-4xl leading-none text-brand-orange sm:text-6xl",
                )}
                aria-hidden
              >
                &ldquo;
              </span>
              <p
                className={cn(
                  displayFont.className,
                  "mt-3 text-lg leading-snug tracking-tight text-white sm:mt-4 sm:text-2xl md:text-3xl",
                )}
                style={{ fontVariationSettings: "'wght' 700" }}
              >
                {detail.quote}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Other solutions */}
      <section className="mt-12 min-w-0 md:mt-24">
        <Eyebrow className="whitespace-normal">Continue explorando</Eyebrow>
        <h2
          className={cn(
            displayFont.className,
            "mt-3 break-words text-2xl leading-tight tracking-tight text-primary sm:mt-4 sm:text-3xl md:text-4xl",
          )}
          style={displayFont.style}
        >
          Outras soluções do ecossistema
        </h2>
        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {others.map((other) => {
            const cardClass =
              "group flex min-w-0 flex-col gap-2 rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-6";
            const inner = (
              <>
                <span
                  className={cn(
                    displayFont.className,
                    "break-words text-xl text-primary sm:text-2xl",
                  )}
                  style={displayFont.style}
                >
                  <BrandName name={other.name} />
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {other.tagline}
                </span>
                <span className="mt-2">
                  <LinkArrow>Conhecer</LinkArrow>
                </span>
              </>
            );
            return other.externalUrl ? (
              <a
                key={other.id}
                href={other.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
              >
                {inner}
              </a>
            ) : (
              <Link key={other.id} href={`/solucoes/${other.id}`} className={cardClass}>
                {inner}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Contextual CTA */}
      <section className="mt-12 min-w-0 md:mt-24">
        <SolCta title={`Quer aplicar ${plainName} na sua fazenda?`} />
      </section>
    </div>
  );
}
