"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { IconMenu } from "@tabler/icons-react";
import LogoIcon from "@/assets/logo-icon";
import LogoLabel from "@/assets/logo-label";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 96;

const nav = [
  { href: "/", label: "Início" },
  { href: "/solucoes", label: "Soluções" },
  { href: "/treinamentos", label: "Treinamentos" },
  { href: "/blog", label: "Conteúdo" },
  { href: "/sobre", label: "Sobre" },
];

/** Considera ativo também as sub-rotas (ex.: /solucoes/pd-k, /blog/[slug]). */
function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full max-w-full pt-[env(safe-area-inset-top,0px)] transition-[background-color,border-color] duration-500",
        isTransparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-border bg-background backdrop-blur-3xl supports-backdrop-filter:bg-background/85",
      )}
    >
      <div
        className={cn(
          "container mx-auto flex min-w-0 max-w-6xl items-center justify-between gap-2 px-4 sm:px-5",
          isTransparent ? "h-16 sm:h-20 md:h-24" : "h-12",
        )}
      >
        <Link
          href="/"
          className={cn(
            "flex min-w-0 shrink items-center hover:opacity-90 transition-[opacity,transform,gap] duration-500",
            isTransparent ? "text-white gap-1.5 sm:gap-2 lg:gap-4" : "text-primary gap-2",
          )}
          aria-label="250k - Página inicial"
        >
          <LogoIcon
            className={cn(
              "w-auto shrink-0 transition-[height,filter,transform] duration-500",
              isTransparent ? "h-8 sm:h-10 lg:h-12" : "h-6",
              isTransparent && "brightness-0 invert",
            )}
          />
          <LogoLabel
            className={cn(
              "h-auto shrink min-w-0 transition-[width,filter,transform] duration-500",
              isTransparent ? "w-16 sm:w-20 lg:w-28" : "w-14 sm:w-16",
              isTransparent && "brightness-0 invert",
            )}
          />
        </Link>

        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Navegação principal"
        >
          {nav.map(({ href, label }) => {
            const isActive = isNavActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  isTransparent
                    ? "text-white/80 hover:text-white"
                    : "text-muted-foreground hover:text-foreground",
                  isActive &&
                    (isTransparent
                      ? "text-white font-bold hover:text-white"
                      : "text-brand-orange font-semibold hover:text-brand-orange"),
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
          <Button
            asChild
            size={isTransparent ? "default" : "sm"}
            variant={isTransparent ? "outline" : "default"}
            className={cn(
              isTransparent &&
                "border-white text-white bg-transparent hover:bg-white/10 hover:text-white",
            )}
          >
            <Link href="/contato">Fale conosco</Link>
          </Button>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:hidden">
          <Button
            asChild
            size="sm"
            className={cn(
              "hidden min-[400px]:inline-flex",
              isTransparent &&
                "border-white text-white bg-transparent hover:bg-white/10 hover:text-white",
            )}
          >
            <Link href="/contato">Contato</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Abrir menu"
                className={cn(
                  "size-9 shrink-0",
                  isTransparent &&
                    "text-white hover:bg-white/10 hover:text-white",
                )}
              >
                <IconMenu className="h-5 w-5" size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex h-full w-[min(100vw-2rem,320px)] flex-col gap-0 p-0 sm:max-w-[320px]"
            >
              <SheetHeader className="border-b border-border px-6 py-4 text-left">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav
                className="flex flex-1 flex-col overflow-y-auto px-6 py-4"
                aria-label="Navegação mobile"
              >
                {nav.map(({ href, label }) => {
                  const isActive = isNavActive(pathname, href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                        isActive
                          ? "bg-brand-orange/10 text-brand-orange"
                          : "text-foreground hover:bg-muted hover:text-primary",
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-auto border-t border-border p-6">
                <Button asChild className="w-full" size="lg">
                  <Link href="/contato" onClick={() => setOpen(false)}>
                    Fale conosco
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
