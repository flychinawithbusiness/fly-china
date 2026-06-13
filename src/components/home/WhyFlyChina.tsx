"use client";

import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";

const CARDS = [
  {
    icon: "✈️",
    title: "Full Package Included",
    desc: "Flights, hotel, food, and local transport — all in one price.",
  },
  {
    icon: "👤",
    title: "Expert Tour Guide",
    desc: "A dedicated bilingual guide accompanies every group throughout the trip.",
  },
  {
    icon: "🏪",
    title: "Top Wholesale Markets",
    desc: "Access to Guangzhou's biggest wholesale markets across every product category.",
  },
  {
    icon: "💰",
    title: "Best Value Tours",
    desc: "Complete 7-day packages from 1 Lakh BDT. Transparent pricing, no hidden fees.",
  },
];

const baseStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid rgba(28,58,107,0.07)",
  boxShadow: "0 4px 16px rgba(28,58,107,0.08), 0 1px 4px rgba(0,0,0,0.04)",
  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
};
const hoverStyle: React.CSSProperties = {
  boxShadow: "0 20px 40px rgba(28,58,107,0.12), 0 8px 16px rgba(0,0,0,0.08)",
  transform: "translateY(-8px)",
};

function WhyCard({
  card,
}: {
  card: { icon: string; title: string; desc: string };
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="bg-white rounded-2xl p-7 group h-full"
      style={{ ...baseStyle, ...(hovered ? hoverStyle : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-12 h-12 rounded-xl bg-[#1C3A6B]/[0.08] flex items-center justify-center mb-5 group-hover:bg-[#1C3A6B]/[0.15] transition-colors">
        <span className="text-2xl">{card.icon}</span>
      </div>
      <h3 className="font-body font-semibold text-gray-900 text-lg mb-2">
        {card.title}
      </h3>
      <p className="font-body text-gray-500 text-sm leading-relaxed">
        {card.desc}
      </p>
      <div className="mt-5 h-0.5 w-8 bg-gold opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

export default function WhyFlyChina() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest text-gold uppercase font-body font-semibold">
              Why Choose Us
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
              Everything Handled.
            </h2>
            <p className="text-gray-500 font-body mt-3">
              You just show up and shop.
            </p>
          </div>
        </FadeIn>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.1}>
              <WhyCard card={card} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
