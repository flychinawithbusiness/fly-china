"use client";

import { useState, useTransition } from "react";
import { updateContactInfo } from "./actions";

type ContactItem = {
  id: string;
  key: string;
  label: string;
  value: string;
};

function ContactCard({ item }: { item: ContactItem }) {
  const [value, setValue] = useState(item.value);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      await updateContactInfo(item.key, value);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  const dirty = value !== item.value;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <label
        htmlFor={`contact-${item.key}`}
        className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2"
      >
        {item.label}
      </label>
      <input
        id={`contact-${item.key}`}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setSaved(false);
        }}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1C3A6B] transition"
      />
      <div className="flex items-center gap-3 mt-4">
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending || (!dirty && !saved)}
          className="bg-[#1C3A6B] text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-[#2A5099] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Saving..." : "Save"}
        </button>
        {saved && (
          <span className="text-green-600 text-sm font-medium">✅ Saved!</span>
        )}
      </div>
    </div>
  );
}

export default function ContactInfoForm({ items }: { items: ContactItem[] }) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[#1C3A6B]">Contact Info</h1>
        <p className="text-gray-500 text-sm mt-1">
          Update your public contact details
        </p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center text-gray-400">
          No contact info found. Run the seed script first.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <ContactCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
