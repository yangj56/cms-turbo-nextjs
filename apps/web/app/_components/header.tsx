"use client";

import type { JSX } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ProductCategory } from "@/lib/payload-types";
import { BLUR_DATA } from "@/lib/contant";

export const Header = ({ data }: { data: ProductCategory[] }): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsProductMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  const toggleProductMenu = () => {
    setIsProductMenuOpen(!isProductMenuOpen);
  };

  return (
    <header className="flex h-[100px] w-full items-center justify-center bg-primary text-white">
      <div className="w-full p-4 md:p-16">
        <nav className="my-4 flex items-center justify-between gap-12 md:justify-start">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
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
            <Link href="/collection" className="text-base font-semibold hover:opacity-80">
              Products
            </Link>
            {/* <Link href="/about" className="text-base font-semibold hover:opacity-80">
              About
            </Link>
            <Link href="/how-to-buy" className="text-base font-semibold hover:opacity-80">
              How to buy?
            </Link> */}
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
            <button
              onClick={toggleProductMenu}
              className="flex w-full items-center justify-between border-b border-gray-200 px-8 py-4 hover:bg-gray-50"
            >
              <span>Products</span>
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {/* <Link
              href="/about"
              className="flex items-center justify-between border-b border-gray-200 px-8 py-4 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>About</span>
              <svg
                className="h-5 w-5"
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
            <Link
              href="/how-to-buy"
              className="flex items-center justify-between border-b border-gray-200 px-8 py-4 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>How to buy</span>
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </Link> */}
          </div>
        </div>

        {/* Products Slide-in Menu */}
        <div
          className={`fixed right-0 top-[100px] z-50 h-full w-full transform bg-white text-black transition-transform duration-300 ease-in-out ${
            isProductMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col">
            <div className="relative flex items-center justify-center border-b border-gray-200 px-4 py-4">
              <button onClick={toggleProductMenu} className="absolute left-4">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-lg">Products</span>
            </div>

            <div className="mt-6 px-8">
              <h3 className="mb-4 text-lg font-normal">Category</h3>
              <div className="flex flex-col space-y-4">
                {data?.map((category) => (
                  <Link
                    key={category.id}
                    href={`/collection/${category.sku}`}
                    className="font-light hover:opacity-80"
                    onClick={() => {
                      setIsProductMenuOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    {category.title}
                  </Link>
                ))}
                <Link
                  href="/collection"
                  className="text-md flex items-center font-normal"
                  onClick={() => {
                    setIsProductMenuOpen(false);
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
