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
    <div className="flex min-w-0 flex-col items-stretch gap-6 rounded-2xl bg-accent px-5 py-10 text-accent-foreground sm:rounded-3xl sm:px-7 sm:py-14 md:flex-row md:items-center md:justify-between md:gap-8 md:px-16 md:py-16">
      <h2
        className={cn(
          archivoSolutionTitle.className,
          "min-w-0 break-words text-2xl leading-tight tracking-tight text-white sm:text-3xl md:max-w-[18ch] md:text-5xl",
        )}
        style={{ fontVariationSettings: "'wght' 800" }}
      >
        {title}
      </h2>
      <Link
        href={href}
        className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-bold text-accent transition-colors hover:bg-primary hover:text-white sm:w-auto sm:px-6"
      >
        {ctaLabel}
        <IconArrowRight className="size-4" stroke={2.2} />
      </Link>
    </div>
  );
}
