"use server";

import type { ProductCategory } from "@/lib/payload-types";

export async function findProductHeader(): Promise<ProductCategory[]> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/api/product-category/header`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch product header: ${response.statusText}`);
    }
    return (await response.json()) as ProductCategory[];
  } catch (error) {
    console.error("Error fetching product header:", error);
    return [];
  }
}
