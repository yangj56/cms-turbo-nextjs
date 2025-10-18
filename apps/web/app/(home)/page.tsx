import { notFound } from "next/navigation";
import type { JSX } from "react";
import { findHeros } from "@/actions/find-heros";
import { findIntroduction } from "@/actions/find-introduction";
import { findProductCategories } from "@/actions/find-product-categories";
import { Heros } from "../_components/heros";
import { LandingIntroduction } from "../_components/landing-introduction";
import { ProductCategories } from "../_components/product-categories";

export const dynamic = "force-static";
export const revalidate = 60;

export default async function HomePage(): Promise<JSX.Element> {
	const [heros, introduction, productCategories] = await Promise.all([
		findHeros(),
		findIntroduction(),
		findProductCategories(),
	]);

	if (!heros.length || !introduction || !productCategories.length) {
		console.log("heros", heros.length);
		console.log("introduction", introduction?.title);
		console.log("productCategories", productCategories.length);
		return notFound();
	}

	const sortedProductCategories = productCategories.sort((a, b) => {
		// If both items have sequence, sort by sequence
		if (
			a.sequence !== undefined &&
			b.sequence !== undefined &&
			a.sequence !== null &&
			b.sequence !== null
		) {
			return b.sequence - a.sequence;
		}

		// If only one has sequence, prioritize the item with sequence
		if (a.sequence !== undefined) return -1;
		if (b.sequence !== undefined) return 1;

		// If neither has sequence, sort by another criteria (e.g., title or date)
		return a.title.localeCompare(b.title);
	});

	return (
		<>
			<Heros data={heros} />
			<div className="container mt-12 mb-20 space-y-16">
				<div className="border-gray-200 border-b-1 pb-16">
					<ProductCategories data={sortedProductCategories} />
				</div>
				<div className="pt-8">
					<LandingIntroduction data={introduction} />
				</div>
			</div>
		</>
	);
}
