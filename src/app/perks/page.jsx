import React from 'react'
import Perks from './_components/Perks'
import { getAllPerks } from '@/services/perkServices'
import { getRedemptionsByUserId } from '@/services/redemptionServices'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/options'
const page = async () => {
  const session = await getServerSession(authOptions)
  const perks = await getAllPerks()
  const userRedeemedPerks = await getRedemptionsByUserId(session?.user?.id)
  const redeems = userRedeemedPerks.map((perk) => perk?.perkId)
  return (
    <div className='h-full bg-gray-100'>
        <Perks perks={perks} redeems={redeems}/>
    </div>
  )
}

export default page