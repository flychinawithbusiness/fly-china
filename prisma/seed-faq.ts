import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const faqs = [
  {
    question: "Do I need a visa to visit China?",
    answer:
      "Yes, Bangladeshi passport holders require a Chinese visa. We can guide you through the visa application process and provide all necessary support documents. Visa fees are not included in the tour package.",
  },
  {
    question: "What is included in the tour price?",
    answer:
      "The tour price includes return flights (Dhaka–Guangzhou–Dhaka), all hotel accommodation, all meals (breakfast, lunch, dinner), all local transport in Guangzhou, a dedicated bilingual guide, and guided visits to wholesale markets.",
  },
  {
    question: "How much budget should I bring for shopping?",
    answer:
      "Your shopping budget is entirely separate from the tour cost and depends on your business needs. Most buyers bring between $2,000–$10,000 USD equivalent. We recommend a mix of cash (RMB) and WeChat Pay set up if possible.",
  },
  {
    question: "What language does the guide speak?",
    answer:
      "Our guides speak Bangla and English, and are native Mandarin speakers. They handle all market negotiations and translations on your behalf.",
  },
  {
    question: "Can I buy and ship goods back to Bangladesh?",
    answer:
      "Yes! Guangzhou has many experienced freight forwarders who regularly ship to Bangladesh. Your guide can connect you with reliable shipping agents at competitive rates.",
  },
  {
    question: "How many people are in each tour group?",
    answer:
      "Our tour groups typically have 6–15 people. Smaller groups get more personalized attention from the guide. We also offer private tours for groups with specific needs.",
  },
  {
    question: "When is the best time to visit Guangzhou markets?",
    answer:
      "The markets operate year-round, but the best times are outside the major Chinese holidays (avoid Chinese New Year in Jan/Feb and Golden Week in Oct). The Canton Fair (April and October) brings extra activity but also more crowds.",
  },
  {
    question: "How do I confirm my booking?",
    answer:
      "Send us an inquiry via the contact form or WhatsApp. Our team will call you to discuss your requirements, then provide a booking confirmation once the advance payment is received.",
  },
  {
    question: "Is the tour price negotiable?",
    answer:
      "Our prices are fixed and transparent — the listed price covers everything included in the package with no hidden fees. Contact us to discuss group discounts for 10+ people.",
  },
  {
    question: "What if I need to cancel or change my dates?",
    answer:
      "We understand plans change. Contact us as soon as possible if you need to modify your booking. Cancellation policies depend on how far in advance you cancel; details are provided in your booking confirmation.",
  },
];

async function main() {
  // Append only if empty, so re-running doesn't create duplicates.
  const existing = await prisma.faq.count();
  if (existing > 0) {
    console.log(`Skipped — ${existing} FAQs already exist.`);
    return;
  }
  for (let i = 0; i < faqs.length; i++) {
    await prisma.faq.create({
      data: { ...faqs[i], order: i, isActive: true },
    });
    console.log(`  ✓ ${faqs[i].question}`);
  }
  console.log(`✅ Seeded ${faqs.length} FAQs.`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
