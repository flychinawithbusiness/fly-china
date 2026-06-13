"use client";

import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";

const testimonials = [
  {
    name: "Rahim Ahmed",
    country: "Bangladesh",
    text: "Fly China made our sourcing trip completely hassle-free. The guide knew every market and helped us negotiate great prices. Highly recommended!",
    stars: 5,
  },
  {
    name: "Sarah Johnson",
    country: "United Kingdom",
    text: "Outstanding service from start to finish. The team handled all logistics perfectly and we discovered amazing wholesale deals in Guangzhou.",
    stars: 5,
  },
  {
    name: "Mohammad Al-Rashid",
    country: "Saudi Arabia",
    text: "Best investment for our business. The package covered everything and our guide was incredibly knowledgeable about every market.",
    stars: 5,
  },
];

const baseStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid rgba(28,58,107,0.07)",
  boxShadow: "0 4px 20px rgba(28,58,107,0.07)",
  transition: "all 0.3s ease",
};
const hoverStyle: React.CSSProperties = {
  boxShadow: "0 16px 40px rgba(28,58,107,0.1)",
  transform: "translateY(-4px)",
};

function TestimonialCard({
  t,
}: {
  t: { name: string; country: string; text: string; stars: number };
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="bg-white rounded-2xl p-7 h-full flex flex-col"
      style={{ ...baseStyle, ...(hovered ? hoverStyle : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="text-gold text-sm mb-4">{"⭐".repeat(t.stars)}</div>
      <p className="font-body text-gray-600 text-sm leading-relaxed italic mb-5 flex-1">
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#1C3A6B] text-white font-bold text-sm flex items-center justify-center shrink-0">
          {t.name.charAt(0)}
        </div>
        <div>
          <p className="font-body font-semibold text-gray-900 text-sm">
            {t.name}
          </p>
          <p className="text-gray-400 text-xs">{t.country}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-[#F8F9FB] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest text-gold uppercase font-body font-semibold">
              Testimonials
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
              What Our Clients Say
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <TestimonialCard t={t} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
