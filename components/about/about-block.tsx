import type { CSSProperties } from "react";
import Image from "next/image";
import { BrandKTitleFirstScroll } from "@/components/about/brand-k-title-first-scroll";
import { splitBrandKTitle } from "@/lib/solucoes-brand-title";
import { cn } from "@/lib/utils";

interface AboutBlockProps {
  title: string;
  /** Quando informado, exibe a marca como imagem no lugar do texto do título. */
  titleLogoSrc?: string;
  titleLogoClassName?: string;
  /** Aplicado ao título em texto (sem titleLogoSrc). */
  titleClassName?: string;
  titleStyle?: CSSProperties;
  /** Destaca o "K" da marca em laranja (títulos tipo "…-K" ou "250K …"). */
  brandOrangeK?: boolean;
  /** Requer `SolucoesFirstScrollProvider` no ancestral: K começa em primary e vai a laranja no primeiro scroll. */
  animateBrandKOnFirstScroll?: boolean;
  content: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  /** "grid" (padrão): 2 colunas lado a lado. "newspaper": imagem flutua à esquerda e o texto contorna. */
  layout?: "grid" | "newspaper";
  className?: string;
  imageWrapperClassName?: string;
  imageClassName?: string;
  contentClassName?: string;
  /** Quando true, usa width/height automático em vez de fill — mostra a imagem inteira sem corte. */
  imageNatural?: boolean;
}

function titleWithBrandOrangeK(title: string) {
  const { before, accent, after } = splitBrandKTitle(title);
  if (!accent) return title;
  return (
    <>
      {before}
      <span className="text-brand-orange dark:text-[hsl(11_55%_62%)]">
        {accent}
      </span>
      {after}
    </>
  );
}

function TitleContent({
  title,
  titleLogoSrc,
  titleLogoClassName,
  titleClassName,
  titleStyle,
  brandOrangeK,
  animateBrandKOnFirstScroll,
}: Pick<
  AboutBlockProps,
  | "title"
  | "titleLogoSrc"
  | "titleLogoClassName"
  | "titleClassName"
  | "titleStyle"
  | "brandOrangeK"
  | "animateBrandKOnFirstScroll"
>) {
  if (titleLogoSrc) {
    return (
      <Image
        src={titleLogoSrc}
        alt={title}
        width={320}
        height={72}
        className={cn(
          "h-9 w-auto max-w-full object-contain object-left md:h-11",
          titleLogoClassName,
        )}
      />
    );
  }
  return (
    <span
      className={cn(
        "text-2xl text-primary md:text-6xl",
        !titleClassName && "font-bold",
        titleClassName,
      )}
      style={titleStyle}
    >
      {brandOrangeK ? (
        animateBrandKOnFirstScroll ? (
          <BrandKTitleFirstScroll title={title} />
        ) : (
          titleWithBrandOrangeK(title)
        )
      ) : (
        title
      )}
    </span>
  );
}

export function AboutBlock({
  title,
  titleLogoSrc,
  titleLogoClassName,
  titleClassName,
  titleStyle,
  brandOrangeK = false,
  animateBrandKOnFirstScroll = false,
  content,
  imageSrc,
  imageAlt,
  reverse = false,
  layout = "grid",
  className,
  imageWrapperClassName,
  imageClassName,
  contentClassName,
  imageNatural = false,
}: AboutBlockProps) {
  const titleNode = (
    <TitleContent
      title={title}
      titleLogoSrc={titleLogoSrc}
      titleLogoClassName={titleLogoClassName}
      titleClassName={titleClassName}
      titleStyle={titleStyle}
      brandOrangeK={brandOrangeK}
      animateBrandKOnFirstScroll={animateBrandKOnFirstScroll}
    />
  );

  if (layout === "newspaper") {
    return (
      <div className={cn(className)}>
        <h2 className="mb-6">{titleNode}</h2>
        <div
          className={cn(
            "text-muted-foreground leading-relaxed space-y-4",
            contentClassName,
          )}
        >
          <div className="sm:float-left sm:mr-7 sm:mb-3 sm:w-2/5 md:w-[38%] shrink-0 mb-5 w-full">
            <div
              className={cn(
                "rounded-lg overflow-hidden bg-muted",
                imageWrapperClassName,
              )}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={480}
                height={600}
                className={cn("w-full h-auto", imageClassName)}
                quality={90}
              />
            </div>
          </div>
          {content}
          <div className="clear-both" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid md:grid-cols-2 gap-8 md:gap-12 items-center",
        reverse && "md:grid-flow-dense",
        className,
      )}
    >
      <div className={reverse ? "md:col-start-2" : ""}>
        <div
          className={cn(
            !imageNatural && "relative aspect-4/3",
            "rounded-lg overflow-hidden bg-muted",
            imageWrapperClassName,
          )}
        >
          {imageNatural ? (
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={800}
              height={600}
              className={cn("w-full h-auto", imageClassName)}
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
            />
          ) : (
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className={cn("object-cover", imageClassName)}
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
            />
          )}
        </div>
      </div>
      <div className={reverse ? "md:col-start-1 md:row-start-1" : ""}>
        <h2 className="mb-4">{titleNode}</h2>
        <div
          className={cn(
            "text-muted-foreground leading-relaxed space-y-4",
            contentClassName,
          )}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
