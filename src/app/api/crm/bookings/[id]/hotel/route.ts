import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/crm/auth"

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const hb = await prisma.hotelBooking.create({
    data: {
      bookingId: id,
      hotelId: body.hotelId,
      checkIn: new Date(body.checkIn),
      checkOut: new Date(body.checkOut),
      roomType: body.roomType || "Standard",
      rooms: body.rooms || 1,
      price: body.price || 0,
    }
  })
  return NextResponse.json(hb)
}
