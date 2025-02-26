"use client";

import { BLUR_DATA } from "@/lib/contant";
import type { Media, Product } from "@/lib/payload-types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Pagination } from "./pagingation";
import { cn } from "@/lib/utils";
import { parseAsString, useQueryStates, parseAsInteger } from "nuqs";

const ITEMS_PER_PAGE = 24;
const ITEMS_PER_PAGE_BIG = 48;

type Props = {
  products: Product[];
  collection?: string;
};

export const Products = ({ products }: Props) => {
  const [tabParams, setTabParams] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      limit: parseAsInteger.withDefault(ITEMS_PER_PAGE),
      collection: parseAsString,
    },
    {
      history: "push",
    },
  );
  const { collection, limit, page } = tabParams;

  console.log(tabParams);
  console.log(products[0]);

  const offset = page * limit;
  let filteredProducts: Product[] = products;
  if (collection) {
    filteredProducts = products.filter((product) => {
      return product.category === collection;
    });
  }
  const currentProducts = filteredProducts.slice(offset, offset + limit);
  const pageCount = Math.ceil(filteredProducts.length / limit);

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Displaying {offset + 1} - {Math.min(offset + ITEMS_PER_PAGE, products.length)} of{" "}
          {products.length} results
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm">View per page:</span>
          <select className="rounded border p-1 text-sm">
            <option value="26">26</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {currentProducts.map((product) => (
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
                <div className="mt-2 line-clamp-2 min-h-[3rem] text-sm">{product.description}</div>
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
        ))}
      </div>

      <div className="mt-8">
        {/* <Pagination
          pageCount={pageCount}
          onPageChange={({ selected }) => setCurrentPage(selected)}
        /> */}
      </div>
    </div>
  );
};
