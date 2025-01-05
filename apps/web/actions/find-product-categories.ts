import type { ProductCategory } from "@/app/payload-types";
import { PAGINATION_LIMIT } from "@/lib/contant";
import type { PaginatedResponse } from "@/lib/pagination";

type Response = {
  docs: ProductCategory[];
} & PaginatedResponse;

export async function findProductCategories(
  page = 1,
  limit = PAGINATION_LIMIT,
): Promise<ProductCategory[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/api/product-category?limit=${limit}&page=${page}`;

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
