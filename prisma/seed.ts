import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@flychina.com";
  const plainPassword = "flychina2025";
  const hashed = await bcrypt.hash(plainPassword, 10);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { password: hashed, name: "Admin" },
    create: {
      email,
      password: hashed,
      name: "Admin",
    },
  });

  console.log("✅ Admin seeded:");
  console.log("   id:    ", admin.id);
  console.log("   email: ", admin.email);
  console.log("   name:  ", admin.name);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
