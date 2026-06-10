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
            marginTop: "-6rem",
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

          <h1
            style={{
              margin: 0,
              padding: 0,
              fontFamily: "var(--font-cormorant)",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#1C3A6B",
              maxWidth: 700,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Explore the China
            <br />
            Business Markets
            <br />
            <span style={{ color: "#F5C200" }}>with Us.</span>
          </h1>

          <p
            style={{
              fontSize: "0.95rem",
              color: "#4B5563",
              marginTop: "1.25rem",
              marginBottom: "1.75rem",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.01em",
            }}
          >
            Flights, hotel, food, transport &amp; guide — all included.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
            <Link
              href="/packages"
              style={{
                padding: "0.6rem 1.5rem",
                borderRadius: 999,
                background: "#F5C200",
                color: "#111827",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "0.85rem",
                fontFamily: "var(--font-body)",
              }}
              className="hover:bg-yellow-400 transition-colors"
            >
              Explore Packages
            </Link>

            <Link
              href="/contact"
              style={{
                padding: "0.6rem 1.5rem",
                borderRadius: 999,
                background: "#1C3A6B",
                color: "#ffffff",
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
