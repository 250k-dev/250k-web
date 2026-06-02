import type {
  Culture,
  Gargalo,
  QuestionarioAnswers,
  QuestionarioReport,
  DiagnosticoReportSections,
  ProducerTier,
} from "./questionario-types";

export const PRECO_SACA_SOJA_R = 120;
export const PRECO_SACA_MILHO_R = 60;

/** Meta/potencial de referência 250K (sc/ha) para ancorar o gap de produtividade. */
export const TARGET_YIELD_SC_HA: Partial<Record<Culture, number>> = {
  Soja: 85,
  Milho: 165,
};

/** Fração da diferença (meta − atual) considerada recuperável com manejo/correção. */
export const RECOVERABLE_GAP_FACTOR = 0.4;

export type LimitingFactor = "Químico" | "Físico" | "Biológico";

/** Solo como sistema integrado (manual v3): mapeia a dor ao fator limitante. */
export function limitingFactor(g: Gargalo): LimitingFactor {
  switch (g) {
    case "Fertilidade/Calagem":
    case "Custo alto de adubo":
      return "Químico";
    case "Compactação":
    case "Falha de estande":
      return "Físico";
    case "Nematoides":
      return "Biológico";
    case "Baixa produtividade":
    case "Não sabe exatamente":
      return "Físico";
    default: {
      const _e: never = g;
      return _e;
    }
  }
}

export interface RecommendedSolution {
  id: string;
  name: string;
  href: string;
}

/**
 * Conecta a dor dominante a uma solução real do ecossistema 250K
 * (ids alinhados a lib/solucoes/data.ts). Nunca genérico.
 */
export function solutionForGargalo(g: Gargalo): RecommendedSolution {
  const SOLO: RecommendedSolution = {
    id: "solo-chec-k",
    name: "Solo Chec-K",
    href: "/solucoes/solo-chec-k",
  };
  const FIELD: RecommendedSolution = {
    id: "field-k",
    name: "Field-K",
    href: "/solucoes/field-k",
  };
  const FINANCE: RecommendedSolution = {
    id: "finance-k",
    name: "Finance-K",
    href: "/solucoes/finance-k",
  };
  switch (g) {
    case "Fertilidade/Calagem":
    case "Compactação":
    case "Não sabe exatamente":
      return SOLO;
    case "Custo alto de adubo":
      return FINANCE;
    case "Nematoides":
    case "Falha de estande":
    case "Baixa produtividade":
      return FIELD;
    default: {
      const _e: never = g;
      return _e;
    }
  }
}

export const SECTION_TITLES_PT: Record<keyof DiagnosticoReportSections, string> =
  {
    diagnosis: "Diagnóstico",
    mainPain: "Dor principal",
    productiveImpact: "Impacto produtivo",
    financialImpact: "Impacto financeiro",
    opportunity: "Oportunidade",
    solution: "Solução",
    nextStep: "Próximo passo",
  };

export const DIAGNOSTICO_SECTION_KEYS: Array<keyof DiagnosticoReportSections> = [
  "diagnosis",
  "mainPain",
  "productiveImpact",
  "financialImpact",
  "opportunity",
  "solution",
  "nextStep",
];

export function getReportTypeForGargalo(mainBottleneck: Gargalo): string {
  switch (mainBottleneck) {
    case "Fertilidade/Calagem":
      return "Plano de Fertilidade e Calagem";
    case "Compactação":
      return "Plano de Estrutura do Solo e Compactação";
    case "Nematoides":
      return "Plano de Manejo Fitossanitário (Nematoides)";
    case "Falha de estande":
      return "Plano de Implantação e Falhas de Estande";
    case "Custo alto de adubo":
      return "Plano de Eficiência de Insumos";
    case "Baixa produtividade":
      return "Plano de Recuperação de Produtividade";
    case "Não sabe exatamente":
      return "Plano de Diagnóstico Estratégico";
    default: {
      const _exhaustive: never = mainBottleneck;
      return String(_exhaustive);
    }
  }
}


