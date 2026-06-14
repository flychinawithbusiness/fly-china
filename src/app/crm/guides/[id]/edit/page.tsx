"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"

export default function EditGuidePage() {
  const router = useRouter()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: "", phone: "", email: "", language: "", speciality: "", isActive: true })

  useEffect(() => {
    fetch(`/api/crm/guides/${id}`).then(r => r.json()).then(data => {
      setForm({ name: data.name || "", phone: data.phone || "", email: data.email || "", language: data.language || "", speciality: data.speciality || "", isActive: data.isActive ?? true })
    })
  }, [id])

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch(`/api/crm/guides/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    setLoading(false)
    router.push("/crm/guides")
  }

  const inputStyle = { width: "100%", padding: "0.7rem 0.875rem", border: "1px solid #E5E7EB", borderRadius: 10, fontFamily: "var(--font-body)", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" as const, color: "#111827" }
  const labelStyle = { display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#374151", fontFamily: "var(--font-body)", marginBottom: "0.4rem" }

  return (
    <div style={{ maxWidth: 600 }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "2rem", color: "#1C3A6B", margin: "0 0 2rem" }}>Edit Guide</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ background: "white", borderRadius: 20, padding: "2rem", border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div><label style={labelStyle}>Full Name *</label><input value={form.name} onChange={e => set("name", e.target.value)} required style={inputStyle} /></div>
            <div><label style={labelStyle}>Phone *</label><input value={form.phone} onChange={e => set("phone", e.target.value)} required style={inputStyle} /></div>
          </div>
          <div><label style={labelStyle}>Email</label><input value={form.email} onChange={e => set("email", e.target.value)} type="email" style={inputStyle} /></div>
          <div><label style={labelStyle}>Languages</label><input value={form.language} onChange={e => set("language", e.target.value)} style={inputStyle} /></div>
          <div><label style={labelStyle}>Speciality</label><input value={form.speciality} onChange={e => set("speciality", e.target.value)} style={inputStyle} /></div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <input type="checkbox" id="isActive" checked={form.isActive} onChange={e => set("isActive", e.target.checked)} style={{ width: 16, height: 16, accentColor: "#1C3A6B" }} />
            <label htmlFor="isActive" style={{ fontSize: "0.875rem", color: "#374151", fontFamily: "var(--font-body)", cursor: "pointer" }}>Active (available for assignments)</label>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button type="submit" disabled={loading} style={{ background: "linear-gradient(135deg, #1C3A6B, #2A5099)", color: "white", border: "none", borderRadius: 12, padding: "0.8rem 2rem", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer" }}>{loading ? "Saving..." : "Update Guide"}</button>
            <button type="button" onClick={() => router.back()} style={{ background: "#F3F4F6", color: "#374151", border: "none", borderRadius: 12, padding: "0.8rem 1.5rem", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}
