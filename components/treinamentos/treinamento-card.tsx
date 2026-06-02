import Link from "next/link";
import Image from "next/image";
import {
  IconCalendarEvent,
  IconMapPin,
  IconUsers,
  IconPhoto,
} from "@tabler/icons-react";
import { LinkArrow } from "@/components/marketing/link-arrow";
import { urlFor } from "@/lib/sanity/image";
import type { TreinamentoListItem } from "@/lib/sanity/types";

export function TreinamentoCard({
  treinamento,
}: {
  treinamento: TreinamentoListItem;
}) {
  return (
    <Link
      href={`/treinamentos/${treinamento.slug.current}`}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-16/10 overflow-hidden bg-muted">
        {treinamento.coverImage ? (
          <Image
            src={urlFor(treinamento.coverImage).width(600).height(375).url()}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-muted via-muted to-accent/20">
            <div className="rounded-xl bg-white/40 p-4 backdrop-blur-sm">
              <IconPhoto className="size-9 text-muted-foreground/80" stroke={1.5} />
            </div>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-md bg-primary/80 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
          {treinamento.tipo}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {treinamento.date && (
            <span className="inline-flex items-center gap-1.5">
              <IconCalendarEvent className="size-3.5" stroke={1.8} />
              {treinamento.date}
            </span>
          )}
          {treinamento.local && (
            <span className="inline-flex items-center gap-1.5">
              <IconMapPin className="size-3.5" stroke={1.8} />
              {treinamento.local}
            </span>
          )}
        </div>

        <h3 className="mt-3 break-words text-lg font-semibold leading-snug text-primary sm:text-xl">
          {treinamento.title}
        </h3>
        {treinamento.summary && (
          <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {treinamento.summary}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm">
          {(treinamento.participants || treinamento.audience) && (
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <IconUsers className="size-4" stroke={1.8} />
              {treinamento.participants ?? treinamento.audience}
            </span>
          )}
          <LinkArrow className="ml-auto text-sm">Ver</LinkArrow>
        </div>
      </div>
    </Link>
  );
}
