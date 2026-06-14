"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { number: "500+", label: "Happy Clients" },
  { number: "100+", label: "Tours Completed" },
  { number: "7+", label: "Years Experience" },
  { number: "15+", label: "Markets Covered" },
];

export default function StatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-[#0A1628] py-14 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`text-center px-4 ${
              i < stats.length - 1 ? "border-r border-white/10" : ""
            }`}
          >
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
                color: "var(--gold)",
                lineHeight: 1,
              }}
            >
              {stat.number}
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: "0.25rem",
              }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
