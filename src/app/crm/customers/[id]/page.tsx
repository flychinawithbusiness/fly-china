import { prisma } from "@/lib/prisma"
import { auth } from "../../auth"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) redirect("/crm/login")
  const { id } = await params

  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      bookings: {
        orderBy: { createdAt: "desc" },
        include: { payments: true }
      }
    }
  })
  if (!customer) notFound()

  const totalPaid = customer.bookings.reduce((sum, b) => sum + b.payments.reduce((s, p) => s + p.amount, 0), 0)

  return (
    <div style={{ maxWidth: 900 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
        <div>
          <Link href="/crm/customers" style={{ color: "#6B7280", fontSize: "0.8rem", fontFamily: "var(--font-body)", textDecoration: "none" }}>← Back to Customers</Link>
          <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "2rem", color: "#1C3A6B", margin: "0.5rem 0 0" }}>{customer.name}</h1>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link href={`/crm/customers/${id}/edit`} style={{
            background: "#F3F4F6", color: "#374151", textDecoration: "none",
            padding: "0.6rem 1.25rem", borderRadius: 10,
            fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem",
          }}>Edit</Link>
          <Link href={`/crm/bookings/new?customerId=${id}`} style={{
            background: "linear-gradient(135deg, #1C3A6B, #2A5099)",
            color: "white", textDecoration: "none",
            padding: "0.6rem 1.25rem", borderRadius: 10,
            fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.875rem",
            boxShadow: "0 4px 12px rgba(28,58,107,0.3)",
          }}>+ New Booking</Link>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1.5rem" }}>

        {/* Personal Info Card */}
        <div style={{
          background: "white", borderRadius: 20, padding: "1.5rem",
          border: "1px solid rgba(28,58,107,0.07)",
          boxShadow: "0 4px 16px rgba(28,58,107,0.06)",
          height: "fit-content",
        }}>
          {/* Avatar */}
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "linear-gradient(135deg, #1C3A6B, #2A5099)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "2rem", color: "white", fontWeight: 700,
            fontFamily: "var(--font-display)", marginBottom: "1.25rem",
          }}>
            {customer.name.charAt(0).toUpperCase()}
          </div>

          <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1.1rem", color: "#111827", margin: "0 0 1rem" }}>{customer.name}</h2>

          {[
            { label: "Phone", value: customer.phone },
            { label: "Email", value: customer.email },
            { label: "NID", value: customer.nid },
            { label: "Passport", value: customer.passportNumber },
            { label: "Address", value: customer.address },
          ].map(item => item.value && (
            <div key={item.label} style={{ marginBottom: "0.75rem" }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-body)" }}>{item.label}</div>
              <div style={{ fontSize: "0.875rem", color: "#374151", fontFamily: "var(--font-body)", marginTop: "0.15rem" }}>{item.value}</div>
            </div>
          ))}

          {customer.notes && (
            <div style={{ marginTop: "1rem", padding: "0.75rem", background: "#FEF9EE", borderRadius: 10, border: "1px solid #FDE68A" }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "#92400E", fontFamily: "var(--font-body)", marginBottom: "0.25rem" }}>NOTES</div>
              <div style={{ fontSize: "0.8rem", color: "#78350F", fontFamily: "var(--font-body)" }}>{customer.notes}</div>
            </div>
          )}

          {/* Stats */}
          <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid #F3F4F6", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "1.5rem", color: "#1C3A6B" }}>{customer.bookings.length}</div>
              <div style={{ fontSize: "0.7rem", color: "#6B7280", fontFamily: "var(--font-body)" }}>Total Trips</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "1.5rem", color: "#059669" }}>৳{totalPaid.toLocaleString()}</div>
              <div style={{ fontSize: "0.7rem", color: "#6B7280", fontFamily: "var(--font-body)" }}>Total Paid</div>
            </div>
          </div>
        </div>

        {/* Bookings */}
        <div>
          <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1rem", color: "#111827", margin: "0 0 1rem" }}>Booking History</h3>
          {customer.bookings.length === 0 ? (
            <div style={{ background: "white", borderRadius: 20, padding: "3rem", textAlign: "center", border: "1px solid rgba(28,58,107,0.07)" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📋</div>
              <p style={{ color: "#6B7280", fontFamily: "var(--font-body)", fontSize: "0.875rem" }}>No bookings yet.</p>
              <Link href={`/crm/bookings/new?customerId=${id}`} style={{
                display: "inline-block", marginTop: "1rem",
                background: "#1C3A6B", color: "white", textDecoration: "none",
                padding: "0.6rem 1.25rem", borderRadius: 10,
                fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem",
              }}>Create First Booking</Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {customer.bookings.map(b => {
                const paid = b.payments.reduce((s, p) => s + p.amount, 0)
                const due = b.totalAmount - paid
                return (
                  <Link key={b.id} href={`/crm/bookings/${b.id}`} style={{
                    display: "block", background: "white", borderRadius: 16,
                    padding: "1.25rem", border: "1px solid rgba(28,58,107,0.07)",
                    boxShadow: "0 2px 8px rgba(28,58,107,0.05)", textDecoration: "none",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontWeight: 700, color: "#111827", fontSize: "0.95rem", fontFamily: "var(--font-body)" }}>{b.packageName}</div>
                        <div style={{ color: "#6B7280", fontSize: "0.8rem", fontFamily: "var(--font-body)", marginTop: "0.2rem" }}>
                          {new Date(b.tourStartDate).toLocaleDateString()} → {new Date(b.tourEndDate).toLocaleDateString()}
                        </div>
                      </div>
                      <span style={{
                        fontSize: "0.7rem", fontWeight: 600, fontFamily: "var(--font-body)",
                        padding: "0.25rem 0.75rem", borderRadius: 999,
                        background: b.status === "confirmed" ? "#D1FAE5" : b.status === "completed" ? "#DBEAFE" : b.status === "cancelled" ? "#FEE2E2" : "#FEF3C7",
                        color: b.status === "confirmed" ? "#065F46" : b.status === "completed" ? "#1E40AF" : b.status === "cancelled" ? "#991B1B" : "#92400E",
                      }}>{b.status}</span>
                    </div>
                    <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.875rem", paddingTop: "0.875rem", borderTop: "1px solid #F3F4F6" }}>
                      <div>
                        <div style={{ fontSize: "0.7rem", color: "#9CA3AF", fontFamily: "var(--font-body)" }}>TOTAL</div>
                        <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", fontFamily: "var(--font-body)" }}>৳{b.totalAmount.toLocaleString()}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.7rem", color: "#9CA3AF", fontFamily: "var(--font-body)" }}>PAID</div>
                        <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#059669", fontFamily: "var(--font-body)" }}>৳{paid.toLocaleString()}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.7rem", color: "#9CA3AF", fontFamily: "var(--font-body)" }}>DUE</div>
                        <div style={{ fontSize: "0.95rem", fontWeight: 700, color: due > 0 ? "#DC2626" : "#059669", fontFamily: "var(--font-body)" }}>৳{due.toLocaleString()}</div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
