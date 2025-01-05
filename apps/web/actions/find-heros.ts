"use server";

import type { Hero } from "@/app/payload-types";
import { PAGINATION_LIMIT } from "@/lib/contant";
import type { PaginatedResponse } from "@/lib/pagination";

type Response = {
  docs: Hero[];
} & PaginatedResponse;

export async function findHeros(page = 1, limit = PAGINATION_LIMIT): Promise<Hero[] | null> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/api/hero?limit=${limit}&page=${page}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as Response;
    return data.docs;
  } catch (error) {
    console.error("Failed to fetch Hero data:", error);
    return null;
  }
}
