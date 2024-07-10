import React from 'react'
import Partner from '../_components/Partner'
import { getPerksByBusinessId } from '@/services/perkServices'
import { getBusiness } from '@/services/businessServices'
const page = async ({params}) => {
  const business = await getBusiness(params.id)
  const perks = await getPerksByBusinessId(params.id)
  return (
    <div className='h-full'>
        <Partner business={business} perks={perks}/>
    </div>
  )
}

export default page