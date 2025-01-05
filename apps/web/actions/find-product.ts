"use server";

import type { Product } from "@/lib/payload-types";

export async function findProduct(id: string): Promise<Product | null> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/api/product/${id}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    return (await response.json()) as Product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
