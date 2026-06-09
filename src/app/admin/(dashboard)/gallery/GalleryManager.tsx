"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import {
  addGalleryImage,
  deleteGalleryImage,
  updateGalleryImage,
} from "./actions";

type GalleryImage = {
  id: string;
  url: string;
  alt: string;
  category: string;
};

const CATEGORIES = [
  "City",
  "Markets",
  "Tours",
  "Shopping",
  "Food",
  "Hotel",
  "Other",
];

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1C3A6B] transition";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET!);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );
  if (!res.ok) throw new Error("Cloudinary upload failed");
  const data = await res.json();
  return data.secure_url as string;
}

export default function GalleryManager({
  images,
}: {
  images: GalleryImage[];
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [alt, setAlt] = useState("");
  const [category, setCategory] = useState("Markets");
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [isPending, startTransition] = useTransition();
  const [editing, setEditing] = useState<GalleryImage | null>(null);
  const [editAlt, setEditAlt] = useState("");
  const [editCategory, setEditCategory] = useState("Markets");

  function selectFile(f: File | null) {
    setError(null);
    setSuccess(false);
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (f.size > MAX_SIZE) {
      setError("Image is too large (max 10MB).");
      return;
    }
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  }

  function resetForm() {
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setAlt("");
    setCategory("Markets");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleUpload() {
    if (!file) {
      setError("Please select an image first.");
      return;
    }
    if (!alt.trim()) {
      setError("Please add alt text for the image.");
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      await addGalleryImage(url, alt.trim(), category);
      resetForm();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  function handleDelete(id: string) {
    if (!window.confirm("Delete this image? This cannot be undone.")) return;
    startTransition(async () => {
      await deleteGalleryImage(id);
    });
  }

  function openEdit(img: GalleryImage) {
    setEditing(img);
    setEditAlt(img.alt);
    setEditCategory(img.category);
  }

  function saveEdit() {
    if (!editing) return;
    startTransition(async () => {
      await updateGalleryImage(editing.id, editAlt.trim(), editCategory);
      setEditing(null);
    });
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-3xl font-light text-[#1C3A6B]">Gallery</h1>
        <span className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-sm">
          {images.length} images
        </span>
      </div>

      {/* Upload section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="font-semibold text-[#1C3A6B] mb-4">Upload New Image</h2>

        {success && (
          <div className="bg-green-50 text-green-700 text-sm rounded-xl px-4 py-3 mb-4">
            ✅ Image uploaded successfully!
          </div>
        )}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
            {error}
          </div>
        )}

        {/* Drop zone */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => selectFile(e.target.files?.[0] ?? null)}
        />
        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ")
              fileInputRef.current?.click();
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            selectFile(e.dataTransfer.files?.[0] ?? null);
          }}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition ${
            dragOver ? "border-[#1C3A6B] bg-[#1C3A6B]/5" : "border-gray-300"
          } hover:border-[#1C3A6B]`}
        >
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt="Preview"
              className="mx-auto max-h-48 rounded-xl object-contain"
            />
          ) : (
            <>
              <div className="text-4xl mb-2">🖼️</div>
              <p className="text-gray-700 font-medium">
                Click to upload or drag &amp; drop
              </p>
              <p className="text-gray-400 text-sm mt-1">
                JPG, PNG, WebP — max 10MB
              </p>
            </>
          )}
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Alt text (for SEO)
            </label>
            <input
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Image description (for SEO)"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="mt-4 inline-flex items-center gap-2 bg-[#F5C200] text-[#1C3A6B] font-bold rounded-full px-6 py-2.5 hover:bg-[#D4A800] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {uploading && (
            <span className="inline-block w-4 h-4 border-2 border-[#1C3A6B]/30 border-t-[#1C3A6B] rounded-full animate-spin" />
          )}
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>

      {/* Images grid */}
      {images.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-sm text-center text-gray-400">
          No images yet. Upload your first image above.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100"
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
              {/* Category badge */}
              <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                {img.category}
              </span>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => openEdit(img)}
                  disabled={isPending}
                  className="bg-white text-[#1C3A6B] rounded-full px-3 py-1.5 text-xs font-medium hover:bg-gray-100 transition"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(img.id)}
                  disabled={isPending}
                  className="bg-red-500 text-white rounded-full px-3 py-1.5 text-xs font-medium hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="font-semibold text-[#1C3A6B] mb-4">Edit Image</h3>
            <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100">
              <Image
                src={editing.url}
                alt={editing.alt}
                fill
                sizes="400px"
                className="object-cover"
              />
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Alt text
            </label>
            <input
              value={editAlt}
              onChange={(e) => setEditAlt(e.target.value)}
              className={`${inputClass} mb-4`}
            />
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Category
            </label>
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className={`${inputClass} mb-6`}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={saveEdit}
                disabled={isPending}
                className="bg-[#1C3A6B] text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-[#2A5099] transition disabled:opacity-50"
              >
                {isPending ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="text-gray-500 text-sm font-medium hover:text-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
