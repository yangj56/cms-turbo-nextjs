import { notFound } from "next/navigation";
import { CollectionPage } from "../_components/collections";
import { findProductsByCategoryId } from "@/actions/find-products-by-category-id";
import { findProductCategories } from "@/actions/find-product-categories";
import type { ProductCategory } from "@/lib/payload-types";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const products = await findProductsByCategoryId(id, 1, 100);

  if (!products) {
    return notFound();
  }

  return (
    <div className="container">
      <CollectionPage data={products} />
    </div>
  );
}

export async function generateStaticParams() {
  const productCategories: ProductCategory[] = await findProductCategories(1, 100);
  return productCategories.map((post) => ({
    id: String(post.id),
  }));
}
