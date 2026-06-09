import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import { prisma } from "@/lib/prisma";

type Params = { slug: string };

// Rendered dynamically (the global footer reads contact info from the DB).
export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return { title: "Post Not Found | Fly China" };
  return {
    title: `${post.title} | Fly China`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });

  if (!post || !post.published) notFound();

  return (
    <main>
      <PageHero
        badge={post.category}
        title={post.title}
        subtitle={post.excerpt}
      />

      <article className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header meta */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-8">
            <span>{formatDate(post.createdAt)}</span>
            <span>·</span>
            <span className="text-[#1C3A6B] font-medium">{post.category}</span>
          </div>

          {/* Hero image */}
          {post.coverImage && (
            <div className="relative h-72 rounded-2xl overflow-hidden mb-12">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Body (TipTap HTML) */}
          <div
            className="prose max-w-none text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Bottom CTA */}
          <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-light text-[#1C3A6B] mb-4">
              Planning a trip to Guangzhou?
            </h3>
            <Link
              href="/contact"
              className="inline-block bg-[#F5C200] text-[#1C3A6B] font-bold rounded-full px-8 py-3.5 hover:bg-[#D4A800] transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
