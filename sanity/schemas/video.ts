import { defineField, defineType } from "sanity";

export const videoType = defineType({
  name: "video",
  title: "Vídeo",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "platform",
      title: "Plataforma",
      type: "string",
      options: {
        list: [
          { title: "YouTube", value: "youtube" },
          { title: "Instagram (Reels)", value: "instagram" },
        ],
        layout: "radio",
      },
      initialValue: "youtube",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "youtubeId",
      title: "ID do YouTube",
      type: "string",
      description: "Apenas o ID do vídeo (ex.: dvgpLyrzd2o). Usado para embed quando a plataforma é YouTube.",
      hidden: ({ parent }) => parent?.platform !== "youtube",
    }),
    defineField({
      name: "externalUrl",
      title: "URL externa",
      type: "url",
      description: "Link do Reels/vídeo externo (ex.: Instagram). Usado quando não há embed nativo.",
      hidden: ({ parent }) => parent?.platform === "youtube",
    }),
    defineField({
      name: "coverImage",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "duration",
      title: "Duração",
      type: "string",
      description: 'Texto livre, ex.: "12:48" ou "0:58".',
    }),
    defineField({
      name: "excerpt",
      title: "Resumo",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Destaque",
      type: "boolean",
      initialValue: false,
      description: "Marcar para destacar no Hub de Conteúdo.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
      publishedAt: "publishedAt",
      platform: "platform",
    },
    prepare({ title, media, publishedAt, platform }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString("pt-BR")
        : "";
      const label = platform === "instagram" ? "Reels" : "YouTube";
      return {
        title: title ?? "Vídeo",
        subtitle: [label, date].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
