"use client";

import { useState } from "react";
import type { ImageProps } from "next/image";
import Image from "next/image";

export const ImageLoader = (props: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const isFill = props.fill === true;

  // For fill images (responsive, used with parent container dimensions)
  if (isFill) {
    return (
      <div className="relative h-full w-full">
        {isLoading && (
          <div
            className="absolute inset-0 animate-pulse bg-gray-100"
            style={{
              backgroundImage: props.blurDataURL ? `url(${props.blurDataURL})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <span className="sr-only">Loading image...</span>
          </div>
        )}
        <Image {...props} onLoad={() => setIsLoading(false)} alt={props.alt || "honest lighting"} />
      </div>
    );
  }

  // For fixed size images (with explicit width and height)
  return (
    <div
      className="relative"
      style={{
        width: typeof props.width === "number" ? `${props.width}px` : props.width,
        height: typeof props.height === "number" ? `${props.height}px` : props.height,
      }}
    >
      {isLoading && (
        <div
          className="absolute inset-0 animate-pulse bg-gray-100"
          style={{
            backgroundImage: props.blurDataURL ? `url(${props.blurDataURL})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span className="sr-only">Loading image...</span>
        </div>
      )}
      <Image {...props} onLoad={() => setIsLoading(false)} alt={props.alt || "honest lighting"} />
    </div>
  );
};
