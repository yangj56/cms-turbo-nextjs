import { findFeatures } from "@/actions/find-features";
import { findHeros } from "@/actions/find-heros";
import { findIntroduction } from "@/actions/find-introduction";
import { findProductCategories } from "@/actions/find-product-categories";
import { findSocials } from "@/actions/find-social";
import { notFound } from "next/navigation";
import type { JSX } from "react";
import { Heros } from "./_components/heros";
import { LandingIntroduction } from "./_components/landing-introduction";
import { ProductCategories } from "./_components/product-categories";
import { BoxDisplay } from "./_components/box-display";

export const dynamic = "force-static";
export const revalidate = 60;

export default async function HomePage(): Promise<JSX.Element> {
  const [heros, socials, introduction, productCategories] = await Promise.all([
    findHeros(),
    findSocials(),
    findIntroduction(),
    findProductCategories(),
  ]);

  if (!heros.length || !socials.length || !introduction || !productCategories.length) {
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
      <div className="container mb-20 mt-12 space-y-20 divide-y [&>*+*]:pt-12">
        <ProductCategories data={sortedProductCategories} />
        <LandingIntroduction data={introduction} />
        <BoxDisplay label="Get Social" data={socials} />
      </div>
    </>
  );
}
