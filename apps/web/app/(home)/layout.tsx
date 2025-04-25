"use client";

import type { ReactNode } from "react";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { useMyContext } from "@/context";
type PageLayoutProps = {
  children: ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  const sortedData = useMyContext();
  return (
    <div className="relative flex w-full flex-col items-center justify-center pt-0">
      <Header data={sortedData} />
      <div className="relative flex w-full flex-col items-center justify-center pt-0">
        {children}
      </div>
      <Footer data={sortedData} />
    </div>
  );
}
