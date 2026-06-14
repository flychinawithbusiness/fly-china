import { prisma } from "@/lib/prisma"
import { auth } from "../auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function GuidesPage() {
  const session = await auth()
  if (!session) redirect("/crm/login")

  const guides = await prisma.guide.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { assignments: true } },
      assignments: { select: { rating: true } }
    }
  })

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "2rem", color: "#1C3A6B", margin: 0 }}>Guides</h1>
          <p style={{ color: "#6B7280", fontSize: "0.875rem", fontFamily: "var(--font-body)", marginTop: "0.25rem" }}>{guides.length} guides</p>
        </div>
        <Link href="/crm/guides/new" style={{
          background: "linear-gradient(135deg, #1C3A6B, #2A5099)",
          color: "white", textDecoration: "none",
          padding: "0.65rem 1.5rem", borderRadius: 12,
          fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.875rem",
          boxShadow: "0 4px 12px rgba(28,58,107,0.3)",
        }}>+ Add Guide</Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
        {guides.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "5rem", background: "white", borderRadius: 20, border: "1px solid rgba(28,58,107,0.07)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🧭</div>
            <p style={{ color: "#6B7280", fontFamily: "var(--font-body)" }}>No guides yet.</p>
          </div>
        ) : guides.map(g => {
          const ratings = g.assignments.map(a => a.rating).filter(Boolean) as number[]
          const avgRating = ratings.length > 0 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : null

          return (
            <div key={g.id} style={{
              background: "white", borderRadius: 20, padding: "1.5rem",
              border: "1px solid rgba(28,58,107,0.07)",
              boxShadow: "0 4px 16px rgba(28,58,107,0.06)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: "linear-gradient(135deg, #1C3A6B, #2A5099)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.4rem", color: "white", fontWeight: 700, fontFamily: "var(--font-display)",
                }}>{g.name.charAt(0)}</div>
                <span style={{
                  fontSize: "0.7rem", fontWeight: 600, fontFamily: "var(--font-body)",
                  padding: "0.25rem 0.75rem", borderRadius: 999,
                  background: g.isActive ? "#D1FAE5" : "#F3F4F6",
                  color: g.isActive ? "#065F46" : "#374151",
                }}>{g.isActive ? "Active" : "Inactive"}</span>
              </div>

              <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1rem", color: "#111827", margin: "0 0 0.25rem" }}>{g.name}</h3>
              <p style={{ color: "#6B7280", fontSize: "0.8rem", fontFamily: "var(--font-body)", margin: "0 0 1rem" }}>{g.phone}</p>

              <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <div style={{ fontSize: "0.65rem", color: "#9CA3AF", fontFamily: "var(--font-body)" }}>TRIPS</div>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "#1C3A6B", fontFamily: "var(--font-display)", fontStyle: "italic" }}>{g._count.assignments}</div>
                </div>
                {avgRating && (
                  <div>
                    <div style={{ fontSize: "0.65rem", color: "#9CA3AF", fontFamily: "var(--font-body)" }}>RATING</div>
                    <div style={{ fontSize: "1rem", fontWeight: 700, color: "#F5C200", fontFamily: "var(--font-display)", fontStyle: "italic" }}>⭐ {avgRating}</div>
                  </div>
                )}
              </div>

              {g.language && <p style={{ fontSize: "0.75rem", color: "#6B7280", fontFamily: "var(--font-body)", margin: "0 0 1rem" }}>🗣️ {g.language}</p>}

              <Link href={`/crm/guides/${g.id}/edit`} style={{
                display: "block", textAlign: "center",
                border: "1px solid rgba(28,58,107,0.15)", color: "#1C3A6B",
                padding: "0.5rem", borderRadius: 10, textDecoration: "none",
                fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 600,
              }}>Edit</Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
