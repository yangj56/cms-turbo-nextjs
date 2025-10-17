"use client";

import { useMyContext } from "@/context";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";

type PageLayoutProps = {
	children: React.ReactNode;
};

export default function PageLayout({
	children,
}: PageLayoutProps): React.ReactNode {
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
