import type { Social } from "@/app/payload-types";
import type { PaginatedResponse } from "@/lib/pagination";

type Response = {
  docs: Social[];
} & PaginatedResponse;

export async function findSocials(): Promise<Social[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/api/social`;
  console.log(`apiUrl: ${apiUrl}`);
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch social data: ${response.statusText}`);
    }

    const data = (await response.json()) as Response;
    return data.docs;
  } catch (error) {
    console.error("Error fetching social data:", error);
    return [];
  }
}
