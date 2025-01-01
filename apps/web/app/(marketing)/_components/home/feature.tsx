'use client';

import type { FeatureData } from '@/data/feature-data';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type Props = {
  data: FeatureData[];
};

export const Feature = ({ data }: Props) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4">
      {data.map(feature => (
        <div className="bg-white py-16" key={feature.name}>
          <div className="container mx-auto px-4">
            <div className="md:flex md:items-center">
              <div className="md:w-1/2">
                <h2 className="mb-4 text-4xl font-bold">{feature.name}</h2>
                <p className="mb-6 text-lg">
                  {feature.description}
                </p>
                <Button onClick={() => router.push(feature.redirectUrl)}>{feature.button}</Button>
              </div>
              <div className="mt-8 md:ml-8 md:mt-0 md:w-1/2">
                <img
                  src={feature.image}
                  alt={feature.name}
                  className="h-auto w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

  );
};
