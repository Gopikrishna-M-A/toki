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
  const [imageLoaded, setImageLoaded] = useState(false)
  return (
    <Card className='w-44 overflow-hidden flex flex-col justify-between mx-auto'>
      <div className='relative w-full h-24'>
      {!imageLoaded ? (
        <Skeleton className="absolute inset-0 rounded-lg" />
      ): <Image
      src={partner.photos[0].authorAttributions.photoUri}
      alt={"image"}
      layout='fill'
      objectFit='cover'
      className='rounded-lg'
      onLoad={() => setImageLoaded(true)}
      onError={() => setImageLoaded(false)}
    />}
       
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
