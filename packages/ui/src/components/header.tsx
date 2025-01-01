'use client';

import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Left Menu */}
          <div className="hidden space-x-8 md:flex">
            <Link href="#" className="text-gray-800 hover:text-gray-900">Projects</Link>
            <Link href="#" className="text-gray-800 hover:text-gray-900">Products</Link>
          </div>

          {/* Center Logo */}
          <div className="flex justify-center">
            <img src="/path/to/logo.svg" alt="near Logo" className="h-8" />
          </div>

          {/* Right Menu */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link href="#" className="text-gray-800 hover:text-gray-900">About Us</Link>
            <Link href="#" className="text-gray-800 hover:text-gray-900">Contact</Link>
            <Button>Get a Quote</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">

            <button
              onClick={toggleMobileMenu}
              className="text-gray-800 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen
                ? (
                    <X className="size-6" />
                  )
                : (
                    <Menu className="size-6" />
                  )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } fixed right-0 top-0 z-50 h-screen w-full bg-white shadow transition-transform duration-300 ease-in-out md:hidden`}
        >
          <div className="p-4">
            <button
              onClick={toggleMobileMenu}
              className="absolute right-4 top-4 text-gray-800 hover:text-gray-900 focus:outline-none"
            >
              <X className="size-6" />
            </button>
            <div>
              <Link href="/projects" className="block text-gray-800 hover:text-gray-900">Projects</Link>
              <Link href="/projects" className="block text-gray-800 hover:text-gray-900">Projects</Link>
              <Link href="#" className="block text-gray-800 hover:text-gray-900">Products</Link>
              <Link href="#" className="block text-gray-800 hover:text-gray-900">About Us</Link>
              <Link href="#" className="block text-gray-800 hover:text-gray-900">Contact</Link>
              <Button className="w-full">Get a Quote</Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
