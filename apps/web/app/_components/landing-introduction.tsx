"use client";

import Link from "next/link";
import type { JSX } from "react";
import { Introduction } from "../payload-types";

type Props = {
  data: Introduction;
};

export const LandingIntroduction = ({ data }: Props): JSX.Element => {
  return (
    <div className="w-full">
      <Button onClick={() => {
        //
      }}>sss</Button>
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
