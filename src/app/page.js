import React from "react"
import LandingPage from "./_components/LandingPage"
import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/options"
import { getBusinessByOwner } from "@/services/businessServices";


const page = async () => {
  const session = await getServerSession(authOptions)
  const business = await getBusinessByOwner(session?.user?.id)
  if (session?.user) {
    if(business){
      redirect('/dashboard/discover')
    }else{
      redirect('/registration')
    }
  }

  return (
    <div className="bg-black">
      <LandingPage />
    </div>
  )
}

export default page
