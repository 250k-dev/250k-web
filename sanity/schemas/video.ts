import { defineField, defineType } from "sanity";
import { videoUrlField, featuredFields } from "./shared-fields";

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
    {
      ...videoUrlField,
      validation: (Rule) => Rule.required(),
    },
    defineField({
      name: "coverImage",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
      description:
        "Opcional. Se vazio, o front usa a miniatura do próprio vídeo quando disponível.",
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
    ...featuredFields,
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
      publishedAt: "publishedAt",
    },
    prepare({ title, media, publishedAt }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString("pt-BR")
        : "";
      return {
        title: title ?? "Vídeo",
        subtitle: ["Vídeo", date].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
