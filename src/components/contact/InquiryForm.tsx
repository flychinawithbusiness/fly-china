"use client";

import { useState, type FormEvent } from "react";
import { submitInquiry } from "@/app/contact/actions";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
  "Flexible",
];

const inputClass = "fc-input";
const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

const formContainerStyle: React.CSSProperties = {
  border: "1px solid rgba(28,58,107,0.08)",
  boxShadow: "0 8px 40px rgba(28,58,107,0.1)",
  borderRadius: 24,
};

type FormData = {
  fullName: string;
  country: string;
  phone: string;
  email: string;
  duration: string;
  month: string;
  people: string;
  message: string;
};

const EMPTY: FormData = {
  fullName: "",
  country: "",
  phone: "",
  email: "",
  duration: "7 Days (Most Popular)",
  month: "Flexible",
  people: "1-2",
  message: "",
};

export default function InquiryForm() {
  const [data, setData] = useState<FormData>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await submitInquiry({
        name: data.fullName,
        country: data.country,
        whatsapp: data.phone,
        email: data.email || undefined,
        duration: data.duration,
        month: data.month,
        groupSize: data.people,
        message: data.message || undefined,
      });
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="bg-white p-8 text-center" style={formContainerStyle}>
        <div className="bg-green-50 text-green-700 rounded-2xl p-6 mb-6">
          <p className="text-lg font-semibold">
            ✅ Thank you! We&apos;ll contact you within 24 hours.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setData(EMPTY);
            setSuccess(false);
            setError(null);
          }}
          className="bg-[#1C3A6B] text-white rounded-full px-6 py-3 font-semibold hover:bg-[#2A5099] transition"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8" style={formContainerStyle}>
      <h2 className="font-semibold text-[#1C3A6B] text-xl mb-6">
        Send an Inquiry
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}
        <div>
          <label className={labelClass} htmlFor="fullName">
            Full Name *
          </label>
          <input
            id="fullName"
            required
            value={data.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="country">
            Country *
          </label>
          <input
            id="country"
            required
            value={data.country}
            onChange={(e) => update("country", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">
            WhatsApp / Phone *
          </label>
          <input
            id="phone"
            required
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="duration">
            Tour Duration
          </label>
          <select
            id="duration"
            value={data.duration}
            onChange={(e) => update("duration", e.target.value)}
            className={inputClass}
          >
            <option>7 Days (Most Popular)</option>
            <option>10 Days</option>
            <option>14 Days</option>
            <option>Custom</option>
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="month">
            Preferred Month
          </label>
          <select
            id="month"
            value={data.month}
            onChange={(e) => update("month", e.target.value)}
            className={inputClass}
          >
            {MONTHS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="people">
            Number of People
          </label>
          <select
            id="people"
            value={data.people}
            onChange={(e) => update("people", e.target.value)}
            className={inputClass}
          >
            <option>1-2</option>
            <option>3-5</option>
            <option>6-10</option>
            <option>10+</option>
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="message">
            Message / Special Requirements
          </label>
          <textarea
            id="message"
            rows={4}
            value={data.message}
            onChange={(e) => update("message", e.target.value)}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#F5C200] text-[#1C3A6B] font-bold rounded-full py-4 text-base hover:bg-[#D4A800] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send Inquiry"}
        </button>
      </form>
    </div>
  );
}
