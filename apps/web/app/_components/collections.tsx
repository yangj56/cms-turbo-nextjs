"use client";

import type { Media, ProductCategory } from "@/lib/payload-types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  categories: ProductCategory[];
};

export const Collections = ({ categories }: Props) => {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="container py-12">
          <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              return (
                <div key={category.id} className="group">
                  <Link
                    href={`/collection/${category.sku}`}
                    className="group block"
                    title={`View ${category.title} collection`}
                    aria-label={`Browse our ${category.title} collection`}
                  >
                    <div className="relative h-[300px]">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_CMS_URL}${(category.image as Media).url}`}
                        alt={category.title}
                        className="h-full w-full object-cover"
                        width={(category.image as Media).width || 1200}
                        height={(category.image as Media).height || 400}
                        priority={false}
                      />
                    </div>
                    <h4 className="mt-4 line-clamp-2 min-h-[3rem] font-bold">{category.title}</h4>
                    {category.description && (
                      <div className="mt-2 line-clamp-2 min-h-[3rem] text-sm">
                        {category.description}
                      </div>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
