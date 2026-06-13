import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import BlogGrid from "./BlogGrid";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Blog - China Sourcing Tips",
  description: "Guides and tips for buying from China's wholesale markets.",
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
          <BlogGrid
            posts={posts.map((post) => ({
              id: post.id,
              slug: post.slug,
              title: post.title,
              excerpt: post.excerpt,
              category: post.category,
              coverImage: post.coverImage,
              date: formatDate(post.createdAt),
            }))}
          />
        )}
      </section>
    </main>
  );
}
