"use server";

import type { Product } from "@/lib/payload-types";
import type { PaginatedDocs } from "@/lib/types";

export async function findProducts(): Promise<Product[]> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/api/products/all`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    const data = (await response.json()) as PaginatedDocs<Product>;
    return data.docs;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
