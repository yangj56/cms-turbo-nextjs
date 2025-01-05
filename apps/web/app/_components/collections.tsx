"use client";
import React, { useEffect, useState } from "react";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import type { Media, ProductCategory } from "../payload-types";
import { PAGINATION_LIMIT } from "@/lib/contant";
import Image from "next/image";

type Props = {
  data: ProductCategory[];
};

export const CollectionPage = ({ data }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewableData, setViewableData] = useState<ProductCategory[]>([]);

  const totalPages = Math.ceil(data.length / PAGINATION_LIMIT);

  useEffect(() => {
    if (currentPage > 0) {
      const indexPage = currentPage - 1;
      const newViewableData = data.slice(
        indexPage * PAGINATION_LIMIT,
        (indexPage + 1) * PAGINATION_LIMIT,
      );
      setViewableData(newViewableData);
    }
  }, [currentPage, data]);

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-[#2A3190] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <img
                src="/api/placeholder/40/40"
                alt="Logo"
                className="h-10 w-10 rounded-full bg-yellow-100"
              />
              <div className="hidden space-x-8 md:flex">
                <a href="#" className="text-white hover:text-gray-200">
                  Products
                </a>
                <a href="#" className="text-white hover:text-gray-200">
                  About
                </a>
                <a href="#" className="text-white hover:text-gray-200">
                  How to buy?
                </a>
              </div>
            </div>
            <div className="md:hidden">
              <Menu className="h-6 w-6" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="relative h-[300px] bg-gray-100 md:h-[400px]">
        <img
          src="/api/placeholder/1200/400"
          alt="Recessed Lighting"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <h1 className="text-4xl font-light text-white md:text-6xl">Recessed</h1>
        </div>
      </div>

      {/* Collection Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Views per page: <span className="font-medium">24</span>
          </div>
          <div className="text-sm font-medium">Recessed</div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {viewableData.map((productCategory) => (
            <div key={productCategory.id} className="group">
              <div className="relative mb-4 aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={(productCategory.image as Media).url || ""}
                  alt={productCategory.title || ""}
                  width={(productCategory.image as Media).width || 0}
                  height={(productCategory.image as Media).height || 0}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mb-2 text-lg font-medium">{productCategory.title}</h3>
              <p className="mb-3 text-sm text-gray-600">{productCategory.title}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
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
