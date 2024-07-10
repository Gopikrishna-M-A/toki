import React from 'react'
import BusinessProfile from './_components/BusinessProfile'
import { getBusinessByOwner } from '@/services/businessServices'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/options'
const page = async () => {
  const session = await getServerSession(authOptions)
  const business = await getBusinessByOwner(session?.user?.id)
  return (
    <div>
      <BusinessProfile  business={business}/>
    </div>
  )
}

export default page