import type { Feature } from "@/app/payload-types";
import { PAGINATION_LIMIT } from "@/lib/contant";
import type { PaginatedResponse } from "@/lib/pagination";

type Response = {
  docs: Feature[];
} & PaginatedResponse;

export async function findFeatures(page = 1, limit = PAGINATION_LIMIT): Promise<Feature[]> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/api/feature?limit=${limit}&page=${page}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch features: ${response.statusText}`);
    }

    const data = (await response.json()) as Response;
    return data.docs;
  } catch (error) {
    console.error("Error fetching features:", error);
    return [];
  }
}
