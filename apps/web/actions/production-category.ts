import type { ProductCategory } from "@/app/payload-types";

export async function getProductionCategory(): Promise<ProductCategory[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/api/product-category`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("data", data);
    return data.docs as ProductCategory[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
