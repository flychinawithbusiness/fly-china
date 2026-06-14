import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/crm/auth"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const currentUser = session.user as { role?: string }
  if (currentUser.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const body = await req.json()
  const password = await bcrypt.hash(body.password, 10)
  const employee = await prisma.crmEmployee.create({
    data: { name: body.name, email: body.email, password, phone: body.phone || null, role: body.role || "employee" }
  })
  const { password: _password, ...safe } = employee
  void _password
  return NextResponse.json(safe)
}

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const currentUser = session.user as { role?: string }
  if (currentUser.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  const employees = await prisma.crmEmployee.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, phone: true, role: true, isActive: true, createdAt: true },
  })
  return NextResponse.json(employees)
}
