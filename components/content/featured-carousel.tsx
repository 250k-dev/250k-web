"use client";

import { ContentCard } from "@/components/content/content-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import type { FeedItem } from "@/lib/sanity/types";

/** Destaques do Hub: card único quando há um, carrossel quando há vários. */
export function FeaturedCarousel({ items }: { items: FeedItem[] }) {
  if (items.length === 0) return null;

  if (items.length === 1) {
    return (
      <div className="mt-10">
        <ContentCard item={items[0]} featured />
      </div>
    );
  }

  return (
    <div className="mt-10">
      <Carousel opts={{ loop: true, align: "start" }} className="w-full">
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.id}>
              <ContentCard item={item} featured />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3" />
        <CarouselNext className="right-3" />
      </Carousel>
    </div>
  );
}
