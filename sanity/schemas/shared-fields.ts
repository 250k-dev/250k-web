import { defineField } from "sanity";

/** Campo de vídeo por URL (embed automático no front quando suportado). */
export const videoUrlField = defineField({
  name: "videoUrl",
  title: "Vídeo (URL)",
  type: "url",
  description:
    "Opcional. Cole o link do YouTube, Vimeo ou Instagram. O player é embutido automaticamente.",
});

/**
 * Campos de destaque: um toggle e uma janela de datas opcional.
 * Se as datas forem preenchidas, o item só fica em destaque dentro do período;
 * se ficarem vazias, fica em destaque enquanto o toggle estiver ligado.
 *
 * Espalhar com `...featuredFields` na lista de fields do documento.
 */
export const featuredFields = [
  defineField({
    name: "featured",
    title: "Destacar",
    type: "boolean",
    initialValue: false,
    description: "Exibir em destaque no Hub de Conteúdo.",
  }),
  defineField({
    name: "featuredFrom",
    title: "Destacar a partir de",
    type: "datetime",
    description: "Opcional. Início do período de destaque.",
    hidden: ({ parent }) => !parent?.featured,
  }),
  defineField({
    name: "featuredUntil",
    title: "Destacar até",
    type: "datetime",
    description: "Opcional. Fim do período de destaque.",
    hidden: ({ parent }) => !parent?.featured,
  }),
];
