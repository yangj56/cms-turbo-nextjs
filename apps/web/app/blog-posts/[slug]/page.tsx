import { notFound } from "next/navigation";
import { findBlogPost } from "@/actions/find-blog-post";
import { findBlogPosts } from "@/actions/find-blog-posts";
import { BlogPostDetails } from "@/app/_components/blog-post-details";
import { ALL_PRODUCTS_LIMIT } from "@/lib/contant";
import type { BlogPost } from "@/lib/payload-types";

export const dynamic = "force-static";
export const revalidate = 60;

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const slug = (await params).slug;
	if (!slug) {
		return notFound();
	}

	const blogPost = await findBlogPost(slug);
	if (!blogPost) {
		return notFound();
	}
	console.log(`blogPost`, blogPost);

	return <BlogPostDetails data={blogPost} />;
}

export async function generateStaticParams() {
	const blogPosts: BlogPost[] = await findBlogPosts();
	return blogPosts.map((blogPost) => ({
		slug: blogPost.slug,
	}));
}
