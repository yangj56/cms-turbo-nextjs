"use client";
import type React from "react";
import { createContext, useContext } from "react";
import type { ProductCategory } from "@/lib/payload-types";

const MyContext = createContext<ProductCategory[]>([]);

export function MyProvider({
	children,
	value,
}: {
	children: React.ReactNode;
	value: ProductCategory[];
}) {
	return (
		<MyContext.Provider value={value}>
			{children as React.ReactNode}
		</MyContext.Provider>
	) as React.ReactNode;
}

export function useMyContext() {
	return useContext(MyContext);
}
