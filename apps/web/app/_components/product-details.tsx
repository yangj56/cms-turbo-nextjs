"use client";

import type { Media, Product } from "@/lib/payload-types";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface Props {
  data: Product;
}

export const ProductDetails = ({ data }: Props) => {
  const [currentColor, setCurrentColor] = useState(data.color?.[0]?.colorName || null);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  // Get images for current color
  const getCurrentColorImages = () => {
    if (!currentColor || !data.color) return [];

    const colorData = data.color.find((c) => c.colorName === currentColor);
    return colorData?.images?.map((item) => item.image) || [];
  };

  const currentImages = getCurrentColorImages();

  // Reset main image index when color changes
  const handleColorChange = (colorName: string | null) => {
    setCurrentColor(colorName);
    setMainImageIndex(0);
  };

  const handlePrevImage = () => {
    setMainImageIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setMainImageIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[100px_1fr_1fr]">
        {/* Thumbnail Column */}
        <div className="hidden lg:flex lg:flex-col lg:gap-4">
          {currentImages.map(
            (image, index) =>
              image && (
                <button
                  key={index}
                  onClick={() => setMainImageIndex(index)}
                  className={`relative aspect-square w-full overflow-hidden rounded-sm transition-shadow duration-200 ${
                    mainImageIndex === index
                      ? "ring-2 ring-blue-500 ring-offset-2"
                      : "hover:ring-1 hover:ring-gray-300"
                  }`}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CMS_URL}${(image as Media).url}`}
                    alt={`${data.title} in ${currentColor || ""} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ),
          )}
        </div>

        {/* Main Image Column */}
        <div>
          <div className="relative">
            <AnimatePresence mode="wait">
              {currentImages[mainImageIndex] && (
                <motion.div
                  key={`${currentColor}-${mainImageIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="relative aspect-square overflow-hidden rounded-sm"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CMS_URL}${
                      (currentImages[mainImageIndex] as Media).url
                    }`}
                    alt={`${data.title} in ${currentColor || ""}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile Navigation Buttons */}
            {currentImages.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between p-4 lg:hidden">
                <button
                  onClick={handlePrevImage}
                  className="rounded-full bg-white/80 p-2 text-gray-900 backdrop-blur-sm transition hover:bg-white/90"
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="rounded-full bg-white/80 p-2 text-gray-900 backdrop-blur-sm transition hover:bg-white/90"
                  aria-label="Next image"
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Thumbnails */}
          <div className="mt-4 grid grid-cols-4 gap-4 lg:hidden">
            {currentImages.map(
              (image, index) =>
                image && (
                  <button
                    key={index}
                    onClick={() => setMainImageIndex(index)}
                    className={`relative aspect-square overflow-hidden rounded-sm transition-shadow duration-200 ${
                      mainImageIndex === index
                        ? "ring-2 ring-blue-500 ring-offset-2"
                        : "hover:ring-1 hover:ring-gray-300"
                    }`}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_CMS_URL}${(image as Media).url}`}
                      alt={`${data.title} in ${currentColor || ""} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ),
            )}
          </div>
        </div>

        {/* Product Info Column */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{data.title}</h1>
            {currentColor && <div className="mt-1 text-lg text-gray-600">{currentColor}</div>}
            <div className="mt-4 text-gray-600">{data.description}</div>
          </div>

          {/* Color Selection */}
          {data.color && data.color.length > 0 && (
            <div>
              <div className="flex gap-2">
                {data.color.map(
                  (color) =>
                    color.colorName && (
                      <button
                        key={color.id}
                        onClick={() => handleColorChange(color.colorName || null)}
                        className={`relative h-8 w-8 rounded-sm border ${
                          currentColor === color.colorName
                            ? "ring-2 ring-blue-500 ring-offset-2"
                            : "hover:ring-1 hover:ring-gray-300"
                        }`}
                        style={{ backgroundColor: color.colorCode || "#000" }}
                        title={color.colorName}
                      >
                        <span className="sr-only">{color.colorName}</span>
                      </button>
                    ),
                )}
              </div>
            </div>
          )}

          {/* Spec Overview */}
          <div className="rounded-sm border p-4">
            <div className="text-sm font-medium uppercase">Spec Overview</div>
            <div className="mt-2 flex flex-wrap gap-4 text-sm">
              {data.specificationOverviewInfo?.map((spec) => (
                <div key={spec.id}>{spec.data}</div>
              ))}
              <button className="text-blue-600 hover:text-blue-700">Full spec</button>
            </div>
          </div>

          {/* Specifications */}
          {data.labelValuePairs && (
            <div>
              <h2 className="mb-4 text-xl font-semibold uppercase">Specifications</h2>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                {Object.entries(data.labelValuePairs as Record<string, string>).map(
                  ([key, value]) => (
                    <div key={key} className="contents">
                      <div className="font-medium">{key}</div>
                      <div>{value}</div>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

          {/* Downloads */}
          <div>
            <h2 className="mb-4 text-xl font-semibold uppercase">Downloads</h2>
            <div className="space-y-2">
              {data.datasheet && (
                <a
                  href={`${process.env.NEXT_PUBLIC_CMS_URL}${(data.datasheet as Media).url}`}
                  className="block rounded-sm border p-3 hover:bg-gray-50"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Datasheet
                </a>
              )}
              {data.instruction && (
                <a
                  href={`${process.env.NEXT_PUBLIC_CMS_URL}${(data.instruction as Media).url}`}
                  className="block rounded-sm border p-3 hover:bg-gray-50"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instruction
                </a>
              )}
              {data.youtubeUrl && (
                <a
                  href={data.youtubeUrl}
                  className="block rounded-sm border p-3 hover:bg-gray-50"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube Tutorial
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  // Implement this based on your data fetching needs
  return [];
}
