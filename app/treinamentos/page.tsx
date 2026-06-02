import type { Metadata } from "next";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { SolCta } from "@/components/solucoes/sol-cta";
import { TreinamentoCard } from "@/components/treinamentos/treinamento-card";
import { sanityClient } from "@/lib/sanity/client";
import { TREINAMENTOS_LIST_QUERY } from "@/lib/sanity/queries";
import type { TreinamentoListItem } from "@/lib/sanity/types";
import { archivoSolutionTitle } from "@/lib/fonts/archivo-solution-title";
import { cn } from "@/lib/utils";

// Revalida periodicamente para refletir novos treinamentos cadastrados no Studio.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Treinamentos | 250k Consultoria Agrícola",
  description:
    "Portfólio de palestras e treinamentos realizados pela 250K: Academia de Consultores, NOITEC, ETEC, workshops de agricultura de precisão e mais.",
};

export default async function TreinamentosPage() {
  const treinamentos = await sanityClient.fetch<TreinamentoListItem[]>(
    TREINAMENTOS_LIST_QUERY,
  );

  return (
    <div className="container mx-auto min-w-0 max-w-6xl px-4 pb-20 pt-4 sm:px-5 sm:pt-6 md:pt-8">
      {/* Intro */}
      <header className="max-w-2xl min-w-0">
        <Eyebrow className="whitespace-normal">Treinamentos · 250K</Eyebrow>
        <h1
          className={cn(
            archivoSolutionTitle.className,
            "mt-4 break-words text-3xl leading-[0.98] tracking-tight text-primary sm:mt-5 sm:text-4xl md:text-6xl",
          )}
          style={{ fontVariationSettings: "'wght' 800" }}
        >
          Conhecimento que vai do dado ao campo.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg md:text-xl">
          Um portfólio das palestras e treinamentos realizados pela 250K —
          formando produtores, consultores e equipes de campo no norte de Mato
          Grosso.
        </p>
      </header>

      {/* Grade */}
      {treinamentos.length === 0 ? (
        <p className="py-16 text-muted-foreground">
          Nenhum treinamento publicado ainda.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {treinamentos.map((treinamento) => (
            <TreinamentoCard key={treinamento._id} treinamento={treinamento} />
          ))}
        </div>
      )}

      {/* CTA */}
      <section className="mt-20 md:mt-24">
        <SolCta
          title="Quer levar um treinamento da 250K para a sua equipe?"
          ctaLabel="Falar com a gente"
          href="/contato"
        />
      </section>
    </div>
  );
}
