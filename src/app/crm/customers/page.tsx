import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export default async function CustomersPage() {
  const session = await auth();
  if (!session) redirect("/crm/login");

  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { bookings: true } } },
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div>
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
            Customers
          </h1>
          <p
            style={{
              color: "#6B7280",
              fontSize: "0.875rem",
              fontFamily: "var(--font-body)",
              marginTop: "0.25rem",
            }}
          >
            {customers.length} total customers
          </p>
        </div>
        <Link
          href="/crm/customers/new"
          style={{
            background: "linear-gradient(135deg, #1C3A6B, #2A5099)",
            color: "white",
            textDecoration: "none",
            padding: "0.65rem 1.5rem",
            borderRadius: 12,
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: "0.875rem",
            boxShadow: "0 4px 12px rgba(28,58,107,0.3)",
          }}
        >
          + Add Customer
        </Link>
      </div>

      {customers.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "5rem",
            background: "white",
            borderRadius: 20,
            border: "1px solid rgba(28,58,107,0.07)",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>👤</div>
          <p style={{ color: "#6B7280", fontFamily: "var(--font-body)" }}>
            No customers yet. Add your first customer.
          </p>
        </div>
      ) : (
        <div
          style={{
            background: "white",
            borderRadius: 20,
            border: "1px solid rgba(28,58,107,0.07)",
            boxShadow: "0 4px 16px rgba(28,58,107,0.06)",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#F8F9FB" }}>
              <tr>
                {[
                  "Name",
                  "Phone",
                  "Passport No.",
                  "NID",
                  "Bookings",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "0.875rem 1rem",
                      textAlign: "left",
                      fontSize: "0.75rem",
                      color: "#6B7280",
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} style={{ borderTop: "1px solid #F3F4F6" }}>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <div
                      style={{
                        fontWeight: 600,
                        color: "#111827",
                        fontSize: "0.875rem",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {c.name}
                    </div>
                    {c.email && (
                      <div
                        style={{
                          color: "#6B7280",
                          fontSize: "0.75rem",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {c.email}
                      </div>
                    )}
                  </td>
                  <td
                    style={{
                      padding: "0.875rem 1rem",
                      color: "#374151",
                      fontSize: "0.875rem",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {c.phone}
                  </td>
                  <td
                    style={{
                      padding: "0.875rem 1rem",
                      color: "#374151",
                      fontSize: "0.875rem",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {c.passportNumber || "-"}
                  </td>
                  <td
                    style={{
                      padding: "0.875rem 1rem",
                      color: "#374151",
                      fontSize: "0.875rem",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {c.nid || "-"}
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <span
                      style={{
                        background: "#EEF2FF",
                        color: "#4338CA",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        padding: "0.2rem 0.6rem",
                        borderRadius: 999,
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {c._count.bookings} trips
                    </span>
                  </td>
                  <td style={{ padding: "0.875rem 1rem" }}>
                    <Link
                      href={`/crm/customers/${c.id}`}
                      style={{
                        color: "#1C3A6B",
                        textDecoration: "none",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        fontFamily: "var(--font-body)",
                        marginRight: "0.75rem",
                      }}
                    >
                      View
                    </Link>
                    <Link
                      href={`/crm/customers/${c.id}/edit`}
                      style={{
                        color: "#6B7280",
                        textDecoration: "none",
                        fontSize: "0.8rem",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
