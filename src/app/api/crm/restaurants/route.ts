import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/crm/auth"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await req.json()
  const r = await prisma.restaurant.create({
    data: { name: body.name, location: body.location, cuisine: body.cuisine || "Halal", phone: body.phone || null, notes: body.notes || null }
  })
  return NextResponse.json(r)
}

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const restaurants = await prisma.restaurant.findMany({ where: { isActive: true }, orderBy: { name: "asc" } })
  return NextResponse.json(restaurants)
}
