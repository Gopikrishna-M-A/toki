import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { 
  createNotification, 
  getNotification, 
  getAllNotifications, 
  getNotificationsByReceiver, 
  markNotificationAsRead,
  getUnreadNotificationsCount
} from "@/services/notificationServices"
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
    const senderBusiness = await getBusiness(data.senderBusinessId)
    if (senderBusiness.ownerId !== userId) {
      return NextResponse.json({ error: "You must own the sender business" }, { status: 403 })
    }

    const notification = await createNotification(data)
    return NextResponse.json(notification)
  } catch (error) {
    console.error("Failed to create notification:", error)
    return NextResponse.json(
      { error: "Failed to create notification" },
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
  const { notificationId } = data
  
  try {
    const notification = await getNotification(notificationId)
    
    const receiverBusiness = await getBusiness(notification.receiverBusinessId)
    if (receiverBusiness.ownerId !== session.user.id) {
      return NextResponse.json({ error: "You must own the receiver business" }, { status: 403 })
    }

    const updatedNotification = await markNotificationAsRead(notificationId)
    return NextResponse.json(updatedNotification)
  } catch (error) {
    console.error("Failed to mark notification as read:", error)
    return NextResponse.json(
      { error: "Failed to mark notification as read" },
      { status: 500 }
    )
  }
}