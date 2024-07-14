import React from 'react'
import Partner from '../_components/Partner'
import PartnerMobile from '../_components/PartnerMobile'
import { getPerksByBusinessId } from '@/services/perkServices'
import { getBusiness } from '@/services/businessServices'
import { getNotificationStatus } from '@/services/notificationServices'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
const page = async ({params}) => {
  const session = await getServerSession(authOptions)
  const business = await getBusiness(params.id)
  const perks = await getPerksByBusinessId(params.id)
  const status = await getNotificationStatus(session?.user?.businessId,params.id,'partner_request')
  return (
    <div className='h-full'>
        <Partner business={business} perks={perks} status={status}/>
        <PartnerMobile business={business} perks={perks} status={status}/>
    </div>
  )
}

export default page