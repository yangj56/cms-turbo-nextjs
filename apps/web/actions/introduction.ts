import { Introduction } from "@/app/payload-types";

export async function getIntroduction(): Promise<Introduction | null> {
  const apiUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/api/introduction`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch home data: ${response.statusText}`);
    }

    const data = await response.json();
    const heroes = data.docs as Introduction[];
    const latestIntroduction = heroes.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )[0];
    return latestIntroduction || null;
  } catch (error) {
    console.error("Error fetching home data:", error);
    return null;
  }
}
