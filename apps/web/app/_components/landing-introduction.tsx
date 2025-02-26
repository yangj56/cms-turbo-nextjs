"use client";

import Link from "next/link";
import type { JSX } from "react";
import type { Introduction } from "@/lib/payload-types";

type Props = {
  data: Introduction;
};

export const LandingIntroduction = ({ data }: Props): JSX.Element => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-8 md:my-16 md:flex-row md:items-center md:justify-between">
        <div className="md:mb-0 md:w-2/5">
          <h2 className="mb-4">{data.title}</h2>
          {data.url && data.buttonLabel && (
            <Link
              href={data.url}
              className="mt-4 inline-block border border-black px-12 py-6 text-2xl font-light"
            >
              {data.buttonLabel}
            </Link>
          )}
        </div>
        <div className="md:w-3/5">
          <p className="text-xl font-thin">{data.description}</p>
        </div>
      </div>
    </div>
  );
};
