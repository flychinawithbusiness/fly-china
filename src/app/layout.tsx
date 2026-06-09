import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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

// The footer (and several pages) read contact info, FAQs, and packages from the
// database, so the site renders dynamically to always reflect the latest
// admin-managed content and to avoid a build-time database dependency.
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <SiteShell navbar={<Navbar />} footer={<Footer />}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
