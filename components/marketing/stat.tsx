import { archivoSolutionTitle } from "@/lib/fonts/archivo-solution-title";
import { cn } from "@/lib/utils";

interface StatProps {
  /** Número principal, ex.: "600", "R$ 5,5", "40". */
  value: string;
  /** Sufixo destacado em laranja, ex.: "+", "Mi", "%". */
  suffix?: string;
  /** Rótulo abaixo do número. */
  label: string;
  /** Variante para fundos escuros (faixa bg-primary). */
  onDark?: boolean;
  className?: string;
}

/** Estatística: número grande (Archivo) com sufixo laranja + rótulo uppercase. */
export function Stat({ value, suffix, label, onDark, className }: StatProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <div
        className={cn(
          archivoSolutionTitle.className,
          "break-words text-2xl tracking-tight sm:text-3xl md:text-4xl",
          onDark ? "text-white" : "text-primary",
        )}
        style={{ fontVariationSettings: "'wght' 800" }}
      >
        {value}
        {suffix && <span className="text-brand-orange">{suffix}</span>}
      </div>
      <div
        className={cn(
          "mt-1.5 text-xs font-semibold uppercase tracking-[0.12em]",
          onDark ? "text-white/60" : "text-muted-foreground",
        )}
      >
        {label}
      </div>
    </div>
  );
}
