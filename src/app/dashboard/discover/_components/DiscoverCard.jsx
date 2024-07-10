import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const DiscoverCard = ({ partner }) => {
  return (
    <Link href={`/dashboard/discover/${partner._id}`}>
      <Card key={partner.id} className='overflow-hidden'>
        <Image
          src={partner.image}
          alt={partner.name}
          width={400}
          height={200}
          className='w-full h-40 object-cover rounded-lg'
        />
        <CardHeader className='p-4'>
          <div className='flex justify-between items-center'>
              <h2 className='text-base font-semibold'>{partner.name}</h2>
              <span className='text-xs text-blue-600 bg-blue-100 font-medium px-2 rounded-full'>{partner.category}</span>
          </div>
        </CardHeader>
        <CardContent className='p-4 pt-0'>
          <p className='text-sm text-gray-700 mb-2 font-light'>
              {partner.description.length > 70
                ? partner.description.substring(0, 70) + " ..."
                : partner.description}
            <span className='font-semibold text-gray-950'>read more</span>
          </p>
          {/* {partner.rating > 0 && ( */}
            <div className='mt-4'>
              <p className='text-xs text-gray-400 font-light'>Google ratings</p>
              <div className='flex items-center mt-1'>
                <span className='mr-1 text-xs '>{partner.rating || 0}</span>
                <StarIcon className='w-3 h-3 text-yellow-500 fill-current' />
                <span className='text-xs text-gray-500 ml-1'>
                  {partner.reviews || 0} reviews
                </span>
              </div>
            </div>
          {/* )} */}
        </CardContent>
      </Card>
    </Link>
  )
}

export default DiscoverCard