export function pickPricingCulture(cultures: Culture[]): {
  basis: "Soja" | "Milho" | "Referência_soja";
  pricePerScR: number;
} {
  if (cultures.includes("Soja")) {
    return { basis: "Soja", pricePerScR: PRECO_SACA_SOJA_R };
  }
  if (cultures.includes("Milho")) {
    return { basis: "Milho", pricePerScR: PRECO_SACA_MILHO_R };
  }
  return { basis: "Referência_soja", pricePerScR: PRECO_SACA_SOJA_R };
}

function maturityScore(answers: QuestionarioAnswers): number {
  let s = 0;
  switch (answers.georeferencedSampling) {
    case "Não":
      s += 0;
      break;
    case "Sim – malha maior que 10 ha":
      s += 1;
      break;
    case "Sim – malha entre 5–10 ha":
      s += 2;
      break;
    case "Sim – malha menor que 5 ha":
      s += 3;
      break;
    default: {
      const _e: never = answers.georeferencedSampling;
      throw new Error(`Amostragem inválida: ${_e}`);
    }
  }
  switch (answers.variableRate) {
    case "Não":
      s += 0;
      break;
    case "Apenas calcário":
      s += 1;
      break;
    case "Calcário + KCl":
      s += 2;
      break;
    case "Múltiplos nutrientes":
    case "Semente":
      s += 3;
      break;
    default: {
      const _e: never = answers.variableRate;
      throw new Error(`Taxa variável inválida: ${_e}`);
    }
  }
  switch (answers.organizedHistory) {
    case "Não":
      s += 0;
      break;
    case "Parcial":
      s += 1;
      break;
    case "Sim, organizado":
      s += 2;
      break;
    default: {
      const _e: never = answers.organizedHistory;
      throw new Error(`Histórico inválido: ${_e}`);
    }
  }
  switch (answers.soilAnalysisFrequency) {
    case "Nunca":
      s += 0;
      break;
    case "Esporádica":
      s += 1;
      break;
    case "A cada 2–3 anos":
      s += 2;
      break;
    case "Todo ano":
      s += 3;
      break;
    default: {
      const _e: never = answers.soilAnalysisFrequency;
      throw new Error(`Frequência de análise inválida: ${_e}`);
    }
  }
  return s;
}

/** Capacidade operacional (máquinas + equipe) — viabilidade de executar recomendações. */
export function operationalScore(answers: QuestionarioAnswers): number {
  let s = 0;
  switch (answers.machineryCapacity) {
    case "Terceirizo / não tenho":
      s += 0;
      break;
    case "Frota básica":
      s += 1;
      break;
    case "Frota própria com tecnologia":
      s += 2;
      break;
    default: {
      const _e: never = answers.machineryCapacity;
      throw new Error(`Máquinas inválido: ${_e}`);
    }
  }
  switch (answers.technicalTeam) {
    case "Sem apoio técnico":
      s += 0;
      break;
    case "Consultoria pontual":
      s += 1;
      break;
    case "Consultoria fixa":
      s += 2;
      break;
    case "Equipe própria":
      s += 3;
      break;
    default: {
      const _e: never = answers.technicalTeam;
      throw new Error(`Equipe técnica inválido: ${_e}`);
    }
  }
  return s;
}

export function classifyProducerTier(answers: QuestionarioAnswers): ProducerTier {
  // Combina maturidade técnica (máx 11) e capacidade operacional (máx 5).
  const score = maturityScore(answers) + operationalScore(answers);
  if (score <= 4) return "Fundação Produtiva";
  if (score <= 8) return "Desenvolvimento Técnico";
  if (score <= 12) return "Eficiência Produtiva";
  return "Alta Performance";
}

type TierStyle = "foundation" | "development" | "efficiency" | "performance";

function tierStyle(tier: ProducerTier): TierStyle {
  switch (tier) {
    case "Fundação Produtiva":
      return "foundation";
    case "Desenvolvimento Técnico":
      return "development";
    case "Eficiência Produtiva":
      return "efficiency";
    case "Alta Performance":
      return "performance";
    default: {
      const _e: never = tier;
      return _e;
    }
  }
}


/**
 * Priorização/inferência quando o produtor não nomeia o gargalo ("Não sabe").
 * Manual v3: variabilidade alta tem prioridade ("sem AP + variabilidade → problema
 * de manejo"); demais casos seguem o impacto declarado. Nematoide/compactação só
 * entram quando há sinal explícito (gargalo declarado), respeitado em resolveEffectiveGargalo.
 */
