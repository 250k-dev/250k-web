"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type TierDetails = {
  headline: string;
  about: string;
  benefits: string[];
};

type Tier = {
  name: string;
  badge: string;
  color: string;
  bg: string;
  shadow: string;
  border: string;
  percentage: number;
  details: TierDetails;
};

const TIERS: Tier[] = [
  {
    name: "Bronze",
    badge: "/images/badges/bronze.png",
    color: "#cd7f32",
    bg: "rgba(205, 127, 50, 0.14)",
    shadow: "rgba(205, 127, 50, 0.55)",
    border: "rgba(205, 127, 50, 0.45)",
    percentage: 30,
    details: {
      headline: "O ponto de entrada na jornada 250k",
      about:
        "O nível Bronze representa o primeiro compromisso com a alta performance. Ao adotar o sistema em 30% da sua operação, você começa a construir a base de dados e as rotinas que transformam decisões intuitivas em decisões técnicas.",
      benefits: [
        "Diagnóstico inicial completo da operação",
        "Acesso à plataforma de gestão de dados",
        "Relatório de lucratividade por talhão",
        "Suporte técnico dedicado na implementação",
      ],
    },
  },
  {
    name: "Prata",
    badge: "/images/badges/silver.png",
    color: "#757c81",
    bg: "rgba(176, 184, 193, 0.352)",
    shadow: "rgba(147, 154, 161, 0.5)",
    border: "rgba(176, 184, 193, 0.4)",
    percentage: 50,
    details: {
      headline: "Metade da fazenda já opera em alta performance",
      about:
        "Com 50% da produção dentro do sistema, o produtor começa a sentir na prática a diferença entre gestão reativa e gestão preditiva. Os dados acumulados permitem comparações reais entre áreas e safras.",
      benefits: [
        "Análise comparativa entre talhões e safras",
        "Mapa de potencial produtivo por área",
        "Acesso a benchmarks regionais exclusivos",
        "Revisão semestral com consultor técnico 250k",
      ],
    },
  },
  {
    name: "Ouro",
    badge: "/images/badges/gold.png",
    color: "#d8b229",
    bg: "rgba(245, 197, 24, 0.177)",
    shadow: "rgba(245, 197, 24, 0.413)",
    border: "rgba(245, 197, 24, 0.45)",
    percentage: 80,
    details: {
      headline: "Gestão sistêmica em escala real",
      about:
        "No nível Ouro, 80% da operação está sob gestão sistêmica. O produtor tem visibilidade quase total da fazenda e consegue tomar decisões de insumos, manejo e logística com precisão e antecipação.",
      benefits: [
        "Dashboard integrado com toda a operação",
        "Planejamento de safra baseado em histórico real",
        "Alertas preditivos de risco e oportunidade",
        "Acesso a eventos e grupos técnicos exclusivos 250k",
        "Consultoria estratégica trimestral",
      ],
    },
  },
  {
    name: "Diamante",
    badge: "/images/badges/diamond.png",
    color: "#4797b2",
    bg: "rgba(126, 207, 234, 0.317)",
    shadow: "rgba(126, 207, 234, 0.5)",
    border: "rgba(126, 207, 234, 0.4)",
    percentage: 100,
    details: {
      headline: "100% da operação em alta performance",
      about:
        "O nível Diamante é o mais alto grau de comprometimento com a metodologia 250k. Com toda a fazenda integrada, o produtor opera com previsibilidade máxima, custo otimizado e resultado consistente safra após safra.",
      benefits: [
        "Gestão completa e integrada de toda a fazenda",
        "Acesso prioritário a novas tecnologias e pesquisas",
        "Relatório executivo anual com análise de ROI",
        "Participação no conselho técnico 250k",
        "Visibilidade como caso de referência regional",
        "Suporte ilimitado da equipe técnica",
      ],
    },
  },
];

