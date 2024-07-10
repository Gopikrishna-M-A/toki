import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { createBusiness } from "@/services/businessServices"
import { authOptions } from "../auth/[...nextauth]/options"

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const ownerId = session.user.id
  const data = await request.json()
  try {
    const business = await createBusiness({...data,ownerId})
    return NextResponse.json( business )
  } catch (error) {
    console.error("Failed to create business:", error)
    return NextResponse.json(
      { error: "Failed to create business" },
      { status: 500 }
    )
  }
}

// export async function PATCH(request) {
//   const session = await getServerSession(authOptions)
//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }
//   const userData = await request.json()
//   try {
//     const user = await updateUser(session.user.id,userData)
//     return NextResponse.json( user )
//   } catch (error) {
//     console.error("Failed to update user:", error)
//     return NextResponse.json(
//       { error: "Failed to update user" },
//       { status: 500 }
//     )
//   }
// }
