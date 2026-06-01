import type { Metadata } from "next";
import { IconCheck } from "@tabler/icons-react";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { SolCta } from "@/components/solucoes/sol-cta";
import { archivoSolutionTitle } from "@/lib/fonts/archivo-solution-title";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sobre | 250k Consultoria Agrícola",
  description:
    "A 250K é um hub de inteligência agronômica que transforma ciência de campo em decisões produtivas e rentáveis na soja e no milho do norte de Mato Grosso.",
};

const displayFont = {
  className: archivoSolutionTitle.className,
  style: { fontVariationSettings: "'wght' 800" } as const,
};

const EQUATION = {
  parts: [
    { n: "85", l: "sacas de soja" },
    { n: "165", l: "sacas de milho" },
  ],
  total: { n: "250", l: "sacas por safra" },
  note: "O potencial de produtividade em áreas totalmente preparadas e mapeadas. Daí vem o nosso nome.",
} as const;

const QUEM_SOMOS = [
  "Atuamos lado a lado com o produtor para elevar produtividade, eficiência e lucro — por meio de um sistema produtivo personalizado e descomplicado, entendendo os desafios reais da sua área.",
  "Acreditamos que ambientes totalmente preparados podem atingir tetos altos de produtividade: 85 sacas de soja somadas a 165 de milho, com potencial de 250 sacas por safra em áreas mapeadas.",
] as const;

const PILARES: { k: string; t: string; list?: string[] }[] = [
  {
    k: "Missão",
    t: "Elevar a agricultura a novos patamares — alta performance, rentabilidade e práticas sustentáveis através de serviços especializados.",
  },
  {
    k: "Visão",
    t: "Ser a principal empresa de soluções tecnológicas para a agricultura no Mato Grosso, focada em alta performance e lucratividade.",
  },
  {
    k: "Valores",
    t: "O que nos move no campo e fora dele.",
    list: [
      "Ética e integridade",
      "Dedicação e resiliência",
      "Inovação contínua",
      "Adaptabilidade",
    ],
  },
];

const TIMELINE = [
  {
    year: "2023",
    tag: "Abertura",
    title: "Consultoria e pesquisa",
    desc: "Nasce a 250K com uma tese: transformar ciência de campo em decisões produtivas.",
    points: ["Fundação da consultoria", "Primeiras parcelas de pesquisa"],
  },
  {
    year: "2024",
    tag: "Expansão",
    title: "Novas regiões e precisão",
    desc: "Mais tecnologia e um passo estratégico: agricultura de precisão.",
    points: ["Agricultura de precisão", "Alta Floresta", "Marcelândia"],
  },
  {
    year: "2025",
    tag: "Consolidação",
    title: "Escala e reconhecimento",
    desc: "Consolidação no mercado, com consistência de resultados.",
    points: ["Consultoria regional", "Primeiro milhão"],
  },
  {
    year: "2026",
    tag: "Ecossistema",
    title: "Um ecossistema completo",
    desc: "Reposicionamento estratégico das soluções e fundação da 250K Academy.",
    points: ["Ecossistema de soluções", "250K Academy"],
  },
];

