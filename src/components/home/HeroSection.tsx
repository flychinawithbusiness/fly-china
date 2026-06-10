"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      style={{
        height: "100vh",
        minHeight: 600,
        position: "relative",
        overflow: "hidden",
        background: "#020B18",
      }}
    >
      {/* DRAMATIC SKY BACKGROUND */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1920&q=80"
          alt="Sky"
          fill
          className="object-cover"
          style={{ opacity: 0.5 }}
          priority
        />
        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(2,11,24,0.3) 0%, rgba(2,11,24,0.5) 50%, rgba(2,11,24,0.85) 100%)",
          }}
        />
      </div>

      {/* HUGE BACKGROUND TEXT — behind plane */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            textAlign: "center",
            lineHeight: 0.85,
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: "clamp(5rem, 16vw, 16rem)",
              color: "rgba(255,255,255,0.06)",
              letterSpacing: "-0.02em",
            }}
          >
            EXPLORE
          </div>
          <div
            style={{
              fontSize: "clamp(6rem, 20vw, 20rem)",
              color: "rgba(255,255,255,0.08)",
              letterSpacing: "-0.02em",
              marginTop: "-0.1em",
            }}
          >
            FLY CHINA
          </div>
          <div
            style={{
              fontSize: "clamp(3rem, 10vw, 10rem)",
              color: "rgba(245,194,0,0.12)",
              letterSpacing: "0.05em",
              marginTop: "-0.1em",
            }}
          >
            BUSINESS MARKETS
          </div>
        </div>
      </div>

      {/* PLANE — in front of background text, behind foreground text */}
      <motion.div
        initial={{ x: "-120%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: "absolute",
          bottom: "0%",
          left: "-10%",
          width: "85%",
          zIndex: 10,
        }}
      >
        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/plane.png"
            alt="China Southern Airlines"
            width={1400}
            height={800}
            className="object-contain w-full h-auto"
            priority
          />
        </motion.div>
      </motion.div>

      {/* FOREGROUND TEXT — in front of plane */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          paddingRight: "5%",
          paddingTop: "5rem",
          pointerEvents: "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{ textAlign: "right" }}
        >
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              color: "#F5C200",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
              fontFamily: "var(--font-body)",
            }}
          >
            China Wholesale Market Tours
          </p>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              lineHeight: 0.88,
              margin: 0,
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "clamp(3rem, 6vw, 6rem)",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              EXPLORE THE
            </span>
            <span
              style={{
                display: "block",
                fontSize: "clamp(3.5rem, 7vw, 7rem)",
                color: "#F5C200",
              }}
            >
              CHINA BUSINESS
            </span>
            <span
              style={{
                display: "block",
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              MARKETS WITH US
            </span>
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.85rem",
              maxWidth: 280,
              marginLeft: "auto",
              lineHeight: 1.7,
              marginTop: "1.25rem",
              marginBottom: "1.75rem",
              fontFamily: "var(--font-body)",
            }}
          >
            Flights, hotels, food, transport &amp; personal guide — all handled.
          </p>

          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "flex-end",
              pointerEvents: "all",
            }}
          >
            <a
              href="/packages"
              style={{
                padding: "0.65rem 1.5rem",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                fontSize: "0.8rem",
                fontWeight: 500,
                textDecoration: "none",
                fontFamily: "var(--font-body)",
                backdropFilter: "blur(8px)",
                background: "rgba(255,255,255,0.05)",
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
                color: "#020B18",
                fontSize: "0.8rem",
                fontWeight: 700,
                textDecoration: "none",
                fontFamily: "var(--font-body)",
              }}
            >
              Book a Tour ✈
            </a>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM GRADIENT FADE */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "25%",
          background: "linear-gradient(transparent, #020B18)",
          zIndex: 15,
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
