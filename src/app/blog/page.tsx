import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Fly China - China Sourcing Tips",
};

export default function BlogPage() {
  return (
    <main>
      <PageHero
        badge="BLOG"
        title="China Sourcing Tips"
        subtitle="Guides, tips, and insights to help you source smarter from China's wholesale markets."
      />

      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden group block"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#F5C200] text-[#1C3A6B] text-xs font-bold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-400 mb-2">
                  {post.date} · {post.readTime}
                </p>
                <h2 className="font-semibold text-gray-900 text-lg leading-tight mb-3 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <span className="text-[#1C3A6B] text-sm font-semibold">
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
