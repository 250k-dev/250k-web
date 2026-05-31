"use client";

import type { ComponentType, ReactNode, SVGProps } from "react";
import { useId, useRef } from "react";
import {
  IconAdjustmentsHorizontal,
  IconChartHistogram,
  IconLeaf,
  IconSeeding,
  IconShoppingCart,
  IconTrendingUp,
} from "@tabler/icons-react";
import type { MotionValue } from "motion/react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

import { useMonotonicScrollProgress } from "@/hooks/use-monotonic-scroll-progress";
import { cn } from "@/lib/utils";

type IconComp = ComponentType<SVGProps<SVGSVGElement>>;

type Step = {
  title: string;
  description: string;
  Icon: IconComp;
};

const STEPS: Step[] = [
  {
    title: "Diagnóstico do Solo",
    description:
      "Base científica: entender limitações e potenciais antes de qualquer decisão de campo.",
    Icon: IconLeaf,
  },
  {
    title: "Inteligência de Dados",
    description:
      "Transformar informações dispersas em indicadores claros para acompanhar a safra.",
    Icon: IconChartHistogram,
  },
  {
    title: "Estratégia Agronômica",
    description:
      "Plano coerente entre cultura, janela e meta de produtividade para toda a área.",
    Icon: IconSeeding,
  },
  {
    title: "Eficiência no Manejo",
    description:
      "Operação alinhada: timing, doses e práticas que reduzem perdas e variabilidade.",
    Icon: IconAdjustmentsHorizontal,
  },
  {
    title: "Inteligência de Compras",
    description:
      "Compras e insumos conectadas à estratégia, com foco em custo e resultado.",
    Icon: IconShoppingCart,
  },
  {
    title: "Alta Produtividade",
    description:
      "Resultado sistêmico: tetos de produtividade sustentados por processo e dados.",
    Icon: IconTrendingUp,
  },
];

/**
 * Nós distribuídos horizontalmente ao longo de um trilho de 640px de largura.
 * cy alterna entre 38 (acima) e 62 (abaixo) para criar a curva serpentina.
 */
const NODE_POSITIONS: ReadonlyArray<{ cx: number; cy: number }> = [
  { cx: 52, cy: 50 },
  { cx: 148, cy: 62 },
  { cx: 258, cy: 38 },
  { cx: 368, cy: 62 },
  { cx: 478, cy: 38 },
  { cx: 588, cy: 50 },
];

/** Trilho horizontal com curvas simétricas ao SPINE_D vertical original. */
const SPINE_D =
  "M 32 50 L 52 50 C 95 50 118 68 148 62 C 200 44 232 32 258 38 C 305 56 338 64 368 62 C 418 44 452 32 478 38 C 530 44 560 48 588 50 L 620 50";

function JourneyNode({
  index,
  p,
  greenPhase,
  scrollXProgress,
  reduceMotion,
}: {
  index: number;
  p: { cx: number; cy: number };
  greenPhase: boolean;
  scrollXProgress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const t0 = 0.05 + index * 0.118;
  const t1 = t0 + 0.08;
  const opacity = useTransform(scrollXProgress, [t0, t1], [0, 1]);

  if (reduceMotion) {
    return (
      <g>
        <circle
          cx={p.cx}
          cy={p.cy}
          r="8"
          className={
            greenPhase
              ? "fill-background stroke-brand-green dark:stroke-[hsl(150_25%_55%)]"
              : "fill-background stroke-brand-orange dark:stroke-[hsl(11_50%_58%)]"
          }
          strokeWidth="2.5"
        />
        <circle
          cx={p.cx}
          cy={p.cy}
          r="3"
          className={
            greenPhase
              ? "fill-brand-green dark:fill-[hsl(150_25%_52%)]"
              : "fill-brand-orange dark:fill-[hsl(11_55%_55%)]"
          }
        />
      </g>
    );
  }

  return (
    <motion.g style={{ opacity }}>
      <circle
        cx={p.cx}
        cy={p.cy}
        r="8"
        className={
          greenPhase
            ? "fill-background stroke-brand-green dark:stroke-[hsl(150_25%_55%)]"
            : "fill-background stroke-brand-orange dark:stroke-[hsl(11_50%_58%)]"
        }
        strokeWidth="2.5"
      />
      <circle
        cx={p.cx}
        cy={p.cy}
        r="3"
        className={
          greenPhase
            ? "fill-brand-green dark:fill-[hsl(150_25%_52%)]"
            : "fill-brand-orange dark:fill-[hsl(11_55%_55%)]"
        }
      />
    </motion.g>
  );
}

function JourneySpine({
  scrollXProgress,
  reduceMotion,
}: {
  scrollXProgress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const gradId = `journey-spine-gradient-h-${uid}`;

  const pathLength = useTransform(scrollXProgress, [0, 0.78], [0, 1]);

  return (
    <svg
      className="h-full w-full min-w-full"
      viewBox="0 0 640 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-brand-green)" />
          <stop offset="45%" stopColor="var(--color-brand-green)" />
          <stop offset="100%" stopColor="var(--color-brand-orange)" />
        </linearGradient>
      </defs>
      {reduceMotion ? (
        <path
          d={SPINE_D}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <motion.path
          d={SPINE_D}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength }}
        />
      )}
      {NODE_POSITIONS.map((p, i) => (
        <JourneyNode
          key={i}
          index={i}
          p={p}
          greenPhase={i < 3}
          scrollXProgress={scrollXProgress}
          reduceMotion={reduceMotion}
        />
      ))}
    </svg>
  );
}

