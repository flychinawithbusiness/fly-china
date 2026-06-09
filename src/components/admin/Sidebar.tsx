"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/packages", label: "Packages", icon: "✈️" },
  { href: "/admin/blog", label: "Blog Posts", icon: "📝" },
  { href: "/admin/gallery", label: "Gallery", icon: "🖼️" },
  { href: "/admin/faq", label: "FAQ", icon: "❓" },
  { href: "/admin/contact-info", label: "Contact Info", icon: "📞" },
  { href: "/admin/inquiries", label: "Inquiries", icon: "📋" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 w-64 bg-[#0A1628] h-screen flex flex-col z-40">
      {/* Top: logo + titles */}
      <div className="px-6 py-6 flex items-center gap-3 border-b border-white/10">
        <Image
          src="/images/logo.png"
          alt="Fly China"
          width={40}
          height={40}
          className="rounded-lg"
        />
        <div>
          <p className="text-white font-semibold leading-tight">Fly China</p>
          <p className="text-gray-400 text-xs">Admin Panel</p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition rounded-xl ${
                isActive
                  ? "bg-[#F5C200]/10 text-[#F5C200] border border-[#F5C200]/20"
                  : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
              }`}
            >
              <span className="text-base leading-none">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom: sign out */}
      <div className="px-4 py-6 border-t border-white/10">
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition"
        >
          <span className="text-base leading-none">🚪</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
