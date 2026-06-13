"use client";

import { usePathname } from "next/navigation";

export default function SiteShell({
  navbar,
  footer,
  floatWidget,
  children,
}: {
  navbar: React.ReactNode;
  footer: React.ReactNode;
  floatWidget: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  // The homepage hero renders its own built-in navbar.
  const isHome = pathname === "/";

  // Admin routes render without the public navbar/footer.
  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {!isHome && navbar}
      {children}
      {footer}
      {floatWidget}
    </>
  );
}
