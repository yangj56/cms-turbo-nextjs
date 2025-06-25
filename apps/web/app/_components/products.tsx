"use client";

import type { Media, Product, ProductCategory } from "@/lib/payload-types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { Pagination } from "./pagingation";
import { useState } from "react";
import { ImageLoader } from "./image-loader";

const ITEMS_PER_PAGE = 24;
const ITEMS_PER_PAGE_BIG = 48;

type Props = {
  products: Product[];
};

export const Products = ({ products }: Props) => {
  const [tabParams, setTabParams] = useQueryStates(
    {
      page: parseAsInteger.withDefault(0),
      limit: parseAsInteger.withDefault(ITEMS_PER_PAGE),
      collection: parseAsString,
    },
    {
      history: "push",
    },
  );
  const { collection, limit, page } = tabParams;

  const offset = page * limit;
  let filteredProducts: Product[] = products;
  if (collection) {
    filteredProducts = products.filter((product) => {
      return (product.category as ProductCategory).sku === collection;
    });
  }
  const currentProducts = filteredProducts.slice(offset, offset + limit);
  const pageCount = Math.ceil(filteredProducts.length / limit);

  // Add state for selected colors for each product
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});

  // Function to handle color selection
  const handleColorSelect = (productId: string, colorCode: string) => {
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: colorCode,
    }));
  };

  return (
    <div className="container mx-auto mb-8 mt-4 px-4">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-black">
          Displaying {offset + 1} - {Math.min(offset + limit, filteredProducts.length)} of{" "}
          {filteredProducts.length} results
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm">View per page:</span>
          <div className="relative">
            <select
              className="appearance-none bg-transparent pr-6 text-sm focus:outline-none"
              onChange={(e) => {
                e.preventDefault();
                setTabParams({ limit: parseInt(e.target.value), page: 0 });
              }}
              value={limit}
            >
              <option value={ITEMS_PER_PAGE}>{ITEMS_PER_PAGE}</option>
              <option value={ITEMS_PER_PAGE_BIG}>{ITEMS_PER_PAGE_BIG}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
              <svg
                className="h-4 w-4 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3">
        {currentProducts.map((product) => {
          // Find the selected color or default to the first color
          const selectedColorCode = selectedColors[product.id];
          const selectedColorData =
            product.color?.find((c) => c.colorCode === selectedColorCode) || product.color?.[0];
          let image = selectedColorData?.images?.[0]?.image as Media;
          if (!image) {
            image = product.color?.[0]?.images?.[0]?.image as Media;
          }
          if (!image) {
            console.log(`no image`, product.id);
          }

          return (
            <div key={product.id}>
              <Link
                href={`/product/${product.id}`}
                className="group block"
                title={`View ${product.title} products`}
                aria-label={`Browse our ${product.title} collection`}
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  {image?.url && (
                    <div key={image.url} className="absolute inset-0 animate-fadeIn">
                      <ImageLoader
                        src={`${process.env.NEXT_PUBLIC_CMS_URL}${image.url}`}
                        alt={`${product.title} in ${selectedColorData?.colorName || ""}`}
                        className="object-cover transition-all duration-1000 group-hover:scale-110"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                      />
                    </div>
                  )}
                  {/* <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-0 p-4 text-center text-white opacity-0 transition-all duration-300 hover:bg-opacity-30 hover:opacity-100">
                    <h3 className="mb-2 text-xl font-bold">{product.title}</h3>
                    {selectedColorData?.colorName && (
                      <p className="text-sm">{selectedColorData.colorName}</p>
                    )}
                  </div> */}
                </div>
                <h4 className="mt-2 line-clamp-1 text-lg font-semibold">{product.title}</h4>
              </Link>
              <div className="flex flex-row gap-2">
                {product.color &&
                  product.color?.map((color, index) => {
                    if (!color.colorCode) {
                      return null;
                    }
                    return (
                      <button
                        key={color.id}
                        onClick={() => {
                          if (color.colorCode) {
                            handleColorSelect(product.id, color.colorCode);
                          }
                        }}
                        className={cn(
                          "border-grey mt-2 h-6 w-6 border",
                          selectedColors[product.id] === color.colorCode &&
                            "ring-1 ring-gray-300 ring-offset-1",
                          index === 0 &&
                            !selectedColors[product.id] &&
                            "ring-1 ring-gray-300 ring-offset-1",
                        )}
                        style={{ backgroundColor: color.colorCode }}
                        title={color.colorName || "Color option"}
                        aria-label={`Select ${color.colorName || "color option"}`}
                      />
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <Pagination
          pageCount={pageCount}
          onPageChange={({ selected }) =>
            setTabParams(
              {
                page: selected,
              },
              {
                scroll: true,
              },
            )
          }
        />
      </div>
    </div>
  );
};
