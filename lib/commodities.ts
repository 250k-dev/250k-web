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
  /** Soja em R$/saca 60kg (Indicador CEPEA/ESALQ). */
  soja: number | null;
  /** Milho em R$/saca 60kg (Indicador CEPEA/ESALQ). */
  milho: number | null;
  algodao: number | null;
  cafe: number | null;
  acucar: number | null;
}

/** Dólar: PTAX venda (série 1 do BCB SGS). */
const USD_BRL_SERIES = 1;


/**
 * Preço do grão em R$/saca 60kg via melhorcambio.com, que espelha o Indicador
 * CEPEA/ESALQ (mesmo valor do site do CEPEA, porém acessível por servidor).
 * Best-effort: em qualquer falha retorna null e o chamador usa o fallback manual.
 */
async function fetchCepeaSacaBrl(
  produto: "soja" | "milho",
): Promise<number | null> {
  try {
    const res = await fetch(`https://www.melhorcambio.com/${produto}-hoje`, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    });
    if (!res.ok) return null;
    const html = await res.text();
    // Valor do indicador: <input ... value="64,51" class="text-verde" ...>
    const m = html.match(/value="([\d.,]+)"\s+class="text-verde"/i);
    if (!m) return null;
    const value = Number(m[1].replace(/\./g, "").replace(",", "."));
    return Number.isFinite(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
}

export async function getCommodities(): Promise<CommoditiesData> {
  const [usdBrl, sojaLive, milhoLive] = await Promise.all([
    fetchBcbSeries(USD_BRL_SERIES),
    fetchCepeaSacaBrl("soja"),
    fetchCepeaSacaBrl("milho"),
  ]);

  return {
    usdBrl,
    soja: sojaLive ?? 0,
    milho: milhoLive ?? 0,
    algodao: null,
    cafe: null,
    acucar: null,
  };
}
