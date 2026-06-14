"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"

export default function EditRestaurantPage() {
  const router = useRouter()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: "", location: "", cuisine: "Halal", phone: "", notes: "", isActive: true })

  useEffect(() => {
    fetch(`/api/crm/restaurants/${id}`).then(r => r.json()).then(data => {
      setForm({ name: data.name || "", location: data.location || "", cuisine: data.cuisine || "Halal", phone: data.phone || "", notes: data.notes || "", isActive: data.isActive ?? true })
    })
  }, [id])

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch(`/api/crm/restaurants/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    setLoading(false)
    router.push("/crm/restaurants")
  }

  const inputStyle = { width: "100%", padding: "0.7rem 0.875rem", border: "1px solid #E5E7EB", borderRadius: 10, fontFamily: "var(--font-body)", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" as const, color: "#111827" }
  const labelStyle = { display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#374151", fontFamily: "var(--font-body)", marginBottom: "0.4rem" }

  return (
    <div style={{ maxWidth: 580 }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "2rem", color: "#1C3A6B", margin: "0 0 2rem" }}>Edit Restaurant</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ background: "white", borderRadius: 20, padding: "2rem", border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div><label style={labelStyle}>Name *</label><input value={form.name} onChange={e => set("name", e.target.value)} required style={inputStyle} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div><label style={labelStyle}>Location *</label><input value={form.location} onChange={e => set("location", e.target.value)} required style={inputStyle} /></div>
            <div>
              <label style={labelStyle}>Cuisine</label>
              <select value={form.cuisine} onChange={e => set("cuisine", e.target.value)} style={inputStyle}>
                <option value="Halal">Halal</option>
                <option value="Bangladeshi">Bangladeshi</option>
                <option value="Chinese">Chinese</option>
                <option value="Indian">Indian</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>
          </div>
          <div><label style={labelStyle}>Phone</label><input value={form.phone} onChange={e => set("phone", e.target.value)} style={inputStyle} /></div>
          <div><label style={labelStyle}>Notes</label><textarea value={form.notes} onChange={e => set("notes", e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} /></div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <input type="checkbox" checked={form.isActive} onChange={e => set("isActive", e.target.checked)} style={{ width: 16, height: 16, accentColor: "#1C3A6B" }} />
            <span style={{ fontSize: "0.875rem", color: "#374151", fontFamily: "var(--font-body)" }}>Active</span>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button type="submit" disabled={loading} style={{ background: "linear-gradient(135deg, #1C3A6B, #2A5099)", color: "white", border: "none", borderRadius: 12, padding: "0.8rem 2rem", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer" }}>{loading ? "Saving..." : "Update"}</button>
            <button type="button" onClick={() => router.back()} style={{ background: "#F3F4F6", color: "#374151", border: "none", borderRadius: 12, padding: "0.8rem 1.5rem", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}
