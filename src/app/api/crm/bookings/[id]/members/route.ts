import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/crm/auth"

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const members = await prisma.bookingMember.findMany({
    where: { bookingId: id },
    orderBy: { createdAt: "asc" },
  })
  return NextResponse.json(members)
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  if (!body.name || !body.phone) {
    return NextResponse.json({ error: "Name and phone are required" }, { status: 400 })
  }
  const member = await prisma.bookingMember.create({
    data: {
      bookingId: id,
      name: body.name,
      phone: body.phone,
      nid: body.nid || null,
      passportNumber: body.passportNumber || null,
      passportExpiry: body.passportExpiry || null,
      notes: body.notes || null,
    }
  })
  return NextResponse.json(member)
}