export function prioritizeGargalo(answers: QuestionarioAnswers): Gargalo {
  const { mainBottleneckImpact, georeferencedSampling, fieldVariability } =
    answers;
  const noAP = georeferencedSampling === "Não";
  const highVar = fieldVariability === "Alta (talhões muito diferentes)";

  // Variabilidade alta = prioridade: ponto de partida é leitura fina (precisão).
  if (highVar) {
    return noAP ? "Fertilidade/Calagem" : "Baixa produtividade";
  }
  if (mainBottleneckImpact === "Custo") return "Custo alto de adubo";
  if (mainBottleneckImpact === "Operação") return "Compactação";
  if (mainBottleneckImpact === "Utilizar da Tecnologia") return "Baixa produtividade";
  if (mainBottleneckImpact === "Produtividade") return "Baixa produtividade";
  if (mainBottleneckImpact === "Todos") {
    return noAP ? "Fertilidade/Calagem" : "Baixa produtividade";
  }
  return "Baixa produtividade";
}

export function resolveEffectiveGargalo(answers: QuestionarioAnswers): Gargalo {
  if (answers.mainBottleneck !== "Não sabe exatamente") {
    return answers.mainBottleneck;
  }
  return prioritizeGargalo(answers);
}

export function dominantPainTitle(
  answers: QuestionarioAnswers,
  effective: Gargalo,
): string {
  if (answers.mainBottleneck !== "Não sabe exatamente") {
    return answers.mainBottleneck;
  }
  switch (effective) {
    case "Custo alto de adubo":
      return "Ineficiência de insumos e decisão sem evidência suficiente";
    case "Compactação":
      return "Gargalo operacional com risco físico do solo (estrutura)";
    case "Baixa produtividade":
      return "Baixa produtividade com incerteza na causa — leitura do sistema necessária";
    case "Fertilidade/Calagem":
      return "Risco nutricional e calagem sem leitura fina (solo como sistema químico)";
    case "Nematoides":
      return "Limitador biológico a confirmar (alto impacto se presente)";
    case "Falha de estande":
      return "Falha de estande ou implantação como hipótese dominante a validar";
    case "Não sabe exatamente":
      return "Diagnóstico estratégico (causa a confirmar com dados)";
    default: {
      const _e: never = effective;
      return `Diagnóstico estratégico (${String(_e)})`;
    }
  }
}

/** Base sc/ha by dominant technical theme (manual bands 10 / 20 / up to 40). */
function baseScHaForGargalo(g: Gargalo): number {
  switch (g) {
    case "Fertilidade/Calagem":
      return 12;
    case "Compactação":
      return 18;
    case "Nematoides":
      return 28;
    case "Falha de estande":
      return 16;
    case "Custo alto de adubo":
      return 14;
    case "Baixa produtividade":
      return 20;
    case "Não sabe exatamente":
      return 16;
    default: {
      const _e: never = g;
      return _e;
    }
  }
}

/**
 * Gap recuperável (sc/ha) a partir da produtividade atual vs meta de referência.
 * Retorna null quando não há meta para a cultura principal ou produtividade informada.
 */
export function yieldGapScHa(answers: QuestionarioAnswers): number | null {
  const target = TARGET_YIELD_SC_HA[answers.mainCulture];
  if (!target || !answers.currentYieldScHa || answers.currentYieldScHa <= 0) {
    return null;
  }
  const gap = Math.max(0, target - answers.currentYieldScHa);
  return Math.round(gap * RECOVERABLE_GAP_FACTOR);
}

export function estimateProductiveLossScHa(
  answers: QuestionarioAnswers,
  effectiveGargalo: Gargalo,
): number {
  const base = baseScHaForGargalo(effectiveGargalo);
  const anchored = yieldGapScHa(answers);
  // Quando há produtividade informada, ancora no gap real (média com a base por tema).
  let sc = anchored != null ? (base + anchored) / 2 : base;
  if (answers.urgencyToResolve === "Sim") sc += 3;
  if (answers.triedBefore === "Sim e não funcionou") sc += 3;
  if (answers.fieldVariability === "Alta (talhões muito diferentes)") sc += 3;
  if (answers.georeferencedSampling === "Não") sc += 2;
  return Math.min(40, Math.max(10, Math.round(sc)));
}

