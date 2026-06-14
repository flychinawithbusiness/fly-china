import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/crm/auth"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await req.json()
  const booking = await prisma.booking.create({
    data: {
      customerId: body.customerId,
      packageName: body.packageName,
      packageDays: body.packageDays,
      tourStartDate: new Date(body.tourStartDate),
      tourEndDate: new Date(body.tourEndDate),
      groupSize: body.groupSize || 1,
      totalAmount: body.totalAmount || 0,
      status: body.status || "inquiry",
      notes: body.notes || null,
    }
  })
  return NextResponse.json(booking)
}

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: true, payments: true }
  })
  return NextResponse.json(bookings)
}
