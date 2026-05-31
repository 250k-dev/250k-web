import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  /** Variante para fundos escuros (faixas bg-primary). */
  onDark?: boolean;
  /** Remove o traço antes do texto. */
  plain?: boolean;
  className?: string;
}

/**
 * Rótulo "eyebrow": uppercase, tracking largo, com um traço de 18px antes do texto.
 * Adaptado ao tema atual (laranja da marca), sem fontes novas.
 */
export function Eyebrow({ children, onDark, plain, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] whitespace-nowrap",
        onDark ? "text-brand-orange/90" : "text-brand-orange",
        className,
      )}
    >
      {!plain && (
        <span
          className={cn(
            "inline-block h-px w-[18px]",
            onDark ? "bg-brand-orange/90" : "bg-brand-orange",
          )}
          aria-hidden
        />
      )}
      {children}
    </span>
  );
}
