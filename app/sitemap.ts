import type { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity/client";
import {
  POST_SLUGS_QUERY,
  EVENTO_SLUGS_QUERY,
  TREINAMENTO_SLUGS_QUERY,
} from "@/lib/sanity/queries";
import type { PostSlugItem } from "@/lib/sanity/types";
import { SOLUCOES } from "@/lib/solucoes/data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://250k.com.br";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/sobre`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/solucoes`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ...SOLUCOES.map((s) => ({
    url: `${BASE_URL}/solucoes/${s.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  })),
  { url: `${BASE_URL}/treinamentos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/contato`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const [postSlugs, eventoSlugs, treinamentoSlugs] = await Promise.all([
      sanityClient.fetch<PostSlugItem[]>(POST_SLUGS_QUERY),
      sanityClient.fetch<PostSlugItem[]>(EVENTO_SLUGS_QUERY),
      sanityClient.fetch<PostSlugItem[]>(TREINAMENTO_SLUGS_QUERY),
    ]);
    dynamicRoutes = [
      ...postSlugs.map((item) => ({
        url: `${BASE_URL}/blog/${item.slug.current}`,
        lastModified: item.publishedAt ? new Date(item.publishedAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
      ...eventoSlugs.map((item) => ({
        url: `${BASE_URL}/eventos/${item.slug.current}`,
        lastModified: item.publishedAt ? new Date(item.publishedAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
      ...treinamentoSlugs.map((item) => ({
        url: `${BASE_URL}/treinamentos/${item.slug.current}`,
        lastModified: item.publishedAt ? new Date(item.publishedAt) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  } catch {
    // Sanity not configured or unreachable; only static routes
  }
  return [...staticRoutes, ...dynamicRoutes];
}
