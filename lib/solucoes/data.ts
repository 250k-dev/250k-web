/**
 * Ecossistema de soluções 250K.
 *
 * ⚠️ Fonte de verdade: toda a copy abaixo é o conteúdo REAL e oficial do cliente,
 * migrado da antiga página única (app/solucoes/page.tsx). Não substituir por texto
 * de protótipo nem inventar números. Ao editar, manter fidelidade ao texto original.
 */

export interface SolucaoStep {
  title: string;
  /** Descrição opcional (alguns processos reais só têm o título). */
  desc?: string;
}

export interface SolucaoStat {
  value: string;
  /** Sufixo destacado em laranja (ex.: "+", "Mi", "%"). */
  suffix?: string;
  label: string;
}

export interface SolucaoHighlight {
  title: string;
  body?: string;
  items?: string[];
  note?: string;
}

export interface SolucaoBullets {
  title?: string;
  items: string[];
}

export interface SolucaoCta {
  label: string;
  href: string;
  external?: boolean;
}

export interface SolucaoDetail {
  /** Frase de impacto (logo abaixo do nome). */
  lead: string;
  /** Parágrafos de introdução. */
  paras: string[];
  /** Lista de fatores/decisões em formato de bullets (após os parágrafos). */
  factors?: SolucaoBullets;
  /** "Como funciona" — etapas do processo. */
  steps?: SolucaoStep[];
  stepsTitle?: string;
  /** Blocos de destaque (caixas): investimento, exclusividade, etc. */
  highlights?: SolucaoHighlight[];
  /** "O que você recebe" — checklist. */
  deliverables?: string[];
  /** Strip de estatísticas. */
  stats?: SolucaoStat[];
  /** Citação (painel verde). */
  quote?: string;
  /** CTA específico do produto (ex.: Certifica-K → questionário). */
  cta?: SolucaoCta;
}

export interface Solucao {
  id: string;
  name: string;
  idLabel: string;
  tagline: string;
  desc: string;
  features: string[];
  imageSrc: string;
  imageAlt: string;
  video?: string;
  videoVertical?: boolean;
  externalUrl?: string;
  detail: SolucaoDetail;
}

