/**
 * Portfólio de palestras e treinamentos realizados pela 250K.
 *
 * ⚠️ Dados estáticos (placeholders). Substituir textos, datas e fotos pelos
 * registros reais. As imagens apontam para /public/images — trocar pelas fotos
 * reais de cada evento quando disponíveis.
 */

export type TreinamentoTipo = "Palestra" | "Treinamento" | "Workshop";

export interface Treinamento {
  id: string;
  tipo: TreinamentoTipo;
  title: string;
  /** Resumo curto para o card. */
  summary: string;
  /** Data exibida, ex.: "Mar 2025". */
  date: string;
  /** Local, ex.: "Sinop · MT". */
  local: string;
  /** Público-alvo, ex.: "Produtores e consultores". */
  audience: string;
  /** Número de participantes (texto livre), ex.: "+120 participantes". */
  participants?: string;
  coverImage: string;
  /** URL de vídeo opcional (YouTube/Vimeo/Instagram). */
  videoUrl?: string;
  /** Parágrafos da descrição (página de detalhe). */
  body: string[];
  /** Tópicos abordados. */
  highlights?: string[];
  /** Galeria de fotos (caminhos em /public/images). */
  gallery?: string[];
}

export const TREINAMENTOS: Treinamento[] = [
  {
    id: "academia-consultores-2025",
    tipo: "Treinamento",
    title: "Academia de Consultores 250K",
    summary:
      "Imersão que forma a elite técnica do norte de Mato Grosso: metodologia, pesquisa de campo e tomada de decisão na lavoura.",
    date: "2025",
    local: "Sinop · MT",
    audience: "Consultores e agrônomos",
    participants: "Turmas por safra",
    coverImage: "/images/academia.png",
    videoUrl: "https://www.youtube.com/watch?v=HgAnuoLe0G4",
    body: [
      "A Academia de Consultores 250K é o programa de formação técnica que transforma agrônomos e consultores em especialistas de alta performance para as culturas de soja e milho.",
      "Durante a imersão, os participantes têm acesso ao acervo técnico da 250K, à metodologia de pesquisa de campo do PD-K e a casos reais de posicionamento de produto, manejo e tomada de decisão na safra.",
    ],
    highlights: [
      "Metodologia de pesquisa e análise estatística",
      "Posicionamento de fungicidas, inseticidas e herbicidas",
      "Leitura de dados de campo e recomendação",
    ],
    gallery: ["/images/academia.png", "/images/250k.jpg", "/images/palestra.jpg"],
  },
  {
    id: "noitec-milho",
    tipo: "Palestra",
    title: "NOITEC — A noite da cultura do milho",
    summary:
      "Noite de tecnologia e inovação no campo: resultados de ensaios, tendências de mercado e networking entre produtores do norte de MT.",
    date: "Mai 2025",
    local: "Marcelândia · MT",
    audience: "Produtores e parceiros",
    participants: "+200 participantes",
    coverImage: "/images/palestra.jpg",
    videoUrl: "https://www.youtube.com/watch?v=kQ3TKSayyUM",
    body: [
      "A NOITEC é a maior noite dedicada à cultura do milho no norte de Mato Grosso. Um encontro que reúne produtores, consultores e empresas de tecnologia para discutir o que move a próxima safra.",
      "A 250K apresenta os resultados de ensaios conduzidos na safra, tendências de mercado e estratégias de manejo validadas em campo, sempre com foco em produtividade e rentabilidade.",
    ],
    highlights: [
      "Resultados de ensaios da safra",
      "Tendências de mercado e tecnologia",
      "Networking técnico regional",
    ],
    gallery: ["/images/palestra.jpg", "/images/250k.jpg"],
  },
  {
    id: "etec-capacitacao",
    tipo: "Treinamento",
    title: "ETEC — Evento Técnico de Capacitação",
    summary:
      "Apresentação de resultados de pesquisa e recomendações de safra com a equipe técnica da 250K para produtores e equipes de campo.",
    date: "Fev 2025",
    local: "Sinop · MT",
    audience: "Produtores e equipes de campo",
    coverImage: "/images/analise.jpg",
    body: [
      "O ETEC reúne a equipe técnica da 250K e os produtores para apresentar resultados de pesquisa, comparativos de produtos e recomendações práticas para a safra.",
      "É um espaço de capacitação direto ao ponto: o que funcionou em campo, com dado, e como aplicar na realidade de cada fazenda.",
    ],
    highlights: [
      "Comparativos de produtos com dados de campo",
      "Recomendações práticas de manejo",
      "Capacitação das equipes operacionais",
    ],
    gallery: ["/images/analise.jpg", "/images/analise-2.jpg", "/images/analise-solo.jpg"],
  },
  {
    id: "cafe-informativo-soja",
    tipo: "Palestra",
    title: "Café Informativo da Soja",
    summary:
      "Encontro técnico com as principais informações sobre manejo, pesquisa e estratégia para a cultura da soja.",
    date: "2025",
    local: "Sinop · MT",
    audience: "Produtores de soja",
    coverImage: "/images/250k.jpg",
    body: [
      "O Café Informativo da Soja é um encontro técnico em formato leve, voltado a alinhar produtores sobre manejo, pesquisa e estratégia para a cultura da soja.",
      "A equipe da 250K compartilha leituras da safra, posicionamento de produtos e decisões que mais impactam o resultado da lavoura.",
    ],
    highlights: [
      "Panorama da safra de soja",
      "Posicionamento e timing de aplicação",
      "Estratégia de compra de insumos",
    ],
    gallery: ["/images/250k.jpg", "/images/palestra.jpg"],
  },
  {
    id: "workshop-precisao",
    tipo: "Workshop",
    title: "Workshop de Agricultura de Precisão",
    summary:
      "Mão na massa com Solo Chec-K: amostragem georreferenciada, mapas de fertilidade e mapeamento de compactação.",
    date: "2025",
    local: "Norte de MT",
    audience: "Produtores e técnicos de campo",
    coverImage: "/images/precisao.png",
    body: [
      "Workshop prático de agricultura de precisão conduzido pela frente Solo Chec-K da 250K, com foco em transformar dados de solo em decisões operacionais.",
      "Os participantes acompanham o padrão de coleta georreferenciada, a geração de mapas de fertilidade e o mapeamento de compactação talhão a talhão.",
    ],
    highlights: [
      "Amostragem e coleta georreferenciada",
      "Mapas de fertilidade e dose de insumo",
      "Mapeamento de compactação do solo",
    ],
    gallery: ["/images/precisao.png", "/images/analise-solo.jpg"],
  },
  {
    id: "palestra-fungicidas",
    tipo: "Palestra",
    title: "Posicionamento de fungicidas: o que 600 parcelas revelaram",
    summary:
      "Resultados do PD-K sobre posicionamento de fungicidas na soja, com delineamento experimental e análise estatística.",
    date: "2025",
    local: "Sinop · MT",
    audience: "Produtores e consultores",
    coverImage: "/images/polos-pesquisas.png",
    body: [
      "Palestra técnica conduzida pelo núcleo de pesquisa PD-K sobre o posicionamento de fungicidas na cultura da soja, a partir de mais de 600 parcelas conduzidas por safra.",
      "Com delineamento experimental e análise estatística robusta, a 250K apresenta o que realmente moveu a produtividade — sem viés comercial.",
    ],
    highlights: [
      "Delineamento experimental e estatística",
      "Resposta a fungicidas em campo",
      "Recomendação de posicionamento",
    ],
    gallery: ["/images/polos-pesquisas.png", "/images/analise.jpg"],
  },
];

export function getTreinamento(id: string): Treinamento | undefined {
  return TREINAMENTOS.find((t) => t.id === id);
}

export function getOtherTreinamentos(id: string, limit = 3): Treinamento[] {
  return TREINAMENTOS.filter((t) => t.id !== id).slice(0, limit);
}