function TierCard({
  tier,
  index,
  onSelect,
}: {
  tier: Tier;
  index: number;
  onSelect: (tier: Tier) => void;
}) {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setRotate({ x: -dy * 10, y: dx * 10 });
  }

  function handleMouseLeave() {
    setRotate({ x: 0, y: 0 });
    setHovered(false);
  }

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      style={{ perspective: "900px" }}
      className="flex-1 min-w-50"
    >
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label={`Ver detalhes do nível ${tier.name}`}
        onClick={() => onSelect(tier)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onSelect(tier);
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          background: `linear-gradient(145deg, ${tier.bg} 0%, transparent 65%)`,
          transform: reduced
            ? undefined
            : `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: hovered
            ? "transform 0.08s ease-out, box-shadow 0.2s ease-out"
            : "transform 0.45s ease-out, box-shadow 0.45s ease-out",
          boxShadow:
            hovered && !reduced
              ? `0 12px 40px ${tier.shadow}, 0 0 0 1.5px ${tier.border}`
              : `0 2px 10px rgba(0,0,0,0.125), 0 0 0 1px rgba(255,255,255,0.06)`,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative flex flex-col items-center gap-4 rounded-3xl p-5 h-full",
          "bg-card text-card-foreground cursor-pointer select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        <div className="space-y-2 items-center flex flex-col">
          {/* Badge */}
          <div
            className="relative w-20 h-20 mt-1"
            style={{
              transform: "translateZ(18px)",
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src={tier.badge}
              alt={`Badge ${tier.name}`}
              fill
              className="object-contain drop-shadow-lg"
            />
          </div>

          {/* Tier name */}
          <p
            className="text-2xl font-black tracking-wide"
            style={{ color: tier.color }}
          >
            {tier.name}
          </p>
        </div>

        {/* Tagline */}
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground text-center leading-tight">
          <span className="font-black">250k</span> Agricultura em
          <br />
          Alta Performance
        </p>

        {/* Divider */}
        <div className="w-full h-px" style={{ background: tier.border }} />

        {/* Requirements — main emphasis */}
        <div className="flex flex-col items-center gap-0.5 w-full">
          <div
            className="relative flex items-end justify-center gap-1.5 leading-none"
            style={{
              transform: "translateZ(12px)",
              transformStyle: "preserve-3d",
            }}
          >
            <span
              className="text-4xl font-black tabular-nums leading-none tracking-tighter"
              style={{ color: tier.color }}
            >
              250
            </span>
            <span
              className="text-base font-bold mb-1.5 leading-none"
              style={{ color: tier.color }}
            >
              sacas
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground tracking-wide uppercase">
            soja / milho
          </span>
        </div>

        {/* Percentage requirement */}
        <div className="w-full space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Sistema de produção</span>
            <span className="font-bold" style={{ color: tier.color }}>
              {tier.percentage}%
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-black/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: tier.color }}
              initial={reduced ? false : { width: 0 }}
              animate={{ width: `${tier.percentage}%` }}
              transition={{
                duration: 0.8,
                delay: index * 0.12 + 0.3,
                ease: "easeOut",
              }}
            />
          </div>
        </div>

        {/* "Ver detalhes" hint
        <p className="text-[10px] font-semibold uppercase tracking-wider mt-auto opacity-50 text-muted-foreground">
          Ver detalhes
        </p> */}
      </div>
    </motion.div>
  );
}

function TierModal({
  tier,
  onClose,
}: {
  tier: Tier | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={tier !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-md data-[state=open]:slide-in-from-left-0 data-[state=open]:slide-in-from-top-0 data-[state=closed]:slide-out-to-left-0 data-[state=closed]:slide-out-to-top-0 data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100 rounded-3xl!"
        style={
          tier ? { borderColor: tier.color, borderWidth: "2px" } : undefined
        }
      >
        {tier && (
          <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="flex flex-col items-center gap-2 pt-2">
              <div className="relative w-20 h-20">
                <Image
                  src={tier.badge}
                  alt={`Badge ${tier.name}`}
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <DialogTitle
                className="text-2xl font-black tracking-wide text-center"
                style={{ color: tier.color }}
              >
                {tier.name}
              </DialogTitle>
              <DialogDescription className="text-[10px] font-semibold uppercase tracking-widest text-center">
                <span className="font-black">250k</span> Agricultura em
                <br />
                Alta Performance
              </DialogDescription>
            </div>

            {/* Divider */}
            <div className="w-full h-px" style={{ background: tier.border }} />

            {/* Headline + about */}
            <div className="space-y-2">
              <p className="text-sm font-bold text-foreground leading-snug">
                {tier.details.headline}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tier.details.about}
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                O que você acessa
              </p>
              <ul className="space-y-1.5">
                {tier.details.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <span
                      className="mt-0.5 shrink-0 font-bold"
                      style={{ color: tier.color }}
                    >
                      ✓
                    </span>
                    <span className="text-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirement chip */}
            <div
              className="flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-4 text-xs font-semibold"
              style={{
                background: tier.bg,
                border: `1px solid ${tier.border}`,
                color: tier.color,
              }}
            >
              <span className="text-base font-black">250</span> sacas
              (soja/milho) em{" "}
              <span className="font-black">{tier.percentage}%</span> do sistema
              de produção
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function LoyaltyCards() {
  const [selected, setSelected] = useState<Tier | null>(null);

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-foreground tracking-tight">
          Fidelização do Cliente
        </h3>
        <p className="text-sm text-muted-foreground">
          Evolua sua operação e alcance novos níveis no ecossistema 250k
        </p>
      </div>

      {/* Cards — always side by side, scroll on small screens */}
      <div className="flex flex-row gap-8 pb-2">
        {TIERS.map((tier, i) => (
          <TierCard
            key={tier.name}
            tier={tier}
            index={i}
            onSelect={setSelected}
          />
        ))}
      </div>

      <TierModal tier={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
