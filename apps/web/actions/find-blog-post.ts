"use server";

import type { BlogPost } from "@/lib/payload-types";
import { cacheOptions } from "@/lib/utils";

export async function findBlogPost(slug: string): Promise<BlogPost | null> {
	try {
		const apiUrl = `${process.env.NEXT_PUBLIC_CMS_URL}/api/blog-post/slug?slug=${slug}`;
		const response = await fetch(apiUrl, cacheOptions);

		if (!response.ok) {
			throw new Error(`asdf to fetch blog post: ${response.statusText}`);
		}

		const result = (await response.json()) as BlogPost;
		console.log(`result`, result);
		return result || null;
	} catch (error) {
		console.error("Error fetching blog post:", error);
		return null;
	}
}
