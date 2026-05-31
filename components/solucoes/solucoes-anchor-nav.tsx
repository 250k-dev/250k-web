"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ANCHORS = [
  { beforeK: "PD",         after: "",        id: "pd-k",       subtitle: "Pesquisa & Desenvolvimento"              },
  { beforeK: "FIELD",      after: "",        id: "field-k",    subtitle: "Recomendação Descomplicada"               },
  { beforeK: "FINANCE",    after: "",        id: "finance-k",  subtitle: "Gestão de Compras de Insumos Agrícolas"   },
  { beforeK: "SOLO CHEC",  after: "",        id: "solo-chec-k",subtitle: "Agricultura de Precisão"                  },
  { beforeK: "CERTIFICA",  after: "",        id: "certifica-k",subtitle: "Certificadora de Fazenda Produtiva"       },
  { beforeK: "250",        after: "ACADEMY", id: "academy",    subtitle: "Educação Agronômica de Alta Performance"  },
] as const;

type AnchorId = (typeof ANCHORS)[number]["id"];

export function SolucoesAnchorNav() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<AnchorId>(ANCHORS[0].id);
  const linkRefsMap = useRef<Record<string, HTMLAnchorElement | null>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname !== "/solucoes") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id as AnchorId);
            break;
          }
        }
      },
      { rootMargin: "-10% 0px -40% 0px", threshold: 0 },
    );

    ANCHORS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!activeId) return;

    const link = linkRefsMap.current[activeId];
    const container = scrollContainerRef.current;
    if (!link || !container) return;

    const PAGE_PADDING_PX = 16;
    const targetScrollLeft = link.offsetLeft - PAGE_PADDING_PX;

    container.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: "smooth",
    });
  }, [activeId]);

  const activeAnchor = ANCHORS.find((a) => a.id === activeId);

  return (
    <nav
      className="sticky top-12 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/90"
      aria-label="Navegação por núcleo"
    >
      {/* Linha de abas */}
      <div
        ref={scrollContainerRef}
        data-lenis-prevent
        className="w-full overflow-x-auto overflow-y-hidden md:overflow-visible"
      >
        <div className="flex flex-nowrap gap-2 pt-3 md:pt-4 min-w-max md:min-w-0 md:justify-center pl-4 pr-4 md:container md:mx-auto md:max-w-6xl md:flex-wrap">
          {ANCHORS.map(({ beforeK, after, id }) => {
            const isActive = activeId === id;
            return (
              <Link
                key={id}
                ref={(el) => {
                  linkRefsMap.current[id] = el;
                }}
                href={`#${id}`}
                className={cn(
                  "group inline-flex shrink-0 flex-col items-center gap-0.5 rounded-md px-3 pb-2 pt-2 text-sm font-medium tracking-tight transition-colors duration-200",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-brand-green/10 hover:text-primary dark:hover:bg-brand-green/12",
                )}
              >
                <span className="flex items-center">
                  {beforeK !== null ? (
                    <>
                      <span>{beforeK}</span>
                      <span
                        className={cn(
                          "font-semibold text-brand-orange dark:text-[hsl(11_55%_62%)]",
                          isActive && "text-accent-foreground",
                        )}
                      >
                        K
                      </span>
                      {after ? <span className="ml-1.5">{after}</span> : null}
                    </>
                  ) : (
                    <span className={cn(isActive && "text-brand-orange")}>{after}</span>
                  )}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Subtítulo da seção ativa */}
      {activeAnchor && (
        <div className="flex items-center justify-center gap-1.5 pb-2 pt-0.5">
          <svg
            className="h-3 w-3 shrink-0 text-brand-orange"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden
          >
            <path
              d="M6 2v8M2 7l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs font-semibold text-muted-foreground transition-all">
            {activeAnchor.subtitle}
          </span>
        </div>
      )}
    </nav>
  );
}
