import Link from "next/link";
import Image from "next/image";
import {
  IconArticle,
  IconPlayerPlayFilled,
  IconBrandYoutube,
  IconBrandInstagram,
  IconMapPin,
  IconCalendarEvent,
  IconClock,
} from "@tabler/icons-react";
import { LinkArrow } from "@/components/marketing/link-arrow";
import { urlFor } from "@/lib/sanity/image";
import type { FeedItem } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

const TYPE_LABEL: Record<FeedItem["type"], string> = {
  artigo: "Artigo",
  video: "Vídeo",
  evento: "Evento",
};

const TYPE_TAG_CLASS: Record<FeedItem["type"], string> = {
  artigo: "bg-primary/10 text-primary",
  video: "bg-accent/15 text-brand-orange",
  evento: "bg-secondary text-secondary-foreground",
};

function PlatformBadge({ platform }: { platform: FeedItem["platform"] }) {
  if (!platform) return null;
  const map = {
    youtube: { Icon: IconBrandYoutube, label: "YouTube" },
    instagram: { Icon: IconBrandInstagram, label: "Reels" },
    presencial: { Icon: IconMapPin, label: "Presencial" },
  } as const;
  const { Icon, label } = map[platform];
  return (
    <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-primary/80 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
      <Icon className="size-3.5" stroke={2} />
      {label}
    </span>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[0.7rem] font-bold text-primary-foreground">
      {name.charAt(0)}
    </span>
  );
}

/** Cartão de conteúdo do Hub — artigo, vídeo ou evento. `featured` torna-o horizontal. */
export function ContentCard({
  item,
  featured = false,
}: {
  item: FeedItem;
  featured?: boolean;
}) {
  const isVideo = item.type === "video";
  const isEvento = item.type === "evento";

  const media = (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden bg-muted",
        featured ? "md:w-[52%] aspect-16/10 md:aspect-auto" : "aspect-16/10",
      )}
    >
      {item.coverImage ? (
        <Image
          src={urlFor(item.coverImage).width(800).height(500).url()}
          alt=""
          fill
          className="object-cover"
          sizes={featured ? "(max-width: 768px) 100vw, 640px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-muted via-muted to-accent/20">
          <div className="rounded-xl bg-white/40 p-4 backdrop-blur-sm">
            <IconArticle className="size-9 text-muted-foreground/80" stroke={1.5} />
          </div>
        </div>
      )}
      <PlatformBadge platform={item.platform} />
      {isVideo && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform duration-200 group-hover:scale-110">
            <IconPlayerPlayFilled className="size-6 translate-x-0.5" />
          </span>
        </span>
      )}
      {isVideo && item.duration && (
        <span className="absolute bottom-3 right-3 rounded-md bg-primary/80 px-2 py-1 text-[0.7rem] font-semibold text-white">
          {item.duration}
        </span>
      )}
    </div>
  );

  const body = (
    <div
      className={cn(
        "flex flex-1 flex-col p-6",
        featured && "md:justify-center md:p-10",
      )}
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <span
          className={cn(
            "rounded-md px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide",
            TYPE_TAG_CLASS[item.type],
          )}
        >
          {TYPE_LABEL[item.type]}
        </span>
        {item.category && (
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {item.category}
          </span>
        )}
        {isEvento && item.status && (
          <span className="rounded-md bg-accent/15 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-brand-orange">
            {item.status}
          </span>
        )}
      </div>

      <h3
        className={cn(
          "mt-3.5 font-semibold leading-snug text-primary",
          featured ? "text-2xl md:text-3xl" : "text-xl",
        )}
      >
        {item.title}
      </h3>

      {item.excerpt && (
        <p
          className={cn(
            "mt-2.5 leading-relaxed text-muted-foreground",
            featured ? "text-base" : "line-clamp-3 text-sm",
          )}
        >
          {item.excerpt}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm text-foreground">
        {isEvento ? (
          <span className="flex items-center gap-2 text-muted-foreground">
            <IconCalendarEvent className="size-4" stroke={1.8} />
            {item.dateLabel}
          </span>
        ) : item.type === "artigo" && item.author ? (
          <span className="flex items-center gap-2 text-muted-foreground">
            <Avatar name={item.author.name} />
            {item.author.name}
          </span>
        ) : isVideo ? (
          <span className="flex items-center gap-2 text-muted-foreground">
            <IconClock className="size-4" stroke={1.8} />
            {item.duration ?? item.dateLabel}
          </span>
        ) : (
          <span className="text-muted-foreground">{item.dateLabel}</span>
        )}

        {item.type === "artigo" ? (
          <LinkArrow className="text-sm">Ler</LinkArrow>
        ) : (
          <span className="text-muted-foreground">
            {isEvento ? item.place ?? item.dateLabel : item.dateLabel}
          </span>
        )}
      </div>
    </div>
  );

  const cardClass = cn(
    "group flex overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
    featured ? "flex-col md:flex-row" : "flex-col",
  );

  // Artigo → rota interna; vídeo/evento com href → link externo; senão, estático.
  if (item.type === "artigo" && item.href) {
    return (
      <Link href={item.href} className={cardClass}>
        {media}
        {body}
      </Link>
    );
  }
  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
      >
        {media}
        {body}
      </a>
    );
  }
  return (
    <article className={cardClass}>
      {media}
      {body}
    </article>
  );
}
