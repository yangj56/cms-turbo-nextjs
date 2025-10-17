import type { BlogPostBlock as BlogPostBlockType } from "@/lib/payload-types";

interface Props {
	block: BlogPostBlockType;
}

export const BlogPostBlock = ({ block }: Props) => {
	return <div>BlogPostBlock</div>;
};
