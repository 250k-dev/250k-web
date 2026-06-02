"use client";

import Link from "next/link";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import {
  useShowAfterHeroHalf,
  getFloatingVisibilityClassName,
} from "@/hooks/use-show-after-hero-half";
import { whatsappUrl } from "@/lib/whatsapp";

export function WhatsAppFAB() {
  const visible = useShowAfterHeroHalf();

  return (
    <Link
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
      className={`fixed bottom-6 right-3 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 sm:right-6 sm:h-14 sm:w-14 ${getFloatingVisibilityClassName(visible)}`}
    >
      <IconBrandWhatsapp className="h-8 w-8" strokeWidth={1.5} />
    </Link>
  );
}
