import type { Metadata } from "next";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { SolCta } from "@/components/solucoes/sol-cta";
import { TreinamentoCard } from "@/components/treinamentos/treinamento-card";
import { TREINAMENTOS } from "@/lib/treinamentos/data";
import { archivoSolutionTitle } from "@/lib/fonts/archivo-solution-title";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Treinamentos | 250k Consultoria Agrícola",
  description:
    "Portfólio de palestras e treinamentos realizados pela 250K: Academia de Consultores, NOITEC, ETEC, workshops de agricultura de precisão e mais.",
};

export default function TreinamentosPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 pb-20 pt-10 md:pt-16">
      {/* Intro */}
      <header className="max-w-2xl">
        <Eyebrow>Treinamentos · 250K</Eyebrow>
        <h1
          className={cn(
            archivoSolutionTitle.className,
            "mt-5 text-4xl leading-[0.98] tracking-tight text-primary md:text-6xl",
          )}
          style={{ fontVariationSettings: "'wght' 800" }}
        >
          Conhecimento que vai do dado ao campo.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
          Um portfólio das palestras e treinamentos realizados pela 250K —
          formando produtores, consultores e equipes de campo no norte de Mato
          Grosso.
        </p>
      </header>

      {/* Grade */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TREINAMENTOS.map((treinamento) => (
          <TreinamentoCard key={treinamento.id} treinamento={treinamento} />
        ))}
      </div>

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
