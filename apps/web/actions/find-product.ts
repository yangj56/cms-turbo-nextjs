import type { Product } from "@/app/payload-types";

type Response = {
  docs: Product[];
};

export async function findProduct(id: string): Promise<Product[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/api/product/${id}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    const data = (await response.json()) as Response;
    return data.docs;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
