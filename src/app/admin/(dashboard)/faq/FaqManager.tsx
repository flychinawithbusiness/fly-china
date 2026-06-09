"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2, ChevronUp, ChevronDown, Plus } from "lucide-react";
import { createFaq, updateFaq, deleteFaq, reorderFaq } from "./actions";

type Faq = {
  id: string;
  question: string;
  answer: string;
  order: number;
};

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1C3A6B] transition";

export default function FaqManager({ faqs }: { faqs: Faq[] }) {
  const [isPending, startTransition] = useTransition();

  // Add form state
  const [showAdd, setShowAdd] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  function handleAdd() {
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    startTransition(async () => {
      await createFaq(newQuestion.trim(), newAnswer.trim());
      setNewQuestion("");
      setNewAnswer("");
      setShowAdd(false);
    });
  }

  function startEdit(faq: Faq) {
    setEditingId(faq.id);
    setEditQuestion(faq.question);
    setEditAnswer(faq.answer);
  }

  function handleUpdate(id: string) {
    if (!editQuestion.trim() || !editAnswer.trim()) return;
    startTransition(async () => {
      await updateFaq(id, editQuestion.trim(), editAnswer.trim());
      setEditingId(null);
    });
  }

  function handleDelete(id: string) {
    if (!window.confirm("Delete this FAQ? This cannot be undone.")) return;
    startTransition(async () => {
      await deleteFaq(id);
    });
  }

  function handleMove(index: number, direction: -1 | 1) {
    const target = faqs[index + direction];
    const current = faqs[index];
    if (!target) return;
    // Swap order values with the neighbor.
    startTransition(async () => {
      await reorderFaq(current.id, target.order);
      await reorderFaq(target.id, current.order);
    });
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-light text-[#1C3A6B]">FAQ Management</h1>
        {!showAdd && (
          <button
            type="button"
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 bg-[#F5C200] text-[#1C3A6B] rounded-full px-5 py-2 font-semibold hover:bg-[#D4A800] transition"
          >
            <Plus size={18} />
            Add New FAQ
          </button>
        )}
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="font-semibold text-[#1C3A6B] mb-4">New FAQ</h2>
          <div className="space-y-3">
            <input
              autoFocus
              placeholder="Question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className={inputClass}
            />
            <textarea
              rows={4}
              placeholder="Answer"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button
              type="button"
              onClick={handleAdd}
              disabled={isPending || !newQuestion.trim() || !newAnswer.trim()}
              className="bg-[#1C3A6B] text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-[#2A5099] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAdd(false);
                setNewQuestion("");
                setNewAnswer("");
              }}
              className="text-gray-500 text-sm font-medium hover:text-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {faqs.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-sm text-center text-gray-400">
          No FAQs yet. Click Add New FAQ to get started.
        </div>
      ) : (
        <div>
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white rounded-2xl p-6 shadow-sm mb-3 flex gap-4"
            >
              {/* Order circle */}
              <div className="shrink-0 bg-[#1C3A6B] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>

              {/* Middle */}
              <div className="flex-1 min-w-0">
                {editingId === faq.id ? (
                  <div className="space-y-3">
                    <input
                      value={editQuestion}
                      onChange={(e) => setEditQuestion(e.target.value)}
                      className={inputClass}
                    />
                    <textarea
                      rows={4}
                      value={editAnswer}
                      onChange={(e) => setEditAnswer(e.target.value)}
                      className={inputClass}
                    />
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleUpdate(faq.id)}
                        disabled={isPending}
                        className="bg-[#1C3A6B] text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-[#2A5099] transition disabled:opacity-50"
                      >
                        {isPending ? "Saving..." : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="text-gray-500 text-sm font-medium hover:text-gray-700 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="font-semibold text-gray-800 mb-1">
                      {faq.question}
                    </p>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {faq.answer}
                    </p>
                  </>
                )}
              </div>

              {/* Right actions */}
              {editingId !== faq.id && (
                <div className="shrink-0 flex items-start gap-1">
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => handleMove(index, -1)}
                      disabled={isPending || index === 0}
                      aria-label="Move up"
                      className="text-gray-400 hover:text-[#1C3A6B] transition disabled:opacity-30 disabled:cursor-not-allowed p-0.5"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMove(index, 1)}
                      disabled={isPending || index === faqs.length - 1}
                      aria-label="Move down"
                      className="text-gray-400 hover:text-[#1C3A6B] transition disabled:opacity-30 disabled:cursor-not-allowed p-0.5"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => startEdit(faq)}
                    aria-label="Edit"
                    className="text-[#1C3A6B] hover:bg-[#1C3A6B]/5 rounded-lg p-2 transition"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(faq.id)}
                    aria-label="Delete"
                    className="text-red-500 hover:bg-red-50 rounded-lg p-2 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
