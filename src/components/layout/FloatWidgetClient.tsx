"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  whatsapp: string;
  phone: string;
  facebook: string;
  instagram: string;
  wechat: string;
}

export default function FloatWidgetClient({
  whatsapp,
  phone,
  facebook,
  instagram,
  wechat,
}: Props) {
  const [open, setOpen] = useState(false);

  const phoneDigits = phone.replace(/\D/g, "");
  const waDigits = whatsapp.replace(/\D/g, "");

  const buttons = [
    {
      label: "Phone",
      icon: "📞",
      href: `tel:${phoneDigits}`,
      bg: "#1C3A6B",
      show: !!phoneDigits,
    },
    {
      label: "WeChat",
      icon: "💬",
      href: `weixin://dl/chat?${wechat}`,
      bg: "#07C160",
      show: !!wechat,
    },
    {
      label: "Instagram",
      icon: "📸",
      href: instagram,
      bg: "#E1306C",
      show: !!instagram,
    },
    {
      label: "Facebook",
      icon: "👥",
      href: facebook,
      bg: "#1877F2",
      show: !!facebook,
    },
    {
      label: "WhatsApp",
      icon: "💬",
      href: `https://wa.me/${waDigits}`,
      bg: "#25D366",
      show: !!waDigits,
    },
  ];

  const visibleButtons = buttons.filter((b) => b.show);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "1.5rem",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.65rem",
      }}
    >
      {/* Social buttons */}
      <AnimatePresence>
        {open &&
          visibleButtons.map((btn, i) => (
            <motion.a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              transition={{
                delay: i * 0.06,
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              title={btn.label}
              style={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                background: btn.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
                textDecoration: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                cursor: "pointer",
              }}
            >
              {btn.icon}
            </motion.a>
          ))}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.92 }}
        aria-label={open ? "Close contact menu" : "Open contact menu"}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#25D366",
          border: "none",
          cursor: "pointer",
          fontSize: "1.6rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 20px rgba(37,211,102,0.4)",
        }}
      >
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
        >
          {open ? "✕" : "💬"}
        </motion.span>
      </motion.button>
    </div>
  );
}
