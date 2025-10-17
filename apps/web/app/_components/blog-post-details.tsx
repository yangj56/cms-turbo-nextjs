import Image from "next/image";
import { RichTextRenderer } from "@/components/rich-text/rich";
import type { BlogPost } from "@/lib/payload-types";
import { BlogPostBlock } from "./blog-post-block";

interface Props {
	data: BlogPost;
}

export const BlogPostDetails = ({ data }: Props): React.ReactNode => {
	// Helper function to format date
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	// Helper function to get hero image URL
	const getHeroImageUrl = (heroImage: BlogPost["heroImage"]) => {
		if (typeof heroImage === "string") {
			return heroImage;
		}
		if (heroImage && typeof heroImage === "object" && "url" in heroImage) {
			return heroImage.url;
		}
		return null;
	};

	// Helper function to get hero image alt text
	const getHeroImageAlt = (heroImage: BlogPost["heroImage"]) => {
		if (heroImage && typeof heroImage === "object" && "alt" in heroImage) {
			return heroImage.alt || data.title;
		}
		return data.title;
	};

	const heroImageUrl = getHeroImageUrl(data.heroImage);
	const heroImageAlt = getHeroImageAlt(data.heroImage);

	return (
		<article className="mx-auto max-w-4xl px-4 py-8">
			{/* Header */}
			<header className="mb-8">
				<h1 className="mb-4 font-bold text-4xl text-gray-900">{data.title}</h1>

				{/* Excerpt */}
				{data.excerpt && (
					<p className="mb-6 text-gray-600 text-xl leading-relaxed">
						{data.excerpt}
					</p>
				)}

				{/* Meta information */}
				<div className="mb-6 flex flex-wrap items-center gap-4 text-gray-500 text-sm">
					{data.createdAt && (
						<time dateTime={data.createdAt}>
							Published on {formatDate(data.createdAt)}
						</time>
					)}
				</div>

				{/* Tags */}
				{data.tags && data.tags.length > 0 && (
					<div className="mb-6 flex flex-wrap gap-2">
						{data.tags.map((tag, index) => (
							<span
								key={tag.id || index}
								className="inline-block rounded-full bg-blue-100 px-2 py-1 text-blue-800 text-xs"
							>
								{tag.tag}
							</span>
						))}
					</div>
				)}
			</header>

			{/* Hero Image */}
			{heroImageUrl && (
				<div className="mb-8">
					<Image
						src={heroImageUrl}
						alt={heroImageAlt}
						width={800}
						height={400}
						className="h-auto w-full rounded-lg shadow-lg"
						priority
					/>
				</div>
			)}

			{data.content ? (
				<div className="prose max-w-none">
					<div>content here</div>
					<RichTextRenderer content={data.content} />
				</div>
			) : null}

			{/* Footer */}
			<footer className="mt-12 border-gray-200 border-t pt-8">
				<div className="text-gray-500 text-sm">
					<p>Blog post ID: {data.id}</p>
					<p>Slug: {data.slug}</p>
					{data.canonicalUrl && (
						<p>
							Canonical URL:{" "}
							<a
								href={data.canonicalUrl}
								className="text-blue-600 hover:underline"
							>
								{data.canonicalUrl}
							</a>
						</p>
					)}
				</div>
			</footer>
		</article>
	);
};
