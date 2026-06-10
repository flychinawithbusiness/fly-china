"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      style={{
        background:
          "linear-gradient(180deg, #04080F 0%, #0A1628 50%, #0D1F3C 100%)",
        height: "100vh",
        minHeight: 600,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Cloud layer 1 - slow, behind plane */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: 0,
          width: "200%",
          height: "40%",
          backgroundImage:
            "radial-gradient(ellipse 300px 80px at 25% 50%, rgba(255,255,255,0.04) 0%, transparent 70%), radial-gradient(ellipse 200px 60px at 75% 60%, rgba(255,255,255,0.03) 0%, transparent 70%)",
          backgroundSize: "800px 100%",
          animation: "cloudMove 40s linear infinite",
          zIndex: 1,
        }}
      />

      {/* Cloud layer 2 - faster, foreground */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          width: "200%",
          height: "30%",
          backgroundImage:
            "radial-gradient(ellipse 400px 100px at 20% 50%, rgba(255,255,255,0.05) 0%, transparent 70%), radial-gradient(ellipse 250px 70px at 65% 40%, rgba(255,255,255,0.04) 0%, transparent 70%)",
          backgroundSize: "1000px 100%",
          animation: "cloudMove 25s linear infinite",
          zIndex: 5,
        }}
      />

      {/* Plane */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        style={{
          position: "absolute",
          bottom: "5%",
          left: "-8%",
          width: "72%",
          zIndex: 10,
        }}
      >
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/plane.png"
            alt="China Southern Airlines"
            width={1100}
            height={620}
            className="object-contain w-full h-auto"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Text - right side */}
      <div
        style={{
          position: "absolute",
          right: "4%",
          top: "50%",
          transform: "translateY(-50%)",
          textAlign: "right",
          zIndex: 20,
          paddingTop: "5rem",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            color: "#F5C200",
            textTransform: "uppercase",
            marginBottom: "1rem",
            fontFamily: "var(--font-body)",
          }}
        >
          CHINA WHOLESALE MARKET TOURS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          style={{
            fontFamily: "var(--font-display)",
            lineHeight: 0.88,
            margin: 0,
            padding: 0,
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "clamp(3.5rem, 8vw, 7rem)",
              color: "rgba(255,255,255,0.15)",
            }}
          >
            EXPLORE
          </span>
          <span
            style={{
              display: "block",
              fontSize: "clamp(4.5rem, 10vw, 9.5rem)",
              color: "#ffffff",
            }}
          >
            CHINA
          </span>
          <span
            style={{
              display: "block",
              fontSize: "clamp(3rem, 7vw, 6.5rem)",
              color: "#F5C200",
            }}
          >
            BUSINESS
          </span>
          <span
            style={{
              display: "block",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            MARKETS
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: "0.85rem",
            maxWidth: 300,
            marginLeft: "auto",
            lineHeight: 1.7,
            marginTop: "1.5rem",
            marginBottom: "2rem",
            fontFamily: "var(--font-body)",
          }}
        >
          Explore the China business markets with us. Flights, hotels, transport
          &amp; personal guide — all handled.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/packages"
            style={{
              padding: "0.65rem 1.5rem",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.25)",
              color: "white",
              fontSize: "0.8rem",
              fontWeight: 500,
              textDecoration: "none",
              fontFamily: "var(--font-body)",
            }}
          >
            Explore Packages
          </a>
          <a
            href="/contact"
            style={{
              padding: "0.65rem 1.5rem",
              borderRadius: 999,
              background: "#F5C200",
              color: "#0A1628",
              fontSize: "0.8rem",
              fontWeight: 700,
              textDecoration: "none",
              fontFamily: "var(--font-body)",
            }}
          >
            Book a Tour ✈
          </a>
        </motion.div>
      </div>
    </section>
  );
}
