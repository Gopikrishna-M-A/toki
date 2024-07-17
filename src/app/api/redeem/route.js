import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { redeemPerk } from "@/services/redemptionServices"
import { authOptions } from "../auth/[...nextauth]/options"

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  try {
    const redemption = await redeemPerk(session.user.id, data.perkId, data.businessId)
    return NextResponse.json(redemption, { status: 200 })
  } catch (error) {
    console.error("Failed to redeem perk:", error)
    return NextResponse.json(
      { error: error.message || "Failed to redeem perk" },
      { status: 400 }
    )
  }
}

