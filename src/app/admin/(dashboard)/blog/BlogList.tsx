"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { deleteBlogPost, togglePublish } from "./actions";

type Post = {
  id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  createdAt: string | Date;
};

function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export default function BlogList({ posts }: { posts: Post[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    if (!window.confirm("Delete this post? This cannot be undone.")) return;
    startTransition(async () => {
      await deleteBlogPost(id);
    });
  }

  function handleToggle(id: string, published: boolean) {
    startTransition(async () => {
      await togglePublish(id, !published);
    });
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-light text-[#1C3A6B]">Blog Posts</h1>
        <button
          type="button"
          onClick={() => router.push("/admin/blog/new")}
          className="bg-[#F5C200] text-[#1C3A6B] font-bold rounded-full px-5 py-2 hover:bg-[#D4A800] transition"
        >
          New Post
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-sm text-center text-gray-400">
          No blog posts yet. Click New Post to get started.
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="py-3 px-6 font-medium">Title</th>
                <th className="py-3 px-4 font-medium">Category</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-gray-50 last:border-none"
                >
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-800 truncate block max-w-xs">
                      {post.title}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-500">{post.category}</td>
                  <td className="py-4 px-4">
                    {post.published ? (
                      <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-medium">
                        Published
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs font-medium">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-gray-400">
                    {formatDate(post.createdAt)}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        aria-label="Edit"
                        className="text-[#1C3A6B] hover:bg-[#1C3A6B]/5 rounded-lg p-2 transition"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleToggle(post.id, post.published)}
                        disabled={isPending}
                        aria-label={post.published ? "Unpublish" : "Publish"}
                        title={post.published ? "Unpublish" : "Publish"}
                        className="text-gray-500 hover:bg-gray-100 rounded-lg p-2 transition disabled:opacity-50"
                      >
                        {post.published ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(post.id)}
                        disabled={isPending}
                        aria-label="Delete"
                        className="text-red-400 hover:bg-red-50 rounded-lg p-2 transition disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
