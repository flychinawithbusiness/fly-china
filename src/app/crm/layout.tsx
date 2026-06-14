"use client";

import { usePathname } from "next/navigation";
import CrmShell from "./CrmShell";

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/crm/login") return <>{children}</>;
  return <CrmShell>{children}</CrmShell>;
}
