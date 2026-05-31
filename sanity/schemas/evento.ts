import { defineField, defineType } from "sanity";

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
    defineField({
      name: "platform",
      title: "Plataforma",
      type: "string",
      options: {
        list: [
          { title: "YouTube", value: "youtube" },
          { title: "Presencial", value: "presencial" },
        ],
        layout: "radio",
      },
      initialValue: "presencial",
    }),
    defineField({
      name: "youtubeId",
      title: "ID do YouTube",
      type: "string",
      description: "Apenas o ID do vídeo, quando houver gravação disponível.",
      hidden: ({ parent }) => parent?.platform !== "youtube",
    }),
    defineField({
      name: "coverImage",
      title: "Imagem",
      type: "image",
      options: { hotspot: true },
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
