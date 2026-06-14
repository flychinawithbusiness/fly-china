"use client"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function NewBookingForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preCustomerId = searchParams.get("customerId") || ""
  const [loading, setLoading] = useState(false)
  const [customers, setCustomers] = useState<Array<{ id: string; name: string; phone: string }>>([])
  const [form, setForm] = useState({
    customerId: preCustomerId,
    packageName: "7 Days Package",
    packageDays: 7,
    tourStartDate: "",
    tourEndDate: "",
    groupSize: 1,
    totalAmount: 100000,
    status: "inquiry",
    notes: "",
  })

  useEffect(() => {
    fetch("/api/crm/customers").then(r => r.json()).then(setCustomers)
  }, [])

  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch("/api/crm/bookings", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) router.push(`/crm/bookings/${data.id}`)
  }

  const inputStyle = {
    width: "100%", padding: "0.7rem 0.875rem",
    border: "1px solid #E5E7EB", borderRadius: 10,
    fontFamily: "var(--font-body)", fontSize: "0.875rem",
    outline: "none", boxSizing: "border-box" as const, color: "#111827",
    background: "white",
  }
  const labelStyle = {
    display: "block", fontSize: "0.78rem", fontWeight: 600,
    color: "#374151", fontFamily: "var(--font-body)", marginBottom: "0.4rem",
  }

  const packages = [
    { name: "7 Days Package", days: 7, price: 100000 },
    { name: "10 Days Package", days: 10, price: 120000 },
    { name: "14 Days Package", days: 14, price: 150000 },
  ]

  return (
    <div style={{ maxWidth: 700 }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "2rem", color: "#1C3A6B", margin: "0 0 2rem" }}>New Booking</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ background: "white", borderRadius: 20, padding: "2rem", border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Customer */}
          <div>
            <label style={labelStyle}>Customer *</label>
            <select value={form.customerId} onChange={e => set("customerId", e.target.value)} required style={inputStyle}>
              <option value="">Select customer...</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name} — {c.phone}</option>
              ))}
            </select>
          </div>

          {/* Package selection */}
          <div>
            <label style={labelStyle}>Package *</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
              {packages.map(p => (
                <button key={p.name} type="button"
                  onClick={() => setForm(f => ({ ...f, packageName: p.name, packageDays: p.days, totalAmount: p.price }))}
                  style={{
                    padding: "0.875rem", borderRadius: 12, cursor: "pointer",
                    border: form.packageName === p.name ? "2px solid #1C3A6B" : "2px solid #E5E7EB",
                    background: form.packageName === p.name ? "rgba(28,58,107,0.06)" : "white",
                    fontFamily: "var(--font-body)",
                  }}>
                  <div style={{ fontWeight: 700, color: "#1C3A6B", fontSize: "1rem" }}>{p.days} Days</div>
                  <div style={{ fontSize: "0.75rem", color: "#6B7280", marginTop: "0.2rem" }}>৳{p.price.toLocaleString()}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Tour Start Date *</label>
              <input type="date" value={form.tourStartDate} onChange={e => set("tourStartDate", e.target.value)} required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Tour End Date *</label>
              <input type="date" value={form.tourEndDate} onChange={e => set("tourEndDate", e.target.value)} required style={inputStyle} />
            </div>
          </div>

          {/* Group size + amount */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Group Size</label>
              <input type="number" min={1} value={form.groupSize} onChange={e => set("groupSize", Number(e.target.value))} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Total Amount (BDT)</label>
              <input type="number" value={form.totalAmount} onChange={e => set("totalAmount", Number(e.target.value))} style={inputStyle} />
            </div>
          </div>

          {/* Status */}
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

          {/* Notes */}
          <div>
            <label style={labelStyle}>Notes</label>
            <textarea value={form.notes} onChange={e => set("notes", e.target.value)} rows={3} placeholder="Any special requirements..." style={{ ...inputStyle, resize: "vertical" }} />
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button type="submit" disabled={loading} style={{
              background: "linear-gradient(135deg, #1C3A6B, #2A5099)", color: "white",
              border: "none", borderRadius: 12, padding: "0.8rem 2rem",
              fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer",
            }}>{loading ? "Creating..." : "Create Booking"}</button>
            <button type="button" onClick={() => router.back()} style={{
              background: "#F3F4F6", color: "#374151", border: "none",
              borderRadius: 12, padding: "0.8rem 1.5rem",
              fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer",
            }}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default function NewBookingPage() {
  return <Suspense><NewBookingForm /></Suspense>
}
