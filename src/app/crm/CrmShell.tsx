"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { crmSignOut } from "./actions";

const navItems = [
  { href: "/crm", label: "Dashboard", icon: "📊" },
  { href: "/crm/customers", label: "Customers", icon: "👤" },
  { href: "/crm/bookings", label: "Bookings", icon: "📋" },
  { href: "/crm/payments", label: "Payments", icon: "💰" },
  { href: "/crm/guides", label: "Guides", icon: "🧭" },
  { href: "/crm/hotels", label: "Hotels", icon: "🏨" },
  { href: "/crm/employees", label: "Employees", icon: "👥" },
];

export default function CrmShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8F9FB" }}>
      {/* SIDEBAR */}
      <aside
        style={{
          width: collapsed ? 64 : 240,
          background: "linear-gradient(180deg, #0A1628 0%, #1C3A6B 100%)",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s ease",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: collapsed ? "1.25rem 0" : "1.25rem 1.25rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
          }}
        >
          {!collapsed && (
            <Image
              src="/images/logo.png"
              alt="FlyChina"
              width={100}
              height={28}
              style={{ objectFit: "contain" }}
            />
          )}
          <button
            onClick={() => setCollapsed((v) => !v)}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: 8,
              width: 32,
              height: 32,
              color: "white",
              cursor: "pointer",
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        {/* Label */}
        {!collapsed && (
          <div
            style={{
              padding: "0.75rem 1.25rem",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              fontFamily: "var(--font-body)",
            }}
          >
            CRM Portal
          </div>
        )}

        {/* Nav */}
        <nav
          style={{
            flex: 1,
            padding: "0.5rem 0.75rem",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/crm" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: collapsed ? "0.7rem 0" : "0.7rem 0.875rem",
                  borderRadius: 10,
                  textDecoration: "none",
                  justifyContent: collapsed ? "center" : "flex-start",
                  background: active ? "rgba(245,194,0,0.12)" : "transparent",
                  borderLeft: active
                    ? "3px solid #F5C200"
                    : "3px solid transparent",
                  transition: "all 0.2s",
                }}
              >
                <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      fontWeight: active ? 600 : 400,
                      color: active ? "#F5C200" : "rgba(255,255,255,0.7)",
                    }}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div
          style={{
            padding: "0.75rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <form action={crmSignOut}>
            <button
              type="submit"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.06)",
                border: "none",
                borderRadius: 10,
                padding: collapsed ? "0.7rem 0" : "0.7rem 0.875rem",
                color: "rgba(255,255,255,0.5)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: collapsed ? "center" : "flex-start",
                gap: "0.75rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
              }}
            >
              <span>🚪</span>
              {!collapsed && "Sign Out"}
            </button>
          </form>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
