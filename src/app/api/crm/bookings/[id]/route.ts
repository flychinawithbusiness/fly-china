import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/crm/auth"

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const booking = await prisma.booking.findUnique({ where: { id }, include: { customer: true, payments: true, flights: true, guideAssignment: { include: { guide: true } }, hotels: { include: { hotel: true } } } })
  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(booking)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const booking = await prisma.booking.update({
    where: { id },
    data: {
      packageName: body.packageName,
      packageDays: body.packageDays,
      tourStartDate: body.tourStartDate ? new Date(body.tourStartDate) : undefined,
      tourEndDate: body.tourEndDate ? new Date(body.tourEndDate) : undefined,
      groupSize: body.groupSize,
      totalAmount: body.totalAmount,
      status: body.status,
      notes: body.notes || null,
    }
  })
  return NextResponse.json(booking)
}
