"use client";

import { BLUR_DATA } from "@/lib/contant";
import type { Media, Product, ProductCategory } from "@/lib/payload-types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { Pagination } from "./pagingation";
import { useState } from "react";

const ITEMS_PER_PAGE = 1;
const ITEMS_PER_PAGE_BIG = 8;

type Props = {
  products: Product[];
  collection?: string;
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
        <p className="text-sm text-gray-600">
          Displaying {offset + 1} - {Math.min(offset + limit, filteredProducts.length)} of{" "}
          {filteredProducts.length} results
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm">View per page:</span>
          <select
            className="rounded border p-1 text-sm"
            onChange={(e) => {
              e.preventDefault();
              setTabParams({ limit: parseInt(e.target.value), page: 0 });
            }}
            value={limit}
          >
            <option value={ITEMS_PER_PAGE}>{ITEMS_PER_PAGE}</option>
            <option value={ITEMS_PER_PAGE_BIG}>{ITEMS_PER_PAGE_BIG}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {currentProducts.map((product) => {
          // Find the selected color or default to the first color
          const selectedColorCode = selectedColors[product.id];
          const selectedColorData =
            product.color?.find((c) => c.colorCode === selectedColorCode) || product.color?.[0];

          return (
            <div key={product.id} className="group">
              <Link
                href={`/product/${product.id}`}
                className="group block"
                title={`View ${product.title} products`}
                aria-label={`Browse our ${product.title} collection`}
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  {/* Placeholder that shows while image is loading */}
                  <div className="absolute inset-0 animate-pulse bg-gray-200" />
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CMS_URL}${
                      (selectedColorData?.images?.[0]?.image as Media).url
                    }`}
                    alt={`${product.title} in ${selectedColorData?.colorName || ""}`}
                    className="object-cover opacity-0 transition-all duration-300 group-hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                    placeholder="blur"
                    blurDataURL={BLUR_DATA}
                    loading="eager"
                    onLoadingComplete={(image) => {
                      // This will make the image visible once loaded
                      image.classList.replace("opacity-0", "opacity-100");
                    }}
                  />
                  {/* Translucent overlay that appears on hover */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-0 p-4 text-center text-white opacity-0 transition-all duration-300 group-hover:bg-opacity-60 group-hover:opacity-100">
                    <h3 className="mb-2 text-lg font-bold">{product.title}</h3>
                    {selectedColorData?.colorName && (
                      <p className="text-sm">{selectedColorData.colorName}</p>
                    )}
                  </div>
                </div>
                <h4 className="mt-4 line-clamp-1 text-sm font-semibold">{product.title}</h4>
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
                          "border-grey mt-2 h-8 w-8 rounded border",
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
