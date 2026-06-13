import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const items = [
    {
      key: "facebook",
      label: "Facebook URL",
      value: "https://facebook.com/flychina",
    },
    {
      key: "instagram",
      label: "Instagram URL",
      value: "https://instagram.com/flychina",
    },
    { key: "wechat_qr", label: "WeChat ID", value: "flychina_official" },
  ];
  for (const item of items) {
    await prisma.contactInfo.upsert({
      where: { key: item.key },
      update: {},
      create: item,
    });
  }
  console.log("Social links seeded");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
