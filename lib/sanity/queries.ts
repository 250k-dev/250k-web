const POSTS_LIST_PROJECTION = `{
  _id,
  title,
  "slug": slug,
  excerpt,
  coverImage,
  publishedAt,
  "author": author->{ name, image },
  "category": category->{ title, "slug": slug },
  videoUrl,
  featured,
  featuredFrom,
  featuredUntil
}`;

export const POSTS_LIST_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) [$offset...$limit] ${POSTS_LIST_PROJECTION}`;

export const POSTS_COUNT_QUERY = `count(*[_type == "post" && defined(slug.current)])`;

/** Datas de publicação para agregação no painel admin (sem corpo do post). */
export const POST_PUBLISHED_DATES_QUERY = `*[_type == "post" && defined(publishedAt)] {
  "publishedAt": publishedAt
}`;

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug,
  excerpt,
  coverImage,
  publishedAt,
  "author": author->{ _id, name, "slug": slug, image, bio },
  "category": category->{ _id, title, "slug": slug },
  body,
  videoUrl,
  metaTitle,
  metaDescription
}`;

export const POST_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)] {
  "slug": slug,
  publishedAt
}`;

/** Posts relacionados (exclui o post atual), para o rodapé do leitor de artigo. */
export const RELATED_POSTS_QUERY = `*[_type == "post" && defined(slug.current) && slug.current != $slug] | order(publishedAt desc) [0...3] ${POSTS_LIST_PROJECTION}`;

const VIDEOS_LIST_PROJECTION = `{
  _id,
  title,
  "slug": slug,
  excerpt,
  coverImage,
  publishedAt,
  videoUrl,
  duration,
  "category": category->{ title, "slug": slug },
  featured,
  featuredFrom,
  featuredUntil
}`;

export const VIDEOS_LIST_QUERY = `*[_type == "video"] | order(publishedAt desc) ${VIDEOS_LIST_PROJECTION}`;

const EVENTOS_LIST_PROJECTION = `{
  _id,
  title,
  "slug": slug,
  excerpt,
  coverImage,
  publishedAt,
  status,
  dateLabel,
  place,
  videoUrl,
  "category": category->{ title, "slug": slug },
  featured,
  featuredFrom,
  featuredUntil
}`;

export const EVENTOS_LIST_QUERY = `*[_type == "evento"] | order(publishedAt desc) ${EVENTOS_LIST_PROJECTION}`;

export const EVENTO_BY_SLUG_QUERY = `*[_type == "evento" && slug.current == $slug][0] {
  _id,
  _type,
  title,
  "slug": slug,
  excerpt,
  coverImage,
  publishedAt,
  status,
  dateLabel,
  place,
  videoUrl,
  body,
  "category": category->{ title, "slug": slug }
}`;

export const EVENTO_SLUGS_QUERY = `*[_type == "evento" && defined(slug.current)] {
  "slug": slug,
  publishedAt
}`;

export const POSTS_FEED_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) ${POSTS_LIST_PROJECTION}`;

const TREINAMENTOS_LIST_PROJECTION = `{
  _id,
  title,
  "slug": slug,
  tipo,
  summary,
  date,
  local,
  audience,
  participants,
  coverImage,
  publishedAt
}`;

export const TREINAMENTOS_LIST_QUERY = `*[_type == "treinamento" && defined(slug.current)] | order(publishedAt desc) ${TREINAMENTOS_LIST_PROJECTION}`;

export const TREINAMENTO_BY_SLUG_QUERY = `*[_type == "treinamento" && slug.current == $slug][0] {
  _id,
  _type,
  title,
  "slug": slug,
  tipo,
  summary,
  date,
  local,
  audience,
  participants,
  coverImage,
  videoUrl,
  body,
  highlights,
  gallery,
  publishedAt
}`;

export const OTHER_TREINAMENTOS_QUERY = `*[_type == "treinamento" && defined(slug.current) && slug.current != $slug] | order(publishedAt desc) [0...3] ${TREINAMENTOS_LIST_PROJECTION}`;

export const TREINAMENTO_SLUGS_QUERY = `*[_type == "treinamento" && defined(slug.current)] {
  "slug": slug,
  publishedAt
}`;
