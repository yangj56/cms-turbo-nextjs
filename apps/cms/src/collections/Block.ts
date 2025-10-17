import type { Block } from "payload";

export const FullWidthImageBlock: Block = {
	slug: "fullWidthImageBlock",
	labels: { singular: "Full Width Image", plural: "Full Width Images" },
	fields: [
		{
			name: "value",
			type: "upload",
			relationTo: "media",
			required: true,
		},
		{
			name: "caption",
			type: "text",
		},
	],
};

export const TitleBlock: Block = {
	slug: "titleBlock",
	labels: { singular: "Title", plural: "Titles" },
	fields: [{ name: "value", type: "text", required: true }],
};

export const TextBlock: Block = {
	slug: "textBlock",
	labels: { singular: "Text", plural: "Text Blocks" },
	fields: [{ name: "value", type: "text", required: true }],
};

export const SubtitleBlock: Block = {
	slug: "subtitleBlock",
	labels: { singular: "Subtitle", plural: "Subtitles" },
	fields: [{ name: "value", type: "text", required: true }],
};
