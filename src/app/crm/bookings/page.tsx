import { prisma } from "@/lib/prisma"
import { auth } from "../auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function BookingsPage() {
  const session = await auth()
  if (!session) redirect("/crm/login")

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      customer: true,
      payments: true,
    }
  })

  const statusColor: Record<string, { bg: string; color: string }> = {
    inquiry: { bg: "#FEF3C7", color: "#92400E" },
    confirmed: { bg: "#D1FAE5", color: "#065F46" },
    in_progress: { bg: "#DBEAFE", color: "#1E40AF" },
    completed: { bg: "#F3F4F6", color: "#374151" },
    cancelled: { bg: "#FEE2E2", color: "#991B1B" },
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "2rem", color: "#1C3A6B", margin: 0 }}>Bookings</h1>
          <p style={{ color: "#6B7280", fontSize: "0.875rem", fontFamily: "var(--font-body)", marginTop: "0.25rem" }}>{bookings.length} total bookings</p>
        </div>
        <Link href="/crm/bookings/new" style={{
          background: "linear-gradient(135deg, #1C3A6B, #2A5099)",
          color: "white", textDecoration: "none",
          padding: "0.65rem 1.5rem", borderRadius: 12,
          fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.875rem",
          boxShadow: "0 4px 12px rgba(28,58,107,0.3)",
        }}>+ New Booking</Link>
      </div>

      {bookings.length === 0 ? (
        <div style={{ textAlign: "center", padding: "5rem", background: "white", borderRadius: 20, border: "1px solid rgba(28,58,107,0.07)" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📋</div>
          <p style={{ color: "#6B7280", fontFamily: "var(--font-body)" }}>No bookings yet.</p>
        </div>
      ) : (
        <div style={{ background: "white", borderRadius: 20, border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#F8F9FB" }}>
              <tr>
                {["Customer", "Package", "Tour Dates", "Group", "Total", "Paid", "Due", "Status", ""].map(h => (
                  <th key={h} style={{ padding: "0.875rem 1rem", textAlign: "left", fontSize: "0.75rem", color: "#6B7280", fontFamily: "var(--font-body)", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => {
                const paid = b.payments.reduce((s, p) => s + p.amount, 0)
                const due = b.totalAmount - paid
                const sc = statusColor[b.status] || statusColor.inquiry
                return (
                  <tr key={b.id} style={{ borderTop: "1px solid #F3F4F6" }}>
                    <td style={{ padding: "0.875rem 1rem" }}>
                      <div style={{ fontWeight: 600, color: "#111827", fontSize: "0.875rem", fontFamily: "var(--font-body)" }}>{b.customer.name}</div>
                      <div style={{ color: "#6B7280", fontSize: "0.75rem", fontFamily: "var(--font-body)" }}>{b.customer.phone}</div>
                    </td>
                    <td style={{ padding: "0.875rem 1rem", color: "#374151", fontSize: "0.875rem", fontFamily: "var(--font-body)", fontWeight: 500 }}>{b.packageName}</td>
                    <td style={{ padding: "0.875rem 1rem", color: "#6B7280", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>
                      {new Date(b.tourStartDate).toLocaleDateString()}<br/>
                      {new Date(b.tourEndDate).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "0.875rem 1rem", color: "#374151", fontSize: "0.875rem", fontFamily: "var(--font-body)", textAlign: "center" }}>{b.groupSize}</td>
                    <td style={{ padding: "0.875rem 1rem", color: "#111827", fontSize: "0.875rem", fontFamily: "var(--font-body)", fontWeight: 600 }}>৳{b.totalAmount.toLocaleString()}</td>
                    <td style={{ padding: "0.875rem 1rem", color: "#059669", fontSize: "0.875rem", fontFamily: "var(--font-body)", fontWeight: 600 }}>৳{paid.toLocaleString()}</td>
                    <td style={{ padding: "0.875rem 1rem", fontSize: "0.875rem", fontFamily: "var(--font-body)", fontWeight: 600, color: due > 0 ? "#DC2626" : "#059669" }}>৳{due.toLocaleString()}</td>
                    <td style={{ padding: "0.875rem 1rem" }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 600, fontFamily: "var(--font-body)", padding: "0.25rem 0.75rem", borderRadius: 999, background: sc.bg, color: sc.color }}>{b.status}</span>
                    </td>
                    <td style={{ padding: "0.875rem 1rem" }}>
                      <Link href={`/crm/bookings/${b.id}`} style={{ color: "#1C3A6B", textDecoration: "none", fontSize: "0.8rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>View</Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
