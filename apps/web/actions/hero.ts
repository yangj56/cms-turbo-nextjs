"use server";

import type { Hero } from "@repo/ui";

export async function getHero(): Promise<Hero[] | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/hero`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.docs as Hero[];
  } catch (error) {
    console.error("Failed to fetch Hero data:", error);
    return null;
  }
}
