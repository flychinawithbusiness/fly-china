"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string | null;
  date: string;
};

function BlogCard({ post }: { post: Post }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/blog/${post.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-2xl overflow-hidden group block h-full"
      style={{
        border: "1px solid rgba(28,58,107,0.07)",
        boxShadow: hovered
          ? "0 24px 48px rgba(28,58,107,0.15)"
          : "0 4px 16px rgba(28,58,107,0.07)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="relative h-48 overflow-hidden bg-[#1C3A6B]/10">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            ✈️
          </div>
        )}
        <span className="absolute top-4 left-4 bg-[#F5C200] text-[#1C3A6B] text-xs font-bold px-3 py-1 rounded-full">
          {post.category}
        </span>
      </div>
      <div className="p-6">
        <p className="text-xs text-gray-400 mb-2 font-body">{post.date}</p>
        <h2 className="font-body font-semibold text-gray-900 text-lg leading-tight mb-3 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4 font-body">
          {post.excerpt}
        </p>
        <span className="text-[#1C3A6B] text-sm font-semibold font-body">
          Read More →
        </span>
      </div>
    </Link>
  );
}

export default function BlogGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
      {posts.map((post, i) => (
        <FadeIn key={post.id} delay={i * 0.1}>
          <BlogCard post={post} />
        </FadeIn>
      ))}
    </div>
  );
}
