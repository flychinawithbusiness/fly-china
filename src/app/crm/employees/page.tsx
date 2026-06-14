import { prisma } from "@/lib/prisma"
import { auth } from "../auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function EmployeesPage() {
  const session = await auth()
  if (!session) redirect("/crm/login")

  const currentUser = session.user as { role?: string }
  if (currentUser.role !== "admin") redirect("/crm")

  const employees = await prisma.crmEmployee.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700, fontSize: "2rem", color: "#1C3A6B", margin: 0 }}>Employees</h1>
          <p style={{ color: "#6B7280", fontSize: "0.875rem", fontFamily: "var(--font-body)", marginTop: "0.25rem" }}>Admin only — {employees.length} staff members</p>
        </div>
        <Link href="/crm/employees/new" style={{
          background: "linear-gradient(135deg, #1C3A6B, #2A5099)", color: "white", textDecoration: "none",
          padding: "0.65rem 1.5rem", borderRadius: 12, fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.875rem",
          boxShadow: "0 4px 12px rgba(28,58,107,0.3)",
        }}>+ Add Employee</Link>
      </div>

      <div style={{ background: "white", borderRadius: 20, border: "1px solid rgba(28,58,107,0.07)", boxShadow: "0 4px 16px rgba(28,58,107,0.06)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#F8F9FB" }}>
            <tr>
              {["Name", "Email", "Phone", "Role", "Status", ""].map(h => (
                <th key={h} style={{ padding: "0.875rem 1rem", textAlign: "left", fontSize: "0.75rem", color: "#6B7280", fontFamily: "var(--font-body)", fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id} style={{ borderTop: "1px solid #F3F4F6" }}>
                <td style={{ padding: "0.875rem 1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #1C3A6B, #2A5099)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.875rem", fontWeight: 700, fontFamily: "var(--font-display)", flexShrink: 0 }}>{emp.name.charAt(0)}</div>
                    <span style={{ fontWeight: 600, color: "#111827", fontSize: "0.875rem", fontFamily: "var(--font-body)" }}>{emp.name}</span>
                  </div>
                </td>
                <td style={{ padding: "0.875rem 1rem", color: "#6B7280", fontSize: "0.875rem", fontFamily: "var(--font-body)" }}>{emp.email}</td>
                <td style={{ padding: "0.875rem 1rem", color: "#374151", fontSize: "0.875rem", fontFamily: "var(--font-body)" }}>{emp.phone || "-"}</td>
                <td style={{ padding: "0.875rem 1rem" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "0.25rem 0.75rem", borderRadius: 999, background: emp.role === "admin" ? "#EEF2FF" : "#F3F4F6", color: emp.role === "admin" ? "#4338CA" : "#374151", fontFamily: "var(--font-body)" }}>{emp.role}</span>
                </td>
                <td style={{ padding: "0.875rem 1rem" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "0.25rem 0.75rem", borderRadius: 999, background: emp.isActive ? "#D1FAE5" : "#FEE2E2", color: emp.isActive ? "#065F46" : "#991B1B", fontFamily: "var(--font-body)" }}>{emp.isActive ? "Active" : "Inactive"}</span>
                </td>
                <td style={{ padding: "0.875rem 1rem" }}>
                  <Link href={`/crm/employees/${emp.id}/edit`} style={{ color: "#1C3A6B", textDecoration: "none", fontSize: "0.8rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
