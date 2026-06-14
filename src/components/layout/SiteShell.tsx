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
  // Admin and CRM portals render without the public navbar/footer/widget.
  const isBare =
    pathname?.startsWith("/admin") || pathname?.startsWith("/crm");
  // The homepage hero renders its own built-in navbar.
  const isHome = pathname === "/";

  if (isBare) {
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
