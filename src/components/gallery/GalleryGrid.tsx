"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type GalleryImage = {
  id: string;
  url: string;
  alt: string;
  category: string;
};

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState("All");

  // Build the filter list from the categories actually present in the data.
  const filters = [
    "All",
    ...Array.from(new Set(images.map((img) => img.category))),
  ];

  const filtered =
    active === "All"
      ? images
      : images.filter((img) => img.category === active);

  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                active === f
                  ? "bg-[#1C3A6B] text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#1C3A6B]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-3">
                  <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {img.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
