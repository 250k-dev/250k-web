import type { Metadata } from "next";
import { AboutBlock } from "@/components/about/about-block";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { SolucoesHero } from "@/components/solucoes/solucoes-hero";
import { SolucoesAnchorNav } from "@/components/solucoes/solucoes-anchor-nav";
import { SolucoesFirstScrollProvider } from "@/components/solucoes/solucoes-first-scroll-context";
import { archivoSolutionTitle } from "@/lib/fonts/archivo-solution-title";
import { cn } from "@/lib/utils";

const PD_IMAGE = "/images/post/pd-k-post.png";
const FIELD_IMAGE = "/images/post/field-k-post.png";
const FINANCE_IMAGE = "/images/post/finance-k-post.png";
const CERTIFICA_IMAGE = "/images/post/certifica-k-post.png";
const ACADEMY_IMAGE = "/images/post/250k-academy-post.png";

const solucoesSectionTitleProps = {
  titleClassName: cn(
    archivoSolutionTitle.className,
    "text-2xl md:text-5xl text-primary",
  ),
  titleStyle: {
    fontVariationSettings: "'wght' 800, 'wdth' 125",
  } as const,
  brandOrangeK: true,
  animateBrandKOnFirstScroll: true,
} as const;

/** Posts em formato vertical: área mais alta e contain para mostrar a arte inteira. */
const SOLUCOES_POST_IMAGE_LAYOUT = {
  imageWrapperClassName:
    "w-full aspect-[4/5] md:aspect-auto md:min-h-[520px] lg:min-h-[600px]",
  imageClassName: "object-contain object-center",
} as const;

export const metadata: Metadata = {
  title: "Soluções | 250k Consultoria Agrícola",
  description:
    "Ecossistema 250K com inteligência agronômica, validação por pesquisa e decisões produtivas: PD-K, Field-K, Finance-K, Solo Chec-K, Certifica-K e 250K Academy.",
};

