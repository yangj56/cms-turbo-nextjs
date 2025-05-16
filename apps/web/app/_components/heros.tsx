"use client";

import Image from "next/image";
import type { JSX } from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import type { Hero, Media } from "@/lib/payload-types";
import { BLUR_DATA } from "@/lib/contant";
import { Play, Pause } from "lucide-react";

type Props = {
  data: Hero[];
};

export const Heros = ({ data }: Props): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Start new timer
    timerRef.current = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % data.length);
    }, 7000);
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
    <div className="relative h-[45vh] max-h-[90vh] min-h-[300px] w-full overflow-hidden md:h-[60vh] lg:h-[70vh]">
      {data.map((item, index) => {
        return (
          <div
            key={item.id}
            className={`absolute h-full w-full transition-all duration-1000 ease-in-out
            ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
          >
            <div className="relative h-full w-full overflow-hidden">
              <video
                ref={videoRef}
                src={`/hero.webm`}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
              <button
                className="absolute bottom-8 right-8 z-20 text-white"
                onClick={() => {
                  if (videoRef.current) {
                    if (isPlaying) {
                      videoRef.current.pause();
                    } else {
                      videoRef.current.play();
                    }
                    setIsPlaying(!isPlaying);
                  }
                }}
              >
                {isPlaying ? (
                  <Pause
                    size={56}
                    className="rounded-full bg-black/30 p-4 font-thin text-white backdrop-blur-sm transition-all hover:bg-black/50"
                  />
                ) : (
                  <Play
                    size={56}
                    className="rounded-full bg-black/30 p-4 text-white backdrop-blur-sm transition-all hover:bg-black/50"
                  />
                )}
              </button>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 bg-black/20">
              <div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-4 p-4 text-center sm:gap-6 md:gap-8">
                <h2 className="text-2xl font-semibold text-white opacity-100 transition-all duration-1000 ease-in-out sm:text-3xl md:text-4xl lg:text-5xl">
                  {item.title}
                </h2>
                {item.description && (
                  <p className="text-base text-white opacity-100 transition-all duration-1000 ease-in-out sm:text-lg md:text-xl">
                    {item.description}
                  </p>
                )}
                {item.buttonLabel && item.url && (
                  <button
                    className="transform border border-white 
                bg-transparent px-6 py-2
                text-sm
                text-white 
                opacity-100 transition-all duration-1000 ease-in-out hover:bg-accent hover:text-black
                sm:px-8 sm:py-3 sm:text-base md:px-10 md:py-4 md:text-lg"
                    onClick={() => {
                      if (item.url) {
                        window.open(item.url, "_blank");
                      }
                    }}
                  >
                    {item.buttonLabel}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}

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