export function financialImpactRPerHa(
  productiveLossScHa: number,
  pricePerScR: number,
): number {
  return Math.round(productiveLossScHa * pricePerScR);
}

export function sectionsToReportText(sections: DiagnosticoReportSections): string {
  const parts: string[] = [];
  (Object.keys(SECTION_TITLES_PT) as Array<keyof DiagnosticoReportSections>).forEach(
    (key) => {
      const title = SECTION_TITLES_PT[key];
      const body = sections[key].trim();
      if (body) parts.push(`${title}\n\n${body}`);
    },
  );
  return parts.join("\n\n");
}

function cultureListPt(cultures: Culture[]): string {
  return cultures.join(", ");
}

function buildDiagnosis(
  answers: QuestionarioAnswers,
  tier: ProducerTier,
  effective: Gargalo,
): string {
  const style = tierStyle(tier);
  const cultures = cultureListPt(answers.cultures);
  const area = answers.totalAreaHa.toLocaleString("pt-BR");
  const mun = answers.municipality;

  const pillarMaturity =
    answers.georeferencedSampling === "Não"
      ? "maturidade técnica ainda sem amostragem georreferenciada operacional"
      : "maturidade técnica com amostragem georreferenciada como base de decisão";
  const pillarOps =
    answers.variableRate === "Não"
      ? "capacidade operacional sem taxa variável consolidada para insumos"
      : "capacidade operacional com taxa variável em evolução no sistema";
  const pillarData =
    answers.organizedHistory === "Sim, organizado"
      ? "histórico e mapas organizados sustentam controle de resultado"
      : answers.organizedHistory === "Parcial"
        ? "histórico parcialmente organizado — ainda há ruído na comparação entre safras"
        : "histórico pouco organizado — decisões ficam mais expostas a achismo";

  const tierLine =
    style === "foundation"
      ? `Classificação atual: ${tier}. O foco é estruturar evidências simples (mapa + análise + execução) antes de escalar investimento.`
      : style === "development"
        ? `Classificação atual: ${tier}. Há espaço para ganhos rápidos ajustando manejo com métricas claras por talhão.`
        : style === "efficiency"
          ? `Classificação atual: ${tier}. O sistema já caminha bem; o ganho vem de ajustes finos e governança de dados.`
          : `Classificação atual: ${tier}. O desafio é otimizar margem e previsibilidade com poucos pontos de atrito.`;

  const effectiveNote =
    answers.mainBottleneck === "Não sabe exatamente"
      ? ` Como o gargalo não foi nomeado com precisão, a leitura técnica ancora o plano em "${getReportTypeForGargalo(effective)}" até confirmar causa com dados.`
      : "";

  const factor = limitingFactor(effective);
  const factorLine =
    factor === "Químico"
      ? "Lendo o solo como sistema integrado, o fator que mais limita aqui é químico (fertilidade/correção)."
      : factor === "Físico"
        ? "Lendo o solo como sistema integrado, o fator que mais limita aqui é físico (estrutura/compactação/implantação)."
        : "Lendo o solo como sistema integrado, o fator que mais limita aqui é biológico (pressão de nematoides).";

  const analysisLine =
    answers.soilAnalysisFrequency === "Nunca" ||
    answers.soilAnalysisFrequency === "Esporádica"
      ? " A baixa frequência de análise de solo aumenta o risco de decidir sem evidência."
      : "";

  return [
    `Leitura da operação em ${mun}: ${answers.farmName}, área total declarada ${area} ha, culturas ${cultures} (principal: ${answers.mainCulture}, produtividade atual ~${answers.currentYieldScHa.toLocaleString("pt-BR")} sc/ha).`,
    `Nos quatro pilares, destacam-se: ${pillarMaturity}; ${pillarOps}; ${pillarData}.`,
    `${factorLine}${analysisLine}`,
    `${tierLine}${effectiveNote}`,
  ].join(" ");
}

