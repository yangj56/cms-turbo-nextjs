"use server";

import type { Product } from "@/lib/payload-types";
import { PAGINATION_LIMIT } from "@/lib/contant";
import type { PaginatedDocs } from "@/lib/types";

export async function findProductsByCategoryId(
  id: string,
  page = 1,
  limit = PAGINATION_LIMIT,
): Promise<Product[]> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/api/product-category/${id}/products?limit=${limit}&page=${page}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch products by category: ${response.statusText}`);
    }

    const data = (await response.json()) as PaginatedDocs<Product>;
    return data.docs;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}
