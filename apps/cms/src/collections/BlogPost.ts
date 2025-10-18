import {
	BlocksFeature,
	BoldFeature,
	HeadingFeature,
	HorizontalRuleFeature,
	ItalicFeature,
	LinkFeature,
	lexicalEditor,
	StrikethroughFeature,
	UnderlineFeature,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";
import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import {
	FullWidthImageBlock,
	SubtitleBlock,
	TextBlock,
	TitleBlock,
} from "./Block";

export const BlogPost: CollectionConfig = {
	slug: "blog-post",
	admin: {
		useAsTitle: "title",
	},
	versions: {
		drafts: true, // enables draft mode
		maxPerDoc: 25,
	},
	timestamps: true,
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated,
	},
	endpoints: [
		{
			path: "/published",
			method: "get",
			handler: async (req) => {
				const result = await req.payload.find({
					collection: "blog-post",
					where: {
						status: {
							equals: "published",
						},
					},
					sort: ["publishedAt:desc"],
					limit: 100,
					depth: 1,
				});
				return Response.json(result.docs);
			},
		},
		{
			path: "/slug",
			method: "get",
			handler: async (req) => {
				const { slug } = req.query;

				console.log(`slug`, slug);

				if (!slug) {
					return Response.json({ error: "Slug is required" }, { status: 400 });
				}

				try {
					const result = await req.payload.find({
						collection: "blog-post",
						where: {
							slug: {
								equals: slug,
							},
						},
						limit: 1,
					});
					console.log(`result`, result);

					if (result.docs.length === 0) {
						return Response.json(
							{ error: "Blog post not found" },
							{ status: 404 },
						);
					}

					console.log(`result.docs[0]`, result.docs[0]);

					return Response.json(result.docs[0]);
				} catch (error) {
					console.error("Error fetching blog post by slug:", error);
					return Response.json(
						{ error: "Internal server error" },
						{ status: 500 },
					);
				}
			},
		},
	],
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "slug",
			type: "text",
			unique: true,
			required: true,
			admin: {
				description: 'URL path (e.g. "my-first-post")',
			},
			hooks: {
				beforeValidate: [
					({ value, data }) => {
						// Auto-generate from title if empty
						if (!value && data?.title) {
							return data.title
								.toLowerCase()
								.trim()
								.replace(/[^a-z0-9\s-]/g, "")
								.replace(/\s+/g, "-")
								.replace(/-+/g, "-");
						}
						return value;
					},
				],
			},
		},
		{
			name: "excerpt",
			type: "textarea",
			required: true,
			admin: { description: "Short summary for lists and SEO." },
		},
		{
			name: "heroImage",
			label: "Hero Image",
			type: "upload",
			relationTo: "media",
			required: true,
		},
		{
			name: "content",
			label: "Content",
			type: "richText",
			required: true,
			editor: lexicalEditor({
				// Pick the features you want in the toolbar/editor
				features: ({ defaultFeatures }) => [
					...defaultFeatures,
					BoldFeature(),
					ItalicFeature(),
					UnderlineFeature(),
					StrikethroughFeature(),
					HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
					HorizontalRuleFeature(),
					LinkFeature({
						enabledCollections: ["media"],
					}),
					BlocksFeature({
						// Same reference can be reused anywhere, even in the lexical editor, without incurred performance hit
						blocks: [TitleBlock, SubtitleBlock, TextBlock, FullWidthImageBlock],
					}),
				],
			}),
		},
		{
			name: "tags",
			type: "array",
			admin: { components: {} },
			fields: [{ name: "tag", type: "text" }],
		},
		{
			name: "status",
			type: "select",
			defaultValue: "draft",
			options: [
				{ label: "Draft", value: "draft" },
				{ label: "Published", value: "published" },
			],
		},
	],
};
