import React from 'react'
import Perks from './_components/Perks'
import { getAllPerks } from '@/services/perkServices'
import { getRedemptionsByUserId } from '@/services/redemptionServices'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/options'
import { getBusinessByOwner } from '@/services/businessServices'
const page = async () => {
  const session = await getServerSession(authOptions)
  const business = await getBusinessByOwner(session?.user?.id)
  const perks = await getAllPerks()
  const userRedeemedPerks = await getRedemptionsByUserId(session?.user?.id)
  const redeems = userRedeemedPerks.map((perk) => perk?.perkId)
  return (
    <div className='h-full bg-white md:bg-gray-100 min-h-screen '>
        <Perks perks={perks} redeems={redeems} business={business}/>
    </div>
  )
}

export default page