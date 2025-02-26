import { notFound } from "next/navigation";
import { findProducts } from "@/actions/find-products";
import { Products } from "../_components/products";
import { ALL_PRODUCTS_LIMIT } from "@/lib/contant";

export const dynamic = "force-static";
export const revalidate = 60;

export default async function Page() {
  const data = await findProducts(1, ALL_PRODUCTS_LIMIT);

  if (!data) {
    return notFound();
  }

  return (
    <>
      <Products products={data} />
    </>
  );
}
