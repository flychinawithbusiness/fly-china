import { prisma } from "@/lib/prisma"
import { auth } from "../auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function RestaurantsPage() {
  const session = await auth()
  if (!session) redirect("/crm/login")
  const restaurants = await prisma.restaurant.findMany({ orderBy: { name: "asc" } })

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "2rem", color: "#1C3A6B", margin: 0 }}>Restaurants</h1>
          <p style={{ color: "#6B7280", fontSize: "0.875rem", fontFamily: "var(--font-body)", marginTop: "0.25rem" }}>{restaurants.length} restaurants in Guangzhou</p>
        </div>
        <Link href="/crm/restaurants/new" style={{
          background: "linear-gradient(135deg, #1C3A6B, #2A5099)", color: "white", textDecoration: "none",
          padding: "0.65rem 1.5rem", borderRadius: 12, fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.875rem",
          boxShadow: "0 4px 12px rgba(28,58,107,0.3)",
        }}>+ Add Restaurant</Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
        {restaurants.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "5rem", background: "white", borderRadius: 20, border: "1px solid rgba(28,58,107,0.07)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🍽️</div>
            <p style={{ color: "#6B7280", fontFamily: "var(--font-body)" }}>No restaurants yet.</p>
          </div>
        ) : restaurants.map(r => (
          <div key={r.id} style={{ background: "white", borderRadius: 20, padding: "1.5rem", border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <div style={{ fontSize: "2rem" }}>🍽️</div>
              <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "0.2rem 0.6rem", borderRadius: 999, background: r.isActive ? "#D1FAE5" : "#F3F4F6", color: r.isActive ? "#065F46" : "#374151", fontFamily: "var(--font-body)" }}>{r.isActive ? "Active" : "Inactive"}</span>
            </div>
            <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1rem", color: "#111827", margin: "0 0 0.25rem" }}>{r.name}</h3>
            <p style={{ color: "#6B7280", fontSize: "0.8rem", fontFamily: "var(--font-body)", margin: "0 0 0.25rem" }}>📍 {r.location}</p>
            <p style={{ color: "#059669", fontSize: "0.75rem", fontFamily: "var(--font-body)", margin: "0 0 1rem", fontWeight: 600 }}>{r.cuisine}</p>
            {r.notes && <p style={{ color: "#6B7280", fontSize: "0.75rem", fontFamily: "var(--font-body)", margin: "0 0 1rem" }}>{r.notes}</p>}
            <Link href={`/crm/restaurants/${r.id}/edit`} style={{ display: "block", textAlign: "center", border: "1px solid rgba(28,58,107,0.15)", color: "#1C3A6B", padding: "0.5rem", borderRadius: 10, textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 600 }}>Edit</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