function buildMainPainParagraph(
  answers: QuestionarioAnswers,
  dominantTitle: string,
  effective: Gargalo,
  tier: ProducerTier,
): string {
  const style = tierStyle(tier);
  const why =
    effective === "Nematoides"
      ? "Nematoides costumam ser um limitador biológico com baixa percepção inicial e alto impacto quando não mapeado."
      : effective === "Compactação"
        ? "Compactação restringe exploração radicular e eficiência hídrica-nutricional, derrubando teto produtivo."
        : effective === "Fertilidade/Calagem"
          ? "Fertilidade e calagem mal calibradas geram resposta irregular e desperdício de potencial produtivo."
          : effective === "Custo alto de adubo"
            ? "Custo alto de adubo sem retorno proporcional indica desalinhamento entre recomendação, zona e resposta do solo."
            : effective === "Falha de estande"
              ? "Falhas de estande concentram perda no início do ciclo e comprometem uniformidade para o restante do manejo."
              : effective === "Baixa produtividade"
                ? "Baixa produtividade costuma ser sintoma integrado (solo + manejo + clima), exigindo priorização de uma causa dominante."
                : "Sem causa dominante clara, o risco é dispersar esforço e budget sem métrica de validação.";

  const impactRef =
    answers.mainBottleneckImpact === "Todos"
      ? "O impacto declarado é transversal (produtividade, custo, operação e tecnologia), o que reforça a necessidade de focar uma alavanca dominante primeiro."
      : `O impacto declarado concentra-se em: ${answers.mainBottleneckImpact}.`;

  const explain =
    style === "foundation"
      ? `${why} Em níveis iniciais de controle, a prioridade é reduzir incerteza com diagnóstico mínimo viável e execução simples.`
      : `${why}`;

  // Relação com manejo (manual §6: causa → efeito → relação com manejo).
  const manejo =
    answers.georeferencedSampling === "Não"
      ? "Relação com manejo: sem amostragem georreferenciada, a decisão trata a área como homogênea e mascara a causa por talhão."
      : answers.variableRate === "Não"
        ? "Relação com manejo: há leitura de campo, mas sem taxa variável a correção não chega na dose certa por zona."
        : "Relação com manejo: a base de precisão existe; o ganho está em refinar prescrição e fechar o ciclo de decisão.";

  return [
    `Dor principal (única prioridade): ${dominantTitle}.`,
    `Causa provável e efeito no sistema: ${explain}`,
    manejo,
    impactRef,
  ].join(" ");
}

function buildProductiveImpact(
  productiveLossScHa: number,
  effective: Gargalo,
  tier: ProducerTier,
): string {
  const band =
    productiveLossScHa <= 12
      ? "perda moderada"
      : productiveLossScHa <= 22
        ? "perda alta"
        : "perda crítica";
  return [
    `Estimativa orientativa de impacto produtivo: ${productiveLossScHa} sc/ha (${band}), coerente com o tema dominante (${effective}) e com as faixas de referência do manual (10 / 20 / até 40 sc/ha).`,
    tier === "Alta Performance" || tier === "Eficiência Produtiva"
      ? "Em sistemas mais maduros, validar essa faixa com mapa de produtividade e análises por zona reduz incerteza."
      : "Em sistemas com menor controle, a faixa representa risco econômico até que mapa e análise confirmem o tamanho real da perda por talhão.",
  ].join(" ");
}

function buildFinancialImpact(
  productiveLossScHa: number,
  rPerHa: number,
  pricing: ReturnType<typeof pickPricingCulture>,
  cultures: Culture[],
  totalAreaHa: number,
): string {
  const basisLabel =
    pricing.basis === "Referência_soja"
      ? "saca de soja como referência comparável (manual não fixa preço para todas as culturas)"
      : `cultura ${pricing.basis === "Soja" ? "soja" : "milho"}`;
  const total = Math.round(rPerHa * totalAreaHa);
  const cults = cultureListPt(cultures);
  return [
    `Conversão financeira (manual): ${productiveLossScHa} sc/ha × R$ ${pricing.pricePerScR.toLocaleString("pt-BR")}/sc (base ${basisLabel}) ≈ R$ ${rPerHa.toLocaleString("pt-BR")}/ha.`,
    `Culturas informadas: ${cults}. Em escala de fazenda (${totalAreaHa.toLocaleString("pt-BR")} ha), isso representa ordem de grandeza de ~R$ ${total.toLocaleString("pt-BR")} por safra se a perda se manifestar de forma homogênea na área (uso didático — o mapa mostrará concentração real).`,
  ].join(" ");
}

