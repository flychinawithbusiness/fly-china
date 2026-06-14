import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/crm/auth"

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string; memberId: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { memberId } = await params
  const member = await prisma.bookingMember.findUnique({ where: { id: memberId } })
  if (!member) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(member)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string; memberId: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { memberId } = await params
  const body = await req.json()
  const member = await prisma.bookingMember.update({
    where: { id: memberId },
    data: {
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

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string; memberId: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { memberId } = await params
  await prisma.bookingMember.delete({ where: { id: memberId } })
  return NextResponse.json({ success: true })
}
