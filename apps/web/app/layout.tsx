import "./globals.css";
import { Nunito } from "next/font/google";

import type { Metadata } from "next";
import { findProductHeader } from "@/actions/find-product-header";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { MyProvider } from "@/context";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito-sans", // optional for Tailwind
  display: "swap",
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

  const sortedData = data.sort((a, b) => {
    // If both items have sequence, sort by sequence
    if (
      a.sequence !== undefined &&
      b.sequence !== undefined &&
      a.sequence !== null &&
      b.sequence !== null
    ) {
      return b.sequence - a.sequence;
    }

    // If only one has sequence, prioritize the item with sequence
    if (a.sequence !== undefined) return -1;
    if (b.sequence !== undefined) return 1;

    // If neither has sequence, sort by another criteria (e.g., title or date)
    return a.title.localeCompare(b.title);
  });

  return (
    <html lang="en">
      <body>
        <main className={`${nunito.className} font-normal`}>
          <div className="relative min-h-screen w-full">
            <MyProvider value={sortedData}>
              <NuqsAdapter>{children}</NuqsAdapter>
            </MyProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
