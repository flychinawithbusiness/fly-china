import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/crm/auth"

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const guide = await prisma.guide.findUnique({ where: { id } })
  if (!guide) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(guide)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const guide = await prisma.guide.update({
    where: { id },
    data: { name: body.name, phone: body.phone, email: body.email || null, language: body.language, speciality: body.speciality || null, isActive: body.isActive }
  })
  return NextResponse.json(guide)
}
