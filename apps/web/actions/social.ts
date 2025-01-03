import type { Social } from "@repo/ui";

export async function getSocial(): Promise<Social[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/api/social`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch social data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.docs as Social[];
  } catch (error) {
    console.error("Error fetching social data:", error);
    return [];
  }
}
