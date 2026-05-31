import { IconArrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface LinkArrowProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Conteúdo visual de um link com seta que desliza no hover.
 * Use dentro de um <Link> ou <a> com a classe `group` no elemento clicável,
 * ou aplique `group` aqui caso seja o próprio alvo do hover.
 */
export function LinkArrow({ children, className }: LinkArrowProps) {
  return (
    <span
      className={cn(
        "group/arrow inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors group-hover:text-brand-orange",
        className,
      )}
    >
      {children}
      <IconArrowRight
        className="size-4 transition-transform duration-200 group-hover:translate-x-1 group-hover/arrow:translate-x-1"
        stroke={2.2}
      />
    </span>
  );
}
