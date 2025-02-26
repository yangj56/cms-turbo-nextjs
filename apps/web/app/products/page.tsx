import { notFound } from "next/navigation";
import { findProducts } from "@/actions/find-products";
import { Products } from "../_components/products";

export default async function Page() {
  const data = await findProducts();

  if (!data) {
    return notFound();
  }

  return (
    <>
      <Products products={data} />
    </>
  );
}
