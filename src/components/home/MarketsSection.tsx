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
  border: "1px solid rgba(28,58,107,0.07)",
  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
};
const hoverStyle: React.CSSProperties = {
  boxShadow: "0 20px 40px rgba(28,58,107,0.15)",
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
      className="bg-white rounded-2xl p-6 hover:bg-[#1C3A6B] group cursor-pointer h-full"
      style={{ ...baseStyle, ...(hovered ? hoverStyle : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="text-3xl mb-3">{market.emoji}</div>
      <h3 className="font-body font-semibold text-gray-900 group-hover:text-white mb-1 transition-colors">
        {market.name}
      </h3>
      <p className="text-gray-500 text-xs group-hover:text-white/70 transition-colors leading-relaxed mb-3">
        {market.desc}
      </p>
      <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-gold/10 text-[#1C3A6B] group-hover:bg-white/10 group-hover:text-white px-2 py-1 rounded-full transition-all">
        📍 {market.location}
      </span>
    </div>
  );
}

export default function MarketsSection() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest text-gold uppercase font-body font-semibold">
              Guangzhou Markets
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
              What You&apos;ll Discover
            </h2>
            <p className="text-gray-500 font-body max-w-2xl mx-auto mt-3">
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
