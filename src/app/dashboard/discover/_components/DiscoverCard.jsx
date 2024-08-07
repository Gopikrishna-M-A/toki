import React, { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

const DiscoverCard = ({ partner }) => {
  console.log(partner);
  return (
    <Link href={`/dashboard/discover/${partner._id}`}>
      <Card key={partner.id} className='overflow-hidden h-full flex flex-col justify-between'>
     
          <Image
            src={partner.images[0]}
            alt={partner.name}
            width={400}
            height={200}
            className='w-full h-28 md:h-40 object-cover rounded-lg'
          />
        <CardHeader className='p-4'>
          <div className='flex justify-between items-center'>
            <h2 className='text-base font-semibold'>{partner.name}</h2>
            <span className='text-xs hidden md:block text-blue-600 bg-blue-100 font-medium px-2 rounded-full'>
              {partner.types[0]}
            </span>
          </div>
        </CardHeader>
        <CardContent className='p-4 pt-0 hidden md:block'>
          <p className='text-sm text-gray-700 mb-2 font-light line-clamp-2'>
            {partner.description}
          </p>
      
        </CardContent>
        <CardFooter className='px-4 py-2'>
        <div className="w-full">
            <p className='text-xs text-gray-400 font-light'>Google ratings</p>
            <div className='flex w-full items-center mt-1 gap-5'>
              <div className="flex items-center">
              <span className='mr-1 text-xs '>{partner.rating || 0}</span>
              <StarIcon className='w-3 h-3 text-yellow-500 fill-current' />
              </div>
              <span className='text-xs text-gray-500 ml-1'>
                {partner.reviewCount || 0} reviews
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default DiscoverCard
