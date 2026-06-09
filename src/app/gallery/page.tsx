import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = { title: "Gallery | Fly China" };

export default function GalleryPage() {
  return (
    <main>
      <PageHero
        badge="OUR TOURS"
        title="Tour Gallery"
        subtitle="Real photos from our tours to Guangzhou's wholesale markets."
      />
      <GalleryGrid />
    </main>
  );
}
