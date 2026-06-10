"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      style={{
        height: "100vh",
        minHeight: 640,
        position: "relative",
        overflow: "hidden",
        background: "#1a0a00",
      }}
    >
      {/* LAYER 1: Warm dramatic sky background */}
      <Image
        src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&q=80"
        alt="Sky"
        fill
        priority
        style={{ objectFit: "cover", zIndex: 1, opacity: 0.85 }}
      />

      {/* Dark gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* LAYER 2: HUGE background text — BEHIND plane */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 3,
          fontFamily: "var(--font-display)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div
          style={{
            fontSize: "clamp(7rem, 22vw, 22rem)",
            color: "rgba(255,255,255,0.15)",
            letterSpacing: "-0.03em",
            whiteSpace: "nowrap",
          }}
        >
          FLY CHINA
        </div>
      </div>

      {/* LAYER 3: PLANE — in front of text */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          bottom: "8%",
          left: "-5%",
          width: "80%",
          zIndex: 10,
        }}
      >
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/plane.png"
            alt="China Southern Airlines"
            width={1400}
            height={787}
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
            priority
          />
        </motion.div>
      </motion.div>

      {/* LAYER 4: Cloud overlays for depth */}
      {/* Cloud left-bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "0%",
          left: "-5%",
          width: "50%",
          height: "45%",
          zIndex: 12,
          background:
            "radial-gradient(ellipse 80% 60% at 30% 80%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)",
          filter: "blur(8px)",
          pointerEvents: "none",
        }}
      />
      {/* Cloud right-bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          right: "5%",
          width: "35%",
          height: "35%",
          zIndex: 12,
          background:
            "radial-gradient(ellipse 70% 50% at 70% 70%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 50%, transparent 70%)",
          filter: "blur(12px)",
          pointerEvents: "none",
        }}
      />

      {/* LAYER 5: Foreground content — tagline + CTA */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          padding: "6rem 5% 0",
          textAlign: "center",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            color: "#F5C200",
            textTransform: "uppercase",
            marginBottom: "1rem",
            fontFamily: "var(--font-body)",
          }}
        >
          China Wholesale Market Tours
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 4.5rem)",
            color: "#ffffff",
            margin: 0,
            lineHeight: 1,
          }}
        >
          Explore the China Business Markets with Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.9rem",
            maxWidth: 420,
            margin: "1rem auto 2rem",
            lineHeight: 1.6,
            fontFamily: "var(--font-body)",
          }}
        >
          Flights, hotels, food, transport &amp; personal guide — all handled.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          style={{ display: "flex", gap: 12, justifyContent: "center" }}
        >
          <a
            href="/packages"
            style={{
              padding: "0.7rem 1.75rem",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white",
              fontSize: "0.85rem",
              fontWeight: 500,
              textDecoration: "none",
              backdropFilter: "blur(8px)",
              background: "rgba(255,255,255,0.08)",
              fontFamily: "var(--font-body)",
            }}
          >
            Explore Packages
          </a>
          <a
            href="/contact"
            style={{
              padding: "0.7rem 1.75rem",
              borderRadius: 999,
              background: "#F5C200",
              color: "#1a0a00",
              fontSize: "0.85rem",
              fontWeight: 700,
              textDecoration: "none",
              fontFamily: "var(--font-body)",
            }}
          >
            Book a Tour ✈
          </a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "20%",
          zIndex: 15,
          pointerEvents: "none",
          background: "linear-gradient(transparent, rgba(26,10,0,0.8))",
        }}
      />
    </section>
  );
}
