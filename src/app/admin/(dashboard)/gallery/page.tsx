import { prisma } from "@/lib/prisma";
import GalleryManager from "./GalleryManager";

export default async function GalleryAdminPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <GalleryManager images={images} />;
}
