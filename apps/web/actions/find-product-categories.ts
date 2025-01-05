"use server";

import type { ProductCategory } from "@/lib/payload-types";
import { PAGINATION_LIMIT } from "@/lib/contant";
import type { PaginatedDocs } from "@/lib/types";

export async function findProductCategories(
  page = 1,
  limit = PAGINATION_LIMIT,
): Promise<ProductCategory[]> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/api/product-category?limit=${limit}&page=${page}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch product categories: ${response.statusText}`);
    }

    const data = (await response.json()) as PaginatedDocs<ProductCategory>;
    return data.docs;
  } catch (error) {
    console.error("Error fetching product categories:", error);
    return [];
  }
}
