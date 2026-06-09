import { auth, signOut } from "@/auth";
import Image from "next/image";

export default async function AdminDashboardPage() {
  const session = await auth();

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-[#0A1628] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Fly China"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="text-white font-medium">Admin Panel</span>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              className="text-sm text-gray-300 hover:text-white border border-white/20 rounded-full px-4 py-1.5 transition"
            >
              Sign Out
            </button>
          </form>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-light text-[#1C3A6B] mb-2">
          Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}
        </h1>
        <p className="text-gray-500 mb-10">
          {session?.user?.email}
        </p>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <p className="text-gray-600">
            Dashboard coming soon — this is where you&apos;ll manage packages,
            FAQs, blog posts, gallery images, contact info, and inquiries.
          </p>
        </div>
      </div>
    </main>
  );
}
