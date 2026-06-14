import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/crm/auth"

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const flight = await prisma.flight.create({
    data: {
      bookingId: id,
      type: body.type,
      airline: body.airline,
      flightNumber: body.flightNumber,
      departureFrom: body.departureFrom,
      departureTo: body.departureTo,
      departureTime: new Date(body.departureTime),
      arrivalTime: new Date(body.arrivalTime),
      transitPoints: body.transitPoints || null,
    }
  })
  return NextResponse.json(flight)
}