export const SOLUCOES: Solucao[] = [
  {
    id: "pd-k",
    name: "PD-K",
    idLabel: "Núcleo de P&D",
    tagline: "Inteligência agrícola aplicada à decisão no campo",
    desc: "O núcleo de pesquisa e inteligência agronômica da 250K. Transforma dados reais de campo em decisões mais seguras e produtivas para soja e milho — de forma independente, sem viés comercial.",
    features: [
      "Mais de 600 parcelas por safra",
      "Delineamento e análise estatística robusta",
      "Laudos técnicos e relatórios comparativos",
    ],
    imageSrc: "/images/post/pd-k-post.png",
    imageAlt: "Pesquisa e desenvolvimento agronômico",
    detail: {
      lead: "Onde a insegurança da escolha se transforma em produtividade na lavoura.",
      paras: [
        "A PD-K é o núcleo de pesquisa e inteligência agronômica da 250K, criado para transformar dados reais de campo em decisões mais seguras e produtivas para as culturas de soja e milho. Atuamos de forma independente, sem viés comercial, validando tecnologias em condições reais de lavoura para entregar informações técnicas confiáveis ao produtor rural.",
        "A PD-K reúne um dos maiores acervos técnicos independentes em soja e milho do norte de Mato Grosso, transformando dados de campo em recomendações práticas, estratégicas e aplicáveis à realidade do produtor.",
      ],
      factors: {
        title:
          "Realizamos mais de 600 parcelas em campo por safra, com rigor científico, para avaliar a influência de:",
        items: [
          "Fungicidas",
          "Inseticidas",
          "Herbicidas",
          "Tratamento de Sementes",
          "Estratégias de manejo integrado",
        ],
      },
      highlights: [
        {
          title: "R$ 5,5 Mi investidos em Pesquisa & Desenvolvimento",
          items: ["R$ 2,2 Mi · 2024", "R$ 2,5 Mi · 2025", "R$ 0,8 Mi · 2026"],
          note: "Fortalecendo uma estrutura baseada em rigor científico, análise estatística robusta, rastreabilidade de dados e uma equipe técnica altamente especializada.",
        },
        {
          title: "Somos um sistema de validação único",
          items: [
            "Metodologia com delineamento experimental e análise estatística robusta",
            "Sistema Avalia (padronização, rastreabilidade e consistência de dados)",
            "Equipe Técnica altamente especializada",
            "Direção Técnica com experiência prática e científica",
            "Independência total de empresas de insumo",
          ],
          note: "E você pode ter acesso a todas essas informações.",
        },
      ],
      deliverables: [
        "Laudos técnicos independentes",
        "Relatórios comparativos por produto",
        "Dados quantitativos reais de campo",
        "Insights estratégicos para a tomada de decisão na safra",
      ],
      stats: [
        { value: "600", suffix: "+", label: "parcelas / safra" },
        { value: "R$ 5,5", suffix: "Mi", label: "investidos em P&D" },
        { value: "40", suffix: "%", label: "menos grãos ardidos" },
      ],
      quote:
        "Um dos maiores acervos técnicos independentes em soja e milho do norte de Mato Grosso.",
    },
  },
  {
    id: "field-k",
    name: "Field-K",
    idLabel: "Recomendação descomplicada",
    tagline: "Complexo no campo. Simples na decisão.",
    desc: "Transforma excesso de informação em recomendações claras, precisas e lucrativas. Um plano de safra descomplicado, focado em eficiência operacional e validado pelo PD-K.",
    features: [
      "Planejamento de safra",
      "Relação e compra de insumos",
      "Posicionamento de produto",
    ],
    imageSrc: "/images/post/field-k-post.png",
    imageAlt: "Execução e validação no campo",
    detail: {
      lead: "A Field-K transforma excesso de informação em recomendações claras, precisas e lucrativas para o produtor.",
      paras: [
        "Reunimos em um modelo descomplicado todas as etapas, fases e relação de insumos para que você não perca o timing da sua lavoura.",
        "Temos como propósito entregar ao nosso produtor um plano de safra descomplicado, focado na eficiência operacional, validado com informações de campo do nosso centro de Pesquisa e Desenvolvimento (PD-K).",
      ],
      factors: {
        title:
          "Atuamos diretamente nas decisões que mais impactam o resultado da sua fazenda:",
        items: [
          "Planejamento de Safra",
          "Relação de Compra de Insumos",
          "Posicionamento de Produto (volume e timing de aplicação)",
          "Coordenação Operacional",
        ],
      },
      highlights: [
        {
          title: "Plano de desenvolvimento 250K",
          body: "Nossa metodologia está assegurada pelo plano de desenvolvimento 250K (85 sacas de soja + 165 sacas de milho) e estruturada pelos protocolos técnicos de pesquisa.",
        },
      ],
      deliverables: [
        "Segurança na Informação",
        "Metodologia de Trabalho",
        "Experiência no campo",
        "Validação da entrega pelo CEO José Paschoal, uma das maiores autoridades nas culturas de soja e milho da região norte de Mato Grosso",
      ],
      stats: [
        { value: "85", label: "sacas/ha de soja (meta)" },
        { value: "165", label: "sacas/ha de milho (meta)" },
      ],
      quote: "Transformamos a sua execução para colher resultados em campo.",
    },
  },
  {
    id: "finance-k",
    name: "Finance-K",
    idLabel: "Gestão de compras de insumos",
    tagline: "A inteligência de compra para sua maior rentabilidade",
    desc: "Onde o seu lucro começa antes do plantio. Uma estrutura de inteligência que transforma a compra de insumos em estratégia de lucro, com mapa de cotação e negociação em escala.",
    features: [
      "Mapa de cotação multifornecedor",
      "Negociação em escala",
      "Pedido direto ao produtor",
    ],
    imageSrc: "/images/post/finance-k-post.png",
    imageAlt: "Inteligência de compra de insumos agrícolas",
    detail: {
      lead: "Aqui o seu lucro começa antes do plantio.",
      paras: [
        "A Finance-K é uma estrutura de inteligência da 250K que transforma compra de insumos em estratégia de lucro.",
        "Decisões sem estratégia geram maiores custos. Comprar com assertividade te proporciona maiores margens de lucro. Delegue para quem tem o timing do mercado, maior barganha de negociação e acesso a diversos mapas de cotação.",
        "Padronize suas compras, garanta assertividade e tenha um planejamento completo de insumos para uma safra mais lucrativa.",
      ],
      stepsTitle: "Um processo estruturado em 4 etapas",
      steps: [
        { title: "Definição do pacote técnico" },
        { title: "Mapa de cotação com múltiplos fornecedores" },
        { title: "Negociação em escala" },
        {
          title:
            "Pedido direto ao produtor (rastreável e entregue na sua fazenda)",
        },
      ],
      highlights: [
        {
          title: "Exclusividade",
          body: "Uma solução exclusiva para os clientes do programa 250K.",
        },
      ],
      deliverables: [
        "Menos custo por hectare",
        "Maior margem de lucro",
        "Transparência e controle de entrega",
        "Comunicação formal e documentada",
        "Pagamento somente após a entrega",
      ],
      stats: [{ value: "4", label: "etapas estruturadas" }],
      quote:
        "Faça parte da Finance-K e transforme a sua compra em estratégia de lucro.",
    },
  },
  {
    id: "solo-chec-k",
    name: "Solo Chec-K",
    idLabel: "Agricultura de precisão",
    tagline: "Agricultura de precisão para decisões com base em dados de campo",
    desc: "Amostragem e interpolação para gerar mapas que orientam manejo e insumos — mapeamento de fertilidade, precisão na coleta e mapeamento de compactação.",
    features: [
      "Mapeamento de fertilidade",
      "Coleta georreferenciada",
      "Análise de compactação",
    ],
    imageSrc: "/images/post/solochec-k-post.png",
    imageAlt: "Agricultura de precisão com base em dados de campo",
    video: "dvgpLyrzd2o",
    videoVertical: true,
    detail: {
      lead: "Agricultura de Precisão para decisões operacionais com base em dados de campo.",
      paras: [],
      stepsTitle: "O que entregamos",
      steps: [
        {
          title: "Mapeamento de fertilidade",
          desc: "Utilizamos amostragem e interpolação para gerar mapas que orientam recomendações de manejo e insumos.",
        },
        {
          title: "Precisão na Coleta",
          desc: "Padrão de coleta e georreferenciamento para garantir representatividade e rastreabilidade dos dados.",
        },
        {
          title: "Mapeamento de compactação",
          desc: "Análises de compactação para melhorar crescimento radicular, infiltração e armazenamento de água.",
        },
      ],
    },
  },
  {
    id: "certifica-k",
    name: "Certifica-K",
    idLabel: "Certificadora de fazenda produtiva",
    tagline: "Certificação de fazendas produtivas baseada em dados",
    desc: "Certificação de Fazendas Produtivas baseada em dados, validação técnica e rastreabilidade de processos.",
    features: [
      "Governança e consistência de registros",
      "Validação por critérios técnicos",
      "Relatórios e evidências para auditoria",
    ],
    imageSrc: "/images/post/certifica-k-post.png",
    imageAlt: "Certificação de fazendas produtivas",
    detail: {
      lead: "Certificação de Fazendas Produtivas baseada em dados, validação técnica e rastreabilidade de processos.",
      paras: [],
      deliverables: [
        "Governança e consistência de registros",
        "Validação por critérios técnicos",
        "Relatórios e evidências para auditoria",
      ],
      cta: {
        label: "Quero avaliar minha fazenda",
        href: "/questionario",
      },
    },
  },
  {
    id: "academy",
    name: "250K Academy",
    idLabel: "Educação agronômica de alta performance",
    tagline: "Onde dados de campo viram produtividade",
    desc: "Acesso ao acervo e ao conhecimento técnico das culturas de soja e milho da região norte de Mato Grosso.",
    features: [
      "Acervo técnico regional",
      "Conhecimento aplicado ao campo",
      "Formação de consultores",
    ],
    imageSrc: "/images/post/250k-academy-post.png",
    imageAlt: "Dados de campo e produtividade",
    detail: {
      lead: "Onde dados de campo viram produtividade.",
      paras: [
        "Acesso ao acervo e ao conhecimento técnico das culturas de soja e milho da região norte do estado de Mato Grosso.",
        "Acesse 250K Academy — onde dados de campo viram produtividade.",
      ],
      cta: {
        label: "Conhecer a Academia de Consultores",
        href: "https://250k.com.br/academia-de-consultores-250k/",
        external: true,
      },
    },
  },
];

export function getSolucao(id: string): Solucao | undefined {
  return SOLUCOES.find((s) => s.id === id);
}

export function getOtherSolucoes(id: string): Solucao[] {
  return SOLUCOES.filter((s) => s.id !== id);
}
