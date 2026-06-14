"use client"
import { useState } from "react"
import { useRouter, useParams } from "next/navigation"

export default function AddFlightPage() {
  const router = useRouter()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    type: "departure", airline: "", flightNumber: "",
    departureFrom: "Dhaka (DAC)", departureTo: "Guangzhou (CAN)",
    departureTime: "", arrivalTime: "", transitPoints: "",
  })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch(`/api/crm/bookings/${id}/flights`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    setLoading(false)
    router.push(`/crm/bookings/${id}`)
  }

  const inputStyle = { width: "100%", padding: "0.7rem 0.875rem", border: "1px solid #E5E7EB", borderRadius: 10, fontFamily: "var(--font-body)", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" as const, color: "#111827", background: "white" }
  const labelStyle = { display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#374151", fontFamily: "var(--font-body)", marginBottom: "0.4rem" }

  return (
    <div style={{ maxWidth: 600 }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "2rem", color: "#1C3A6B", margin: "0 0 2rem" }}>Add Flight</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ background: "white", borderRadius: 20, padding: "2rem", border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={labelStyle}>Flight Type</label>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[{ value: "departure", label: "🛫 Departure" }, { value: "return", label: "🛬 Return" }].map(opt => (
                <button key={opt.value} type="button" onClick={() => set("type", opt.value)}
                  style={{ flex: 1, padding: "0.7rem", borderRadius: 10, cursor: "pointer", border: form.type === opt.value ? "2px solid #1C3A6B" : "2px solid #E5E7EB", background: form.type === opt.value ? "rgba(28,58,107,0.06)" : "white", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem", color: "#111827" }}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div><label style={labelStyle}>Airline *</label><input value={form.airline} onChange={e => set("airline", e.target.value)} required placeholder="Biman, China Southern..." style={inputStyle} /></div>
            <div><label style={labelStyle}>Flight Number *</label><input value={form.flightNumber} onChange={e => set("flightNumber", e.target.value)} required placeholder="BG049" style={inputStyle} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div><label style={labelStyle}>From</label><input value={form.departureFrom} onChange={e => set("departureFrom", e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>To</label><input value={form.departureTo} onChange={e => set("departureTo", e.target.value)} style={inputStyle} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div><label style={labelStyle}>Departure Time *</label><input type="datetime-local" value={form.departureTime} onChange={e => set("departureTime", e.target.value)} required style={inputStyle} /></div>
            <div><label style={labelStyle}>Arrival Time *</label><input type="datetime-local" value={form.arrivalTime} onChange={e => set("arrivalTime", e.target.value)} required style={inputStyle} /></div>
          </div>
          <div><label style={labelStyle}>Transit Points</label><input value={form.transitPoints} onChange={e => set("transitPoints", e.target.value)} placeholder="Kuala Lumpur, Bangkok..." style={inputStyle} /></div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button type="submit" disabled={loading} style={{ background: "linear-gradient(135deg, #1C3A6B, #2A5099)", color: "white", border: "none", borderRadius: 12, padding: "0.8rem 2rem", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer" }}>{loading ? "Saving..." : "Add Flight"}</button>
            <button type="button" onClick={() => router.back()} style={{ background: "#F3F4F6", color: "#374151", border: "none", borderRadius: 12, padding: "0.8rem 1.5rem", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}
