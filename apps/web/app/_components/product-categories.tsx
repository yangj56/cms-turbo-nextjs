"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState, type JSX } from "react";
import type { ProductCategory, Media } from "@/lib/payload-types";
import Link from "next/link";
import { BLUR_DATA } from "@/lib/contant";

type Props = {
  data: ProductCategory[];
};

export const ProductCategories = ({ data }: Props): JSX.Element => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [shouldShowNavigation, setShouldShowNavigation] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const checkNavigationVisibility = () => {
      const slidesInView = Math.floor(1 / emblaApi.scrollProgress());
      setShouldShowNavigation(slidesInView < data.length);
    };

    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("resize", checkNavigationVisibility);

    // Initial check
    checkNavigationVisibility();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("resize", checkNavigationVisibility);
    };
  }, [emblaApi, onSelect, data.length]);

  return (
    <div className="flex w-full flex-col items-center">
      {/* Header section with navigation buttons */}
      <div className="mb-8 flex w-full items-center justify-between">
        <div>
          <h3>Shop by Category</h3>
          <a href="/products" className="mt-1 inline-block text-sm hover:underline">
            Explore all products &gt;
          </a>
        </div>
        {shouldShowNavigation && (
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
        )}
      </div>

      {/* Carousel */}
      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div className="-mr-4 ml-0 flex sm:-mr-6">
          {data.map((item) => (
            <div
              key={item.id}
              className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%]"
            >
              <div className="mr-4 sm:mr-6">
                <Link
                  href={`/products?collection=${item.sku}`}
                  className="group block"
                  title={`View ${item.title} products`}
                  aria-label={`Browse our ${item.title} collection`}
                >
                  <div className="mb-3 aspect-square w-full overflow-hidden rounded-lg">
                    <div className="relative h-full w-full">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_CMS_URL}${(item.image as Media).url}`}
                        alt={item.title}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        fill
                        sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        priority={false}
                        placeholder="blur"
                        blurDataURL={BLUR_DATA}
                      />
                    </div>
                  </div>
                  <h5 className="text-sm font-normal sm:text-base">{item.title}</h5>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
