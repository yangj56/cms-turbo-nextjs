import { findFeatures } from "@/actions/find-features";
import { findHeros } from "@/actions/find-heros";
import { findIntroduction } from "@/actions/find-introduction";
import { findProductCategories } from "@/actions/find-product-categories";
import { findSocials } from "@/actions/find-social";
import { notFound } from "next/navigation";
import type { JSX } from "react";
import { Benefits } from "./_components/benefits";
import { HomeCarousel } from "./_components/carousel";
import { Heros } from "./_components/heros";
import { LandingIntroduction } from "./_components/landing-introduction";
import { ProductCategories } from "./_components/product-categories";

export default async function HomePage(): Promise<JSX.Element> {
  const [heros, socials, introduction, productCategories, features] = await Promise.all([
    findHeros(),
    findSocials(),
    findIntroduction(),
    findProductCategories(),
    findFeatures(),
  ]);

  if (
    !heros.length ||
    !socials.length ||
    !introduction ||
    !productCategories.length ||
    !features.length
  ) {
    return notFound();
  }

  return (
    <>
      <Heros data={heros} />
      <div className="container mb-20 mt-12 space-y-20 divide-y [&>*+*]:pt-12">
        <ProductCategories data={productCategories} />
        <LandingIntroduction data={introduction} />
        <HomeCarousel label="Get Social" data={socials} />
        {/* <HomeCarousel label="Featured in" data={features} /> */}
      </div>
    </>
  );
}
