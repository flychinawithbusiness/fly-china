import { prisma } from "@/lib/prisma";
import BlogList from "./BlogList";

export default async function BlogAdminPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <BlogList posts={posts} />;
}
