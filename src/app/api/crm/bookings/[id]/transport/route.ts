import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/crm/auth"

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const t = await prisma.transport.create({
    data: {
      bookingId: id,
      type: body.type,
      provider: body.provider || null,
      vehicleNumber: body.vehicleNumber || null,
      pickupLocation: body.pickupLocation,
      dropoffLocation: body.dropoffLocation,
      pickupTime: new Date(body.pickupTime),
      price: body.price || 0,
      notes: body.notes || null,
    }
  })
  return NextResponse.json(t)
}
