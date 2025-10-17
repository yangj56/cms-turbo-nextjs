import { Inter as FontSans } from "next/font/google";
import { cn } from "@/utilities/utils";
import "./globals.css";
import type React from "react";

type LayoutProps = {
	children: React.ReactNode;
};

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

const Layout = ({ children }: LayoutProps) => {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
				)}
			>
				{children}
			</body>
		</html>
	);
};

export default Layout;
