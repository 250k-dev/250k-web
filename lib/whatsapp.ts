export const DEFAULT_WHATSAPP_NUMBER = "5566992206117";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ||
  DEFAULT_WHATSAPP_NUMBER;

export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Vim pelo site da 250K e gostaria de mais informações.";

export function whatsappUrl(message?: string): string {
  const text =
    message ??
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ??
    WHATSAPP_DEFAULT_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
