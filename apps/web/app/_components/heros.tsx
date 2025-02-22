"use client";

import Image from "next/image";
import type { JSX } from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import type { Hero, Media } from "@/lib/payload-types";
import { BLUR_DATA } from "@/lib/contant";

type Props = {
  data: Hero[];
};

export const Heros = ({ data }: Props): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Start new timer
    timerRef.current = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % data.length);
    }, 10000);
  }, [data.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTimer]);

  const handleBulletClick = (index: number) => {
    setCurrentIndex(index);
    startTimer(); // Reset timer on manual navigation
  };

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {data.map((item, index) => (
        <div
          key={item.id}
          className={`absolute h-full w-full transition-all duration-1000 ease-in-out
            ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_CMS_URL}${(item.image as Media).url}`}
            alt={item.title}
            className="h-full w-full object-cover"
            width={(item.image as Media).width || 1920}
            height={(item.image as Media).height || 1080}
            priority={true}
            placeholder="blur"
            blurDataURL={BLUR_DATA}
          />

          {/* Content Overlay */}
          <div className="absolute inset-0 bg-black/20">
            <div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-12 text-center">
              <h2 className="p-4 text-5xl text-white opacity-100 transition-all duration-1000 ease-in-out">
                {item.title}
              </h2>
              <button
                className="transform border border-white 
                bg-transparent px-10
                py-4 text-lg
                text-white 
                opacity-100 transition-all duration-1000 ease-in-out hover:bg-accent hover:text-black"
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Bullet Navigation */}
      {data.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {data.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300
              ${currentIndex === index ? "w-8 bg-white" : "bg-white/50 hover:bg-white/75"}`}
              onClick={() => handleBulletClick(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
