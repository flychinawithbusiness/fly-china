"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/packages" },
  { label: "Markets", href: "/markets" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // The homepage has a LIGHT video hero (needs dark links); inner pages have a
  // dark hero (need light links). Once scrolled, the bar is dark either way.
  const isHome = pathname === "/";
  const lightText = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0A1628]/95 backdrop-blur-md shadow-sm" : ""
      }`}
      style={
        scrolled
          ? undefined
          : {
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
            }
      }
    >
      <nav
        className="max-w-7xl mx-auto flex items-center justify-between"
        style={{ padding: "0.75rem 2rem" }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/logo.png"
            alt="Fly China"
            width={140}
            height={40}
            style={{ objectFit: "contain" }}
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                lightText
                  ? "text-white/80 hover:text-white"
                  : "text-gray-800 hover:text-[#1C3A6B]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-block bg-[#F5C200] text-[#0A1628] font-bold rounded-full px-5 py-2 text-sm hover:bg-[#D4A800] transition"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden p-1 ${
            lightText && !open ? "text-white" : "text-gray-800"
          }`}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0A1628]/96 backdrop-blur-md shadow-lg p-4 rounded-b-2xl">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 border-b border-white/10 last:border-none text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 block text-center bg-[#F5C200] text-[#0A1628] font-bold rounded-full px-5 py-2.5 text-sm hover:bg-[#D4A800] transition"
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
