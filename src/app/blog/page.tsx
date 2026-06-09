import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Blog | Fly China - China Sourcing Tips",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <PageHero
        badge="BLOG"
        title="China Sourcing Tips"
        subtitle="Guides, tips, and insights to help you source smarter from China's wholesale markets."
      />

      <section className="bg-gray-50 py-20 px-6">
        {posts.length === 0 ? (
          <p className="max-w-3xl mx-auto text-center text-gray-400">
            No blog posts yet. Check back soon.
          </p>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden group block"
              >
                <div className="relative h-48 overflow-hidden bg-[#1C3A6B]/10">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
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
                  <p className="text-xs text-gray-400 mb-2">
                    {formatDate(post.createdAt)}
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
        )}
      </section>
    </main>
  );
}
