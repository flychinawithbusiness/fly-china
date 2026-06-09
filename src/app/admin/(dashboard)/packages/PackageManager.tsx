"use client";

import { useState, useTransition } from "react";
import { updatePackage, addInclusion, removeInclusion } from "./actions";

type Pkg = {
  id: string;
  duration: number;
  title: string;
  price: string;
  isPopular: boolean;
  inclusions: string[];
  isActive: boolean;
  order: number;
};

const inputClass =
  "w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1C3A6B] transition";

function PackageCard({ pkg }: { pkg: Pkg }) {
  const [isPending, startTransition] = useTransition();
  const [price, setPrice] = useState(pkg.price);
  const [priceSaved, setPriceSaved] = useState(false);
  const [newInclusion, setNewInclusion] = useState("");

  function toggle(field: "isPopular" | "isActive", value: boolean) {
    startTransition(async () => {
      await updatePackage(pkg.id, { [field]: value });
    });
  }

  function savePrice() {
    startTransition(async () => {
      await updatePackage(pkg.id, { price });
      setPriceSaved(true);
      setTimeout(() => setPriceSaved(false), 2000);
    });
  }

  function handleAdd() {
    const item = newInclusion.trim();
    if (!item) return;
    startTransition(async () => {
      await addInclusion(pkg.id, item);
      setNewInclusion("");
    });
  }

  function handleRemove(item: string) {
    startTransition(async () => {
      await removeInclusion(pkg.id, item);
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
      {/* Top bar */}
      <div className="bg-[#1C3A6B] p-5">
        <p className="text-white text-2xl font-light mb-3">
          {pkg.duration} Days
        </p>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-white/90 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={pkg.isPopular}
              disabled={isPending}
              onChange={(e) => toggle("isPopular", e.target.checked)}
              className="accent-[#F5C200] w-4 h-4"
            />
            Most Popular
          </label>
          <label className="flex items-center gap-2 text-white/90 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={pkg.isActive}
              disabled={isPending}
              onChange={(e) => toggle("isActive", e.target.checked)}
              className="accent-[#F5C200] w-4 h-4"
            />
            Active
          </label>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Price */}
        <div className="mb-6">
          <label
            htmlFor={`price-${pkg.id}`}
            className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2"
          >
            Price (BDT)
          </label>
          <input
            id={`price-${pkg.id}`}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              setPriceSaved(false);
            }}
            className={inputClass}
          />
          <div className="flex items-center gap-3 mt-3">
            <button
              type="button"
              onClick={savePrice}
              disabled={isPending || price === pkg.price}
              className="bg-[#1C3A6B] text-white rounded-full px-4 py-1.5 text-sm font-medium hover:bg-[#2A5099] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Saving..." : "Update Price"}
            </button>
            {priceSaved && (
              <span className="text-green-600 text-sm font-medium">
                ✅ Saved!
              </span>
            )}
          </div>
        </div>

        {/* Inclusions */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            What&apos;s Included
          </h3>
          <ul>
            {pkg.inclusions.map((item) => (
              <li
                key={item}
                className="flex justify-between items-center py-2 border-b border-gray-100 gap-2"
              >
                <span className="text-sm text-gray-700">{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(item)}
                  disabled={isPending}
                  aria-label={`Remove ${item}`}
                  className="text-red-400 hover:text-red-600 text-xs shrink-0 disabled:opacity-50"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          {/* Add inclusion */}
          <div className="flex items-center gap-2 mt-4">
            <input
              value={newInclusion}
              onChange={(e) => setNewInclusion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAdd();
              }}
              placeholder="Add an inclusion..."
              className={inputClass}
            />
            <button
              type="button"
              onClick={handleAdd}
              disabled={isPending || !newInclusion.trim()}
              className="bg-[#F5C200] text-[#1C3A6B] rounded-full px-4 py-2 text-sm font-semibold hover:bg-[#D4A800] transition disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PackageManager({ packages }: { packages: Pkg[] }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-light text-[#1C3A6B] mb-8">Packages</h1>

      {packages.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-sm text-center text-gray-400">
          No packages found. Run the seed script first.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      )}
    </div>
  );
}
