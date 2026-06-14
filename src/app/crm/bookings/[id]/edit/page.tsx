"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"

export default function EditBookingPage() {
  const router = useRouter()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    packageName: "", packageDays: 7, tourStartDate: "", tourEndDate: "",
    groupSize: 1, totalAmount: 0, status: "inquiry", notes: "",
  })

  useEffect(() => {
    fetch(`/api/crm/bookings/${id}`).then(r => r.json()).then(data => {
      setForm({
        packageName: data.packageName || "",
        packageDays: data.packageDays || 7,
        tourStartDate: data.tourStartDate ? new Date(data.tourStartDate).toISOString().split("T")[0] : "",
        tourEndDate: data.tourEndDate ? new Date(data.tourEndDate).toISOString().split("T")[0] : "",
        groupSize: data.groupSize || 1,
        totalAmount: data.totalAmount || 0,
        status: data.status || "inquiry",
        notes: data.notes || "",
      })
    })
  }, [id])

  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch(`/api/crm/bookings/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    setLoading(false)
    router.push(`/crm/bookings/${id}`)
  }

  const inputStyle = { width: "100%", padding: "0.7rem 0.875rem", border: "1px solid #E5E7EB", borderRadius: 10, fontFamily: "var(--font-body)", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" as const, color: "#111827", background: "white" }
  const labelStyle = { display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#374151", fontFamily: "var(--font-body)", marginBottom: "0.4rem" }

  return (
    <div style={{ maxWidth: 700 }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "2rem", color: "#1C3A6B", margin: "0 0 2rem" }}>Edit Booking</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ background: "white", borderRadius: 20, padding: "2rem", border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div><label style={labelStyle}>Package Name</label><input value={form.packageName} onChange={e => set("packageName", e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>Duration (days)</label><input type="number" value={form.packageDays} onChange={e => set("packageDays", Number(e.target.value))} style={inputStyle} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div><label style={labelStyle}>Start Date</label><input type="date" value={form.tourStartDate} onChange={e => set("tourStartDate", e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>End Date</label><input type="date" value={form.tourEndDate} onChange={e => set("tourEndDate", e.target.value)} style={inputStyle} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div><label style={labelStyle}>Group Size</label><input type="number" min={1} value={form.groupSize} onChange={e => set("groupSize", Number(e.target.value))} style={inputStyle} /></div>
            <div><label style={labelStyle}>Total Amount (BDT)</label><input type="number" value={form.totalAmount} onChange={e => set("totalAmount", Number(e.target.value))} style={inputStyle} /></div>
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select value={form.status} onChange={e => set("status", e.target.value)} style={inputStyle}>
              <option value="inquiry">Inquiry</option>
              <option value="confirmed">Confirmed</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div><label style={labelStyle}>Notes</label><textarea value={form.notes} onChange={e => set("notes", e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} /></div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button type="submit" disabled={loading} style={{ background: "linear-gradient(135deg, #1C3A6B, #2A5099)", color: "white", border: "none", borderRadius: 12, padding: "0.8rem 2rem", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer" }}>{loading ? "Saving..." : "Update Booking"}</button>
            <button type="button" onClick={() => router.back()} style={{ background: "#F3F4F6", color: "#374151", border: "none", borderRadius: 12, padding: "0.8rem 1.5rem", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}
