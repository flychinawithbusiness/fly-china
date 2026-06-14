import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatWidget from "@/components/layout/FloatWidget";
import { prisma } from "@/lib/prisma";

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
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
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/images/logo.png", sizes: "192x192" },
    ],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const analyticsItems = await prisma.contactInfo.findMany({
    where: { key: { in: ["gtm_id", "meta_pixel_id", "ga4_id"] } },
  });
  const getA = (key: string) =>
    analyticsItems.find((i) => i.key === key)?.value ?? "";
  const gtmId = getA("gtm_id");
  const pixelId = getA("meta_pixel_id");
  const ga4Id = getA("ga4_id");

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen flex flex-col font-sans">
        {/* GTM noscript fallback */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        {/* Google Tag Manager */}
        {gtmId && (
          <Script
            id="gtm-head"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}

        {/* Meta Pixel */}
        {pixelId && (
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '${pixelId}');fbq('track', 'PageView');`,
            }}
          />
        )}

        {/* Google Analytics 4 */}
        {ga4Id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${ga4Id}');`,
              }}
            />
          </>
        )}

        <SiteShell
          navbar={<Navbar />}
          footer={<Footer />}
          floatWidget={<FloatWidget />}
        >
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
