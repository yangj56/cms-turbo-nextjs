"use server";

import type { BlogPost } from "@/lib/payload-types";
import type { PaginatedDocs } from "@/lib/types";
import { cacheOptions } from "@/lib/utils";

export async function findBlogPosts(): Promise<BlogPost[]> {
	try {
		const apiUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/api/blog-post/published`;
		const response = await fetch(apiUrl, cacheOptions);

		if (!response.ok) {
			throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
		}

		const data = (await response.json()) as PaginatedDocs<BlogPost>;
		return data.docs ?? [];
	} catch (error) {
		console.error("Error fetching blog posts:", error);
		return [];
	}
}
