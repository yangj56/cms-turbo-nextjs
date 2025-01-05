import { findProduct } from "@/actions/find-product";
import { findProducts } from "@/actions/find-products";
import { ProductDetails } from "@/app/_components/product-details";
import type { Product } from "@/lib/payload-types";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  if (!id) {
    return notFound();
  }

  const product = await findProduct(id);
  if (!product) {
    return notFound();
  }

  console.log(`product`, product);

  return <ProductDetails data={product} />;
}

export async function generateStaticParams() {
  const products: Product[] = await findProducts(1, 200);
  return products.map((product) => ({
    id: product.id,
  }));
}
