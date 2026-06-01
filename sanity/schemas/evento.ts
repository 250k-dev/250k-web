import { defineField, defineType } from "sanity";
import { videoUrlField, featuredFields } from "./shared-fields";

export const eventoType = defineType({
  name: "evento",
  title: "Evento",
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
      description: "Usado no endereço da página do evento (/eventos/slug).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Inscrições abertas", value: "Inscrições abertas" },
          { title: "Em breve", value: "Em breve" },
          { title: "Gravação disponível", value: "Gravação disponível" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "excerpt",
      title: "Resumo",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "dateLabel",
      title: "Data (texto)",
      type: "string",
      description: 'Texto livre, ex.: "Mai 2026 · 18h" ou "A definir".',
    }),
    defineField({
      name: "place",
      title: "Local",
      type: "string",
      description: 'Ex.: "Sinop · MT".',
    }),
    videoUrlField,
    defineField({
      name: "coverImage",
      title: "Imagem",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "array",
      of: [{ type: "block" }],
      description: "Descrição completa do evento (exibida na página do evento).",
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
      status: "status",
      dateLabel: "dateLabel",
    },
    prepare({ title, media, status, dateLabel }) {
      return {
        title: title ?? "Evento",
        subtitle: [status, dateLabel].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
