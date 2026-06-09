"use client";

import { useState, useTransition } from "react";
import { updateInquiryStatus, deleteInquiry } from "./actions";
import { digitsOnly } from "@/lib/contact";

type Inquiry = {
  id: string;
  name: string;
  country: string;
  whatsapp: string;
  email: string | null;
  duration: string;
  month: string;
  groupSize: string;
  message: string | null;
  status: string;
  createdAt: string | Date;
};

type Counts = {
  all: number;
  new: number;
  contacted: number;
  confirmed: number;
};

const STATUSES = ["new", "contacted", "confirmed", "cancelled"] as const;

const FILTERS = ["All", "New", "Contacted", "Confirmed", "Cancelled"] as const;

const SELECT_STYLES: Record<string, string> = {
  new: "border-green-400 text-green-700",
  contacted: "border-yellow-400 text-yellow-700",
  confirmed: "border-blue-400 text-blue-700",
  cancelled: "border-gray-300 text-gray-500",
};

function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function InquiryCard({ inquiry }: { inquiry: Inquiry }) {
  const [isPending, startTransition] = useTransition();

  function handleStatusChange(status: string) {
    startTransition(async () => {
      await updateInquiryStatus(inquiry.id, status);
    });
  }

  function handleDelete() {
    if (!window.confirm("Delete this inquiry? This cannot be undone.")) return;
    startTransition(async () => {
      await deleteInquiry(inquiry.id);
    });
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mb-3">
      {/* Top row */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <p className="font-semibold text-gray-800">{inquiry.name}</p>
          <p className="text-gray-400 text-sm">{inquiry.country}</p>
        </div>
        <select
          value={inquiry.status}
          disabled={isPending}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`border rounded-full px-3 py-1.5 text-sm font-medium bg-white focus:outline-none transition disabled:opacity-50 ${
            SELECT_STYLES[inquiry.status] ?? "border-gray-300 text-gray-600"
          }`}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
        <a
          href={`https://wa.me/${digitsOnly(inquiry.whatsapp)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-[#25D366] transition"
        >
          📱 {inquiry.whatsapp}
        </a>
        <span className="text-gray-700">✈️ {inquiry.duration} tour</span>
        <span className="text-gray-700">📅 {inquiry.month}</span>
        <span className="text-gray-700">👥 {inquiry.groupSize}</span>
      </div>

      {/* Email (if present) */}
      {inquiry.email && (
        <div className="text-sm mt-2">
          <a
            href={`mailto:${inquiry.email}`}
            className="text-gray-500 hover:text-[#1C3A6B] transition"
          >
            ✉️ {inquiry.email}
          </a>
        </div>
      )}

      {/* Message */}
      {inquiry.message && (
        <p className="text-gray-500 text-sm mt-3 bg-gray-50 rounded-xl p-3 italic">
          {inquiry.message}
        </p>
      )}

      {/* Bottom row */}
      <div className="flex justify-between items-center mt-3">
        <span className="text-gray-400 text-xs">
          {formatDate(inquiry.createdAt)}
        </span>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="text-red-400 text-sm hover:text-red-600 transition disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default function InquiryList({
  inquiries,
  counts,
}: {
  inquiries: Inquiry[];
  counts: Counts;
}) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const filtered =
    filter === "All"
      ? inquiries
      : inquiries.filter((i) => i.status === filter.toLowerCase());

  const statCards = [
    { label: "new", value: counts.new, style: "bg-green-50 text-green-700" },
    {
      label: "contacted",
      value: counts.contacted,
      style: "bg-yellow-50 text-yellow-700",
    },
    {
      label: "confirmed",
      value: counts.confirmed,
      style: "bg-blue-50 text-blue-700",
    },
    { label: "total", value: counts.all, style: "bg-gray-50 text-gray-700" },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-3xl font-light text-[#1C3A6B]">Inquiries</h1>
        <span className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-sm">
          {counts.all} total
        </span>
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap gap-4 mb-6">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`rounded-2xl px-6 py-4 ${card.style}`}
          >
            <p className="text-2xl font-bold">{card.value}</p>
            <p className="text-xs font-medium capitalize">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              filter === f
                ? "bg-[#1C3A6B] text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-[#1C3A6B]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      {inquiries.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-sm text-center text-gray-400">
          <div className="text-4xl mb-3">✉️</div>
          No inquiries yet
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-sm text-center text-gray-400">
          No {filter.toLowerCase()} inquiries.
        </div>
      ) : (
        <div>
          {filtered.map((inquiry) => (
            <InquiryCard key={inquiry.id} inquiry={inquiry} />
          ))}
        </div>
      )}
    </div>
  );
}
