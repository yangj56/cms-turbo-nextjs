// components/hero-carousel.tsx
'use client';

import type { CarouselData } from '@/data/carousel-data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import * as React from 'react';

type Props = {
  data: CarouselData[];
};

export function HeroCarousel({ data }: Props) {
  const videoRefs = React.useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handleSlideChange = (index: number) => {
    // Pause all videos
    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        video.pause();
      }
    });

    // Play current video if it exists
    const currentSlide = data[index];
    if (currentSlide?.type === 'video') {
      const video = videoRefs.current[currentSlide.id];
      if (video) {
        video.play();
      }
    }
  };

  return (
    <Carousel
      className="relative h-[90vh]"
      onSelect={() => handleSlideChange(1)}
    >
      <CarouselContent>
        {data.map(slide => (
          <CarouselItem key={slide.id} className="h-[90vh]">
            {slide.type === 'video'
              ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[slide.id] = el;
                    }}
                    className="size-full object-cover"
                    loop
                    muted
                    playsInline
                    preload="none"
                  >
                    <source src={slide.src} type="video/mp4" />
                  </video>
                )
              : (
                  <img
                    src={slide.src}
                    alt={slide.title}
                    className="size-full object-cover"
                    loading="lazy"
                  />
                )}

            {/* Content Overlay */}
            <div className="absolute inset-0 bg-black/40">
              <div className="container mx-auto flex h-full items-center">
                <div className="max-w-2xl text-white">
                  <h2 className="mb-4 text-5xl font-bold">{slide.title}</h2>
                  <p className="text-xl">{slide.description}</p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}
