"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    icon: "📋",
    title: "Inquire",
    text: "Fill our form or WhatsApp us with your preferred dates.",
  },
  {
    icon: "📞",
    title: "Confirm",
    text: "We call you to confirm trip details and arrange payment.",
  },
  {
    icon: "✈️",
    title: "Fly",
    text: "We handle everything. You just arrive at the airport.",
  },
  {
    icon: "🛍️",
    title: "Source",
    text: "Shop Guangzhou's markets with your guide beside you.",
  },
];

export default function HowItWorks() {
  return (
    <section id="markets" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light text-[#1C3A6B] text-center mb-16">
          How It Works
        </h2>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 md:gap-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex-1 flex flex-col items-center text-center"
            >
              {/* Connecting dashed line (desktop only) */}
              {i < STEPS.length - 1 && (
                <span className="hidden md:block absolute top-6 left-1/2 w-full border-t-2 border-dashed border-[#F5C200]/40 -z-0" />
              )}

              <div className="relative z-10 bg-[#1C3A6B] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mb-5">
                {i + 1}
              </div>

              <div className="text-4xl mb-3">{step.icon}</div>
              <h3 className="text-[#1C3A6B] font-semibold text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[14rem]">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
