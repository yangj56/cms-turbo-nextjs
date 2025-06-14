"use server";

import type { Product, ProductCategory } from "@/lib/payload-types";
import { cacheOptions } from "@/lib/utils";

export async function findProductsByCategorySku(sku: string): Promise<{
  products: Product[];
  category: ProductCategory;
} | null> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/api/product-category/${sku}/products`;
    const response = await fetch(apiUrl, cacheOptions);

    if (!response.ok) {
      throw new Error(`Failed to fetch products by category: ${response.statusText}`);
    }

    return (await response.json()) as {
      products: Product[];
      category: ProductCategory;
    };
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return null;
  }
}
