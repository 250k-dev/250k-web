"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ContentCard } from "@/components/content/content-card";
import { FeaturedCarousel } from "@/components/content/featured-carousel";
import type { FeedItem } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type Filter = "tudo" | "artigo" | "video" | "evento";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "tudo", label: "Tudo" },
  { id: "artigo", label: "Artigos" },
  { id: "video", label: "Vídeos" },
  { id: "evento", label: "Eventos" },
];

function isFilter(value: string | null): value is Filter {
  return (
    value === "tudo" ||
    value === "artigo" ||
    value === "video" ||
    value === "evento"
  );
}

export function HubFeed({ items }: { items: FeedItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tipoParam = searchParams.get("tipo");
  const filter: Filter = isFilter(tipoParam) ? tipoParam : "tudo";

  const counts = useMemo(
    () => ({
      tudo: items.length,
      artigo: items.filter((i) => i.type === "artigo").length,
      video: items.filter((i) => i.type === "video").length,
      evento: items.filter((i) => i.type === "evento").length,
    }),
    [items],
  );

  // Destaques vigentes (marcados e dentro da janela de datas). Fallback: artigo/1º item.
  const featuredItems = useMemo(() => {
    const flagged = items.filter((i) => i.featured);
    if (flagged.length > 0) return flagged;
    const fallback = items.find((i) => i.type === "artigo") ?? items[0];
    return fallback ? [fallback] : [];
  }, [items]);

  const showFeatured = filter === "tudo" && featuredItems.length > 0;

  const list = useMemo(() => {
    const base =
      filter === "tudo" ? items : items.filter((i) => i.type === filter);
    if (!showFeatured) return base;
    const featuredIds = new Set(featuredItems.map((i) => i.id));
    return base.filter((i) => !featuredIds.has(i.id));
  }, [items, filter, showFeatured, featuredItems]);

  const setFilter = useCallback(
    (next: Filter) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next === "tudo") params.delete("tipo");
      else params.set("tipo", next);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [router, pathname, searchParams],
  );

  const total = list.length + (showFeatured ? featuredItems.length : 0);

  return (
    <>
      {showFeatured && <FeaturedCarousel items={featuredItems} />}

      {/* Filterbar */}
      <div className="sticky top-12 z-30 mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-background/90 py-4 backdrop-blur supports-backdrop-filter:bg-background/75">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:border-foreground",
                )}
              >
                {f.label}
                <span
                  className={cn(
                    "text-xs font-medium",
                    active ? "text-primary-foreground/60" : "text-muted-foreground",
                  )}
                >
                  {counts[f.id]}
                </span>
              </button>
            );
          })}
        </div>
        <span className="text-sm text-muted-foreground">
          {total} {total === 1 ? "publicação" : "publicações"}
        </span>
      </div>

      {/* Feed */}
      {total === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          Nenhuma publicação encontrada.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
