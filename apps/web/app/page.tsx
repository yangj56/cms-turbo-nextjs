import { getHero } from "@/actions/hero";
import { getSocial } from "@/actions/social";
import { getIntroduction } from "@/actions/introduction";
import { getProductionCategory } from "@/actions/production-category";
import { notFound } from "next/navigation";
import { Heros } from "./_components/heros";
import { LandingIntroduction } from "./_components/landing-introduction";
import { ProductCategories } from "./_components/product-categories";
import { Socials } from "./_components/socials";
import { Features } from "./_components/features";
import { getFeature } from "@/actions/feature";
import { sddd } from "@repo/ui";

export default async function HomePage() {
  console.log(sddd);
  const heroData = await getHero();
  const socialData = await getSocial();
  const introductionData = await getIntroduction();
  const productionCategoryData = await getProductionCategory();
  const featureData = await getFeature();

  if (!heroData || !socialData || !introductionData || !productionCategoryData || !featureData) {
    return notFound();
  }

  return (
    <>
      <Heros data={heroData} />
      <div className="container mt-16 space-y-32 divide-y [&>*+*]:pt-32">
        <ProductCategories data={productionCategoryData} />
        <LandingIntroduction data={introductionData} />
        <Socials data={socialData} />
        <Features data={featureData} />
      </div>
    </>
  );
}
