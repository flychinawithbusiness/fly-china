"use client";

import { motion } from "framer-motion";

const INCLUDED = [
  "Return Flights (Dhaka ↔ Guangzhou)",
  "Hotel Accommodation",
  "All Meals",
  "Local Transport",
  "Dedicated Tour Guide",
  "Market Visits",
];

const PACKAGES = [
  { duration: "7 Days", popular: true },
  { duration: "10 Days", popular: false },
  { duration: "14 Days", popular: false },
];

export default function TourPackagesPreview() {
  return (
    <section id="packages" className="bg-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light text-[#1C3A6B] text-center mb-4">
          Choose Your Tour
        </h2>
        <p className="text-gray-500 text-center mb-16 max-w-2xl mx-auto">
          All packages include flights, hotel, food, transport, and a dedicated
          guide.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.duration}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition relative"
            >
              {pkg.popular && (
                <span className="absolute top-4 right-4 bg-[#1C3A6B] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <span className="inline-block bg-[#F5C200] text-[#1C3A6B] font-bold rounded-full px-5 py-1.5 text-lg mb-6">
                {pkg.duration}
              </span>

              <ul className="space-y-3">
                {INCLUDED.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-gray-700 text-sm"
                  >
                    <span className="text-[#F5C200] font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-2xl font-bold text-[#1C3A6B] mt-6 mb-2">
                From 1,00,000 BDT
              </p>
              <p className="text-gray-400 text-xs mb-6">
                per person, all inclusive
              </p>

              <a
                href="#contact"
                className="block w-full text-center bg-[#1C3A6B] text-white rounded-full py-3 font-semibold hover:bg-navy-light transition"
              >
                Get a Quote
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
