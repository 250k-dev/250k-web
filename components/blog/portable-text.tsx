"use client";

import { PortableText as BasePortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

const blockComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-12 mb-4 text-2xl font-bold tracking-tight text-primary md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-8 mb-3 text-xl font-bold text-primary md:text-2xl">
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-6 text-lg leading-[1.72] text-foreground">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-10 border-l-[3px] border-brand-orange pl-6 text-2xl font-bold leading-snug tracking-tight text-primary">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-6 list-none space-y-3 pl-0">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mb-6 list-decimal space-y-3 pl-6 text-lg text-foreground marker:font-bold marker:text-brand-orange">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="relative pl-7 text-lg leading-relaxed text-foreground before:absolute before:left-0 before:top-[0.7em] before:size-[7px] before:rounded-[2px] before:bg-brand-orange">
        {children}
      </li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-lg leading-relaxed text-foreground">{children}</li>
    ),
  },
  types: {
    image: ({
      value,
    }: {
      value: { asset?: { _ref?: string }; caption?: string } & SanityImage;
    }) => {
      if (!value?.asset?._ref) return null;
      const imageUrl = urlFor(value as SanityImage).width(800).url();
      return (
        <figure className="my-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
            <Image
              src={imageUrl}
              alt={value.caption ?? ""}
              fill
              className="object-cover"
              sizes="(max-width: 800px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href?: string };
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-brand-orange underline underline-offset-2 hover:no-underline"
      >
        {children}
      </a>
    ),
  },
};

interface PortableTextProps {
  value: PortableTextBlock[] | null | undefined;
}

export function PortableText({ value }: PortableTextProps) {
  if (!value || value.length === 0) return null;
  return <BasePortableText value={value} components={blockComponents} />;
}
