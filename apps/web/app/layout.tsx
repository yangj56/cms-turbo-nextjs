import "./globals.css";
import { Poppins } from "next/font/google";

import type { Metadata } from "next";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { findProductHeader } from "@/actions/find-product-header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Honest lighting",
  description: "Whole Home Lighting at Honest Prices",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.ReactNode> {
  const data = await findProductHeader();
  return (
    <html lang="en">
      <body>
        <main className={`${poppins.className} font-sans font-normal`}>
          <div className="flex min-h-screen w-full flex-col items-center">
            <Header data={data} />
            {children}
            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}
