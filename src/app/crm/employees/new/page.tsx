"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewEmployeePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", role: "employee" })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch("/api/crm/employees", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    setLoading(false)
    router.push("/crm/employees")
  }

  const inputStyle = { width: "100%", padding: "0.7rem 0.875rem", border: "1px solid #E5E7EB", borderRadius: 10, fontFamily: "var(--font-body)", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" as const, color: "#111827" }
  const labelStyle = { display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#374151", fontFamily: "var(--font-body)", marginBottom: "0.4rem" }

  return (
    <div style={{ maxWidth: 540 }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "2rem", color: "#1C3A6B", margin: "0 0 2rem" }}>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ background: "white", borderRadius: 20, padding: "2rem", border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div><label style={labelStyle}>Full Name *</label><input value={form.name} onChange={e => set("name", e.target.value)} required style={inputStyle} /></div>
            <div><label style={labelStyle}>Phone</label><input value={form.phone} onChange={e => set("phone", e.target.value)} style={inputStyle} /></div>
          </div>
          <div><label style={labelStyle}>Email *</label><input value={form.email} onChange={e => set("email", e.target.value)} required type="email" style={inputStyle} /></div>
          <div><label style={labelStyle}>Password *</label><input value={form.password} onChange={e => set("password", e.target.value)} required type="password" placeholder="Minimum 8 characters" style={inputStyle} /></div>
          <div>
            <label style={labelStyle}>Role</label>
            <select value={form.role} onChange={e => set("role", e.target.value)} style={inputStyle}>
              <option value="employee">Employee (limited access)</option>
              <option value="admin">Admin (full access)</option>
            </select>
          </div>
          <div style={{ padding: "0.875rem", background: "#FEF9EE", borderRadius: 10, border: "1px solid #FDE68A" }}>
            <p style={{ fontSize: "0.78rem", color: "#78350F", fontFamily: "var(--font-body)", margin: 0 }}>
              ⚠️ Employee will login at <strong>flychinatravels.com/crm/login</strong> with these credentials.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button type="submit" disabled={loading} style={{ background: "linear-gradient(135deg, #1C3A6B, #2A5099)", color: "white", border: "none", borderRadius: 12, padding: "0.8rem 2rem", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer" }}>{loading ? "Creating..." : "Create Employee"}</button>
            <button type="button" onClick={() => router.back()} style={{ background: "#F3F4F6", color: "#374151", border: "none", borderRadius: 12, padding: "0.8rem 1.5rem", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}
