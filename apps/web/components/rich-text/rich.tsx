import Image from "next/image";
import React from "react";
import type { Media } from "@/lib/payload-types";
import { formatImageAlt, formatImageUrl } from "@/lib/utils";

type AnyNode = { type?: string; children?: AnyNode[]; [k: string]: unknown };

function renderInline(node: AnyNode, key: React.Key) {
	let el: string | React.ReactNode = (node.text as string | React.ReactNode) ?? "";

	// Lexical flags often also appear as booleans on text nodes
	if (node.code) el = <code>{el}</code>;
	if (node.bold) el = <strong>{el}</strong>;
	if (node.italic) el = <em>{el}</em>;
	if (node.underline) el = <u>{el}</u>;
	if (node.strikethrough) el = <s>{el}</s>;

	return <React.Fragment key={key}>{el}</React.Fragment>;
}

function renderChildren(children?: AnyNode[]) {
	if (!children?.length) return null;
	return children.map((child, i) => renderNode(child, i));
}

function renderNode(node: AnyNode, key: React.Key): React.ReactNode {
	switch (node.type) {
		case "root":
			return <>{renderChildren(node.children)}</>;

		case "paragraph":
			return <p key={key}>{renderChildren(node.children)}</p>;

		case "heading": {
			const Tag = node.tag || "h2";
			return React.createElement(Tag as string, { key }, renderChildren(node.children));
		}

		case "list": {
			const Wrapper = node.listType === "number" ? "ol" : "ul";
			return <Wrapper key={key}>{renderChildren(node.children)}</Wrapper>;
		}

		case "listitem":
			return <li key={key}>{renderChildren(node.children)}</li>;

		case "quote":
			return <blockquote key={key}>{renderChildren(node.children)}</blockquote>;

		case "code":
			return (
				<pre key={key}>
					<code>{renderChildren(node.children)}</code>
				</pre>
			);

		case "link": {
			const data = node.fields as { url?: string };
			const href = data ? (data.url as string) : "#";
			const rel = node.target === "_blank" ? "noopener noreferrer" : undefined;
			return (
				<a key={key} href={href} target={node.target as string} rel={rel}>
					{renderChildren(node.children)}
				</a>
			);
		}

		case "upload": {
			const imageUrl = formatImageUrl(node.value as unknown as Media);
			const imageAlt = formatImageAlt(node.value as unknown as Media);
			return (
				<figure key={key}>
					<Image src={imageUrl} alt={imageAlt} width={100} height={100} />
					{(node.value as { caption?: string })?.caption ? (
						<figcaption>{(node.value as { caption?: string })?.caption}</figcaption>
					) : null}
				</figure>
			);
		}

		case "linebreak":
			return <br key={key} />;

		case "text":
			return renderInline(node, key);

		case "block": {
			const fields = node.fields as {
				blockType?: string;
				id?: string;
				value?: string;
				caption?: string;
			};
			if (!fields.blockType) return null;
			switch (fields.blockType) {
				case "titleBlock":
					return <h2 key={`${fields.id}`}>{fields.value}</h2>;
				case "subtitleBlock":
					return <h3 key={`${fields.id}`}>{fields.value}</h3>;
				case "textBlock":
					return <p key={`${fields.id}`}>{fields.value}</p>;
				case "fullWidthImageBlock": {
					const imageValue = fields.value as unknown as Media;
					const imageUrl = formatImageUrl(imageValue);
					const imageAlt = formatImageAlt(imageValue);
					return (
						<div key={`${fields.id}`}>
							<Image src={imageUrl} alt={imageAlt} width={100} height={100} />
							{(node.value as { caption?: string })?.caption ? (
								<figcaption>{(node.value as { caption?: string })?.caption}</figcaption>
							) : null}
						</div>
					);
				}
			}
			return null;
		}

		case "titleBlock":
			return <h2 key={key}>{renderChildren(node.children)}</h2>;
		case "subtitleBlock":
			return <h3 key={key}>{renderChildren(node.children)}</h3>;
		case "textBlock":
			return <p key={key}>{renderChildren(node.children)}</p>;
		case "fullWidthImageBlock":
			return <div>text here</div>;

		default:
			// Unknown node → try to render its children rather than crash
			return <React.Fragment key={key}>{renderChildren(node.children)}</React.Fragment>;
	}
}

export function RichTextRenderer({
	content,
	className = "prose max-w-none",
}: {
	content: { root?: AnyNode } | AnyNode | null | undefined;
	className?: string;
}) {
	if (!content) return null;
	const root = (content as unknown as AnyNode).root
		? (content as unknown as AnyNode).root
		: (content as unknown as AnyNode);
	return <div className={className}>{renderNode(root as AnyNode, "root")}</div>;
}
