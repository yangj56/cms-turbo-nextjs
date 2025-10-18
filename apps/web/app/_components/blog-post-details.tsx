import Image from "next/image";
import { RichTextRenderer } from "@/components/rich-text/rich";
import type { BlogPost } from "@/lib/payload-types";
import { formatDate, formatImageAlt, formatImageUrl } from "@/lib/utils";

interface Props {
	data: BlogPost;
}

export const BlogPostDetails = ({ data }: Props): React.ReactNode => {
	const heroImageUrl = formatImageUrl(data.heroImage);
	const heroImageAlt = formatImageAlt(data.heroImage);

	return (
		<article className="container">
			{/* Header */}
			<div className="m-4 rounded-lg bg-secondary p-12">
				<header className="mb-8">
					<h1 className="mb-4 font-bold text-4xl text-gray-900">
						{data.title}
					</h1>

					{/* Excerpt */}
					{data.excerpt && (
						<p className="mb-6 text-gray-600 text-xl leading-relaxed">
							{data.excerpt}
						</p>
					)}

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
					<div className="prose max-w-none py-12">
						<RichTextRenderer content={data.content} />
					</div>
				) : null}

				{/* Footer */}
				<footer className="mt-12 border-gray-200 border-t pt-8">
					<div className="text-gray-500 text-sm">
						{/* Meta information */}
						<div className="mb-6 flex flex-wrap items-center gap-4 text-gray-500 text-sm">
							{data.createdAt && (
								<time dateTime={data.createdAt}>
									Published on {formatDate(data.createdAt)}
								</time>
							)}
						</div>
					</div>
				</footer>
			</div>
		</article>
	);
};
