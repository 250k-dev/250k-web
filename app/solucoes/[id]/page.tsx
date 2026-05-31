import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolucaoDetail } from "@/components/solucoes/solucao-detail";
import { SOLUCOES, getSolucao, getOtherSolucoes } from "@/lib/solucoes/data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return SOLUCOES.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const solucao = getSolucao(id);
  if (!solucao) {
    return { title: "Solução não encontrada" };
  }
  const plainName = solucao.name;
  return {
    title: `${plainName} | Soluções 250K`,
    description: solucao.desc,
  };
}

export default async function SolucaoDetailPage({ params }: PageProps) {
  const { id } = await params;
  const solucao = getSolucao(id);
  if (!solucao) notFound();

  return (
    <SolucaoDetail solucao={solucao} others={getOtherSolucoes(id)} />
  );
}
