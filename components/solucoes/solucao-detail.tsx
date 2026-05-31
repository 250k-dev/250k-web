import Link from "next/link";
import Image from "next/image";
import { IconArrowLeft, IconArrowRight, IconCheck } from "@tabler/icons-react";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { Stat } from "@/components/marketing/stat";
import { BrandName } from "@/components/marketing/brand-name";
import { LinkArrow } from "@/components/marketing/link-arrow";
import { SolCta } from "@/components/solucoes/sol-cta";
import { archivoSolutionTitle } from "@/lib/fonts/archivo-solution-title";
import { whatsappUrl } from "@/lib/whatsapp";
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
    <div className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
      {/* Top */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/solucoes"
          className="group inline-flex items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-brand-orange"
        >
          <IconArrowLeft className="size-4" stroke={2.2} />
          Todas as soluções
        </Link>
        <Eyebrow plain className="text-muted-foreground">
          Ecossistema 250K
        </Eyebrow>
      </div>

      {/* Hero */}
      <section className="mt-8 grid items-center gap-10 md:mt-12 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
        <div>
          <Eyebrow>{solucao.idLabel}</Eyebrow>
          <h1
            className={cn(
              displayFont.className,
              "mt-4 text-5xl leading-[0.96] tracking-tight text-primary md:text-7xl",
            )}
            style={displayFont.style}
          >
            <BrandName name={solucao.name} />
          </h1>
          <p className="mt-5 text-xl font-bold text-primary md:text-2xl">
            {solucao.tagline}
          </p>
          <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-muted-foreground">
            {detail.lead}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {primaryCta ? (
              <Link
                href={primaryCta.href}
                target={primaryCta.external ? "_blank" : undefined}
                rel={primaryCta.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                {primaryCta.label}
                <IconArrowRight className="size-4" stroke={2.2} />
              </Link>
            ) : (
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                Falar com um consultor
                <IconArrowRight className="size-4" stroke={2.2} />
              </Link>
            )}
            <Link
              href={whatsappUrl(`Olá! Tenho interesse na solução ${plainName}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-bold text-foreground transition-colors hover:border-foreground"
            >
              Ver no WhatsApp
            </Link>
          </div>
        </div>

        <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-muted shadow-lg">
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
        <section className="mt-14 max-w-[760px] space-y-5 md:mt-20">
          {detail.paras.map((para, i) => (
            <p key={i} className="text-lg leading-relaxed text-foreground">
              {para}
            </p>
          ))}
        </section>
      )}

      {/* Factors */}
      {detail.factors && (
        <section className="mt-12 max-w-[760px]">
          {detail.factors.title && (
            <p className="text-lg leading-relaxed text-foreground">
              {detail.factors.title}
            </p>
          )}
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {detail.factors.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Stats strip */}
      {detail.stats && detail.stats.length > 0 && (
        <section className="mt-14 grid divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:mt-20">
          {detail.stats.map((stat) => (
            <Stat key={stat.label} {...stat} className="px-8 py-8" />
          ))}
        </section>
      )}

      {/* Como funciona */}
      {detail.steps && detail.steps.length > 0 && (
        <section className="mt-16 md:mt-24">
          <Eyebrow>Como funciona</Eyebrow>
          <h2
            className={cn(
              displayFont.className,
              "mt-4 max-w-[18ch] text-3xl leading-tight tracking-tight text-primary md:text-4xl",
            )}
            style={displayFont.style}
          >
            {detail.stepsTitle ?? "O processo, etapa a etapa."}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {detail.steps.map((step, i) => (
              <article
                key={step.title}
                className="flex items-start gap-5 rounded-2xl border border-border bg-card p-7"
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
        <section className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
          {detail.highlights.map((highlight) => (
            <div
              key={highlight.title}
              className="rounded-2xl border border-brand-orange/30 bg-accent/[0.04] p-7"
            >
              <h3 className="text-sm font-bold uppercase tracking-widest text-brand-orange">
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
        <section className="mt-14 grid gap-6 md:mt-20 md:grid-cols-2">
          {detail.deliverables && detail.deliverables.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-9">
              <h3
                className={cn(
                  displayFont.className,
                  "text-2xl text-primary",
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
            <div className="flex flex-col justify-center rounded-2xl bg-primary p-10 text-primary-foreground">
              <span
                className={cn(displayFont.className, "text-6xl leading-none text-brand-orange")}
                aria-hidden
              >
                &ldquo;
              </span>
              <p
                className={cn(
                  displayFont.className,
                  "mt-4 text-2xl leading-snug tracking-tight text-white md:text-3xl",
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
      <section className="mt-16 md:mt-24">
        <Eyebrow>Continue explorando</Eyebrow>
        <h2
          className={cn(
            displayFont.className,
            "mt-4 text-3xl leading-tight tracking-tight text-primary md:text-4xl",
          )}
          style={displayFont.style}
        >
          Outras soluções do ecossistema
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((other) => (
            <Link
              key={other.id}
              href={`/solucoes/${other.id}`}
              className="group flex flex-col gap-2 rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <span
                className={cn(displayFont.className, "text-2xl text-primary")}
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
            </Link>
          ))}
        </div>
      </section>

      {/* Contextual CTA */}
      <section className="mt-16 md:mt-24">
        <SolCta title={`Quer aplicar ${plainName} na sua fazenda?`} />
      </section>
    </div>
  );
}
