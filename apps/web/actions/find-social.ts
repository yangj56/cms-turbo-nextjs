"use server";

import type { Social } from "@/lib/payload-types";
import type { PaginatedDocs } from "@/lib/types";

export async function findSocials(): Promise<Social[]> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/api/social`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch socials: ${response.statusText}`);
    }

    const data = (await response.json()) as PaginatedDocs<Social>;
    return data.docs;
  } catch (error) {
    console.error("Error fetching socials:", error);
    return [];
  }
}
