"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: "✈",
    title: "Full Package Included",
    text: "Flights, hotel, food, and local transport — all in one price.",
  },
  {
    icon: "👤",
    title: "Dedicated Tour Guide",
    text: "An experienced guide with every group throughout the trip.",
  },
  {
    icon: "🏪",
    title: "Top Wholesale Markets",
    text: "Access to Guangzhou's best wholesale markets for every product category.",
  },
  {
    icon: "💰",
    title: "Best Value Tours",
    text: "Complete 7-day packages from 1 Lakh BDT. Transparent pricing.",
  },
];

export default function WhyFlyChina() {
  return (
    <section id="about" className="bg-[#0A1628] py-24 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-light text-white mb-4"
        >
          Why Choose Fly China?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-400 mb-16"
        >
          Everything handled. You just show up and shop.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border border-[#F5C200]/20 rounded-2xl p-6 hover:border-[#F5C200]/50 transition-all duration-300 bg-white/5 text-left"
            >
              <div className="text-[#F5C200] text-4xl mb-4">{f.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {f.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
