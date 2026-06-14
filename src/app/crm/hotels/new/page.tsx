"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewHotelPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: "", location: "", address: "", phone: "", stars: 3, notes: "" })
  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch("/api/crm/hotels", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    setLoading(false)
    router.push("/crm/hotels")
  }

  const inputStyle = { width: "100%", padding: "0.7rem 0.875rem", border: "1px solid #E5E7EB", borderRadius: 10, fontFamily: "var(--font-body)", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" as const, color: "#111827" }
  const labelStyle = { display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#374151", fontFamily: "var(--font-body)", marginBottom: "0.4rem" }

  return (
    <div style={{ maxWidth: 600 }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "2rem", color: "#1C3A6B", margin: "0 0 2rem" }}>Add Hotel</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ background: "white", borderRadius: 20, padding: "2rem", border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div><label style={labelStyle}>Hotel Name *</label><input value={form.name} onChange={e => set("name", e.target.value)} required placeholder="Grand Hyatt Guangzhou" style={inputStyle} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
            <div><label style={labelStyle}>Location / Area *</label><input value={form.location} onChange={e => set("location", e.target.value)} required placeholder="Tianhe District" style={inputStyle} /></div>
            <div>
              <label style={labelStyle}>Stars</label>
              <select value={form.stars} onChange={e => set("stars", Number(e.target.value))} style={inputStyle}>
                {[1,2,3,4,5].map(s => <option key={s} value={s}>{"★".repeat(s)} ({s} Star)</option>)}
              </select>
            </div>
          </div>
          <div><label style={labelStyle}>Full Address</label><input value={form.address} onChange={e => set("address", e.target.value)} style={inputStyle} /></div>
          <div><label style={labelStyle}>Phone</label><input value={form.phone} onChange={e => set("phone", e.target.value)} style={inputStyle} /></div>
          <div><label style={labelStyle}>Notes</label><textarea value={form.notes} onChange={e => set("notes", e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} /></div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button type="submit" disabled={loading} style={{ background: "linear-gradient(135deg, #1C3A6B, #2A5099)", color: "white", border: "none", borderRadius: 12, padding: "0.8rem 2rem", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer" }}>{loading ? "Saving..." : "Save Hotel"}</button>
            <button type="button" onClick={() => router.back()} style={{ background: "#F3F4F6", color: "#374151", border: "none", borderRadius: 12, padding: "0.8rem 1.5rem", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}
