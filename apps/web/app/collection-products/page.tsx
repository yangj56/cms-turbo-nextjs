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

  const sortedData = data.sort((a, b) => {
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
      <Products products={sortedData} />
    </>
  );
}
