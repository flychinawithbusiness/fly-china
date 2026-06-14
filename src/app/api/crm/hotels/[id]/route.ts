import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/crm/auth"

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const hotel = await prisma.hotel.findUnique({ where: { id } })
  if (!hotel) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(hotel)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const hotel = await prisma.hotel.update({
    where: { id },
    data: { name: body.name, location: body.location, address: body.address || null, phone: body.phone || null, stars: body.stars, notes: body.notes || null, isActive: body.isActive }
  })
  return NextResponse.json(hotel)
}
