// app/components/RichTextRenderer.tsx
import React from "react";

type AnyNode = { type?: string; children?: AnyNode[]; [k: string]: any };

function renderInline(node: AnyNode, key: React.Key) {
  let el: React.ReactNode = node.text ?? "";

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
      const Tag = (node.tag as any) || "h2";
      return React.createElement(Tag, { key }, renderChildren(node.children));
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
      const href = node.url ?? node.fields?.url ?? "#";
      const rel = node.target === "_blank" ? "noopener noreferrer" : undefined;
      return (
        <a key={key} href={href} target={node.target} rel={rel}>
          {renderChildren(node.children)}
        </a>
      );
    }

    case "upload": {
      const src = node.value?.url;
      if (!src) return null;
      const alt = node.value?.alt || "";
      return (
        <figure key={key}>
          <img src={src} alt={alt} />
          {node.value?.caption ? <figcaption>{node.value.caption}</figcaption> : null}
        </figure>
      );
    }

    case "linebreak":
      return <br key={key} />;

    case "text":
      return renderInline(node, key);

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
  const root = (content as any).root ? (content as any).root : (content as AnyNode);
  return <div className={className}>{renderNode(root, "root")}</div>;
}
