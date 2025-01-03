import type { ProductCategory } from "@repo/ui";

export async function getProductionCategory(): Promise<ProductCategory[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/api/product-category`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const data = await response.json();
    return data.docs as ProductCategory[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
