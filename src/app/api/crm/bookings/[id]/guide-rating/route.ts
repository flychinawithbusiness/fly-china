import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/crm/auth"

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const assignment = await prisma.guideAssignment.update({
    where: { bookingId: id },
    data: { rating: body.rating, review: body.review || null }
  })
  return NextResponse.json(assignment)
}
