"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  // Admin routes render without the public navbar/footer.
  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
