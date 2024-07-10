import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { createPerk } from "@/services/perkServices"
import { authOptions } from "../auth/[...nextauth]/options"

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const data = await request.json()
  try {
    const perk = await createPerk(data)
    return NextResponse.json( perk , { status: 200 })
  } catch (error) {
    console.error("Failed to create perk:", error)
    return NextResponse.json(
      { error: "Failed to create perk" },
      { status: 500 }
    )
  }
}
