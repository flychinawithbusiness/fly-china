"use client"
import { useState } from "react"
import { useRouter, useParams } from "next/navigation"

export default function AddTransportPage() {
  const router = useRouter()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    type: "bus", provider: "", vehicleNumber: "",
    pickupLocation: "", dropoffLocation: "",
    pickupTime: "", price: 0, notes: "",
  })
  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch(`/api/crm/bookings/${id}/transport`, {
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
      <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "2rem", color: "#1C3A6B", margin: "0 0 2rem" }}>Add Transport</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ background: "white", borderRadius: 20, padding: "2rem", border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={labelStyle}>Vehicle Type</label>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[{ value: "bus", label: "🚌 Bus" }, { value: "van", label: "🚐 Van" }, { value: "car", label: "🚗 Car" }].map(opt => (
                <button key={opt.value} type="button" onClick={() => set("type", opt.value)}
                  style={{ flex: 1, padding: "0.7rem", borderRadius: 10, cursor: "pointer", border: form.type === opt.value ? "2px solid #1C3A6B" : "2px solid #E5E7EB", background: form.type === opt.value ? "rgba(28,58,107,0.06)" : "white", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem", color: "#111827" }}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div><label style={labelStyle}>Provider / Company</label><input value={form.provider} onChange={e => set("provider", e.target.value)} placeholder="Transport company" style={inputStyle} /></div>
            <div><label style={labelStyle}>Vehicle Number</label><input value={form.vehicleNumber} onChange={e => set("vehicleNumber", e.target.value)} placeholder="GZ A12345" style={inputStyle} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div><label style={labelStyle}>Pickup Location *</label><input value={form.pickupLocation} onChange={e => set("pickupLocation", e.target.value)} required placeholder="Hotel name / address" style={inputStyle} /></div>
            <div><label style={labelStyle}>Dropoff Location *</label><input value={form.dropoffLocation} onChange={e => set("dropoffLocation", e.target.value)} required placeholder="Market / airport" style={inputStyle} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div><label style={labelStyle}>Pickup Time *</label><input type="datetime-local" value={form.pickupTime} onChange={e => set("pickupTime", e.target.value)} required style={inputStyle} /></div>
            <div><label style={labelStyle}>Price (BDT)</label><input type="number" value={form.price} onChange={e => set("price", Number(e.target.value))} style={inputStyle} /></div>
          </div>
          <div><label style={labelStyle}>Notes</label><textarea value={form.notes} onChange={e => set("notes", e.target.value)} rows={2} style={{ ...inputStyle, resize: "vertical" }} /></div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button type="submit" disabled={loading} style={{ background: "linear-gradient(135deg, #1C3A6B, #2A5099)", color: "white", border: "none", borderRadius: 12, padding: "0.8rem 2rem", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer" }}>{loading ? "Saving..." : "Add Transport"}</button>
            <button type="button" onClick={() => router.back()} style={{ background: "#F3F4F6", color: "#374151", border: "none", borderRadius: 12, padding: "0.8rem 1.5rem", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}
