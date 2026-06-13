"use client";

import { motion } from "framer-motion";

export default function CTASectionClient({
  whatsapp,
  phone,
}: {
  whatsapp: string;
  phone: string;
}) {
  const waDigits = whatsapp.replace(/\D/g, "");
  const phoneDigits = phone.replace(/\D/g, "");

  return (
    <section className="bg-[#1C3A6B] py-20 px-6 text-center relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(245,194,0,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(245,194,0,0.08) 0%, transparent 50%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="text-gold/60 text-xs tracking-widest uppercase font-body mb-4">
          Ready to Source?
        </p>
        <h2
          className="text-white mb-4"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.1,
          }}
        >
          Start Your China Journey Today
        </h2>
        <p className="text-white/50 font-body mb-10 text-base">
          Join 500+ satisfied buyers who trust Fly China for their sourcing
          trips.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          {waDigits && (
            <motion.a
              href={`https://wa.me/${waDigits}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.9rem 2rem",
                borderRadius: 999,
                background: "linear-gradient(135deg, #25D366, #1da851)",
                color: "#fff",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                boxShadow:
                  "0 8px 24px rgba(37,211,102,0.4), 0 2px 8px rgba(0,0,0,0.15)",
                transition: "box-shadow 0.3s ease",
                cursor: "pointer",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </motion.a>
          )}
          {phoneDigits && (
            <motion.a
              href={`tel:${phoneDigits}`}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.9rem 2rem",
                borderRadius: 999,
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                border: "2px solid rgba(255,255,255,0.25)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                cursor: "pointer",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 0 0 .01 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
              </svg>
              Call Us
            </motion.a>
          )}
        </div>
      </div>
    </section>
  );
}
