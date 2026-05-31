import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { archivoSolutionTitle } from "@/lib/fonts/archivo-solution-title";
import { cn } from "@/lib/utils";

interface SolCtaProps {
  title: string;
  ctaLabel?: string;
  href?: string;
}

/** Faixa de CTA laranja, reutilizada na lista e no detalhe de solução. */
export function SolCta({
  title,
  ctaLabel = "Quero avaliar minha fazenda",
  href = "/questionario",
}: SolCtaProps) {
  return (
    <div className="flex flex-col items-start gap-8 rounded-3xl bg-accent px-7 py-14 text-accent-foreground md:flex-row md:items-center md:justify-between md:px-16 md:py-16">
      <h2
        className={cn(
          archivoSolutionTitle.className,
          "max-w-[18ch] text-3xl leading-tight tracking-tight text-white md:text-5xl",
        )}
        style={{ fontVariationSettings: "'wght' 800" }}
      >
        {title}
      </h2>
      <Link
        href={href}
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-accent transition-colors hover:bg-primary hover:text-white"
      >
        {ctaLabel}
        <IconArrowRight className="size-4" stroke={2.2} />
      </Link>
    </div>
  );
}
