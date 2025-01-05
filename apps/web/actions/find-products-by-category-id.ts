import type { Product } from "@/app/payload-types";
import { PAGINATION_LIMIT } from "@/lib/contant";
import type { PaginatedResponse } from "@/lib/pagination";

type Response = {
  docs: Product[];
} & PaginatedResponse;

export async function findProductsByCategoryId(
  id: string,
  page = 1,
  limit = PAGINATION_LIMIT,
): Promise<Product[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/api/product-category/${id}/products?limit=${limit}&page=${page}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const data = (await response.json()) as Response;
    return data.docs;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
