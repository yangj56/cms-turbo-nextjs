"use client";

import type { JSX } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import type { ProductCategory } from "@/lib/payload-types";
import { BLUR_DATA } from "@/lib/contant";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const Header = ({
  data,
  sticky = false,
}: {
  data: ProductCategory[];
  sticky?: boolean;
}): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const toggleMenu = () => {
    setIsSearchOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const search = () => {
    setIsSearchOpen(false);
    router.push(`/search-products?query=${searchQuery}`);
  };

  const displaySearch = (isDesktop: boolean) => {
    return (
      <button
        className={cn(
          "relative flex items-center gap-4 text-lg font-semibold after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 after:ease-in-out hover:opacity-100 hover:after:w-full",
        )}
        onClick={() => {
          setIsMenuOpen(false);
          setIsSearchOpen(!isSearchOpen);
        }}
      >
        {isDesktop && <span>Search</span>}
        <Search className="h-6 w-6" />
      </button>
    );
  };

  return (
    <header
      className={cn(
        "group top-0 z-50 flex w-full flex-col items-center justify-center transition-colors duration-300 hover:bg-white hover:text-black",
        sticky ? "border-b border-gray-200" : "",
        isScrolled || isSearchOpen || sticky ? "bg-white text-black" : "bg-transparent text-white",
        sticky ? "sticky" : "fixed",
      )}
    >
      <div className="w-full px-4 py-4 md:px-20">
        <nav className="flex items-center justify-between gap-12">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/honestlighting.png"
              alt="Honest Lighting"
              width={50}
              height={50}
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
                href={`/collection-products?collection=${category.sku}`}
                className={cn(
                  "relative text-lg font-semibold after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 after:ease-in-out hover:opacity-100 hover:after:w-full",
                )}
              >
                {category.title}
              </Link>
            ))}
            {displaySearch(true)}
          </div>
          <div className="flex flex-row items-center justify-center gap-4 md:hidden">
            {displaySearch(false)}
            {/* Mobile Menu Button */}
            <button className="p-2" onClick={toggleMenu} aria-label="Toggle menu">
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
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed right-0 top-[80px] z-50 h-full w-full transform bg-white text-black transition-transform duration-300 ease-in-out ${
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
                    href={`/collection-products?collection=${category.sku}`}
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
                  href="/collection-products"
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
        {isSearchOpen && (
          <div className="mb-2 mt-8 flex w-full animate-fadeIn items-center justify-center px-4 md:px-40">
            <div className="relative flex w-full items-center justify-between bg-white">
              <div className="flex w-full flex-col">
                <input
                  className="w-full appearance-none bg-transparent text-xl text-black outline-none placeholder:text-black"
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      search();
                    }
                  }}
                  autoFocus
                />
                <hr className="mt-2 border-black" />
              </div>
              <button className="p-2">
                <Search
                  className="h-5 w-5 text-black"
                  onClick={() => {
                    search();
                  }}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
