import { splitBrandKTitle } from "@/lib/solucoes-brand-title";
import { cn } from "@/lib/utils";

interface BrandNameProps {
  /** Nome do produto, ex.: "PD-K", "Finance-K", "250K Academy". */
  name: string;
  /** Classe do "K" destacado. */
  accentClassName?: string;
  className?: string;
}

/** Renderiza o nome de um produto com o "K" da marca em laranja. */
export function BrandName({ name, accentClassName, className }: BrandNameProps) {
  const { before, accent, after } = splitBrandKTitle(name);
  if (!accent) return <span className={className}>{name}</span>;
  return (
    <span className={className}>
      {before}
      <span
        className={cn(
          "text-brand-orange dark:text-[hsl(11_55%_62%)]",
          accentClassName,
        )}
      >
        {accent}
      </span>
      {after}
    </span>
  );
}
