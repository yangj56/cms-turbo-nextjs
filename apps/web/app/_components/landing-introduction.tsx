"use client";

import type { Introduction } from "@repo/ui";
import Link from "next/link";

type Props = {
  data: Introduction;
};

export const LandingIntroduction = ({ data }: Props) => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="p-8 md:mb-0 md:w-2/5">
          <h2 className="mb-4 text-4xl font-bold">{data.title}</h2>
          <Link href={data.url} className="mt-8 inline-block border border-black px-16 py-4">
            {data.buttonLabel}
          </Link>
        </div>
        <div className="p-8 md:w-3/5">
          <p className="text-xl">{data.description}</p>
        </div>
      </div>
    </div>
  );
};
