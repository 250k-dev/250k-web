import { defineField, defineType } from "sanity";
import { videoUrlField } from "./shared-fields";

export const treinamentoType = defineType({
  name: "treinamento",
  title: "Treinamento",
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
      options: { source: "title", maxLength: 96 },
      description: "Usado no endereço da página (/treinamentos/slug).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tipo",
      title: "Tipo",
      type: "string",
      options: {
        list: [
          { title: "Palestra", value: "Palestra" },
          { title: "Treinamento", value: "Treinamento" },
          { title: "Workshop", value: "Workshop" },
        ],
        layout: "radio",
      },
      initialValue: "Palestra",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Resumo",
      type: "text",
      rows: 3,
      description: "Texto curto exibido no card da listagem.",
    }),
    defineField({
      name: "date",
      title: "Data (texto)",
      type: "string",
      description: 'Texto livre, ex.: "Mai 2026" ou "2025".',
    }),
    defineField({
      name: "local",
      title: "Local",
      type: "string",
      description: 'Ex.: "Sinop · MT".',
    }),
    defineField({
      name: "audience",
      title: "Público-alvo",
      type: "string",
      description: 'Ex.: "Produtores e consultores".',
    }),
    defineField({
      name: "participants",
      title: "Participantes",
      type: "string",
      description: 'Opcional, ex.: "+200 participantes".',
    }),
    defineField({
      name: "coverImage",
      title: "Imagem de capa",
      type: "image",
      options: { hotspot: true },
    }),
    videoUrlField,
    defineField({
      name: "body",
      title: "Descrição",
      type: "array",
      of: [{ type: "block" }],
      description: "Texto completo exibido na página do treinamento.",
    }),
    defineField({
      name: "highlights",
      title: "Tópicos abordados",
      type: "array",
      of: [{ type: "string" }],
      description: 'Lista exibida no painel "O que foi abordado".',
    }),
    defineField({
      name: "gallery",
      title: "Galeria de fotos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      type: "datetime",
      description: "Usada para ordenar (mais recentes primeiro).",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
      tipo: "tipo",
      date: "date",
    },
    prepare({ title, media, tipo, date }) {
      return {
        title: title ?? "Treinamento",
        subtitle: [tipo, date].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
