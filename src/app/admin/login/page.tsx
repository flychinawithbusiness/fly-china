"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Lock, Mail } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0A1628] px-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/images/logo.png"
            alt="Fly China"
            width={56}
            height={56}
            className="rounded-lg mb-4"
            priority
          />
          <h1 className="text-2xl font-light text-white">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">
            Sign in to manage Fly China
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-8 space-y-5"
        >
          {error && (
            <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Email
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@flychina.com"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#1C3A6B] transition"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#1C3A6B] transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F5C200] text-[#1C3A6B] font-bold rounded-full py-3.5 text-base hover:bg-[#D4A800] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-6">
          Fly China — Authorized personnel only
        </p>
      </div>
    </main>
  );
}
