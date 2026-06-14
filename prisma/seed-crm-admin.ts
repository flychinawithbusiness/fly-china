import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("flychina2025", 10);
  await prisma.crmEmployee.upsert({
    where: { email: "crm@flychina.com" },
    update: {},
    create: {
      name: "CRM Admin",
      email: "crm@flychina.com",
      password,
      role: "admin",
      isActive: true,
    },
  });
  console.log("CRM admin seeded: crm@flychina.com / flychina2025");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
