"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"

export default function AddMealPage() {
  const router = useRouter()
  const { id } = useParams()
  const [restaurants, setRestaurants] = useState<Array<{ id: string; name: string; cuisine: string }>>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ date: "", mealType: "lunch", restaurantId: "", notes: "" })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  useEffect(() => {
    fetch("/api/crm/restaurants").then(r => r.json()).then(setRestaurants)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch(`/api/crm/bookings/${id}/meals`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    setLoading(false)
    router.push(`/crm/bookings/${id}`)
  }

  const inputStyle = { width: "100%", padding: "0.7rem 0.875rem", border: "1px solid #E5E7EB", borderRadius: 10, fontFamily: "var(--font-body)", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" as const, color: "#111827", background: "white" }
  const labelStyle = { display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#374151", fontFamily: "var(--font-body)", marginBottom: "0.4rem" }

  return (
    <div style={{ maxWidth: 540 }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "2rem", color: "#1C3A6B", margin: "0 0 2rem" }}>Schedule Meal</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ background: "white", borderRadius: 20, padding: "2rem", border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div><label style={labelStyle}>Date *</label><input type="date" value={form.date} onChange={e => set("date", e.target.value)} required style={inputStyle} /></div>
            <div>
              <label style={labelStyle}>Meal Type</label>
              <select value={form.mealType} onChange={e => set("mealType", e.target.value)} style={inputStyle}>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Restaurant (optional)</label>
            <select value={form.restaurantId} onChange={e => set("restaurantId", e.target.value)} style={inputStyle}>
              <option value="">Select restaurant...</option>
              {restaurants.map(r => <option key={r.id} value={r.id}>{r.name} ({r.cuisine})</option>)}
            </select>
          </div>
          <div><label style={labelStyle}>Notes</label><input value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="Special dietary requirements..." style={inputStyle} /></div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button type="submit" disabled={loading} style={{ background: "linear-gradient(135deg, #1C3A6B, #2A5099)", color: "white", border: "none", borderRadius: 12, padding: "0.8rem 2rem", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer" }}>{loading ? "Saving..." : "Schedule Meal"}</button>
            <button type="button" onClick={() => router.back()} style={{ background: "#F3F4F6", color: "#374151", border: "none", borderRadius: 12, padding: "0.8rem 1.5rem", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}
