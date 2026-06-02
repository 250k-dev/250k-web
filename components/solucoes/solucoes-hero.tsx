import Image from "next/image";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { Stat } from "@/components/marketing/stat";
import { archivoSolutionTitle } from "@/lib/fonts/archivo-solution-title";
import { cn } from "@/lib/utils";

const HERO_WALLPAPER = "/images/wallpapers/wallpaper-5.png";

const HERO_STATS = [
  { value: "600", suffix: "+", label: "parcelas / safra" },
  { value: "R$ 5,5", suffix: "Mi", label: "investidos em P&D" },
  { value: "40", suffix: "%", label: "menos grãos ardidos" },
] as const;

export function SolucoesHero() {
  return (
    <section className="container mx-auto max-w-6xl px-4 pt-8 md:pt-12">
      <div className="relative overflow-hidden rounded-2xl bg-primary px-5 py-10 sm:rounded-3xl sm:px-7 sm:py-14 md:px-16 md:py-20">
        <Image
          src={HERO_WALLPAPER}
          alt=""
          fill
          className="object-cover opacity-20"
          priority
          sizes="(max-width: 1280px) 100vw, 1240px"
        />
        <div
          className="absolute inset-0 bg-primary/40"
          aria-hidden
        />

        <div className="relative max-w-2xl">
          <Eyebrow onDark>Soluções 250K</Eyebrow>
          <h1
            className={cn(
              archivoSolutionTitle.className,
              "mt-5 text-4xl leading-[0.98] tracking-tight text-white md:text-6xl",
            )}
            style={{ fontVariationSettings: "'wght' 800" }}
          >
            Um ecossistema de inteligência agronômica.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
            Pesquisa, execução e governança trabalhando juntas para transformar
            dados reais de campo em decisões produtivas — na soja e no milho do
            norte de Mato Grosso.
          </p>

          <div className="mt-8 flex flex-wrap gap-6 sm:mt-11 sm:gap-10">
            {HERO_STATS.map((stat) => (
              <Stat key={stat.label} onDark {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
