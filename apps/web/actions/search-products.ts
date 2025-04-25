"use server";

import { PAGINATION_LIMIT } from "@/lib/contant";
import type { Product } from "@/lib/payload-types";
import type { PaginatedDocs } from "@/lib/types";

export async function searchProducts(
  page = 1,
  query = "",
  limit = PAGINATION_LIMIT,
): Promise<PaginatedDocs<Product> | undefined> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/api/product/search?limit=${limit}&page=${page}&query=${query}`;
    const response = await fetch(apiUrl, {
      cache: "no-cache",
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    return (await response.json()) as PaginatedDocs<Product>;
  } catch (error) {
    console.error("Error fetching products:", error);
    return undefined;
  }
}
