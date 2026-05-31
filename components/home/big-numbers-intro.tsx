"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

const INFLUENCED_END = 1_000_000;
const ATTENDED_END = 109;
const CLIENTS_END = 54;

const DURATION_S = 1.35;

function formatInfluencedHa(n: number): string {
  const rounded = Math.round(n);
  if (rounded >= INFLUENCED_END) return "+1 Mi";
  const thousands = Math.floor(rounded / 1000);
  return `+${thousands} mil`;
}

/** Big numbers block: título + métricas com contagem na primeira vez que entra na viewport. */
export function BigNumbersIntro() {
  const blockRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(blockRef, { once: true, amount: 0.25 });
  const reduceMotion = useReducedMotion();

  const influencedMv = useMotionValue(0);
  const attendedMv = useMotionValue(0);
  const clientsMv = useMotionValue(0);

  const [influencedLabel, setInfluencedLabel] = useState(() =>
    formatInfluencedHa(0),
  );
  const [attendedLabel, setAttendedLabel] = useState("0 mil");
  const [clientsLabel, setClientsLabel] = useState("0");

  useMotionValueEvent(influencedMv, "change", (latest) => {
    setInfluencedLabel(formatInfluencedHa(latest));
  });
  useMotionValueEvent(attendedMv, "change", (latest) => {
    setAttendedLabel(`${Math.round(latest)} mil`);
  });
  useMotionValueEvent(clientsMv, "change", (latest) => {
    setClientsLabel(String(Math.round(latest)));
  });

  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    if (reduceMotion) {
      influencedMv.set(INFLUENCED_END);
      attendedMv.set(ATTENDED_END);
      clientsMv.set(CLIENTS_END);
      return;
    }

    const a1 = animate(influencedMv, INFLUENCED_END, {
      duration: DURATION_S,
      ease: "easeOut",
    });
    const a2 = animate(attendedMv, ATTENDED_END, {
      duration: DURATION_S,
      ease: "easeOut",
    });
    const a3 = animate(clientsMv, CLIENTS_END, {
      duration: DURATION_S,
      ease: "easeOut",
    });

    void Promise.all([a1, a2, a3]).then(() => {
      influencedMv.set(INFLUENCED_END);
      attendedMv.set(ATTENDED_END);
      clientsMv.set(CLIENTS_END);
    });

    return () => {
      a1.stop();
      a2.stop();
      a3.stop();
    };
  }, [
    isInView,
    reduceMotion,
    influencedMv,
    attendedMv,
    clientsMv,
  ]);

  return (
    <div
      ref={blockRef}
      className="mb-8 flex flex-col items-center gap-6"
    >
      <div className="flex w-full min-w-0 flex-wrap justify-center gap-x-8 gap-y-6 sm:gap-x-12 lg:gap-x-16">
        <div className="flex flex-col items-center gap-1">
          <div className="text-4xl font-extrabold text-primary tabular-nums sm:text-5xl">
            {influencedLabel}
          </div>
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:text-sm">
            Hectares influenciados
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="text-4xl font-extrabold text-primary tabular-nums sm:text-5xl">
            {attendedLabel}
          </div>
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:text-sm">
            Hectares atendidos
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="text-4xl font-extrabold text-brand-orange tabular-nums sm:text-5xl">
            {clientsLabel}
          </div>
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:text-sm">
            Clientes ativos
          </div>
        </div>
      </div>
    </div>
  );
}
