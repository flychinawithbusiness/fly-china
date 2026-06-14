"use client"
import { useState } from "react"
import { useRouter, useParams } from "next/navigation"

export default function GuideRatingPage() {
  const router = useRouter()
  const { id } = useParams()
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch(`/api/crm/bookings/${id}/guide-rating`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, review }),
    })
    setLoading(false)
    router.push(`/crm/bookings/${id}`)
  }

  return (
    <div style={{ maxWidth: 500 }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "2rem", color: "#1C3A6B", margin: "0 0 2rem" }}>Rate Guide</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ background: "white", borderRadius: 20, padding: "2rem", border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#374151", fontFamily: "var(--font-body)", marginBottom: "0.75rem" }}>Rating</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} type="button" onClick={() => setRating(star)} style={{
                  width: 44, height: 44, borderRadius: "50%", border: "none", cursor: "pointer",
                  background: star <= rating ? "#F5C200" : "#F3F4F6",
                  fontSize: "1.2rem", transition: "all 0.15s",
                }}>⭐</button>
              ))}
              <span style={{ marginLeft: "0.5rem", alignSelf: "center", fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "#374151", fontWeight: 600 }}>{rating}/5</span>
            </div>
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#374151", fontFamily: "var(--font-body)", marginBottom: "0.4rem" }}>Review</label>
            <textarea value={review} onChange={e => setReview(e.target.value)} rows={4}
              placeholder="How was the guide's service? Language skills, market knowledge, punctuality..."
              style={{ width: "100%", padding: "0.7rem 0.875rem", border: "1px solid #E5E7EB", borderRadius: 10, fontFamily: "var(--font-body)", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" as const, resize: "vertical" }} />
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button type="submit" disabled={loading} style={{ background: "#F5C200", color: "#111827", border: "none", borderRadius: 12, padding: "0.8rem 2rem", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer" }}>{loading ? "Saving..." : "Submit Rating"}</button>
            <button type="button" onClick={() => router.back()} style={{ background: "#F3F4F6", color: "#374151", border: "none", borderRadius: 12, padding: "0.8rem 1.5rem", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}
