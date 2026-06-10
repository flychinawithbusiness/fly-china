"use client";

import { motion } from "framer-motion";

type Pkg = {
  id: string;
  duration: number;
  price: string;
  isPopular: boolean;
  inclusions: string[];
};

export default function TourPackageCards({ packages }: { packages: Pkg[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {packages.map((pkg, i) => (
        <motion.div
          key={pkg.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition relative"
        >
          {pkg.isPopular && (
            <span className="absolute top-4 right-4 bg-[#1C3A6B] text-white text-xs font-semibold px-3 py-1 rounded-full">
              Most Popular
            </span>
          )}

          <span className="inline-block bg-[#F5C200] text-[#1C3A6B] font-bold rounded-full px-5 py-1.5 text-lg mb-6">
            {pkg.duration} Days
          </span>

          <ul className="space-y-3">
            {pkg.inclusions.map((item) => (
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
            From {pkg.price} BDT
          </p>
          <p className="text-gray-400 text-xs mb-6">per person, all inclusive</p>

          <a
            href="#contact"
            className="block w-full text-center bg-[#1C3A6B] text-white rounded-full py-3 font-semibold hover:bg-navy-light transition"
          >
            Get a Quote
          </a>
        </motion.div>
      ))}
    </div>
  );
}