function buildOpportunity(
  answers: QuestionarioAnswers,
  rPerHa: number,
  effective: Gargalo,
): string {
  return [
    `Oportunidade: recuperar margem onde o dinheiro está escapando. Com ~R$ ${rPerHa.toLocaleString("pt-BR")}/ha em sensibilidade, pequenos ajustes com validação por talhão tendem a pagar o investimento em diagnóstico rapidamente.`,
    `O retorno esperado vem de alinhar causa (${effective}) com execução (${answers.willingAdjustManagement === "Sim" ? "há disposição declarada para ajustar manejo" : "há cautela declarada — priorizar ROI com simulação e etapas curtas"}).`,
  ].join(" ");
}

function buildSolution(
  answers: QuestionarioAnswers,
  effective: Gargalo,
  tier: ProducerTier,
): string {
  const plan = getReportTypeForGargalo(effective);
  const tech =
    answers.georeferencedSampling === "Não"
      ? "implantar amostragem georreferenciada com malha coerente com variabilidade e orçamento"
      : "refinar zoneamento e metas por talhão a partir da malha atual";
  const tv =
    answers.variableRate === "Não"
      ? "desenhar taxa variável em etapas (começar pelo insumo de maior impacto na dor)"
      : "evoluir taxa variável com checagem de resposta e histórico por zona";
  const hist =
    answers.organizedHistory === "Sim, organizado"
      ? "manter governança de dados (mapas, análises, resultados) como trilho de melhoria contínua"
      : "organizar mapas e resultados para fechar ciclo de decisão (o que foi feito → o que respondeu)";

  const sol = solutionForGargalo(effective);
  const ops = operationalScore(answers);
  const execNote =
    ops <= 1
      ? "Como a estrutura de máquinas/equipe é enxuta, parte da execução pode ser apoiada pela 250K para não travar o plano."
      : "A estrutura de máquinas/equipe disponível permite internalizar a execução com acompanhamento técnico.";

  return [
    `Solução direta (não genérica): conectar a causa (${effective}) ao ${plan}, ancorado na ${sol.name} do ecossistema 250K.`,
    `Trilho técnico recomendado: ${tech}; ${tv}; ${hist}.`,
    execNote,
    tier === "Fundação Produtiva" || tier === "Desenvolvimento Técnico"
      ? "Em estágio inicial, evite pacotes amplos: escolha 1–2 talhões piloto, meça resposta e replique o padrão vencedor."
      : "Em estágio avançado, priorize otimização: reduzir variância entre talhões e refinar prescrição com evidência.",
  ].join(" ");
}

function buildNextStep(
  answers: QuestionarioAnswers,
  effective: Gargalo,
): string {
  const urg =
    answers.urgencyToResolve === "Sim"
      ? "Agendar diagnóstico e primeira rodada de amostragem/mapa ainda nesta janela de decisão."
      : answers.urgencyToResolve === "Próxima safra"
        ? "Montar cronograma para próxima safra: baseline de mapa/análise antes do plantio e metas por zona."
        : "Rodada de simulação de cenários (custo × resposta) antes de comprometer orçamento.";

  const tried =
    answers.triedBefore === "Sim e não funcionou"
      ? "Trazer dados da tentativa anterior para revisar hipótese (o que falhou e por quê), evitando repetir o mesmo desenho."
      : answers.triedBefore === "Nunca tratou de forma técnica"
        ? "Começar com protocolo mínimo mensurável (poucos indicadores, prazo curto, critério de sucesso claro)."
        : "Aprofundar calibração: comparar zonas de alta/baixa resposta e ajustar prescrição.";

  return [
    `Próximo passo imediato: ${urg}`,
    `${tried}`,
    `Âncora técnica do plano: ${getReportTypeForGargalo(effective)}.`,
  ].join(" ");
}

