import Link from "next/link";
import Image from "next/image";
import type { Social, Media } from "@/lib/payload-types";
import type { JSX } from "react";

type Props = {
  data: Social[];
};

export const Socials = ({ data }: Props): JSX.Element => {
  return (
    <div className="w-full">
      <h2 className="mb-12">Get Social</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {data.map((item) => (
          <Link key={item.id} href={item.url} className="block aspect-square overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_CMS_URL}${(item.image as Media).url}`}
              alt={item.title}
              width={(item.image as Media).width || 800}
              height={(item.image as Media).height || 800}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
