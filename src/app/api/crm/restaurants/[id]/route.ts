import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/crm/auth"

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const r = await prisma.restaurant.findUnique({ where: { id } })
  if (!r) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(r)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const r = await prisma.restaurant.update({
    where: { id },
    data: { name: body.name, location: body.location, cuisine: body.cuisine, phone: body.phone || null, notes: body.notes || null, isActive: body.isActive }
  })
  return NextResponse.json(r)
}
