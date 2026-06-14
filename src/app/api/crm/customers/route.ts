import { prisma } from "@/lib/prisma";
import { auth } from "@/app/crm/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // This route is outside the /crm middleware matcher, so guard it directly.
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  if (!body.name || !body.phone) {
    return NextResponse.json(
      { error: "Name and phone are required" },
      { status: 400 }
    );
  }

  const customer = await prisma.customer.create({
    data: {
      name: body.name,
      phone: body.phone,
      email: body.email || null,
      nid: body.nid || null,
      passportNumber: body.passportNumber || null,
      address: body.address || null,
      notes: body.notes || null,
    },
  });
  return NextResponse.json(customer);
}

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { bookings: true } } },
  });
  return NextResponse.json(customers);
}
