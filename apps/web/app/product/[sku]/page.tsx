import { notFound } from "next/navigation";
import { findProduct } from "@/actions/find-product";
import { findProductBySku } from "@/actions/find-product-by-sku";
import { findProducts } from "@/actions/find-products";
import { ProductDetails } from "@/app/_components/product-details";
import { ALL_PRODUCTS_LIMIT } from "@/lib/contant";
import type { Product } from "@/lib/payload-types";

export const dynamic = "force-static";
export const revalidate = 60;

export default async function Page({
	params,
}: {
	params: Promise<{ sku: string }>;
}) {
	const sku = (await params).sku;
	if (!sku) {
		return notFound();
	}

	const product = await findProductBySku(sku);
	if (!product) {
		return notFound();
	}

	return <ProductDetails data={product} />;
}

export async function generateStaticParams() {
	const products: Product[] = await findProducts(1, ALL_PRODUCTS_LIMIT);
	return products.map((product) => ({
		sku: product.sku,
	}));
}
