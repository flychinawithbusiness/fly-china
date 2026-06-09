"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type GalleryImage = { src: string; alt: string; category: string };

const galleryImages: GalleryImage[] = [
  { src: "https://images.unsplash.com/photo-1518982380512-5a3b2f480027?w=800", alt: "Guangzhou skyline", category: "City" },
  { src: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800", alt: "Guangzhou market", category: "Markets" },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800", alt: "Group tour", category: "Tours" },
  { src: "https://images.unsplash.com/photo-1526958097901-5e6d742d3371?w=800", alt: "Wholesale shopping", category: "Shopping" },
  { src: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?w=800", alt: "Market stalls", category: "Markets" },
  { src: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800", alt: "China street food", category: "Food" },
  { src: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800", alt: "Hotel lobby", category: "Hotel" },
  { src: "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=800", alt: "Group at market", category: "Tours" },
  { src: "https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?w=800", alt: "Electronics market", category: "Markets" },
  { src: "https://images.unsplash.com/photo-1581453936558-1d20c1e5a3d8?w=800", alt: "Guangzhou food", category: "Food" },
  { src: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800", alt: "Business meeting", category: "Tours" },
  { src: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800", alt: "Shopping bags", category: "Shopping" },
];

const FILTERS = ["All", "Markets", "Tours", "Shopping", "Food", "Hotel", "City"];

export default function GalleryGrid() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === active);

  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {FILTERS.map((f) => (
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
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <Image
                  src={img.src}
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
