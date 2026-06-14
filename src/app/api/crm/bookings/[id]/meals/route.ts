import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/crm/auth"

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const meal = await prisma.mealSchedule.create({
    data: {
      bookingId: id,
      date: new Date(body.date),
      mealType: body.mealType,
      restaurantId: body.restaurantId || null,
      notes: body.notes || null,
    }
  })
  return NextResponse.json(meal)
}
