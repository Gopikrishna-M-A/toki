import React from 'react'
import ManagePerk from './_components/ManagePerk'
import { getBusinessByOwner } from '@/services/businessServices'
import { getPerksByBusinessId } from '@/services/perkServices'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
const page = async () => {
  const session = await getServerSession(authOptions)
  const business = await getBusinessByOwner(session?.user?.id)
  const perks = await getPerksByBusinessId(business._id)
  return (
    <div className='h-full'>
      <ManagePerk perks={perks}/>
    </div>
  )
}

export default page


