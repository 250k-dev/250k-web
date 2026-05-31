"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SECTIONS = [
  { id: "privacidade", label: "Política de Privacidade" },
  { id: "cookies", label: "Política de Cookies" },
  { id: "termos", label: "Termos de Uso" },
  { id: "lgpd", label: "LGPD" },
];

export function LegalSidebar() {
  const [active, setActive] = useState("privacidade");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="hidden lg:block w-56 shrink-0">
      <div className="sticky top-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 px-3">
          Nesta página
        </p>
        <nav>
          <ol className="space-y-1">
            {SECTIONS.map(({ id, label }, i) => (
              <li key={id}>
                <Link
                  href={`#${id}`}
                  className={`
                    group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all
                    ${active === id
                      ? "bg-brand-orange/10 text-brand-orange"
                      : "text-muted-foreground hover:bg-muted hover:text-primary"
                    }
                  `}
                >
                  <span
                    className={`
                      flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-colors
                      ${active === id
                        ? "bg-brand-orange text-white"
                        : "bg-muted-foreground/20 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                      }
                    `}
                  >
                    {i + 1}
                  </span>
                  {label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </aside>
  );
}
