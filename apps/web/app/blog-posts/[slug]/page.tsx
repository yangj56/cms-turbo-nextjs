import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findBlogPost } from "@/actions/find-blog-post";
import { findBlogPosts } from "@/actions/find-blog-posts";
import { BlogPostDetails } from "@/app/_components/blog-post-details";
import type { BlogPost } from "@/lib/payload-types";
import { formatImageUrl } from "@/lib/utils";

export const dynamic = "force-static";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const blogPost = await findBlogPost(slug);
	if (!blogPost) return {};

	const imageUrl = blogPost.heroImage ? formatImageUrl(blogPost.heroImage) : undefined;

	return {
		title: blogPost.title,
		description: blogPost.excerpt || "Read this blog post on our site.",
		openGraph: {
			title: blogPost.title,
			description: blogPost.excerpt,
			type: "article",
			images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
		},
		twitter: {
			card: "summary_large_image",
			title: blogPost.title,
			description: blogPost.excerpt,
			images: imageUrl ? [imageUrl] : [],
		},
	};
}

/* ✅ Main blog post page */
export default async function Page({ params }: { params: Promise<{ slug: string }> }): Promise<React.ReactNode> {
	const { slug } = await params;
	if (!slug) return notFound();

	const blogPost = await findBlogPost(slug);
	if (!blogPost) return notFound();

	return <BlogPostDetails data={blogPost} />;
}

/* ✅ For static generation */
export async function generateStaticParams() {
	const blogPosts: BlogPost[] = await findBlogPosts();
	return blogPosts.map((blogPost) => ({
		slug: blogPost.slug,
	}));
}
