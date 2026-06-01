import Link from "next/link";
import Image from "next/image";
import { IconCalendarEvent, IconMapPin, IconUsers } from "@tabler/icons-react";
import { LinkArrow } from "@/components/marketing/link-arrow";
import type { Treinamento } from "@/lib/treinamentos/data";

export function TreinamentoCard({ treinamento }: { treinamento: Treinamento }) {
  return (
    <Link
      href={`/treinamentos/${treinamento.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-16/10 overflow-hidden bg-muted">
        <Image
          src={treinamento.coverImage}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-md bg-primary/80 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
          {treinamento.tipo}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <IconCalendarEvent className="size-3.5" stroke={1.8} />
            {treinamento.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IconMapPin className="size-3.5" stroke={1.8} />
            {treinamento.local}
          </span>
        </div>

        <h3 className="mt-3 text-xl font-semibold leading-snug text-primary">
          {treinamento.title}
        </h3>
        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {treinamento.summary}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <IconUsers className="size-4" stroke={1.8} />
            {treinamento.participants ?? treinamento.audience}
          </span>
          <LinkArrow className="text-sm">Ver</LinkArrow>
        </div>
      </div>
    </Link>
  );
}
