"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TipTapEditor from "@/components/admin/TipTapEditor";
import { generateSlug } from "@/lib/slug";
import { createBlogPost, updateBlogPost } from "./actions";

const CATEGORIES = [
  "Market Guide",
  "Visa Guide",
  "Shopping Tips",
  "Tour Stories",
  "Events",
  "News",
];

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1C3A6B] transition";
const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

const EXCERPT_MAX = 200;

export type BlogPostInput = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string | null;
  published: boolean;
};

export default function BlogForm({
  mode,
  post,
}: {
  mode: "new" | "edit";
  post?: BlogPostInput;
}) {
  const router = useRouter();

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(mode === "edit");
  const [category, setCategory] = useState(post?.category ?? CATEGORIES[0]);
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [content, setContent] = useState(post?.content ?? "");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugEdited) setSlug(generateSlug(value));
  }

  async function handleSave(published: boolean) {
    if (!title.trim()) return setError("Title is required.");
    if (!slug.trim()) return setError("Slug is required.");
    if (!excerpt.trim()) return setError("Excerpt is required.");
    if (!content.trim() || content === "<p></p>")
      return setError("Content is required.");

    setError(null);
    setSaving(true);

    const data = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      content,
      category,
      coverImage: coverImage.trim() || undefined,
      published,
    };

    try {
      if (mode === "edit" && post?.id) {
        await updateBlogPost(post.id, data);
      } else {
        await createBlogPost(data);
      }
      router.push("/admin/blog");
      router.refresh();
    } catch {
      setError(
        "Failed to save. The slug may already be in use — try a different one."
      );
      setSaving(false);
    }
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-light text-[#1C3A6B]">
          {mode === "edit" ? "Edit Blog Post" : "New Blog Post"}
        </h1>
        <Link
          href="/admin/blog"
          className="text-sm text-gray-500 hover:text-[#1C3A6B] transition"
        >
          ← Back to Blog
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
        {/* Title */}
        <div>
          <label className={labelClass} htmlFor="title">
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Slug */}
        <div>
          <label className={labelClass} htmlFor="slug">
            Slug
          </label>
          <input
            id="slug"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugEdited(true);
            }}
            className={inputClass}
          />
          <p className="text-xs text-gray-400 mt-1">/blog/{slug || "..."}</p>
        </div>

        {/* Category */}
        <div>
          <label className={labelClass} htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Excerpt */}
        <div>
          <label className={labelClass} htmlFor="excerpt">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            rows={3}
            maxLength={EXCERPT_MAX}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className={inputClass}
          />
          <p className="text-xs text-gray-400 mt-1 text-right">
            {excerpt.length}/{EXCERPT_MAX}
          </p>
        </div>

        {/* Cover image */}
        <div>
          <label className={labelClass} htmlFor="coverImage">
            Cover Image URL (optional)
          </label>
          <input
            id="coverImage"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="Paste a Cloudinary image URL"
            className={inputClass}
          />
        </div>

        {/* Content */}
        <div>
          <label className={labelClass}>Content</label>
          <TipTapEditor content={content} onChange={setContent} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-6">
        <button
          type="button"
          onClick={() => handleSave(false)}
          disabled={saving}
          className="border border-[#1C3A6B] text-[#1C3A6B] rounded-full px-6 py-2.5 font-semibold hover:bg-[#1C3A6B]/5 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save as Draft"}
        </button>
        <button
          type="button"
          onClick={() => handleSave(true)}
          disabled={saving}
          className="bg-[#1C3A6B] text-white rounded-full px-6 py-2.5 font-semibold hover:bg-[#2A5099] transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Publish Post"}
        </button>
      </div>
    </div>
  );
}