export default function SobrePage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 pb-20 pt-10 md:pt-16">
      {/* Intro */}
      <section className="max-w-3xl">
        <Eyebrow>Sobre · 250K</Eyebrow>
        <h1
          className={cn(
            displayFont.className,
            "mt-5 text-4xl leading-[0.98] tracking-tight text-primary md:text-6xl",
          )}
          style={displayFont.style}
        >
          Inteligência agronômica junto ao produtor rural.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Um hub que transforma ciência de campo em decisões produtivas e
          rentáveis — na soja e no milho do norte de Mato Grosso.
        </p>
      </section>

      {/* Manifesto */}
      <section className="mt-20 grid gap-10 md:mt-28 md:grid-cols-[1fr_1.6fr] md:gap-16">
        <div>
          <Eyebrow>Por que existimos</Eyebrow>
        </div>
        <div className="space-y-6">
          <p
            className={cn(displayFont.className, "text-2xl text-primary md:text-3xl")}
            style={{ fontVariationSettings: "'wght' 700" }}
          >
            Nascemos de uma inquietação simples.
          </p>
          <p className="text-xl leading-relaxed text-foreground">
            Por que, mesmo com tanta tecnologia, o produtor não consegue explorar
            o potencial da sua área?
          </p>
          <p
            className={cn(
              displayFont.className,
              "text-3xl leading-tight tracking-tight text-primary md:text-5xl",
            )}
            style={displayFont.style}
          >
            A resposta não está na falta de insumos. Está na{" "}
            <span className="text-brand-orange">falta de método</span>.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Dessa necessidade nasce a 250K — um hub de inteligência agronômica
            que transforma ciência em resultados práticos e rentáveis.
          </p>
        </div>
      </section>

      {/* Equação de marca */}
      <section className="mt-20 md:mt-28">
        <div className="grid gap-12 rounded-3xl bg-primary px-7 py-14 text-primary-foreground md:grid-cols-[1.3fr_1fr] md:gap-10 md:px-14 md:py-16">
          <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
            {EQUATION.parts.map((part, i) => (
              <div key={part.l} className="flex items-end gap-x-6">
                <div>
                  <div
                    className={cn(
                      displayFont.className,
                      "text-5xl tracking-tight text-white md:text-7xl",
                    )}
                    style={displayFont.style}
                  >
                    {part.n}
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                    {part.l}
                  </div>
                </div>
                <span
                  className={cn(
                    displayFont.className,
                    "pb-6 text-4xl text-white/40 md:text-5xl",
                  )}
                >
                  {i === 0 ? "+" : "="}
                </span>
              </div>
            ))}
            <div>
              <div
                className={cn(
                  displayFont.className,
                  "text-5xl tracking-tight text-brand-orange md:text-7xl",
                )}
                style={displayFont.style}
              >
                {EQUATION.total.n}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                {EQUATION.total.l}
              </div>
            </div>
          </div>

          <div>
            <Eyebrow onDark>A conta por trás do nome</Eyebrow>
            <p className="mt-5 leading-relaxed text-white/70">{EQUATION.note}</p>
            <div
              className={cn(displayFont.className, "mt-6 text-xl text-white")}
              style={{ fontVariationSettings: "'wght' 700" }}
            >
              250<span className="text-brand-orange">K</span> · 250 sacas, no{" "}
              <span className="text-brand-orange">K</span>ampo.
            </div>
          </div>
        </div>
      </section>

      {/* Quem somos */}
      <section className="mt-20 grid gap-10 md:mt-28 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <div>
          <Eyebrow>Quem somos</Eyebrow>
          <h2
            className={cn(
              displayFont.className,
              "mt-4 text-3xl leading-tight tracking-tight text-primary md:text-5xl",
            )}
            style={displayFont.style}
          >
            Lado a lado com o produtor.
          </h2>
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-foreground">
          {QUEM_SOMOS.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      {/* Pilares */}
      <section className="mt-16 grid gap-6 md:mt-20 md:grid-cols-3">
        {PILARES.map((pilar) => (
          <article
            key={pilar.k}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <h3
              className={cn(
                displayFont.className,
                "flex items-center gap-2.5 text-2xl text-primary",
              )}
              style={displayFont.style}
            >
              <span
                className="size-3 shrink-0 rounded-[3px] bg-brand-orange"
                aria-hidden
              />
              {pilar.k}
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">{pilar.t}</p>
            {pilar.list && (
              <ul className="mt-5 space-y-2.5">
                {pilar.list.map((item) => (
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
          </article>
        ))}
      </section>

      {/* Timeline */}
      <section className="mt-20 md:mt-28">
        <Eyebrow>Nossa trajetória</Eyebrow>
        <h2
          className={cn(
            displayFont.className,
            "mt-4 text-3xl leading-tight tracking-tight text-primary md:text-5xl",
          )}
          style={displayFont.style}
        >
          Evolução da 250K · 2023 → 2026
        </h2>

        <div className="relative mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Linha conectora (apenas no desktop largo) */}
          <span
            className="absolute inset-x-[12%] top-7 hidden h-px bg-border lg:block"
            aria-hidden
          />
          {TIMELINE.map((node) => (
            <div key={node.year} className="relative flex flex-col">
              <span
                className={cn(
                  displayFont.className,
                  "relative z-10 mb-5 flex size-14 items-center justify-center self-center rounded-full border-2 border-brand-orange bg-background text-lg text-brand-orange",
                )}
                style={displayFont.style}
              >
                {node.year}
              </span>
              <div className="flex-1 rounded-2xl border border-border bg-card p-6">
                <div
                  className={cn(displayFont.className, "text-3xl text-primary")}
                  style={displayFont.style}
                >
                  {node.year}
                </div>
                <span className="mt-2 inline-block rounded-md bg-primary/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-primary">
                  {node.tag}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-primary">
                  {node.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {node.desc}
                </p>
                <ul className="mt-4 space-y-2">
                  {node.points.map((point) => (
                    <li
                      key={point}
                      className="relative pl-5 text-sm text-foreground before:absolute before:left-0 before:top-[0.55em] before:size-[6px] before:rounded-[2px] before:bg-brand-orange"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20 md:mt-28">
        <SolCta
          title="Vamos elevar o teto de produtividade da sua área?"
          ctaLabel="Conhecer as soluções"
          href="/solucoes"
        />
      </section>
    </div>
  );
}
