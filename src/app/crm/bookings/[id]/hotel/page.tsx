"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"

export default function AddHotelPage() {
  const router = useRouter()
  const { id } = useParams()
  const [hotels, setHotels] = useState<Array<{ id: string; name: string; location: string; stars: number }>>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ hotelId: "", checkIn: "", checkOut: "", roomType: "Standard", rooms: 1, price: 0 })
  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }))

  useEffect(() => {
    fetch("/api/crm/hotels").then(r => r.json()).then(setHotels)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch(`/api/crm/bookings/${id}/hotel`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    setLoading(false)
    router.push(`/crm/bookings/${id}`)
  }

  const inputStyle = { width: "100%", padding: "0.7rem 0.875rem", border: "1px solid #E5E7EB", borderRadius: 10, fontFamily: "var(--font-body)", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" as const, color: "#111827", background: "white" }
  const labelStyle = { display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#374151", fontFamily: "var(--font-body)", marginBottom: "0.4rem" }

  return (
    <div style={{ maxWidth: 580 }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "2rem", color: "#1C3A6B", margin: "0 0 2rem" }}>Book Hotel</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ background: "white", borderRadius: 20, padding: "2rem", border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={labelStyle}>Select Hotel *</label>
            <select value={form.hotelId} onChange={e => set("hotelId", e.target.value)} required style={inputStyle}>
              <option value="">Choose hotel...</option>
              {hotels.map(h => <option key={h.id} value={h.id}>{"★".repeat(h.stars)} {h.name} — {h.location}</option>)}
            </select>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div><label style={labelStyle}>Check In *</label><input type="date" value={form.checkIn} onChange={e => set("checkIn", e.target.value)} required style={inputStyle} /></div>
            <div><label style={labelStyle}>Check Out *</label><input type="date" value={form.checkOut} onChange={e => set("checkOut", e.target.value)} required style={inputStyle} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div><label style={labelStyle}>Room Type</label><input value={form.roomType} onChange={e => set("roomType", e.target.value)} placeholder="Standard" style={inputStyle} /></div>
            <div><label style={labelStyle}>Rooms</label><input type="number" min={1} value={form.rooms} onChange={e => set("rooms", Number(e.target.value))} style={inputStyle} /></div>
            <div><label style={labelStyle}>Price (BDT)</label><input type="number" value={form.price} onChange={e => set("price", Number(e.target.value))} style={inputStyle} /></div>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button type="submit" disabled={loading} style={{ background: "linear-gradient(135deg, #1C3A6B, #2A5099)", color: "white", border: "none", borderRadius: 12, padding: "0.8rem 2rem", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer" }}>{loading ? "Saving..." : "Book Hotel"}</button>
            <button type="button" onClick={() => router.back()} style={{ background: "#F3F4F6", color: "#374151", border: "none", borderRadius: 12, padding: "0.8rem 1.5rem", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}
