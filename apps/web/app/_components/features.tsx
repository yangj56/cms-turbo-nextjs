"use client";

import type { Feature, Media } from "@repo/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";

type Props = {
  data: Feature[];
};

export const Features = ({ data }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = React.useCallback((emblaApi: any) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full px-4">
      {/* Header section with navigation buttons */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-normal">Featured in</h2>
        </div>
        <div className="flex gap-2">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 
                transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 
                transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-6 flex">
          {data.map((item) => (
            <div
              key={item.title}
              className="min-w-0 flex-[0_0_100%] pl-6 sm:flex-[0_0_50%] lg:flex-[0_0_25%]"
            >
              <div className="group cursor-pointer">
                <div className="mb-4 h-[200px] overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CMS_URL}${(item.image as Media).url}`}
                    alt={item.title}
                    width={(item.image as Media).width || 800}
                    height={(item.image as Media).height || 800}
                    className="w-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
