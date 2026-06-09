import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Gallery | Fly China" };

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <PageHero
        badge="OUR TOURS"
        title="Tour Gallery"
        subtitle="Real photos from our tours to Guangzhou's wholesale markets."
      />
      {images.length === 0 ? (
        <section className="bg-gray-50 py-20 px-6">
          <p className="max-w-3xl mx-auto text-center text-gray-400">
            Gallery coming soon.
          </p>
        </section>
      ) : (
        <GalleryGrid images={images} />
      )}
    </main>
  );
}
