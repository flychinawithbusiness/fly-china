"use client";

import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";

const CATEGORIES = [
  {
    emoji: "🏭",
    title: "Electronics & Technology",
    description:
      "Huaqiangbei Electronics Market — the world's largest electronics components market. Perfect for phones, accessories, gadgets, and components.",
    popular: "Huaqiangbei North Road",
  },
  {
    emoji: "👗",
    title: "Clothing & Fashion",
    description:
      "Shahe and Zhanxi clothing markets — thousands of stalls with the latest fashion at wholesale prices. Ideal for fashion retailers.",
    popular: "Shahe Fashion Street, Zhanxi Road",
  },
  {
    emoji: "💍",
    title: "Accessories & Jewelry",
    description:
      "Liwan Plaza and surrounding areas — China's leading wholesale jewelry and accessories market.",
    popular: "Liwan Plaza, Changshou Road",
  },
  {
    emoji: "🏠",
    title: "Home & Furniture",
    description:
      "Lecong furniture market — one of the world's largest furniture wholesale centers. Great for home goods importers.",
    popular: "Lecong Furniture Market",
  },
  {
    emoji: "🛍️",
    title: "General Merchandise",
    description:
      "Yide Road market — everything from toys to stationery, daily necessities and novelty items at rock-bottom prices.",
    popular: "Yide Road, Jiangnan Market",
  },
  {
    emoji: "🧴",
    title: "Beauty & Cosmetics",
    description:
      "Guangzhou's beauty market — wholesale skincare, makeup, and hair products. China's cosmetics capital.",
    popular: "Baiyun World Leather Trade Center area",
  },
];

const TIPS = [
  { emoji: "💬", title: "Language", text: "Our guide handles all negotiations in Mandarin. You point, we talk." },
  { emoji: "💵", title: "Payment", text: "Bring cash (RMB) or WeChat Pay. Most vendors don't accept cards." },
  { emoji: "🕐", title: "Timing", text: "Markets open early (8am). Arrive early for the best deals and less crowd." },
  { emoji: "🧳", title: "Packing", text: "Bring empty suitcases or arrange shipping — you'll buy more than expected!" },
];

function CategoryCard({
  cat,
}: {
  cat: { emoji: string; title: string; description: string; popular: string };
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-2xl p-7 h-full"
      style={{
        border: "1px solid rgba(28,58,107,0.07)",
        boxShadow: hovered
          ? "0 20px 40px rgba(28,58,107,0.12)"
          : "0 4px 16px rgba(28,58,107,0.06)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="text-4xl mb-4">{cat.emoji}</div>
      <h3 className="font-body font-semibold text-navy text-lg mb-2">
        {cat.title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-3">
        {cat.description}
      </p>
      <span className="inline-flex items-center gap-1 text-xs font-medium bg-gold/10 text-[#1C3A6B] px-2.5 py-1 rounded-full">
        📍 {cat.popular}
      </span>
    </div>
  );
}

function TipCard({
  tip,
}: {
  tip: { emoji: string; title: string; text: string };
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl p-6 bg-white/5"
      style={{
        border: hovered
          ? "1px solid rgba(245,194,0,0.3)"
          : "1px solid rgba(255,255,255,0.1)",
        boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.25)" : "none",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="text-[#F5C200] text-4xl mb-4">{tip.emoji}</div>
      <h3 className="text-white font-semibold text-lg mb-2">{tip.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{tip.text}</p>
    </div>
  );
}

export default function MarketsContent() {
  return (
    <>
      {/* Categories */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-light text-[#1C3A6B] text-center mb-12">
              Markets by Product Category
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, i) => (
              <FadeIn key={cat.title} delay={i * 0.1}>
                <CategoryCard cat={cat} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="bg-[#0A1628] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-light text-white text-center mb-12">
              Buying Tips for First-Time Visitors
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TIPS.map((tip, i) => (
              <FadeIn key={tip.title} delay={i * 0.1}>
                <TipCard tip={tip} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
