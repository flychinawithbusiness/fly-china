"use client";

import { useState } from "react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

type Pkg = {
  id: string;
  duration: number;
  price: string;
  isPopular: boolean;
  inclusions: string[];
};

function DetailCard({ pkg }: { pkg: Pkg }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-3xl overflow-hidden flex flex-col"
      style={{
        border: "1px solid rgba(28,58,107,0.07)",
        boxShadow: hovered
          ? "0 24px 48px rgba(28,58,107,0.16), 0 8px 16px rgba(0,0,0,0.08)"
          : "0 8px 32px rgba(28,58,107,0.08)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          background: "linear-gradient(135deg, #1C3A6B, #0A1628)",
          padding: "2rem 2.5rem",
        }}
      >
        <span
          className="inline-flex bg-gold text-navy-dark rounded-full px-5 py-2 mb-2"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "1.5rem",
          }}
        >
          {pkg.duration} Days
        </span>
        <p className="text-white/70 text-sm font-body mt-2">
          From {pkg.price} BDT · per person, all inclusive
        </p>
      </div>

      {/* Inclusions */}
      <div className="p-8 flex-1">
        <p className="text-xs tracking-widest uppercase text-gray-400 font-body mb-4">
          What&apos;s Included
        </p>
        <ul>
          {pkg.inclusions.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-b-0"
            >
              <span className="w-5 h-5 rounded-full bg-gold/10 text-gold flex items-center justify-center text-xs shrink-0">
                ✓
              </span>
              <span className="text-gray-700 text-sm font-body">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="px-8 pb-8">
        <Link
          href="/contact"
          className="block bg-gold text-navy-dark font-body font-bold rounded-full py-3.5 w-full text-center text-sm hover:bg-yellow-400 transition"
        >
          Book This Package
        </Link>
      </div>
    </div>
  );
}

export default function PackageDetail({ packages }: { packages: Pkg[] }) {
  if (packages.length === 0) {
    return (
      <p className="max-w-2xl mx-auto text-center text-gray-400 font-body">
        No packages available yet. Please check back soon.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
      {packages.map((pkg, i) => (
        <FadeIn key={pkg.id} delay={i * 0.15}>
          <DetailCard pkg={pkg} />
        </FadeIn>
      ))}
    </div>
  );
}
