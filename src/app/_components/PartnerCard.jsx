import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { StarIcon } from "lucide-react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"

const PartnerCard = ({ partner }) => {
  console.log("partner",partner);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
  const name = partner.photos[0].name
  const photoRef = name.split("photos/")[1];
  const imageUri = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${apiKey}`
  return (
    <Card className='w-44 overflow-hidden flex flex-col justify-between mx-auto'>
      <div className='relative w-full h-24 bg-gray-100'>
      <Image
      src={imageUri}
      alt={"image"}
      layout='fill'
      objectFit='cover'
      className='rounded-lg'
    />
       
      </div>

      <CardContent className='p-2'>
        <div>
          <h3 className='text-sm font-semibold truncate'>
            {partner.displayName.text}
          </h3>
        </div>
      </CardContent>

      <CardFooter className='p-2 pb-4'>
        <div className='flex items-start gap-2 mt-2 flex-col w-full'>
          <p className='text-xs text-gray-400 font-light'>Google ratings</p>
          <div className='flex justify-between w-full'>
            <div className='flex items-center gap-1'>
              <StarIcon className='w-3 h-3 text-yellow-500 fill-current' />
              <span className='text-xs text-gray-500 font-light'>
                {partner.rating}
              </span>
            </div>
            <span className='text-xs text-gray-500 font-light flex items-center gap-1'>
              {partner.userRatingCount} <span>reviews</span>
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default PartnerCard
