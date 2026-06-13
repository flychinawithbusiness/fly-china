"use client";

import FadeIn from "@/components/ui/FadeIn";

const steps = [
  { num: "01", icon: "📋", title: "Inquire", desc: "Fill our form or WhatsApp us with your preferred dates and group size." },
  { num: "02", icon: "📞", title: "Confirm", desc: "We call you to confirm trip details and arrange payment." },
  { num: "03", icon: "✈️", title: "Fly", desc: "We handle everything. You just show up at the airport." },
  { num: "04", icon: "🛍️", title: "Source", desc: "Shop Guangzhou's markets with your dedicated guide beside you." },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#F8F9FB] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest text-gold uppercase font-body font-semibold">
              The Process
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
              How It Works
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="absolute hidden md:block top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.15}>
              <div className="text-center relative z-10">
                <div
                  className="w-16 h-16 rounded-full bg-[#1C3A6B] text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#1C3A6B]/20"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                  }}
                >
                  {step.num}
                </div>
                <div className="text-2xl mb-3">{step.icon}</div>
                <h3 className="font-body font-bold text-gray-900 text-base mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-gray-500 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
