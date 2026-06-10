"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4"
          type="video/mp4"
        />
      </video>

      {/* HERO CONTENT */}
      <div
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginTop: "-18rem",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#4B5563",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "1rem",
              fontFamily: "var(--font-body)",
            }}
          >
            China Wholesale Market Tours
          </p>

          <h1 style={{ margin: 0, padding: 0, lineHeight: 1 }}>
            <span
              style={{
                display: "block",
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
                fontWeight: 300,
                color: "#6B7280",
                letterSpacing: "-0.04em",
                fontFamily: "var(--font-display)",
              }}
            >
              Explore.
            </span>
            <span
              style={{
                display: "block",
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
                fontWeight: 300,
                color: "#1C3A6B",
                letterSpacing: "-0.04em",
                marginTop: "-10px",
                fontFamily: "var(--font-display)",
              }}
            >
              China.
            </span>
          </h1>

          <p
            style={{
              fontSize: "1rem",
              color: "#4B5563",
              marginTop: "1.25rem",
              marginBottom: "1.75rem",
              maxWidth: 500,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.65,
              fontFamily: "var(--font-body)",
            }}
          >
            Explore the China business markets with us. Flights, hotel, food,
            transport &amp; guide — all included.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
            <Link
              href="/packages"
              style={{
                padding: "0.6rem 1.5rem",
                borderRadius: 999,
                background: "#E5E7EB",
                color: "#1F2937",
                fontWeight: 500,
                textDecoration: "none",
                fontSize: "0.85rem",
                fontFamily: "var(--font-body)",
              }}
              className="hover:bg-gray-300 transition-colors"
            >
              Explore Packages
            </Link>

            <Link
              href="/contact"
              style={{
                padding: "0.6rem 1.5rem",
                borderRadius: 999,
                background: "#1C3A6B",
                color: "#fff",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "0.85rem",
                fontFamily: "var(--font-body)",
              }}
              className="hover:bg-[#2A5099] transition-colors"
            >
              Book a Tour ✈
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
