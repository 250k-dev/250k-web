import type { Metadata } from "next";
import { SolucoesHero } from "@/components/solucoes/solucoes-hero";
import { ProductCard } from "@/components/solucoes/product-card";
import { SolCta } from "@/components/solucoes/sol-cta";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { SOLUCOES } from "@/lib/solucoes/data";
import { archivoSolutionTitle } from "@/lib/fonts/archivo-solution-title";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Soluções | 250k Consultoria Agrícola",
  description:
    "Ecossistema 250K com inteligência agronômica, validação por pesquisa e decisões produtivas: PD-K, Field-K, Finance-K, Solo Chec-K, Certifica-K e 250K Academy.",
};

export default function SolucoesPage() {
  return (
    <>
      <SolucoesHero />

      <div className="container mx-auto max-w-6xl space-y-20 px-4 py-16 md:space-y-28 md:py-24">
        {/* Intro */}
        <section className="grid gap-10 md:grid-cols-[1fr_1.3fr] md:gap-16">
          <div>
            <Eyebrow>Como funciona</Eyebrow>
            <h2
              className={cn(
                archivoSolutionTitle.className,
                "mt-4 text-3xl leading-tight tracking-tight text-primary md:text-5xl",
              )}
              style={{ fontVariationSettings: "'wght' 800" }}
            >
              Seis frentes, um só objetivo: produtividade.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-foreground">
            <p>
              A 250K atua de forma independente, sem viés comercial, validando
              tecnologias em condições reais de lavoura. Cada solução é uma peça
              de um sistema de validação único.
            </p>
            <p>
              Do núcleo de pesquisa (PD-K) à formação de consultores (250K
              Academy), o ecossistema entrega laudos técnicos, relatórios
              comparativos e dados quantitativos reais de campo para a tomada de
              decisão na safra.
            </p>
          </div>
        </section>

        {/* Ecossistema */}
        <section>
          <Eyebrow>O ecossistema</Eyebrow>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUCOES.map((solucao, index) => (
              <ProductCard
                key={solucao.id}
                solucao={solucao}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* CTA */}
        <SolCta title="Pronto para transformar dados em produtividade?" />
      </div>
    </>
  );
}
