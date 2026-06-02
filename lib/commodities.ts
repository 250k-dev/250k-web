const BCB_BASE = "https://api.bcb.gov.br/dados/serie/bcdata.sgs";

async function fetchBcbSeries(series: number): Promise<number | null> {
  try {
    const res = await fetch(
      `${BCB_BASE}.${series}/dados/ultimos/1?formato=json`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const arr = await res.json();
    const item = Array.isArray(arr) ? arr[0] : null;
    const valor = item?.valor;
    return valor != null ? Number(valor) : null;
  } catch {
    return null;
  }
}

export interface CommoditiesData {
  /** USD/BRL (R$). */
  usdBrl: number | null;
  /** Soja em R$/saca 60kg. */
  soja: number | null;
  /** Milho em R$/saca 60kg. */
  milho: number | null;
  algodao: number | null;
  cafe: number | null;
  acucar: number | null;
}

/** Dólar: PTAX venda (série 1 do BCB SGS). */
const USD_BRL_SERIES = 1;

/**
 * Fallback manual (R$/saca 60kg) — usado quando o CEPEA está indisponível.
 * O CEPEA é a referência do mercado (Soja CEPEA/ESALQ–Paranaguá, Milho ESALQ/B3),
 * mas não tem API pública e bloqueia requisições de servidor. Atualize estes
 * valores conforme o indicador do CEPEA.
 * Última referência manual: jun/2026.
 */
const SOJA_FALLBACK_R_SACA = 130;
const MILHO_FALLBACK_R_SACA = 65;

/** IDs do indicador no widget do CEPEA (ajustar se necessário). */
const CEPEA_INDICADOR = { SOJA: 92, MILHO: 77 } as const;

/**
 * Tenta obter o indicador diário do CEPEA (R$/saca) pelo widget público.
 * Best-effort: o CEPEA frequentemente bloqueia servidores — em caso de falha
 * retorna null e o chamador usa o fallback manual.
 */
async function fetchCepeaIndicator(idIndicador: number): Promise<number | null> {
  try {
    const url =
      "https://www.cepea.esalq.usp.br/br/widgetproduto.js.php" +
      `?fonte=arial&tamanho=10&largura=400&corfundo=dbd6b2&cortexto=333333&corlinha=ede9d0&id_indicador%5B%5D=${idIndicador}`;
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent": "Mozilla/5.0",
        Referer: "https://www.cepea.esalq.usp.br/",
      },
    });
    if (!res.ok) return null;
    const text = await res.text();
    // Procura o valor "R$ 1.234,56" na tabela do widget.
    const m = text.match(/R\$\s*([\d.]+,\d{2})/);
    if (!m) return null;
    const value = Number(m[1].replace(/\./g, "").replace(",", "."));
    return Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

export async function getCommodities(): Promise<CommoditiesData> {
  const [usdBrl, sojaLive, milhoLive] = await Promise.all([
    fetchBcbSeries(USD_BRL_SERIES),
    fetchCepeaIndicator(CEPEA_INDICADOR.SOJA),
    fetchCepeaIndicator(CEPEA_INDICADOR.MILHO),
  ]);

  return {
    usdBrl,
    soja: sojaLive ?? SOJA_FALLBACK_R_SACA,
    milho: milhoLive ?? MILHO_FALLBACK_R_SACA,
    algodao: null,
    cafe: null,
    acucar: null,
  };
}
