import { prisma } from "@/lib/prisma"
import { auth } from "../../auth"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) redirect("/crm/login")
  const { id } = await params

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      customer: true,
      payments: { orderBy: { paidAt: "desc" } },
      flights: true,
      guideAssignment: { include: { guide: true } },
      hotels: { include: { hotel: true } },
      transports: true,
      meals: { include: { restaurant: true }, orderBy: { date: "asc" } },
      members: { orderBy: { createdAt: "asc" } },
    }
  })
  if (!booking) notFound()

  const paid = booking.payments.reduce((s, p) => s + p.amount, 0)
  const due = booking.totalAmount - paid

  const statusColor: Record<string, { bg: string; color: string }> = {
    inquiry: { bg: "#FEF3C7", color: "#92400E" },
    confirmed: { bg: "#D1FAE5", color: "#065F46" },
    in_progress: { bg: "#DBEAFE", color: "#1E40AF" },
    completed: { bg: "#F3F4F6", color: "#374151" },
    cancelled: { bg: "#FEE2E2", color: "#991B1B" },
  }
  const sc = statusColor[booking.status] || statusColor.inquiry

  return (
    <div style={{ maxWidth: 1000 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
        <div>
          <Link href="/crm/bookings" style={{ color: "#6B7280", fontSize: "0.8rem", fontFamily: "var(--font-body)", textDecoration: "none" }}>← Back to Bookings</Link>
          <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "2rem", color: "#1C3A6B", margin: "0.5rem 0 0.25rem" }}>{booking.packageName}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link href={`/crm/customers/${booking.customerId}`} style={{ color: "#6B7280", fontSize: "0.875rem", fontFamily: "var(--font-body)", textDecoration: "none", fontWeight: 500 }}>👤 {booking.customer.name}</Link>
            <span style={{ fontSize: "0.7rem", fontWeight: 600, fontFamily: "var(--font-body)", padding: "0.25rem 0.75rem", borderRadius: 999, background: sc.bg, color: sc.color }}>{booking.status}</span>
          </div>
        </div>
        <Link href={`/crm/bookings/${id}/edit`} style={{
          background: "#F3F4F6", color: "#374151", textDecoration: "none",
          padding: "0.6rem 1.25rem", borderRadius: 10,
          fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem",
        }}>Edit Booking</Link>
      </div>

      {/* Payment Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
        {[
          { label: "Total Amount", value: `৳${booking.totalAmount.toLocaleString()}`, color: "#1C3A6B", bg: "rgba(28,58,107,0.06)" },
          { label: "Total Paid", value: `৳${paid.toLocaleString()}`, color: "#059669", bg: "rgba(5,150,105,0.06)" },
          { label: "Balance Due", value: `৳${due.toLocaleString()}`, color: due > 0 ? "#DC2626" : "#059669", bg: due > 0 ? "rgba(220,38,38,0.06)" : "rgba(5,150,105,0.06)" },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 16, padding: "1.25rem", border: `1px solid ${s.color}20` }}>
            <div style={{ fontSize: "0.7rem", color: "#6B7280", fontFamily: "var(--font-body)", marginBottom: "0.35rem" }}>{s.label}</div>
            <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "1.75rem", color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Group Members */}
      <div style={{ background: "white", borderRadius: 20, padding: "1.5rem", border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.9rem", color: "#111827", margin: 0 }}>👥 Group Members <span style={{ color: "#9CA3AF", fontWeight: 500 }}>({booking.members.length})</span></h3>
          <Link href={`/crm/bookings/${id}/members/new`} style={{ background: "linear-gradient(135deg, #1C3A6B, #2A5099)", color: "white", textDecoration: "none", padding: "0.45rem 1rem", borderRadius: 10, fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.8rem", boxShadow: "0 4px 12px rgba(28,58,107,0.3)" }}>+ Add Member</Link>
        </div>
        {booking.members.length === 0 ? (
          <p style={{ color: "#9CA3AF", fontSize: "0.8rem", fontFamily: "var(--font-body)", margin: 0 }}>No members added yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #F3F4F6" }}>
                {["#", "Name", "Phone", "NID", "Passport No.", "Expiry", ""].map(h => (
                  <th key={h} style={{ padding: "0.5rem 0.75rem", textAlign: "left", fontSize: "0.72rem", color: "#6B7280", fontFamily: "var(--font-body)", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {booking.members.map((m, i) => (
                <tr key={m.id} style={{ borderBottom: "1px solid #F9FAFB" }}>
                  <td style={{ padding: "0.65rem 0.75rem", fontSize: "0.8rem", color: "#9CA3AF", fontFamily: "var(--font-body)" }}>{i + 1}</td>
                  <td style={{ padding: "0.65rem 0.75rem", fontSize: "0.8rem", fontWeight: 600, color: "#111827", fontFamily: "var(--font-body)" }}>{m.name}</td>
                  <td style={{ padding: "0.65rem 0.75rem", fontSize: "0.8rem", color: "#374151", fontFamily: "var(--font-body)" }}>{m.phone}</td>
                  <td style={{ padding: "0.65rem 0.75rem", fontSize: "0.8rem", color: "#6B7280", fontFamily: "var(--font-body)" }}>{m.nid || "-"}</td>
                  <td style={{ padding: "0.65rem 0.75rem", fontSize: "0.8rem", color: "#6B7280", fontFamily: "var(--font-body)" }}>{m.passportNumber || "-"}</td>
                  <td style={{ padding: "0.65rem 0.75rem", fontSize: "0.8rem", color: "#6B7280", fontFamily: "var(--font-body)" }}>{m.passportExpiry || "-"}</td>
                  <td style={{ padding: "0.65rem 0.75rem" }}>
                    <Link href={`/crm/bookings/${id}/members/${m.id}/edit`} style={{ color: "#1C3A6B", textDecoration: "none", fontSize: "0.78rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>

        {/* Tour Info */}
        <div style={{ background: "white", borderRadius: 20, padding: "1.5rem", border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)" }}>
          <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.9rem", color: "#111827", margin: "0 0 1rem" }}>Tour Details</h3>
          {[
            { label: "Package", value: booking.packageName },
            { label: "Duration", value: `${booking.packageDays} Days` },
            { label: "Start Date", value: new Date(booking.tourStartDate).toLocaleDateString() },
            { label: "End Date", value: new Date(booking.tourEndDate).toLocaleDateString() },
            { label: "Group Size", value: `${booking.groupSize} person(s)` },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid #F3F4F6" }}>
              <span style={{ fontSize: "0.8rem", color: "#6B7280", fontFamily: "var(--font-body)" }}>{item.label}</span>
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#111827", fontFamily: "var(--font-body)" }}>{item.value}</span>
            </div>
          ))}
          {booking.notes && (
            <div style={{ marginTop: "0.75rem", padding: "0.75rem", background: "#FEF9EE", borderRadius: 10 }}>
              <div style={{ fontSize: "0.75rem", color: "#78350F", fontFamily: "var(--font-body)" }}>{booking.notes}</div>
            </div>
          )}
        </div>

        {/* Payments */}
        <div style={{ background: "white", borderRadius: 20, padding: "1.5rem", border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.9rem", color: "#111827", margin: 0 }}>Payments</h3>
            <Link href={`/crm/bookings/${id}/payment`} style={{
              background: "#059669", color: "white", textDecoration: "none",
              padding: "0.4rem 0.875rem", borderRadius: 8,
              fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.75rem",
            }}>+ Add Payment</Link>
          </div>
          {booking.payments.length === 0 ? (
            <p style={{ color: "#9CA3AF", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>No payments recorded.</p>
          ) : (
            booking.payments.map(p => (
              <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 0", borderBottom: "1px solid #F3F4F6" }}>
                <div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#111827", fontFamily: "var(--font-body)" }}>৳{p.amount.toLocaleString()}</div>
                  <div style={{ fontSize: "0.7rem", color: "#6B7280", fontFamily: "var(--font-body)" }}>{p.method} · {new Date(p.paidAt).toLocaleDateString()}</div>
                </div>
                {p.reference && <span style={{ fontSize: "0.7rem", color: "#6B7280", fontFamily: "var(--font-body)" }}>Ref: {p.reference}</span>}
              </div>
            ))
          )}
        </div>

        {/* Flights */}
        <div style={{ background: "white", borderRadius: 20, padding: "1.5rem", border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.9rem", color: "#111827", margin: 0 }}>✈️ Flights</h3>
            <Link href={`/crm/bookings/${id}/flights`} style={{ color: "#1C3A6B", textDecoration: "none", fontSize: "0.75rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>+ Add</Link>
          </div>
          {booking.flights.length === 0 ? (
            <p style={{ color: "#9CA3AF", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>No flights added.</p>
          ) : booking.flights.map(f => (
            <div key={f.id} style={{ padding: "0.6rem 0", borderBottom: "1px solid #F3F4F6" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#111827", fontFamily: "var(--font-body)" }}>{f.type === "departure" ? "🛫" : "🛬"} {f.airline} {f.flightNumber}</div>
              <div style={{ fontSize: "0.75rem", color: "#6B7280", fontFamily: "var(--font-body)" }}>{f.departureFrom} → {f.departureTo}</div>
            </div>
          ))}
        </div>

        {/* Guide */}
        <div style={{ background: "white", borderRadius: 20, padding: "1.5rem", border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.9rem", color: "#111827", margin: 0 }}>🧭 Guide</h3>
            {!booking.guideAssignment && (
              <Link href={`/crm/bookings/${id}/guide`} style={{ color: "#1C3A6B", textDecoration: "none", fontSize: "0.75rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>+ Assign</Link>
            )}
          </div>
          {!booking.guideAssignment ? (
            <p style={{ color: "#9CA3AF", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>No guide assigned.</p>
          ) : (
            <div>
              <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827", fontFamily: "var(--font-body)" }}>{booking.guideAssignment.guide.name}</div>
              <div style={{ fontSize: "0.8rem", color: "#6B7280", fontFamily: "var(--font-body)" }}>{booking.guideAssignment.guide.phone}</div>
              {booking.guideAssignment.rating && (
                <div style={{ fontSize: "0.8rem", color: "#F5C200", marginTop: "0.25rem" }}>{"★".repeat(booking.guideAssignment.rating)}</div>
              )}
              {booking.status === "completed" && !booking.guideAssignment.rating && (
                <Link href={`/crm/bookings/${id}/guide-rating`} style={{ display: "block", textAlign: "center", marginTop: "0.75rem", background: "#FEF9EE", border: "1px solid #FDE68A", color: "#92400E", padding: "0.5rem", borderRadius: 10, textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 600 }}>⭐ Rate this guide</Link>
              )}
            </div>
          )}
        </div>

        {/* Hotel */}
        <div style={{ background: "white", borderRadius: 20, padding: "1.5rem", border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.9rem", color: "#111827", margin: 0 }}>🏨 Hotels</h3>
            <Link href={`/crm/bookings/${id}/hotel`} style={{ color: "#1C3A6B", textDecoration: "none", fontSize: "0.75rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>+ Add</Link>
          </div>
          {booking.hotels.length === 0 ? (
            <p style={{ color: "#9CA3AF", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>No hotel booked.</p>
          ) : booking.hotels.map(h => (
            <div key={h.id} style={{ padding: "0.6rem 0", borderBottom: "1px solid #F3F4F6" }}>
              <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111827", fontFamily: "var(--font-body)" }}>{"★".repeat(h.hotel.stars)} {h.hotel.name}</div>
              <div style={{ fontSize: "0.75rem", color: "#6B7280", fontFamily: "var(--font-body)" }}>{new Date(h.checkIn).toLocaleDateString()} → {new Date(h.checkOut).toLocaleDateString()} · {h.rooms} room(s)</div>
            </div>
          ))}
        </div>

        {/* Meals */}
        <div style={{ background: "white", borderRadius: 20, padding: "1.5rem", border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.9rem", color: "#111827", margin: 0 }}>🍽️ Meals</h3>
            <Link href={`/crm/bookings/${id}/meal`} style={{ color: "#1C3A6B", textDecoration: "none", fontSize: "0.75rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>+ Add</Link>
          </div>
          {booking.meals.length === 0 ? (
            <p style={{ color: "#9CA3AF", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>No meals scheduled.</p>
          ) : booking.meals.map(m => (
            <div key={m.id} style={{ padding: "0.5rem 0", borderBottom: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#111827", fontFamily: "var(--font-body)" }}>{new Date(m.date).toLocaleDateString()} · {m.mealType}</div>
                {m.restaurant && <div style={{ fontSize: "0.75rem", color: "#6B7280", fontFamily: "var(--font-body)" }}>{m.restaurant.name}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Transport */}
        <div style={{ background: "white", borderRadius: 20, padding: "1.5rem", border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.9rem", color: "#111827", margin: 0 }}>🚌 Transport</h3>
            <Link href={`/crm/bookings/${id}/transport`} style={{ color: "#1C3A6B", textDecoration: "none", fontSize: "0.75rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>+ Add</Link>
          </div>
          {booking.transports.length === 0 ? (
            <p style={{ color: "#9CA3AF", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}>No transport booked.</p>
          ) : booking.transports.map(t => (
            <div key={t.id} style={{ padding: "0.5rem 0", borderBottom: "1px solid #F3F4F6" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#111827", fontFamily: "var(--font-body)" }}>{t.type === "bus" ? "🚌" : t.type === "car" ? "🚗" : "🚐"} {t.type} {t.vehicleNumber ? `· ${t.vehicleNumber}` : ""}</div>
              <div style={{ fontSize: "0.75rem", color: "#6B7280", fontFamily: "var(--font-body)" }}>{t.pickupLocation} → {t.dropoffLocation}</div>
              <div style={{ fontSize: "0.75rem", color: "#6B7280", fontFamily: "var(--font-body)" }}>{new Date(t.pickupTime).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
