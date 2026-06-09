import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const items = [
  { key: "whatsapp", label: "WhatsApp Number", value: "+880 1XXX-XXXXXX" },
  { key: "phone", label: "Phone Number", value: "+880 1XXX-XXXXXX" },
  { key: "email", label: "Email Address", value: "info@flychina.com" },
  { key: "wechat", label: "WeChat ID", value: "flychina_official" },
  { key: "address", label: "Office Address", value: "Dhaka, Bangladesh" },
];

async function main() {
  for (const item of items) {
    await prisma.contactInfo.upsert({
      where: { key: item.key },
      update: { label: item.label },
      create: item,
    });
    console.log(`  ✓ ${item.key} → ${item.label}`);
  }
  console.log(`✅ Seeded ${items.length} contact info records.`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
