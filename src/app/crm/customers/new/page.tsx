"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCustomerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    nid: "",
    passportNumber: "",
    address: "",
    notes: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/crm/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/crm/customers");
      router.refresh();
    } else {
      setError("Could not save customer. Please try again.");
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "0.7rem 0.875rem",
    border: "1px solid #E5E7EB",
    borderRadius: 10,
    fontFamily: "var(--font-body)",
    fontSize: "0.875rem",
    outline: "none",
    boxSizing: "border-box" as const,
    color: "#111827",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.78rem",
    fontWeight: 600,
    color: "#374151",
    fontFamily: "var(--font-body)",
    marginBottom: "0.4rem",
  };

  return (
    <div style={{ maxWidth: 700 }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "2rem",
            color: "#1C3A6B",
            margin: 0,
          }}
        >
          Add Customer
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            background: "white",
            borderRadius: 20,
            padding: "2rem",
            border: "1px solid rgba(28,58,107,0.07)",
            boxShadow: "0 4px 16px rgba(28,58,107,0.06)",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
                placeholder="Mohammad Rahman"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Phone *</label>
              <input
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                required
                placeholder="+880 1XX-XXXXXXX"
                style={inputStyle}
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <label style={labelStyle}>Email</label>
              <input
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                type="email"
                placeholder="email@example.com"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>NID Number</label>
              <input
                value={form.nid}
                onChange={(e) => set("nid", e.target.value)}
                placeholder="NID number"
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Passport Number</label>
            <input
              value={form.passportNumber}
              onChange={(e) => set("passportNumber", e.target.value)}
              placeholder="A12345678"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Address</label>
            <input
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              placeholder="Dhaka, Bangladesh"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Any special notes..."
              rows={3}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          {error && (
            <p
              style={{
                color: "#DC2626",
                fontSize: "0.8rem",
                fontFamily: "var(--font-body)",
                margin: 0,
              }}
            >
              {error}
            </p>
          )}

          <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: "linear-gradient(135deg, #1C3A6B, #2A5099)",
                color: "white",
                border: "none",
                borderRadius: 12,
                padding: "0.8rem 2rem",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "0.875rem",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Saving..." : "Save Customer"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              style={{
                background: "#F3F4F6",
                color: "#374151",
                border: "none",
                borderRadius: 12,
                padding: "0.8rem 1.5rem",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.875rem",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
