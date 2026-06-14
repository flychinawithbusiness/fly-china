import { prisma } from "@/lib/prisma";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export default async function CrmDashboard() {
  const session = await auth();
  if (!session) redirect("/crm/login");

  const [customers, bookings, payments] = await Promise.all([
    prisma.customer.count(),
    prisma.booking.count(),
    prisma.payment.aggregate({ _sum: { amount: true } }),
  ]);

  const recentBookings = await prisma.booking.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { customer: true },
  });

  const stats = [
    { label: "Total Customers", value: customers, icon: "👤", color: "#1C3A6B" },
    { label: "Total Bookings", value: bookings, icon: "📋", color: "#2A5099" },
    {
      label: "Total Revenue",
      value: `৳${(payments._sum.amount ?? 0).toLocaleString()}`,
      icon: "💰",
      color: "#0A1628",
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "2rem",
            color: "#1C3A6B",
            margin: 0,
          }}
        >
          Dashboard
        </h1>
        <p
          style={{
            color: "#6B7280",
            fontSize: "0.875rem",
            fontFamily: "var(--font-body)",
            marginTop: "0.25rem",
          }}
        >
          Welcome back, {session.user?.name}
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: s.color,
              borderRadius: 20,
              padding: "1.75rem",
              boxShadow: `0 8px 24px ${s.color}40`,
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
              {s.icon}
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "2rem",
                color: "#F5C200",
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.8rem",
                fontFamily: "var(--font-body)",
                marginTop: "0.25rem",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div
        style={{
          background: "white",
          borderRadius: 20,
          padding: "1.5rem",
          border: "1px solid rgba(28,58,107,0.07)",
          boxShadow: "0 4px 16px rgba(28,58,107,0.06)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: "1rem",
            color: "#111827",
            margin: "0 0 1.25rem",
          }}
        >
          Recent Bookings
        </h2>
        {recentBookings.length === 0 ? (
          <p
            style={{
              color: "#9CA3AF",
              fontSize: "0.875rem",
              fontFamily: "var(--font-body)",
            }}
          >
            No bookings yet.
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #F3F4F6" }}>
                {["Customer", "Package", "Tour Date", "Status", "Amount"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        padding: "0.5rem 0.75rem",
                        textAlign: "left",
                        fontSize: "0.75rem",
                        color: "#6B7280",
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                      }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b) => (
                <tr key={b.id} style={{ borderBottom: "1px solid #F9FAFB" }}>
                  <td
                    style={{
                      padding: "0.75rem",
                      fontSize: "0.875rem",
                      fontFamily: "var(--font-body)",
                      color: "#111827",
                      fontWeight: 500,
                    }}
                  >
                    {b.customer.name}
                  </td>
                  <td
                    style={{
                      padding: "0.75rem",
                      fontSize: "0.875rem",
                      fontFamily: "var(--font-body)",
                      color: "#6B7280",
                    }}
                  >
                    {b.packageName}
                  </td>
                  <td
                    style={{
                      padding: "0.75rem",
                      fontSize: "0.875rem",
                      fontFamily: "var(--font-body)",
                      color: "#6B7280",
                    }}
                  >
                    {new Date(b.tourStartDate).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        fontFamily: "var(--font-body)",
                        padding: "0.25rem 0.75rem",
                        borderRadius: 999,
                        background:
                          b.status === "confirmed"
                            ? "#D1FAE5"
                            : b.status === "completed"
                            ? "#DBEAFE"
                            : "#FEF3C7",
                        color:
                          b.status === "confirmed"
                            ? "#065F46"
                            : b.status === "completed"
                            ? "#1E40AF"
                            : "#92400E",
                      }}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "0.75rem",
                      fontSize: "0.875rem",
                      fontFamily: "var(--font-body)",
                      color: "#111827",
                      fontWeight: 600,
                    }}
                  >
                    ৳{b.totalAmount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
