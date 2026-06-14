"use client";

import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";

const markets = [
  { emoji: "📱", name: "Electronics", desc: "Phones, gadgets, components", location: "Huaqiangbei" },
  { emoji: "👗", name: "Clothing & Fashion", desc: "Latest fashion at wholesale prices", location: "Shahe & Zhanxi" },
  { emoji: "💍", name: "Accessories & Jewelry", desc: "Wholesale jewelry and accessories", location: "Liwan Plaza" },
  { emoji: "🏠", name: "Home & Furniture", desc: "World-class furniture wholesale", location: "Lecong Market" },
  { emoji: "🛍️", name: "General Merchandise", desc: "Toys, stationery, daily items", location: "Yide Road" },
  { emoji: "🧴", name: "Beauty & Cosmetics", desc: "Skincare, makeup, hair products", location: "Baiyun Area" },
];

const baseStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
};
const hoverStyle: React.CSSProperties = {
  background: "rgba(245,194,0,0.1)",
  boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
  transform: "translateY(-6px)",
};

function MarketCard({
  market,
}: {
  market: { emoji: string; name: string; desc: string; location: string };
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="rounded-2xl p-6 cursor-pointer h-full"
      style={{ ...baseStyle, ...(hovered ? hoverStyle : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="text-3xl mb-3">{market.emoji}</div>
      <h3 className="font-body font-semibold text-white mb-1">{market.name}</h3>
      <p
        className="text-xs leading-relaxed mb-3"
        style={{ color: "rgba(255,255,255,0.6)" }}
      >
        {market.desc}
      </p>
      <span
        className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full"
        style={{ background: "rgba(245,194,0,0.15)", color: "#F5C200" }}
      >
        📍 {market.location}
      </span>
    </div>
  );
}

export default function MarketsSection() {
  return (
    <section
      className="py-24 px-6"
      style={{
        background: "linear-gradient(135deg, #0A1628 0%, #1C3A6B 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <p
              className="text-xs tracking-widest uppercase font-body font-semibold"
              style={{ color: "rgba(245,194,0,0.8)" }}
            >
              Guangzhou Markets
            </p>
            <h2
              className="mt-3"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 1.1,
                color: "#ffffff",
              }}
            >
              What You&apos;ll Discover
            </h2>
            <p
              className="font-body max-w-2xl mx-auto mt-3"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Guangzhou is home to the world&apos;s largest concentration of
              wholesale markets.
            </p>
          </div>
        </FadeIn>

        {/* Market cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {markets.map((m, i) => (
            <FadeIn key={m.name} delay={i * 0.08}>
              <MarketCard market={m} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
