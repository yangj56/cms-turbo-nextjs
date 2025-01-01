'use client';

import type { ProductDocumentDefinition } from '@/data/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useRef, useState } from 'react';

type Props = {
  data: ProductDocumentDefinition[];
};

export const Popular = ({ data }: Props) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollBy({
        left: -container.offsetWidth,
        behavior: 'smooth',
      });
      setIsEnd(container.scrollLeft + container.offsetWidth < container.scrollWidth);
      setIsStart(container.scrollLeft === 0);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollBy({
        left: container.offsetWidth,
        behavior: 'smooth',
      });
      setIsStart(container.scrollLeft === 0);
      setIsEnd(container.scrollLeft + container.offsetWidth >= container.scrollWidth);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Most Popular</h2>
        <div>
          <button
            className={`mr-2 rounded-full bg-white p-2 shadow-md focus:outline-none ${
              isStart ? 'cursor-not-allowed opacity-50' : ''
            }`}
            onClick={scrollLeft}
            disabled={isStart}
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            className={`rounded-full bg-white p-2 shadow-md focus:outline-none ${
              isEnd ? 'cursor-not-allowed opacity-50' : ''
            }`}
            onClick={scrollRight}
            disabled={isEnd}
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="hide-scrollbar flex space-x-4 overflow-x-auto scroll-smooth md:space-x-8"
      >
        {data.map((product, index) => (
          <div key={index} className="w-1/2 shrink-0 md:w-1/4">
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover"
            />
            <p className="mt-2 text-center">{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
