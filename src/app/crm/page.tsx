import { redirect } from "next/navigation";
import Image from "next/image";
import { auth, signOut } from "@/app/crm/auth";

export default async function CrmHome() {
  const session = await auth();
  if (!session) redirect("/crm/login");

  const user = session.user as { name?: string; email?: string; role?: string };

  return (
    <main style={{ minHeight: "100vh" }}>
      <header
        style={{
          background: "linear-gradient(135deg, #0A1628, #1C3A6B)",
          padding: "1rem 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: "72rem",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            src="/images/logo.png"
            alt="FlyChina CRM"
            width={120}
            height={34}
            style={{ objectFit: "contain" }}
          />
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/crm/login" });
            }}
          >
            <button
              type="submit"
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 999,
                padding: "0.4rem 1.1rem",
                fontSize: "0.8rem",
                fontFamily: "var(--font-body)",
                cursor: "pointer",
              }}
            >
              Sign Out
            </button>
          </form>
        </div>
      </header>

      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "2.2rem",
            color: "#1C3A6B",
            margin: 0,
          }}
        >
          Welcome{user.name ? `, ${user.name}` : ""}
        </h1>
        <p
          style={{
            color: "#6B7280",
            fontFamily: "var(--font-body)",
            marginTop: "0.5rem",
          }}
        >
          {user.email}
          {user.role ? ` · ${user.role}` : ""}
        </p>

        <div
          style={{
            marginTop: "2rem",
            background: "white",
            borderRadius: 16,
            padding: "2rem",
            border: "1px solid rgba(28,58,107,0.08)",
            boxShadow: "0 2px 8px rgba(28,58,107,0.06)",
          }}
        >
          <p style={{ color: "#4B5563", fontFamily: "var(--font-body)", margin: 0 }}>
            CRM dashboard coming soon — manage customers, bookings, flights,
            hotels, guides, and payments here.
          </p>
        </div>
      </div>
    </main>
  );
}
