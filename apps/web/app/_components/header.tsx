"use client";

import type { JSX } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export const Header = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex w-full items-center justify-center bg-primary text-white">
      <div className="container w-full">
        <nav className="my-4 flex items-center justify-between gap-12 md:justify-start">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/honestlighting.png"
              alt="Honest Lighting"
              width={70}
              height={70}
              className="rounded-full"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-12 md:flex">
            <Link href="/collection" className="text-base font-semibold hover:opacity-80">
              Products
            </Link>
            <Link href="/about" className="text-base font-semibold hover:opacity-80">
              About
            </Link>
            <Link href="/how-to-buy" className="text-base font-semibold hover:opacity-80">
              How to buy?
            </Link>
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
          className={`fixed right-0 top-16 z-50 h-full w-full transform bg-[#353C97] transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <div className="flex flex-col space-y-4 p-4">
            <Link
              href="/products"
              className="hover:opacity-80"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link href="/about" className="hover:opacity-80" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link
              href="/how-to-buy"
              className="hover:opacity-80"
              onClick={() => setIsMenuOpen(false)}
            >
              How to buy?
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