export function buildDiagnosticoSections(
  answers: QuestionarioAnswers,
): {
  sections: DiagnosticoReportSections;
  tier: ProducerTier;
  effectiveGargalo: Gargalo;
  dominantTitle: string;
  productiveLossScHa: number;
  financialRPerHa: number;
  pricing: ReturnType<typeof pickPricingCulture>;
  limitingFactor: LimitingFactor;
  recommendedSolution: RecommendedSolution;
  targetYieldScHa?: number;
  yieldGapScHa?: number;
} {
  const tier = classifyProducerTier(answers);
  const effective = resolveEffectiveGargalo(answers);
  const dominantTitle = dominantPainTitle(answers, effective);
  const productiveLossScHa = estimateProductiveLossScHa(answers, effective);
  const pricing = pickPricingCulture(answers.cultures);
  const financialRPerHa = financialImpactRPerHa(
    productiveLossScHa,
    pricing.pricePerScR,
  );
  const factor = limitingFactor(effective);
  const recommendedSolution = solutionForGargalo(effective);
  const targetYield = TARGET_YIELD_SC_HA[answers.mainCulture];
  const gap = yieldGapScHa(answers);

  const sections: DiagnosticoReportSections = {
    diagnosis: buildDiagnosis(answers, tier, effective),
    mainPain: buildMainPainParagraph(answers, dominantTitle, effective, tier),
    productiveImpact: buildProductiveImpact(
      productiveLossScHa,
      effective,
      tier,
    ),
    financialImpact: buildFinancialImpact(
      productiveLossScHa,
      financialRPerHa,
      pricing,
      answers.cultures,
      answers.totalAreaHa,
    ),
    opportunity: buildOpportunity(answers, financialRPerHa, effective),
    solution: buildSolution(answers, effective, tier),
    nextStep: buildNextStep(answers, effective),
  };

  return {
    sections,
    tier,
    effectiveGargalo: effective,
    dominantTitle,
    productiveLossScHa,
    financialRPerHa,
    pricing,
    limitingFactor: factor,
    recommendedSolution,
    targetYieldScHa: targetYield,
    yieldGapScHa: gap ?? undefined,
  };
}

function executiveHighlights(params: {
  dominantTitle: string;
  financialRPerHa: number;
  productiveLossScHa: number;
  nextStepOneLine: string;
}): string[] {
  return [
    `Dor dominante: ${params.dominantTitle}.`,
    `Sensibilidade estimada: ~${params.productiveLossScHa} sc/ha (~R$ ${params.financialRPerHa.toLocaleString("pt-BR")}/ha).`,
    params.nextStepOneLine,
  ];
}

export function generateDiagnosticoReport(
  answers: QuestionarioAnswers,
): QuestionarioReport {
  const built = buildDiagnosticoSections(answers);
  const reportType =
    answers.mainBottleneck === "Não sabe exatamente"
      ? getReportTypeForGargalo(built.effectiveGargalo)
      : getReportTypeForGargalo(answers.mainBottleneck);

  const nextStepOneLine =
    answers.urgencyToResolve === "Sim"
      ? "Próximo passo: priorizar diagnóstico e ação mensurável ainda nesta janela."
      : answers.urgencyToResolve === "Próxima safra"
        ? "Próximo passo: estruturar baseline (mapa/análise) para a próxima safra."
        : "Próximo passo: simular ROI e reduzir incertezas antes de investir.";

  const highlights = executiveHighlights({
    dominantTitle: built.dominantTitle,
    financialRPerHa: built.financialRPerHa,
    productiveLossScHa: built.productiveLossScHa,
    nextStepOneLine,
  });

  const farmTotalLossRApprox = Math.round(
    built.financialRPerHa * answers.totalAreaHa,
  );

  return {
    reportType,
    reportText: sectionsToReportText(built.sections),
    highlights,
    producerTier: built.tier,
    dominantPain: built.dominantTitle,
    productiveLossScHa: built.productiveLossScHa,
    financialImpactRPerHa: built.financialRPerHa,
    pricingCultureBasis: built.pricing.basis,
    farmTotalLossRApprox,
    limitingFactor: built.limitingFactor,
    recommendedSolution: built.recommendedSolution,
    currentYieldScHa: answers.currentYieldScHa,
    targetYieldScHa: built.targetYieldScHa,
    yieldGapScHa: built.yieldGapScHa,
    sections: built.sections,
  };
}
