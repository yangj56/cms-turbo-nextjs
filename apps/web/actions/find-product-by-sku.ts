"use server";

import type { Product } from "@/lib/payload-types";
import { cacheOptions } from "@/lib/utils";

export async function findProductBySku(sku: string): Promise<Product | null> {
	try {
		const apiUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/api/product/sku/${sku}`;
		const response = await fetch(apiUrl, cacheOptions);

		if (!response.ok) {
			throw new Error(`Failed to fetch product: ${response.statusText}`);
		}

		const result = (await response.json()) as Product;
		console.log("result", result);
		return result || null;
	} catch (error) {
		console.error("Error fetching product by sku:", error);
		return null;
	}
}
