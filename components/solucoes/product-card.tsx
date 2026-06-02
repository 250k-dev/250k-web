import Link from "next/link";
import { IconCheck } from "@tabler/icons-react";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { LinkArrow } from "@/components/marketing/link-arrow";
import { BrandName } from "@/components/marketing/brand-name";
import { archivoSolutionTitle } from "@/lib/fonts/archivo-solution-title";
import type { Solucao } from "@/lib/solucoes/data";
import { cn } from "@/lib/utils";

const CARD_CLASS =
  "group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-7";

export function ProductCard({
  solucao,
  index,
}: {
  solucao: Solucao;
  index: number;
}) {
  const content = (
    <>
      <span
        className={cn(
          archivoSolutionTitle.className,
          "absolute right-6 top-6 text-base font-extrabold tracking-tight text-border",
        )}
        aria-hidden
      >
        {`0${index + 1}`}
      </span>

      <Eyebrow plain className="text-[0.65rem] text-muted-foreground">
        {solucao.idLabel}
      </Eyebrow>

      <h3
        className={cn(
          archivoSolutionTitle.className,
          "mt-3 break-words text-2xl tracking-tight text-primary sm:text-3xl",
        )}
        style={{ fontVariationSettings: "'wght' 800" }}
      >
        <BrandName name={solucao.name} />
      </h3>

      <p className="mt-1.5 text-base font-bold text-primary">{solucao.tagline}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {solucao.desc}
      </p>

      <ul className="mt-5 flex flex-1 flex-col gap-2.5">
        {solucao.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm text-foreground"
          >
            <IconCheck
              className="mt-0.5 size-4 shrink-0 text-brand-orange"
              stroke={2.4}
            />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <LinkArrow>Conhecer</LinkArrow>
      </div>
    </>
  );

  // Academia (e afins): abre plataforma externa em nova aba.
  if (solucao.externalUrl) {
    return (
      <a
        href={solucao.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={CARD_CLASS}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={`/solucoes/${solucao.id}`} className={CARD_CLASS}>
      {content}
    </Link>
  );
}
