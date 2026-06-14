import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.contactInfo.createMany({
    data: [
      { key: "gtm_id", label: "Google Tag Manager ID", value: "" },
      { key: "meta_pixel_id", label: "Meta Pixel ID", value: "" },
      { key: "ga4_id", label: "Google Analytics 4 ID", value: "" },
    ],
    skipDuplicates: true,
  });
  console.log("Analytics settings seeded");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
