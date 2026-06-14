import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/crm/auth"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await req.json()
  const guide = await prisma.guide.create({
    data: { name: body.name, phone: body.phone, email: body.email || null, language: body.language || "Bangla, English, Chinese", speciality: body.speciality || null }
  })
  return NextResponse.json(guide)
}

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const guides = await prisma.guide.findMany({ where: { isActive: true }, orderBy: { name: "asc" } })
  return NextResponse.json(guides)
}
