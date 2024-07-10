import React from 'react'
import CreatePerk from '../_components/CreatePerk'
import { getBusinessByOwner } from '@/services/businessServices'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
const page = async () => {
  const session = await getServerSession(authOptions)
  const business = await getBusinessByOwner(session?.user?.id)
  return (
    <div className='h-full'>
        <CreatePerk business={business}/>
    </div>
  )
}

export default page







  