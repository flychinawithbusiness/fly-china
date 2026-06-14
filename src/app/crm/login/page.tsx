"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { crmLogin } from "./actions";

export default function CrmLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await crmLogin(email, password);
    setLoading(false);
    if (res.ok) {
      router.push("/crm");
      router.refresh();
    } else {
      setError(res.error || "Invalid email or password");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0A1628 0%, #1C3A6B 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 24,
          padding: "3rem",
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Image
            src="/images/logo.png"
            alt="FlyChina"
            width={120}
            height={34}
            style={{ objectFit: "contain", marginBottom: "1rem" }}
          />
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "1.8rem",
              color: "#1C3A6B",
              margin: "0 0 0.25rem",
            }}
          >
            CRM Portal
          </h1>
          <p
            style={{
              color: "#6B7280",
              fontSize: "0.85rem",
              fontFamily: "var(--font-body)",
            }}
          >
            Staff access only
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="fc-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="fc-input"
          />
          {error && (
            <p
              style={{
                color: "#EF4444",
                fontSize: "0.8rem",
                fontFamily: "var(--font-body)",
                margin: 0,
              }}
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "linear-gradient(135deg, #1C3A6B, #2A5099)",
              color: "white",
              border: "none",
              borderRadius: 12,
              padding: "0.9rem",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              marginTop: "0.5rem",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
