import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function GalleryPreview() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest text-gold uppercase font-body font-semibold">
            Our Gallery
          </p>
          <h2
            className="text-navy mt-3"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: 1.1,
            }}
          >
            Tours in Action
          </h2>
        </div>

        {images.length === 0 ? (
          <div className="bg-gray-50 rounded-3xl p-16 text-center">
            <p className="text-gray-400 text-xl font-body">
              📸 Gallery Coming Soon
            </p>
            <p className="text-gray-400 text-sm mt-2 font-body">
              Our tour photos will appear here once uploaded from the admin
              panel.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="rounded-2xl overflow-hidden aspect-square relative group"
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#1C3A6B]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-xs font-medium">
                      {img.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/gallery"
                className="inline-block border-2 border-[#1C3A6B] text-[#1C3A6B] px-6 py-2.5 rounded-full font-body font-semibold text-sm hover:bg-[#1C3A6B] hover:text-white transition"
              >
                View All Photos
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
