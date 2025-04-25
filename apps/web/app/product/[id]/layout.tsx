"use client";

import type { ReactNode } from "react";

import { useMyContext } from "@/context";
import { Header } from "@/app/_components/header";
import { Footer } from "@/app/_components/footer";
type PageLayoutProps = {
  children: ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  const sortedData = useMyContext();
  return (
    <div className="relative flex w-full flex-col items-center justify-center pt-0">
      <Header data={sortedData} sticky />
      <div className="relative flex w-full flex-col items-center justify-center pt-0">
        {children}
      </div>
      <Footer data={sortedData} />
    </div>
  );
}