export default function SolucoesPage() {
  return (
    <SolucoesFirstScrollProvider>
      <SolucoesHero />
      <SolucoesAnchorNav />

      <div className="container mx-auto px-4 max-w-6xl py-12 md:py-16 space-y-20 md:space-y-24">
        <section id="pd-k">
          <AboutBlock
            title="PDK"
            {...solucoesSectionTitleProps}
            imageSrc={PD_IMAGE}
            imageAlt="Pesquisa e desenvolvimento agronômico"
            layout="newspaper"
            content={
              <>
                <h3 className="text-lg font-semibold text-primary pt-2">
                  Inteligência agrícola aplicada à decisão no campo
                </h3>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  Onde a insegurança da escolha se transforma em produtividade
                  na lavoura.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  A PD-K é o núcleo de pesquisa e inteligência agronômica da
                  250K, criado para transformar dados reais de campo em decisões
                  mais seguras e produtivas para as culturas de soja e milho.
                  Atuamos de forma independente, sem viés comercial, validando
                  tecnologias em condições reais de lavoura para entregar
                  informações técnicas confiáveis ao produtor rural.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Realizamos mais de 600 parcelas em campo por safra, com rigor
                  científico, para avaliar a influência de:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Fungicidas</li>
                  <li>Inseticidas</li>
                  <li>Herbicidas</li>
                  <li>Tratamento de Sementes</li>
                  <li>Estratégias de manejo integrado</li>
                </ul>

                <p className="text-primary font-semibold">
                  Nossos estudos já apontaram até 40% de redução na incidência
                  de podridão de grãos através do posicionamento correto de
                  manejo.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  A PD-K reúne um dos maiores acervos técnicos independentes em
                  soja e milho do norte de Mato Grosso, transformando dados de
                  campo em recomendações práticas, estratégicas e aplicáveis à
                  realidade do produtor. Parceiros e clientes têm acesso a
                  laudos técnicos, relatórios comparativos, dados quantitativos
                  reais de campo e insights estratégicos para tomada de decisão
                  na safra.
                </p>

                <div className="rounded-xl border border-brand-orange/30 bg-brand-orange/5 p-5 space-y-3">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl font-extrabold text-brand-orange tabular-nums">
                      R$ 5,5 Mi
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      investidos em Pesquisa &amp; Desenvolvimento
                    </span>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {[
                      { ano: "2024", valor: "R$ 2,2 Mi" },
                      { ano: "2025", valor: "R$ 2,5 Mi" },
                      { ano: "2026", valor: "R$ 0,8 Mi" },
                    ].map(({ ano, valor }) => (
                      <li
                        key={ano}
                        className="rounded-lg border border-brand-orange/20 bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground"
                      >
                        {valor}{" "}
                        <span className="text-brand-orange">{ano}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Fortalecendo uma estrutura baseada em rigor científico,
                    análise estatística robusta, rastreabilidade de dados e uma
                    equipe técnica altamente especializada.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-brand-orange">
                    Somos um sistema de validação único
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "Metodologia com delineamento experimental e análise estatística robusta",
                      "Sistema Avalia (padronização, rastreabilidade e consistência de dados)",
                      "Equipe Técnica altamente especializada",
                      "Direção Técnica com experiência prática e científica",
                      "Independência total de empresas de insumo",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-semibold text-primary pt-1">
                    E você pode ter acesso a todas essas informações.
                  </p>
                </div>
              </>
            }
          />
        </section>

        <section id="field-k">
          <AboutBlock
            title="FIELDK"
            {...solucoesSectionTitleProps}
            imageSrc={FIELD_IMAGE}
            imageAlt="Execução e validação no campo"
            reverse
            className="mt-20"
            {...SOLUCOES_POST_IMAGE_LAYOUT}
            content={
              <>
                <h3 className="text-lg font-semibold text-primary pt-2">
                  Complexo no campo. Simples na decisão.
                </h3>
                <p className="text-muted-foreground leading-relaxed text-justify">
                  A Field-K transforma excesso de informação em recomendações
                  claras, precisas e lucrativas para o produtor.
                </p>
                <p className="text-muted-foreground leading-relaxed text-justify">
                  Reunimos em um modelo descomplicado, todas as etapas, fases e
                  relação de insumos para que você não perca o timing da sua
                  lavoura.
                </p>
                <p className="text-primary font-semibold leading-relaxed text-justify">
                  Temos como propósito entregar ao nosso produtor um plano de
                  safra descomplicado, focado na eficiência operacional,
                  validado com informações de campo do nosso centro de Pesquisa
                  e Desenvolvimento (PD-K).
                </p>

                <p className="text-muted-foreground leading-relaxed pt-2">
                  Atuamos diretamente nas decisões que mais impactam o resultado
                  da sua fazenda:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Planejamento de Safra</li>
                  <li>Relação de Compra de Insumos</li>
                  <li>
                    Posicionamento de Produto (volume e timing de aplicação)
                  </li>
                  <li>Coordenação Operacional</li>
                </ul>

                <div className="rounded-xl border border-brand-orange/30 bg-brand-orange/5 px-5 py-4">
                  <p className="text-sm font-semibold text-primary leading-relaxed">
                    Nossa metodologia está assegurada pelo plano de
                    desenvolvimento 250K{" "}
                    <span className="text-brand-orange">(85 sacas de soja + 165 sacas de milho)</span>{" "}
                    e estruturado pelos protocolos técnicos de pesquisa.
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed pt-2">
                  A Consultoria Field-K consta com:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Segurança na Informação</li>
                  <li>Metodologia de Trabalho</li>
                  <li>Experiência no campo</li>
                  <li>
                    Validação da entrega pelo CEO José Paschoal (uma das maiores
                    autoridades nas culturas de soja e milho da região norte do
                    estado de Mato Grosso).
                  </li>
                </ul>

                <p className="text-primary font-semibold pt-2">
                  Transformamos a sua execução para colher resultados em campo.
                </p>
              </>
            }
          />
        </section>

        <section id="finance-k">
          <AboutBlock
            title="FINANCEK"
            {...solucoesSectionTitleProps}
            imageSrc={FINANCE_IMAGE}
            imageAlt="Inteligência de compra de insumos agrícolas"
            reverse
            {...SOLUCOES_POST_IMAGE_LAYOUT}
            content={
              <>
                <h3 className="text-lg font-semibold text-primary pt-2">
                  A inteligência de compra para sua maior rentabilidade
                </h3>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  Aqui o seu lucro começa antes do plantio.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  A Finance-K é uma estrutura de inteligência da 250K que
                  transforma compra de insumos em estratégias de lucro.
                </p>

                <div className="flex flex-wrap gap-3 pt-1">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-sm font-semibold text-primary">
                    <span className="text-brand-orange">−</span> Menos custo
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-sm font-semibold text-primary">
                    <span className="text-brand-orange">+</span> Mais lucro
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-brand-orange/40 bg-brand-orange/8 px-3 py-1.5 text-sm font-semibold text-primary">
                    Sua maior margem por hectare
                  </span>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Decisões sem estratégia geram maiores custos. Comprar com
                  assertividade te proporciona maiores margens de lucro.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Delegue para quem tem o timing do mercado, maior barganha de
                  negociação e acesso a diversos mapas de cotação.
                </p>

                <div className="rounded-xl border border-yellow-500/40 bg-yellow-500/8 px-5 py-4 space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-yellow-600 dark:text-yellow-400">
                    Exclusividade
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    Uma solução exclusiva para os clientes do programa 250K
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Padronize suas compras, garanta assertividade e tenha um
                  planejamento completo de insumos para uma safra mais lucrativa.
                </p>

                <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-brand-orange">
                    A Finance-K entrega um processo estruturado em 4 etapas
                  </h4>
                  <ol className="space-y-2">
                    {[
                      "Definição do pacote técnico",
                      "Mapa de cotação com múltiplos fornecedores",
                      "Negociação em escala",
                      "Pedido direto ao produtor (rastreável e entregue na sua fazenda)",
                    ].map((item, i) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange text-[10px] font-bold text-white">
                          {i + 1}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>

                <p className="text-primary font-semibold pt-1">
                  O timing perfeito para as suas compras.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Garantimos transparência, controle de entrega, comunicação
                  formal e documentada e pagamento somente após entrega.
                </p>

                <p className="text-primary font-semibold pt-1">
                  Faça parte da Finance-K e transforme a sua compra em
                  estratégia de lucro.
                </p>
              </>
            }
          />
        </section>

        <section id="solo-chec-k">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center md:grid-flow-dense">
            {/* Vídeo — coluna direita no desktop */}
            <div className="md:col-start-2 flex justify-center">
              <div className="w-full max-w-[280px] sm:max-w-[320px]">
                <div className="relative overflow-hidden rounded-2xl bg-muted" style={{ aspectRatio: "9/16" }}>
                  <iframe
                    src="https://www.youtube.com/embed/dvgpLyrzd2o"
                    title="Solo Chec-K — Agricultura de Precisão"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>
            </div>

            {/* Texto — coluna esquerda no desktop */}
            <div className="md:col-start-1 md:row-start-1">
              <h2 className="mb-4">
                <span
                  className={cn(archivoSolutionTitle.className, "text-2xl md:text-5xl text-primary")}
                  style={{ fontVariationSettings: "'wght' 800, 'wdth' 125" }}
                >
                  SOLO CHEC<span className="text-brand-orange">K</span>
                </span>
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Agricultura de Precisão para decisões operacionais com base em
                  dados de campo.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-accent font-semibold">Mapeamento de fertilidade</h3>
                    <p className="text-muted-foreground mt-1">
                      Utilizamos amostragem e interpolação para gerar mapas que
                      orientam recomendações de manejo e insumos.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-accent font-semibold">Precisão na Coleta</h3>
                    <p className="text-muted-foreground mt-1">
                      Padrão de coleta e georreferenciamento para garantir
                      representatividade e rastreabilidade dos dados.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-accent font-semibold">Mapeamento de compactação</h3>
                    <p className="text-muted-foreground mt-1">
                      Análises de compactação para melhorar crescimento
                      radicular, infiltração e armazenamento de água.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="certifica-k">
          <AboutBlock
            title="CERTIFICAK"
            {...solucoesSectionTitleProps}
            imageSrc={CERTIFICA_IMAGE}
            imageAlt="Certificação de Fazendas Produtivas"
            {...SOLUCOES_POST_IMAGE_LAYOUT}
            content={
              <>
                <p className="text-muted-foreground leading-relaxed">
                  Certificação de Fazendas Produtivas baseada em dados,
                  validação técnica e rastreabilidade de processos.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Governança e consistência de registros</li>
                  <li>Validação por critérios técnicos</li>
                  <li>Relatórios e evidências para auditoria</li>
                </ul>
                <div className="pt-2">
                  <Button
                    asChild
                    className="mt-6 bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Link href="/questionario">
                      Quero avaliar minha fazenda
                    </Link>
                  </Button>
                </div>
              </>
            }
          />
        </section>

        <section id="academy">
          <AboutBlock
            title="250K Academy"
            {...solucoesSectionTitleProps}
            imageSrc={ACADEMY_IMAGE}
            imageAlt="Dados de campo e produtividade"
            reverse
            {...SOLUCOES_POST_IMAGE_LAYOUT}
            content={
              <>
                <p className="text-muted-foreground leading-relaxed">
                  Onde dados de campo viram produtividade: acesso ao acervo e ao
                  conhecimento técnico das culturas de soja e milho da região
                  norte do estado de Mato Grosso.
                </p>
                <p className="text-primary font-semibold pt-2">
                  Acesse 250K Academy - Onde dados de campo viram produtividade
                </p>
                <Button
                  asChild
                  className="mt-6 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <a
                    href="https://250k.com.br/academia-de-consultores-250k/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Conhecer a Academia de Consultores
                  </a>
                </Button>
              </>
            }
          />
        </section>

      </div>
    </SolucoesFirstScrollProvider>
  );
}
