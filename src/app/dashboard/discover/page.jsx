import React from 'react'
import Discover from './_components/Discover'
import { getAllBusiness } from '@/services/businessServices'
const page = async () => {
  const businesses = await getAllBusiness()
  return (
    <div>
        <Discover businesses={businesses}/>
    </div>
  )
}

export default page