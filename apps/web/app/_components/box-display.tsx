"use client";

import Link from "next/link";
import { BLUR_DATA } from "@/lib/contant";
import type { Media } from "@/lib/payload-types";
import { ImageLoader } from "./image-loader";
import Image from "next/image";

type BoxDisplayProps = {
  label: string;
  data: {
    id: string;
    title: string;
    image: string | Media;
    url: string;
    updatedAt: string;
    createdAt: string;
  }[];
  showTitle?: boolean;
  showDescription?: boolean;
};

export const BoxDisplay = ({ label, data }: BoxDisplayProps) => {
  return (
    <div className="w-full py-8">
      <div className="mb-6">
        <h3>{label}</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {data.map((item) => (
          <BoxItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const BoxItem = ({
  item,
}: {
  item: {
    id: string;
    title: string;
    image: string | Media;
    url: string;
    updatedAt: string;
    createdAt: string;
  };
}) => {
  if (!item || !item.image) {
    return null;
  }
  const content = (
    <div className="aspect-square w-full overflow-hidden rounded-sm">
      <div className="relative h-full w-full">
        <ImageLoader
          src={`${process.env.NEXT_PUBLIC_CMS_URL}${(item.image as Media).url}`}
          alt={item.title}
          className="object-cover transition-all duration-300 group-hover:scale-105"
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
        />
      </div>
    </div>
  );

  if (item.url) {
    return (
      <Link href={item.url} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
};
