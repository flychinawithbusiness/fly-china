import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Fly China | Wholesale Tours to Guangzhou",
  description:
    "7, 10 and 14 day wholesale sourcing tours to Guangzhou China. Flights, hotel, food, transport and guide all included.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
