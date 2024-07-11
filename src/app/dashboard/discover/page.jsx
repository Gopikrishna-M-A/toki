import React from 'react'
import Discover from './_components/Discover'
import { getAllBusiness } from '@/services/businessServices'
const page = async () => {
  const businesses = await getAllBusiness()
  return (
    <div className='h-full'>
        <Discover businesses={businesses}/>
    </div>
  )
}

export default page