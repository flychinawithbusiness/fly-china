import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/crm/auth"
import bcrypt from "bcryptjs"

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const user = session.user as { role?: string }
  if (user.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  const { id } = await params
  const emp = await prisma.crmEmployee.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, phone: true, role: true, isActive: true }
  })
  if (!emp) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(emp)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const user = session.user as { role?: string }
  if (user.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  const { id } = await params
  const body = await req.json()
  const data: { name: string; phone: string | null; role: string; isActive: boolean; password?: string } = { name: body.name, phone: body.phone || null, role: body.role, isActive: body.isActive }
  if (body.newPassword) data.password = await bcrypt.hash(body.newPassword, 10)
  const emp = await prisma.crmEmployee.update({
    where: { id }, data,
    select: { id: true, name: true, email: true, phone: true, role: true, isActive: true }
  })
  return NextResponse.json(emp)
}
