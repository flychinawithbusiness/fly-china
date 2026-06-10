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
  metadataBase: new URL("https://fly-china.vercel.app"),
  title: {
    default: "Fly China | China Business Market Tours",
    template: "%s | Fly China",
  },
  description:
    "Join guided business tours to China's wholesale markets. 7, 10 and 14 day packages from Bangladesh. Flights, hotel, food, transport and guide included.",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  keywords: [
    "China tour",
    "Guangzhou wholesale market",
    "sourcing trip China",
    "wholesale buying tour",
    "Guangzhou tour Bangladesh",
    "China business tour",
  ],
  openGraph: {
    title: "Fly China | Wholesale Sourcing Tours to Guangzhou",
    description:
      "Your complete guided sourcing trip to Guangzhou's wholesale markets.",
    url: "https://fly-china.vercel.app",
    siteName: "Fly China",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
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
