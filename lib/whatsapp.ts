const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ||
  "5511999999999";

/** Monta a URL do WhatsApp, opcionalmente com mensagem pré-preenchida. */
export function whatsappUrl(message?: string): string {
  const text = message ?? process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ?? "";
  return text
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${WHATSAPP_NUMBER}`;
}
