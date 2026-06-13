"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

type Faq = {
  id: string;
  question: string;
  answer: string;
};

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <FadeIn key={faq.id} delay={i * 0.05}>
              <div
                className="bg-white rounded-2xl mb-3 overflow-hidden"
                style={{
                  border: isOpen
                    ? "1px solid rgba(28,58,107,0.2)"
                    : "1px solid rgba(28,58,107,0.07)",
                  boxShadow: isOpen
                    ? "0 4px 16px rgba(28,58,107,0.08)"
                    : "0 2px 8px rgba(28,58,107,0.05)",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex justify-between items-center cursor-pointer text-left gap-4"
                  style={{ padding: "1.25rem 1.5rem" }}
                  aria-expanded={isOpen}
                >
                  <span className="font-body font-semibold text-gray-800 text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-[#1C3A6B] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p
                        className="text-gray-600 text-sm leading-relaxed font-body"
                        style={{ padding: "0 1.5rem 1.25rem" }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