function TimelineStepItem({
  step,
  index,
  scrollXProgress,
  reduceMotion,
}: {
  step: Step;
  index: number;
  scrollXProgress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const isTop = index % 2 === 0;
  const { Icon } = step;
  const stepLabel = `Etapa ${index + 1}`;
  const greenPhase = index < 3;

  const tStart = 0.07 + index * 0.115;
  const tEnd = tStart + 0.11;
  const opacity = useTransform(scrollXProgress, [tStart, tEnd], [0, 1]);
  const x = useTransform(scrollXProgress, [tStart, tStart + 0.07], [18, 0]);
  const barScale = useTransform(
    scrollXProgress,
    [tStart + 0.04, tEnd],
    [0.08, 1],
  );

  const contentInner = (
    <div
      className={cn(
        "relative flex max-w-36 flex-col gap-1 rounded-md",
        isTop ? "items-center text-center" : "items-center text-center",
      )}
    >
      <h3
        className={cn(
          "text-sm font-bold leading-tight tracking-tight",
          greenPhase
            ? "text-brand-green dark:text-[hsl(150_25%_62%)]"
            : "text-brand-orange dark:text-[hsl(11_55%_62%)]",
        )}
      >
        {step.title}
      </h3>
      <p className="text-[0.7rem] font-semibold leading-snug text-muted-foreground">
        {step.description}
      </p>
      <div className="mt-0.5 flex flex-col items-center gap-1.5">
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-md border shadow-sm",
            greenPhase
              ? "border-brand-green/30 bg-brand-green/12 text-brand-green dark:text-[hsl(150_25%_62%)]"
              : "border-brand-orange/30 bg-brand-orange/12 text-brand-orange dark:text-[hsl(11_55%_62%)]",
          )}
          aria-hidden
        >
          <Icon className="size-4" strokeWidth={1.35} />
        </span>
        {reduceMotion ? (
          <span
            className={cn(
              "w-0.5 shrink-0 rounded-full",
              isTop ? "h-10" : "h-10",
              greenPhase ? "bg-brand-green/50" : "bg-brand-orange/50",
            )}
            aria-hidden
          />
        ) : (
          <motion.span
            className={cn(
              "w-0.5 shrink-0 rounded-full",
              isTop ? "h-10" : "h-10",
              greenPhase ? "bg-brand-green/50" : "bg-brand-orange/50",
            )}
            style={{
              scaleY: barScale,
              transformOrigin: isTop ? "0% 100%" : "0% 0%",
            }}
            aria-hidden
          />
        )}
      </div>
    </div>
  );

  const badgeInner = (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-[0.6rem] font-semibold text-white shadow-sm",
        greenPhase ? "bg-brand-green" : "bg-brand-orange",
      )}
    >
      {stepLabel}
    </span>
  );

  const wrapMotion = (node: ReactNode) =>
    reduceMotion ? (
      node
    ) : (
      <motion.div style={{ opacity, x }}>{node}</motion.div>
    );

  return (
    <li className="grid grid-rows-[1fr_5rem_1fr] items-center justify-items-center">
      {isTop ? (
        <>
          <div className="flex flex-col items-center justify-end pb-1">
            {wrapMotion(contentInner)}
          </div>
          <div className="hidden min-w-px h-full md:block" aria-hidden />
          <div className="flex items-start justify-center pt-1">
            {wrapMotion(badgeInner)}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-end justify-center pb-1">
            {wrapMotion(badgeInner)}
          </div>
          <div className="hidden min-w-px h-full md:block" aria-hidden />
          <div className="flex flex-col items-center justify-start pt-1">
            {wrapMotion(contentInner)}
          </div>
        </>
      )}
    </li>
  );
}

export function CasesJourneyTimelineHorizontal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.93", "end 0.56"],
  });
  const progress = useMonotonicScrollProgress(scrollYProgress);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex w-full flex-col py-0 pt-24"
    >
      {/* trilho horizontal */}
      <div
        className="pointer-events-none absolute inset-x-0 z-0 hidden md:block"
        style={{ top: "calc(50% - 2.5rem)", height: "5rem" }}
        aria-hidden
      >
        <JourneySpine
          scrollXProgress={progress}
          reduceMotion={!!reduceMotion}
        />
      </div>

      <ol
        className="relative z-10 grid w-full"
        style={{
          gridTemplateColumns: `repeat(${STEPS.length}, minmax(0, 1fr))`,
        }}
        aria-label="Jornada em etapas"
      >
        {STEPS.map((step, index) => (
          <TimelineStepItem
            key={step.title}
            step={step}
            index={index}
            scrollXProgress={progress}
            reduceMotion={!!reduceMotion}
          />
        ))}
      </ol>
    </div>
  );
}
