import type { Metadata } from "next";
import { Suspense } from "react";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { HubFeed } from "@/components/content/hub-feed";
import { getFeed } from "@/lib/content/feed";

export const metadata: Metadata = {
  title: "Conteúdo",
  description:
    "Artigos, vídeos e eventos sobre consultoria agrícola, pesquisa e agronegócio — tudo em um só lugar.",
};

export default async function ConteudoPage() {
  const items = await getFeed();

  return (
    <div className="container mx-auto max-w-6xl px-4 pb-20 pt-10 md:pt-16">
      <header className="max-w-2xl">
        <Eyebrow>Conteúdo · 250K</Eyebrow>
        <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-primary md:text-6xl">
          Conhecimento que nasce no campo.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
          Artigos, vídeos e eventos sobre consultoria agrícola, pesquisa e
          agronegócio — tudo em um só lugar.
        </p>
      </header>

      <Suspense fallback={null}>
        <HubFeed items={items} />
      </Suspense>
    </div>
  );
}
