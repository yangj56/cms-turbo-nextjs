"use client";

import { PAGINATION_LIMIT } from "@/lib/contant";
import type { Media, Product, ProductCategory } from "@/lib/payload-types";
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

  console.log(`category`, (category.image as Media).url);

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

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="relative h-[300px] bg-gray-100 md:h-[400px]">
        <Image
          src={`${process.env.NEXT_PUBLIC_CMS_URL}${(category.image as Media).url}`}
          alt={category.title}
          className="h-full w-full object-cover"
          width={(category.image as Media).width || 1200}
          height={(category.image as Media).height || 400}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <h1 className="text-4xl font-light text-white md:text-6xl">Recessed</h1>
        </div>
      </div>
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Views per page: <span className="font-medium">{PAGINATION_LIMIT}</span>
          </div>
          <div className="text-sm font-medium">Recessed</div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {viewableData.map((product) => (
            <div key={product.id} className="group">
              <h3 className="mb-2 text-lg font-medium">{product.title}</h3>
              <p className="mb-3 text-sm text-gray-600">{product.title}</p>
              <Link
                href={`/product/${product.id}`}
                className="group block"
                title={`View ${product.title} products`}
                aria-label={`Browse our ${product.title} collection`}
              >
                <div className="mb-4 h-[300px] overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CMS_URL}${
                      (product.color?.[0]?.images?.[0]?.image as Media).url
                    }`}
                    alt={`product color ${product.color?.[0]?.colorName}`}
                    width={(product.color?.[0]?.images?.[0]?.image as Media).width || 800}
                    height={(product.color?.[0]?.images?.[0]?.image as Media).height || 800}
                    className="w-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={true}
                  />
                </div>
                <h3 className="text-xl font-normal">{product.title}</h3>
                {product.description && <p className="mt-2 text-gray-600">{product.description}</p>}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <div className="mb-4 flex justify-center space-x-4 sm:mb-0">
              <button
                className="flex items-center bg-gray-100 px-6 py-2 transition-colors hover:bg-gray-200"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Prev
              </button>
              <button
                className="flex items-center bg-gray-100 px-6 py-2 transition-colors hover:bg-gray-200"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-8 w-8 items-center justify-center ${
                    currentPage === page
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
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
  );
};
