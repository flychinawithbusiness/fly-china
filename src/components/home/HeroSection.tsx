"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = ["Home", "Packages", "Markets", "Gallery", "About", "Contact"];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.3s, box-shadow 0.3s",
        ...(scrolled
          ? {
              background: "var(--navy-95)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 1px 3px rgba(10,22,40,0.2)",
            }
          : {
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
            }),
      }}
    >
      <nav
        style={{
          maxWidth: "var(--container)",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 2rem",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
        >
          <Image
            src="/images/logo.png"
            alt="FlyChina"
            width={56}
            height={56}
            style={{ borderRadius: 8 }}
          />
        </Link>

        {/* Desktop nav */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "2rem" }}
          className="fc-desktop-nav"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l}
              href={l === "Home" ? "/" : `/${l.toLowerCase()}`}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
                transition: "color 0.2s",
                color: scrolled ? "rgba(255,255,255,0.8)" : "var(--gray-800)",
              }}
            >
              {l}
            </Link>
          ))}
        </div>

        {/* Book Now */}
        <div className="fc-desktop-nav">
          <Link
            href="/contact"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              fontWeight: 700,
              textDecoration: "none",
              padding: "0.5rem 1.25rem",
              borderRadius: "var(--radius-pill)",
              background: "var(--gold)",
              color: "var(--navy-dark)",
            }}
          >
            Book Now
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="fc-mobile-nav"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            color: scrolled && !open ? "#fff" : "var(--gray-800)",
          }}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="fc-mobile-nav"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(10,22,40,0.97)",
            backdropFilter: "blur(12px)",
            padding: "1rem",
            borderBottomLeftRadius: "1.5rem",
            borderBottomRightRadius: "1.5rem",
            flexDirection: "column",
          }}
        >
          {NAV_LINKS.map((l, i) => (
            <Link
              key={l}
              href={l === "Home" ? "/" : `/${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "0.75rem 0",
                textDecoration: "none",
                borderBottom:
                  i < NAV_LINKS.length - 1
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "none",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "rgba(255,255,255,0.8)",
              }}
            >
              {l}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              marginTop: "1rem",
              textAlign: "center",
              background: "var(--gold)",
              color: "var(--navy-dark)",
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-pill)",
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}

export default function HeroSection() {
  return (
    <>
      <Navbar />
      <section
        style={{
          position: "relative",
          height: "100vh",
          minHeight: 620,
          overflow: "hidden",
        }}
      >
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

        <div
          style={{
            position: "relative",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 1.5rem",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginTop: "-9rem",
              maxWidth: "min(94vw, 700px)",
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                margin: "0 0 1rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "var(--tracking-widest)",
                textTransform: "uppercase",
                color: "var(--gray-600)",
              }}
            >
              China Wholesale Market Tours
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "var(--text-display)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            >
              <span style={{ display: "block", color: "var(--navy-light)" }}>
                Explore the China Business Markets
              </span>
              <span
                style={{
                  display: "block",
                  marginTop: "-0.1em",
                  color: "var(--navy)",
                }}
              >
                with <span style={{ color: "var(--gold)" }}>Us.</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{
                margin: "1.5rem auto 0",
                maxWidth: 520,
                fontFamily: "var(--font-body)",
                fontSize: "1.125rem",
                color: "var(--gray-600)",
                lineHeight: 1.6,
              }}
            >
              Flights, hotel, food, transport &amp; guide — all included.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginTop: "1.75rem",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/packages"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  padding: "0.65rem 1.75rem",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--gold)",
                  color: "var(--navy-dark)",
                }}
              >
                Explore Packages
              </Link>
              <Link
                href="/contact"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  padding: "0.65rem 1.75rem",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--navy)",
                  color: "#fff",
                }}
              >
                Book a Tour ✈
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
