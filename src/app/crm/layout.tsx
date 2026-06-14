import type { ReactNode } from "react";

// Nested layout only — the root app/layout.tsx already provides <html>/<body>.
// SiteShell skips the public navbar/footer/widget for /crm routes.
export default function CrmLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FB" }}>{children}</div>
  );
}
