"use client";
import type { ProductCategory } from "@/lib/payload-types";
import { createContext, useContext } from "react";

const MyContext = createContext<ProductCategory[]>([]);

export function MyProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ProductCategory[];
}) {
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}

export function useMyContext() {
  return useContext(MyContext);
}
