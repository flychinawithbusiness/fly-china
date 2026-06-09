import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const packages = [
  {
    duration: 7,
    title: "7 Day Tour",
    price: "1,00,000",
    isPopular: true,
    order: 1,
    inclusions: [
      "Return Flights (Dhaka - Guangzhou)",
      "Airport pickup & drop-off",
      "Hotel accommodation (3-star+)",
      "All meals (breakfast, lunch, dinner)",
      "All local transport in Guangzhou",
      "Dedicated English/Bangla speaking guide",
      "Guided wholesale market visits",
    ],
  },
  {
    duration: 10,
    title: "10 Day Tour",
    price: "1,20,000",
    isPopular: false,
    order: 2,
    inclusions: [
      "Return Flights (Dhaka - Guangzhou)",
      "Airport pickup & drop-off",
      "Hotel accommodation (3-star+)",
      "All meals (breakfast, lunch, dinner)",
      "All local transport in Guangzhou",
      "Dedicated English/Bangla speaking guide",
      "Guided wholesale market visits",
      "Extended market coverage",
      "Factory visit (1-2 visits)",
    ],
  },
  {
    duration: 14,
    title: "14 Day Tour",
    price: "1,50,000",
    isPopular: false,
    order: 3,
    inclusions: [
      "Return Flights (Dhaka - Guangzhou)",
      "Airport pickup & drop-off",
      "Hotel accommodation (3-star+)",
      "All meals (breakfast, lunch, dinner)",
      "All local transport in Guangzhou",
      "Dedicated English/Bangla speaking guide",
      "Guided wholesale market visits",
      "Extended market coverage",
      "Factory visit (1-2 visits)",
      "Yiwu market day trip",
    ],
  },
];

async function main() {
  for (const pkg of packages) {
    await prisma.package.upsert({
      where: { duration: pkg.duration },
      update: {
        title: pkg.title,
        order: pkg.order,
      },
      create: pkg,
    });
    console.log(`  ✓ ${pkg.duration}-day → ${pkg.title}`);
  }
  console.log(`✅ Seeded ${packages.length} packages.`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
