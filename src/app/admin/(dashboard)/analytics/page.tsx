import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

async function updateAnalytics(formData: FormData) {
  "use server";
  const fields = ["gtm_id", "meta_pixel_id", "ga4_id"];
  for (const key of fields) {
    const value = (formData.get(key) as string) ?? "";
    await prisma.contactInfo.upsert({
      where: { key },
      update: { value },
      create: { key, label: key, value },
    });
  }
  redirect("/admin/analytics");
}

export default async function AnalyticsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const items = await prisma.contactInfo.findMany({
    where: { key: { in: ["gtm_id", "meta_pixel_id", "ga4_id"] } },
  });
  const get = (key: string) => items.find((i) => i.key === key)?.value ?? "";

  return (
    <div className="p-8">
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "2rem",
            fontWeight: 700,
            color: "#1C3A6B",
            margin: 0,
          }}
        >
          Analytics &amp; Tracking
        </h1>
        <p
          style={{
            color: "#6B7280",
            fontSize: "0.875rem",
            marginTop: "0.5rem",
            fontFamily: "var(--font-body)",
          }}
        >
          Add your tracking IDs. Leave blank to disable.
        </p>
      </div>

      <form action={updateAnalytics}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            maxWidth: 560,
          }}
        >
          {/* GTM */}
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: "1.5rem",
              border: "1px solid rgba(28,58,107,0.08)",
              boxShadow: "0 2px 8px rgba(28,58,107,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "#1C3A6B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                }}
              >
                🏷️
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    color: "#111827",
                    fontSize: "0.95rem",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Google Tag Manager
                </div>
                <div
                  style={{
                    color: "#6B7280",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Format: GTM-XXXXXXX
                </div>
              </div>
            </div>
            <input
              name="gtm_id"
              defaultValue={get("gtm_id")}
              placeholder="GTM-XXXXXXX"
              className="fc-input"
            />
          </div>

          {/* Meta Pixel */}
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: "1.5rem",
              border: "1px solid rgba(28,58,107,0.08)",
              boxShadow: "0 2px 8px rgba(28,58,107,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "#1877F2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                }}
              >
                📘
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    color: "#111827",
                    fontSize: "0.95rem",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Meta Pixel (Facebook)
                </div>
                <div
                  style={{
                    color: "#6B7280",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Format: 15-digit number
                </div>
              </div>
            </div>
            <input
              name="meta_pixel_id"
              defaultValue={get("meta_pixel_id")}
              placeholder="123456789012345"
              className="fc-input"
            />
          </div>

          {/* GA4 */}
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: "1.5rem",
              border: "1px solid rgba(28,58,107,0.08)",
              boxShadow: "0 2px 8px rgba(28,58,107,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "#F9AB00",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                }}
              >
                📊
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    color: "#111827",
                    fontSize: "0.95rem",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Google Analytics 4
                </div>
                <div
                  style={{
                    color: "#6B7280",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Format: G-XXXXXXXXXX
                </div>
              </div>
            </div>
            <input
              name="ga4_id"
              defaultValue={get("ga4_id")}
              placeholder="G-XXXXXXXXXX"
              className="fc-input"
            />
          </div>

          <button
            type="submit"
            style={{
              background: "linear-gradient(135deg, #1C3A6B, #2A5099)",
              color: "white",
              border: "none",
              borderRadius: 12,
              padding: "0.85rem 2rem",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(28,58,107,0.3)",
            }}
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
