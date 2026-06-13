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

function Inclusions({
  items,
  variant,
}: {
  items: string[];
  variant: "featured" | "plain";
}) {
  const itemClass =
    variant === "featured"
      ? "text-white/70 border-white/10"
      : "text-gray-600 border-gray-100";
  return (
    <ul>
      {items.map((item) => (
        <li
          key={item}
          className={`flex gap-2 text-sm py-1.5 border-b last:border-b-0 ${itemClass}`}
        >
          <span className="text-gold font-bold">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function FeaturedCard({ pkg }: { pkg: Pkg }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "linear-gradient(135deg, #1C3A6B 0%, #0A1628 100%)",
        borderRadius: 24,
        overflow: "hidden",
        boxShadow:
          "0 24px 48px rgba(28,58,107,0.35), 0 8px 16px rgba(0,0,0,0.15)",
        transform: hovered
          ? "translateY(-10px) scale(1.02)"
          : "translateY(0) scale(1)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative",
      }}
      className="h-full flex flex-col"
    >
      {/* Gold glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 24,
          background:
            "radial-gradient(circle at 50% 0%, rgba(245,194,0,0.15) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="px-8 pt-8 pb-6">
          {pkg.isPopular && (
            <span className="inline-flex bg-gold text-navy-dark text-xs font-bold px-3 py-1 rounded-full mb-4">
              Most Popular
            </span>
          )}
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "3rem",
              color: "#fff",
              lineHeight: 1,
            }}
          >
            {pkg.duration} Days
          </div>
          <p className="text-white/70 text-sm mt-2 font-body">
            From {pkg.price} BDT
          </p>
        </div>
        <div className="px-8 pb-8 flex-1">
          <Inclusions items={pkg.inclusions} variant="featured" />
        </div>
        <Link
          href="/contact"
          className="mx-8 mb-8 rounded-full bg-gold text-navy-dark font-bold py-3 text-center text-sm hover:bg-yellow-400 transition font-body"
        >
          Get a Quote
        </Link>
      </div>
    </div>
  );
}

function PlainCard({ pkg }: { pkg: Pkg }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        borderRadius: 24,
        overflow: "hidden",
        border: "1px solid rgba(28,58,107,0.08)",
        boxShadow: hovered
          ? "0 24px 48px rgba(28,58,107,0.15), 0 8px 16px rgba(0,0,0,0.08)"
          : "0 8px 24px rgba(28,58,107,0.08), 0 2px 8px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="h-full flex flex-col"
    >
      <div className="px-8 pt-8 pb-6 border-b border-gray-100">
        <span
          className="inline-flex bg-[#1C3A6B]/[0.08] text-[#1C3A6B] font-bold px-4 py-1.5 rounded-full mb-3"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "1.5rem",
          }}
        >
          {pkg.duration} Days
        </span>
        <p className="text-[#1C3A6B] font-body text-sm">From {pkg.price} BDT</p>
      </div>
      <div className="px-8 pb-8 pt-6 flex-1">
        <Inclusions items={pkg.inclusions} variant="plain" />
      </div>
      <Link
        href="/contact"
        className="mx-8 mb-8 rounded-full bg-[#1C3A6B] text-white font-bold py-3 text-center text-sm hover:bg-[#2A5099] transition font-body"
      >
        Get a Quote
      </Link>
    </div>
  );
}

export default function PackageCards({ packages }: { packages: Pkg[] }) {
  return (
    <section className="bg-[#F8F9FB] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest text-gold uppercase font-body font-semibold">
              Our Packages
            </p>
            <h2
              className="text-navy mt-3"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 1.1,
              }}
            >
              Choose Your Tour
            </h2>
            <p className="text-gray-500 font-body mt-3 max-w-2xl mx-auto">
              All packages include flights, hotel, food, transport, and a
              dedicated guide.
            </p>
          </div>
        </FadeIn>

        {packages.length === 0 ? (
          <p className="text-center text-gray-400 font-body">
            Tour packages coming soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, i) => (
              <FadeIn key={pkg.id} delay={i * 0.15}>
                {i === 0 ? (
                  <FeaturedCard pkg={pkg} />
                ) : (
                  <PlainCard pkg={pkg} />
                )}
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
