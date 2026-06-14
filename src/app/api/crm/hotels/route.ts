import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/crm/auth"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await req.json()
  const hotel = await prisma.hotel.create({
    data: { name: body.name, location: body.location, address: body.address || null, phone: body.phone || null, stars: body.stars || 3, notes: body.notes || null }
  })
  return NextResponse.json(hotel)
}

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const hotels = await prisma.hotel.findMany({ where: { isActive: true }, orderBy: { name: "asc" } })
  return NextResponse.json(hotels)
}
