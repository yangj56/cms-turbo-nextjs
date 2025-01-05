import { getProductionCategory } from "@/actions/production-category";
import { notFound } from "next/navigation";
import { CollectionPage } from "../_components/collections";
import type { ProductCategory } from "../payload-types";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const productionCategoryData = await getProductionCategory();

  if (!productionCategoryData) {
    return notFound();
  }

  return (
    <div className="container">
      <CollectionPage data={productionCategoryData.docs} />
    </div>
  );
}

export async function generateStaticParams() {
  const productCategories: ProductCategory[] = await getProductionCategory();
  return productCategories.map((post) => ({
    id: String(post.id),
  }));
}
