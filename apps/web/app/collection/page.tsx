import { notFound } from "next/navigation";
import { Collections } from "@/app/_components/collections";
import { findProductCategories } from "@/actions/find-product-categories";

export default async function Page() {
  const data = await findProductCategories();

  if (!data) {
    return notFound();
  }

  return (
    <>
      <Collections categories={data} />
    </>
  );
}
