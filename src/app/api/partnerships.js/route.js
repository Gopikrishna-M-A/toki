import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { createPartnership, getPartnership, getAllPartnerships, updatePartnershipStatus, getPartnershipsByBusiness } from "@/services/partnershipServices"
import { getBusiness } from "@/services/businessServices"
import { authOptions } from "../auth/[...nextauth]/options"

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const userId = session.user.id
  const data = await request.json()
  
  try {
    const business1 = await getBusiness(data.businessId1)
    const business2 = await getBusiness(data.businessId2)
    
    if (business1.ownerId !== userId && business2.ownerId !== userId) {
      return NextResponse.json({ error: "You must own at least one of the businesses" }, { status: 403 })
    }

    const partnership = await createPartnership({...data, initiatedBy: userId})
    return NextResponse.json(partnership)
  } catch (error) {
    console.error("Failed to create partnership:", error)
    return NextResponse.json(
      { error: "Failed to create partnership" },
      { status: 500 }
    )
  }
}

export async function PATCH(request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const data = await request.json()
  const { partnershipId, newStatus } = data
  
  try {
    const partnership = await getPartnership(partnershipId)
    
    const business1 = await getBusiness(partnership.businessId1)
    const business2 = await getBusiness(partnership.businessId2)
    
    if (business1.ownerId !== session.user.id && business2.ownerId !== session.user.id) {
      return NextResponse.json({ error: "You must own at least one of the businesses in this partnership" }, { status: 403 })
    }

    const updatedPartnership = await updatePartnershipStatus(partnershipId, newStatus)
    return NextResponse.json(updatedPartnership)
  } catch (error) {
    console.error("Failed to update partnership status:", error)
    return NextResponse.json(
      { error: "Failed to update partnership status" },
      { status: 500 }
    )
  }
}