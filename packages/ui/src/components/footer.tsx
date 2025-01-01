'use client';

import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <img src="/path/to/logo.svg" alt="near Logo" className="mb-4 h-8" />
            <p className="text-gray-400">
              near is Australia's most respected architectural lighting brand.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="mr-2" size={18} />
                <a href="mailto:sales@near.com.au">sales@near.com.au</a>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2" size={18} />
                <a href="tel:1300669704">1300 669 704</a>
              </li>
              <li className="flex items-center">
                <MapPin className="mr-2" size={18} />
                <span>8-14 Monro Ave, Kirrawee NSW</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <ul>
              <li><Link href="/projects" className="hover:text-gray-300">Projects</Link></li>
              <li><Link href="/products" className="hover:text-gray-300">Products</Link></li>
              <li><Link href="/about-us" className="hover:text-gray-300">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Subscribe</h4>
            <p className="mb-4 text-gray-400">
              Subscribe to our newsletter to stay up to date on our latest offers!
            </p>
            <form>
              <div className="flex">
                <input
                  type="email"
                  className="w-full rounded-l bg-gray-800 px-4 py-2 text-white focus:outline-none"
                  placeholder="Enter your email"
                />
                <Button className="rounded-l-none">Subscribe</Button>
              </div>
            </form>
          </div>
        </div>
        <hr className="my-8 border-gray-700" />
        <p className="text-center text-sm text-gray-500">
          &copy;
          {' '}
          {new Date().getFullYear()}
          {' '}
          near. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
