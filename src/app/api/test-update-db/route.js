import dbConnect from '@/services/db';
import User from '@/services/models/User';
import Business from '@/services/models/Business';
import { NextResponse } from "next/server"

export async function POST(request) {
 
    try {
        await dbConnect();
    
        // Fetch all users
        const users = await User.find({});
    
        for (const user of users) {
          // Find a business where this user is the owner
          const business = await Business.findOne({ ownerId: user._id });
    
          if (business) {
            // Update the user with the business ID
            await User.findByIdAndUpdate(user._id, { businessId: business._id });
          }
        }

      return NextResponse.json("done")
    } catch (error) {
      console.error("Failed to update :", error)
      return NextResponse.json(
        { error: "Failed to update" },
        { status: 500 }
      )
    }
  }