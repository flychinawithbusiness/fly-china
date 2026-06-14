import { prisma } from "@/lib/prisma"
import { auth } from "../auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function HotelsPage() {
  const session = await auth()
  if (!session) redirect("/crm/login")
  const hotels = await prisma.hotel.findMany({ orderBy: { name: "asc" } })

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "2rem", color: "#1C3A6B", margin: 0 }}>Hotels</h1>
          <p style={{ color: "#6B7280", fontSize: "0.875rem", fontFamily: "var(--font-body)", marginTop: "0.25rem" }}>{hotels.length} hotels in Guangzhou</p>
        </div>
        <Link href="/crm/hotels/new" style={{
          background: "linear-gradient(135deg, #1C3A6B, #2A5099)", color: "white", textDecoration: "none",
          padding: "0.65rem 1.5rem", borderRadius: 12, fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.875rem",
          boxShadow: "0 4px 12px rgba(28,58,107,0.3)",
        }}>+ Add Hotel</Link>
      </div>

      <div style={{ background: "white", borderRadius: 20, border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)", overflow: "hidden" }}>
        {hotels.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏨</div>
            <p style={{ color: "#6B7280", fontFamily: "var(--font-body)" }}>No hotels added yet.</p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#F8F9FB" }}>
              <tr>
                {["Hotel Name", "Location", "Stars", "Phone", "Status", ""].map(h => (
                  <th key={h} style={{ padding: "0.875rem 1rem", textAlign: "left", fontSize: "0.75rem", color: "#6B7280", fontFamily: "var(--font-body)", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hotels.map(h => (
                <tr key={h.id} style={{ borderTop: "1px solid #F3F4F6" }}>
                  <td style={{ padding: "0.875rem 1rem", fontWeight: 600, color: "#111827", fontSize: "0.875rem", fontFamily: "var(--font-body)" }}>{h.name}</td>
                  <td style={{ padding: "0.875rem 1rem", color: "#6B7280", fontSize: "0.875rem", fontFamily: "var(--font-body)" }}>{h.location}</td>
                  <td style={{ padding: "0.875rem 1rem", color: "#F5C200", fontSize: "0.875rem" }}>{"★".repeat(h.stars)}</td>
                  <td style={{ padding: "0.875rem 1rem", color: "#374151", fontSize: "0.875rem", fontFamily: "var(--font-body)" }}>{h.phone || "-"}</td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "0.25rem 0.75rem", borderRadius: 999, background: h.isActive ? "#D1FAE5" : "#F3F4F6", color: h.isActive ? "#065F46" : "#374151", fontFamily: "var(--font-body)" }}>{h.isActive ? "Active" : "Inactive"}</span>
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <Link href={`/crm/hotels/${h.id}/edit`} style={{ color: "#1C3A6B", textDecoration: "none", fontSize: "0.8rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
