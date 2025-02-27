"use client";

import type { JSX } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ProductCategory } from "@/lib/payload-types";
import { BLUR_DATA } from "@/lib/contant";
import { ImageLoader } from "./image-loader";

export const Header = ({ data }: { data: ProductCategory[] }): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  return (
    <header className="flex h-[100px] w-full items-center justify-center bg-primary text-white">
      <div className="w-full p-4 md:p-16">
        <nav className="my-4 flex items-center justify-between gap-12 md:justify-start">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <ImageLoader
              src="/honestlighting.png"
              alt="Honest Lighting"
              width={70}
              height={70}
              className="rounded-full"
              placeholder="blur"
              blurDataURL={BLUR_DATA}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-12 md:flex">
            {data.map((category) => (
              <Link
                key={category.id}
                href={`/products?collection=${category.sku}`}
                className="text-base font-semibold hover:opacity-80"
              >
                {category.title}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="p-2 md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed right-0 top-[100px] z-50 h-full w-full transform bg-white text-black transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <div className="flex flex-col">
            <div className="mt-6 px-8">
              <h3 className="mb-4 text-lg font-normal">Collections</h3>
              <div className="flex flex-col space-y-4 divide-y divide-gray-200">
                {data?.map((category) => (
                  <Link
                    key={category.id}
                    href={`/products?collection=${category.sku}`}
                    className="flex items-center justify-between pt-4 font-light hover:opacity-80"
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                  >
                    <span>{category.title}</span>
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
                <Link
                  href="/products"
                  className="flex items-center justify-between pt-4 font-light hover:opacity-80"
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  View all
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
