import { prisma } from "@/lib/prisma"
import { auth } from "../auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function PaymentsPage() {
  const session = await auth()
  if (!session) redirect("/crm/login")

  const payments = await prisma.payment.findMany({
    orderBy: { paidAt: "desc" },
    include: { booking: { include: { customer: true } } }
  })

  const total = payments.reduce((s, p) => s + p.amount, 0)

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "2rem", color: "#1C3A6B", margin: 0 }}>Payments</h1>
        <p style={{ color: "#6B7280", fontSize: "0.875rem", fontFamily: "var(--font-body)", marginTop: "0.25rem" }}>Total collected: <strong style={{ color: "#059669" }}>৳{total.toLocaleString()}</strong></p>
      </div>

      <div style={{ background: "white", borderRadius: 20, border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)", overflow: "hidden" }}>
        {payments.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💰</div>
            <p style={{ color: "#6B7280", fontFamily: "var(--font-body)" }}>No payments recorded yet.</p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#F8F9FB" }}>
              <tr>
                {["Customer", "Package", "Amount", "Method", "Reference", "Date"].map(h => (
                  <th key={h} style={{ padding: "0.875rem 1rem", textAlign: "left", fontSize: "0.75rem", color: "#6B7280", fontFamily: "var(--font-body)", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id} style={{ borderTop: "1px solid #F3F4F6" }}>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <Link href={`/crm/customers/${p.booking.customerId}`} style={{ fontWeight: 600, color: "#1C3A6B", fontSize: "0.875rem", fontFamily: "var(--font-body)", textDecoration: "none" }}>{p.booking.customer.name}</Link>
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "#374151", fontSize: "0.875rem", fontFamily: "var(--font-body)" }}>{p.booking.packageName}</td>
                  <td style={{ padding: "0.875rem 1rem", fontWeight: 700, color: "#059669", fontSize: "0.875rem", fontFamily: "var(--font-body)" }}>৳{p.amount.toLocaleString()}</td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "0.25rem 0.75rem", borderRadius: 999, background: "#F3F4F6", color: "#374151", fontFamily: "var(--font-body)" }}>{p.method}</span>
                  </td>
                  <td style={{ padding: "0.875rem 1rem", color: "#6B7280", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>{p.reference || "-"}</td>
                  <td style={{ padding: "0.875rem 1rem", color: "#6B7280", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>{new Date(p.paidAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
