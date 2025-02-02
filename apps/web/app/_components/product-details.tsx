"use client";

import type { Media, Product } from "@/lib/payload-types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, PlayCircleIcon, DownloadIcon } from "lucide-react";
import Link from "next/link";
import type { CarouselApi } from "@/components/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/carousel";

interface Props {
  data: Product;
}

export const ProductDetails = ({ data }: Props) => {
  const [currentColor, setCurrentColor] = useState(data.color?.[0]?.colorName || null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isCompatibleProductsOpen, setIsCompatibleProductsOpen] = useState(true);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    api.on("settle", (e) => {
      setMainImageIndex(e.selectedScrollSnap());
    });
  }, [api]);

  const length = data.specificationOverviewInfo?.length || 0;
  // Get images for current color
  const getCurrentColorImages = () => {
    if (!currentColor || !data.color) return [];

    const colorData = data.color.find((c) => c.colorName === currentColor);
    const data2 = colorData?.images?.map((item) => item.image) || [];
    return data2.filter((item) => !!item);
  };

  const currentImages = getCurrentColorImages();

  // Reset main image index when color changes
  const handleColorChange = (colorName: string | null) => {
    setCurrentColor(colorName);
    setMainImageIndex(0);
  };

  const scrollToSpecifications = () => {
    document.getElementById("specifications")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="flex w-full flex-col items-center bg-[#FFFBF5]">
      <div className="my-8 hidden w-full flex-row gap-8 px-8 md:flex">
        <div className="flex basis-[10%] flex-col gap-4">
          {currentImages.map(
            (image, index) =>
              image && (
                <button
                  key={index}
                  onClick={() => setMainImageIndex(index)}
                  className={`relative aspect-square overflow-hidden rounded-sm transition-shadow duration-200 ${
                    mainImageIndex === index
                      ? "ring-1 ring-blue-500 ring-offset-1"
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
        <div className="basis-[50%]">
          <AnimatePresence mode="wait">
            {currentImages[mainImageIndex] && (
              <motion.div
                key={`${currentColor}-${mainImageIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="relative aspect-square overflow-hidden"
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
        </div>

        <div className="basis-[30%]">
          <h2 className="mt-4 font-semibold">{data.title}</h2>
          {currentColor && <h3 className="mt-4">{currentColor}</h3>}

          {data.color && data.color.length > 0 && (
            <div className="mt-4 flex gap-2">
              {data.color.map(
                (color) =>
                  color.colorName &&
                  color.colorCode && (
                    <button
                      key={color.id}
                      onClick={() => handleColorChange(color.colorName || null)}
                      className={`relative h-8 w-8 border border-border ${
                        currentColor === color.colorName
                          ? "ring-[0.1px] ring-border"
                          : "hover:ring-blue hover:ring-[0.1px]"
                      }`}
                      style={{ backgroundColor: color.colorCode }}
                      title={color.colorName}
                    >
                      <span className="sr-only">{color.colorName}</span>
                    </button>
                  ),
              )}
            </div>
          )}

          <div className="mt-8 text-sm">{data.description}</div>

          {/* Spec Overview */}
          <div className="border-grey mt-8 rounded border p-4">
            <h5 className="font-base uppercase">Spec Overview</h5>
            <div className="mt-4 flex flex-row pl-2">
              <div className="basis-2/3">
                <div className="flex flex-row flex-wrap">
                  {data.specificationOverviewInfo?.map((spec, index) => {
                    return (
                      <div key={spec.id} className="flex flex-row items-center text-sm">
                        {spec.data}
                        {index !== length - 1 && (
                          <div className="px-4 text-xl font-thin text-gray-500">l</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="basis-1/3">
                <button
                  onClick={scrollToSpecifications}
                  className="flex items-center gap-1 border px-2 py-1 text-sm"
                >
                  Full spec
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 my-8 flex flex-col gap-8 md:hidden">
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent>
            {currentImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-square w-full overflow-hidden rounded-sm">
                  {image && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_CMS_URL}${(image as Media).url}`}
                      alt={`${data.title} in ${currentColor || ""}`}
                      fill
                      className="object-cover"
                      priority
                    />
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>

        {/* Mobile Thumbnails */}
        <div className="mt-4 grid grid-cols-4 gap-4">
          {currentImages.map(
            (image, index) =>
              image && (
                <button
                  key={index}
                  onClick={() => {
                    if (!api) return;
                    api.scrollTo(index);
                    setMainImageIndex(index);
                  }}
                  className={`relative aspect-square overflow-hidden rounded-sm transition-shadow duration-200 ${
                    mainImageIndex === index
                      ? "ring-1 ring-blue-500 ring-offset-1"
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

        <div>
          <div>
            <h2 className="font-semibold">{data.title}</h2>
            {currentColor && <div className="mt-2 text-xl">{currentColor}</div>}
            <div className="mt-4 text-gray-600">{data.description}</div>
          </div>
          {data.color && data.color.length > 0 && (
            <div className="mt-8">
              <div className="flex gap-2">
                {data.color.map(
                  (color) =>
                    color.colorName && (
                      <button
                        key={color.id}
                        onClick={() => handleColorChange(color.colorName || null)}
                        className={`relative h-8 w-8 ${
                          currentColor === color.colorName
                            ? "ring-1 ring-blue-500 ring-offset-1"
                            : "ring-1 ring-gray-300 hover:ring-1 hover:ring-gray-300"
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

          <div className="mt-4 rounded border p-8">
            <h5 className="font-normal uppercase">Spec Overview</h5>
            <div className="flex flex-row justify-between">
              <div className="mt-4 flex flex-wrap gap-4">
                {data.specificationOverviewInfo?.map((spec, index) => {
                  return (
                    <div key={spec.id} className="flex flex-row items-center text-sm">
                      {spec.data}
                      {index !== length - 1 && (
                        <div className="px-4 text-xl font-thin text-gray-500">l</div>
                      )}
                    </div>
                  );
                })}
              </div>
              <button
                onClick={scrollToSpecifications}
                className="flex items-center gap-1 border px-2 py-1 text-sm"
              >
                Full spec
                <ChevronDownIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-12 flex w-full flex-col">
        {/* Specifications */}
        <div id="specifications" className="flex flex-col gap-12 md:flex-row md:gap-32">
          <div className="md:basis-2/3">
            <h4 className="ppercase mb-4 text-center font-base">Specifications</h4>
            <div className="flex flex-col divide-y divide-gray-200">
              {Object.entries(data.labelValuePairs as Record<string, string>).map(
                ([key, value]) => (
                  <div key={key} className="mb-2 flex flex-row pt-2">
                    <div className="basis-1/2 font-medium md:basis-1/3">{key}</div>
                    <div className="basis-1/2 md:basis-2/3">{value}</div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Downloads */}
          <div className="md:basis-1/3">
            <h4 className="ppercase mb-4 text-center font-base">Downloads</h4>
            <div className="space-y-2">
              {data.datasheet && (
                <a
                  href={`${process.env.NEXT_PUBLIC_CMS_URL}${(data.datasheet as Media).url}`}
                  className="flex items-center justify-between rounded border p-3 hover:bg-gray-50"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Datasheet</span>
                  <DownloadIcon className="h-5 w-5" />
                </a>
              )}
              {data.instruction && (
                <a
                  href={`${process.env.NEXT_PUBLIC_CMS_URL}${(data.instruction as Media).url}`}
                  className="flex items-center justify-between rounded border p-3 hover:bg-gray-50"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Instruction</span>
                  <DownloadIcon className="h-5 w-5" />
                </a>
              )}
              {data.youtubeUrl && (
                <a
                  href={data.youtubeUrl}
                  className="flex items-center justify-between rounded border p-3 hover:bg-gray-50"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>YouTube Tutorial</span>
                  <PlayCircleIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Compatible Products */}
      {data.compatibleProducts && (
        <div className="mb-8 mt-8 flex w-full flex-col items-center justify-center gap-4">
          <hr className="w-full" />
          <div className="container">
            <button
              className="group flex w-full items-center justify-center py-4 text-xl font-medium"
              onClick={() => setIsCompatibleProductsOpen(!isCompatibleProductsOpen)}
            >
              <div className="pr-4 font-base">
                View <span className="font-bold">Compatible Products</span>
              </div>
              <ChevronDownIcon
                className={`h-5 w-5 transition-transform ${
                  isCompatibleProductsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isCompatibleProductsOpen && data.compatibleProducts && (
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
                {data.compatibleProducts.map((item) => {
                  const product = item.product as Product;
                  if (!product) return null;

                  return (
                    <Link
                      key={product.id}
                      href={`/product/${product.sku}`}
                      className="group flex items-center gap-4 rounded p-3 hover:bg-gray-50"
                    >
                      <div className="relative h-16 w-16 overflow-hidden rounded">
                        {product.color?.[0]?.images?.[0]?.image && (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_CMS_URL}${
                              (product.color[0].images[0].image as Media).url
                            }`}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{product.title}</div>
                        <div className="text-sm text-gray-500">Near | Zigbee</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export async function generateStaticParams() {
  // Implement this based on your data fetching needs
  return [];
}
