"use client";

import { BLUR_DATA, PAGINATION_LIMIT } from "@/lib/contant";
import type { Media, Product, ProductCategory } from "@/lib/payload-types";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type Props = {
  products: Product[];
  category: ProductCategory;
};

export const Collection = ({ products, category }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewableData, setViewableData] = useState<Product[]>([]);

  const totalPages = Math.ceil(products.length / PAGINATION_LIMIT);

  useEffect(() => {
    if (currentPage > 0) {
      const indexPage = currentPage - 1;
      const newViewableData = products.slice(
        indexPage * PAGINATION_LIMIT,
        (indexPage + 1) * PAGINATION_LIMIT,
      );
      setViewableData(newViewableData);
    }
  }, [currentPage, products]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 0);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="relative h-[70vh]">
        <Image
          src={`${process.env.NEXT_PUBLIC_CMS_URL}${(category.image as Media).url}`}
          alt={category.title}
          className="h-full w-full object-cover"
          width={(category.image as Media).width || 1200}
          height={(category.image as Media).height || 400}
          priority={true}
          placeholder="blur"
          blurDataURL={BLUR_DATA}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <h1 className="text-4xl font-light text-white md:text-6xl">{category.title}</h1>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="container py-12">
          <div className="mb-8 flex items-center justify-between">
            <div className="text-md text-gray-600">
              Views per page: <span className="font-bold underline">{PAGINATION_LIMIT}</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {viewableData.map((product) => {
              return (
                <div key={product.id} className="group">
                  <Link
                    href={`/product/${product.id}`}
                    className="group block"
                    title={`View ${product.title} products`}
                    aria-label={`Browse our ${product.title} collection`}
                  >
                    <div className="relative h-[300px]">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_CMS_URL}${
                          (product.color?.[0]?.images?.[0]?.image as Media).url
                        }`}
                        alt={product.title}
                        className="h-full w-full object-cover"
                        width={(product.color?.[0]?.images?.[0]?.image as Media).width || 1200}
                        height={(product.color?.[0]?.images?.[0]?.image as Media).height || 400}
                        priority={false}
                        placeholder="blur"
                        blurDataURL={BLUR_DATA}
                      />
                    </div>
                    <h4 className="mt-4 line-clamp-2 min-h-[3rem] text-sm font-semibold">
                      {product.title}
                    </h4>
                    {product.description && (
                      <div className="mt-2 line-clamp-2 min-h-[3rem] text-sm">
                        {product.description}
                      </div>
                    )}
                  </Link>
                  <div className="flex flex-row gap-2">
                    {product.color &&
                      product.color?.map((color) => {
                        if (!color.colorCode) {
                          return null;
                        }
                        return (
                          <div
                            className={cn("mt-2", "border-grey h-8 w-8 border")}
                            style={{ backgroundColor: color.colorCode }}
                            key={color.id}
                          ></div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-36">
            <div className="flex flex-col items-center justify-between sm:flex-row">
              <div className="mb-4 flex justify-center space-x-4 sm:mb-0">
                <button
                  className="flex items-center bg-gray-100 px-6 py-2 transition-colors hover:bg-gray-200"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Prev
                </button>
                <button
                  className="flex items-center bg-gray-100 px-6 py-2 transition-colors hover:bg-gray-200"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </div>
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`flex h-8 w-8 items-center justify-center ${
                      currentPage === page
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
