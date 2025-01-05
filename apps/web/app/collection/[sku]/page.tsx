import { notFound } from "next/navigation";
import { findProductsByCategorySku } from "@/actions/find-products-by-category-sku";
import { findProductCategories } from "@/actions/find-product-categories";
import type { ProductCategory } from "@/lib/payload-types";
import { Collection } from "@/app/_components/collection";

export default async function Page({ params }: { params: Promise<{ sku: string }> }) {
  const sku = (await params).sku;
  const data = await findProductsByCategorySku(sku);

  console.log(`data`, data);

  if (!data) {
    return notFound();
  }

  return <Collection products={data.products} category={data.category} />;
}

export async function generateStaticParams() {
  const productCategories: ProductCategory[] = await findProductCategories(1, 100);
  return productCategories.map((category) => ({
    sku: category.sku,
  }));
}
