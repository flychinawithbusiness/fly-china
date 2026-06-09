"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Do I need a visa to visit China?",
    a: "Yes, Bangladeshi passport holders require a Chinese visa. We can guide you through the visa application process and provide all necessary support documents. Visa fees are not included in the tour package.",
  },
  {
    q: "What is included in the tour price?",
    a: "The tour price includes: return flights (Dhaka-Guangzhou-Dhaka), all hotel accommodation, all meals (breakfast, lunch, dinner), all local transport in Guangzhou, a dedicated bilingual guide, and guided visits to wholesale markets.",
  },
  {
    q: "How much budget should I bring for shopping?",
    a: "Your shopping budget is entirely separate from the tour cost. This depends on your business needs. Most buyers bring between $2,000-$10,000 USD equivalent. We recommend bringing a mix of cash (RMB) and having WeChat Pay set up if possible.",
  },
  {
    q: "What language does the guide speak?",
    a: "Our guides speak Bangla and English, and are native Mandarin speakers. They handle all market negotiations and translations on your behalf.",
  },
  {
    q: "Can I buy and ship goods back to Bangladesh?",
    a: "Yes! Guangzhou has many experienced freight forwarders who regularly ship to Bangladesh. Your guide can connect you with reliable shipping agents at competitive rates.",
  },
  {
    q: "How many people are in each tour group?",
    a: "Our tour groups typically have 6-15 people. Smaller groups get more personalized attention from the guide. We also offer private tours for groups with specific needs.",
  },
  {
    q: "When is the best time to visit Guangzhou markets?",
    a: "The markets operate year-round, but the best times are outside the major Chinese holidays (avoid Chinese New Year in Jan/Feb and Golden Week in Oct). The Canton Fair (April and October) brings extra activity but also more crowds.",
  },
  {
    q: "Is the tour price negotiable?",
    a: "Our prices are fixed and transparent. The listed price covers everything included in the package. We do not charge any hidden fees. Contact us to discuss group discounts for 10+ people.",
  },
  {
    q: "How do I confirm my booking?",
    a: "Send us an inquiry via the contact form or WhatsApp. Our team will call you to discuss your requirements, then provide a booking confirmation once the advance payment is received.",
  },
  {
    q: "What if I need to cancel or change my dates?",
    a: "We understand plans change. Contact us as soon as possible if you need to modify your booking. Cancellation policies depend on how far in advance you cancel. Details will be provided in your booking confirmation.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="border-b border-gray-100 py-5">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex justify-between items-center cursor-pointer text-left gap-4"
                aria-expanded={isOpen}
              >
                <span className="font-medium text-gray-800 text-base">
                  {faq.q}
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
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-600 text-sm leading-relaxed pt-3 pb-1">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
