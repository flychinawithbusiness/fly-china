"use client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"

export default function AssignGuidePage() {
  const router = useRouter()
  const { id } = useParams()
  const [guides, setGuides] = useState<Array<{ id: string; name: string; phone: string; language: string }>>([])
  const [selectedGuide, setSelectedGuide] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("/api/crm/guides").then(r => r.json()).then(setGuides)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch(`/api/crm/bookings/${id}/guide`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guideId: selectedGuide }),
    })
    setLoading(false)
    router.push(`/crm/bookings/${id}`)
  }

  return (
    <div style={{ maxWidth: 540 }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "2rem", color: "#1C3A6B", margin: "0 0 2rem" }}>Assign Guide</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ background: "white", borderRadius: 20, padding: "2rem", border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {guides.length === 0 ? (
              <p style={{ color: "#6B7280", fontFamily: "var(--font-body)", fontSize: "0.875rem" }}>No guides available. Add guides first.</p>
            ) : guides.map(g => (
              <label key={g.id} style={{
                display: "flex", alignItems: "center", gap: "1rem",
                padding: "1rem", borderRadius: 12, cursor: "pointer",
                border: selectedGuide === g.id ? "2px solid #1C3A6B" : "2px solid #E5E7EB",
                background: selectedGuide === g.id ? "rgba(28,58,107,0.05)" : "white",
              }}>
                <input type="radio" name="guide" value={g.id} checked={selectedGuide === g.id} onChange={() => setSelectedGuide(g.id)} style={{ accentColor: "#1C3A6B" }} />
                <div>
                  <div style={{ fontWeight: 600, color: "#111827", fontSize: "0.875rem", fontFamily: "var(--font-body)" }}>{g.name}</div>
                  <div style={{ color: "#6B7280", fontSize: "0.75rem", fontFamily: "var(--font-body)" }}>{g.phone} · {g.language}</div>
                </div>
              </label>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button type="submit" disabled={loading || !selectedGuide} style={{ background: "linear-gradient(135deg, #1C3A6B, #2A5099)", color: "white", border: "none", borderRadius: 12, padding: "0.8rem 2rem", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer", opacity: !selectedGuide ? 0.6 : 1 }}>{loading ? "Assigning..." : "Assign Guide"}</button>
            <button type="button" onClick={() => router.back()} style={{ background: "#F3F4F6", color: "#374151", border: "none", borderRadius: 12, padding: "0.8rem 1.5rem", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}
