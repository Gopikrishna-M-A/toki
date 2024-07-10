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

const PartnerCard = ({ partner }) => {
  return (
    <Card className='w-44 overflow-hidden flex flex-col justify-between'>
      <div className='relative w-full h-24'>
        <Image
          src={partner.image}
          alt={partner.name}
          layout='fill'
          objectFit='cover'
          className='rounded-lg'
        />
      </div>

      <CardContent  className='p-2'>
      <div>
        <h3 className='text-sm font-semibold'>{partner.name}</h3>
      </div>
      </CardContent>

      <CardFooter className='p-2 pb-4'>
      <div className='flex items-start gap-2 mt-2 flex-col w-full'>
        <p className='text-xs text-gray-400 font-light'>Google ratings</p>
        <div className='flex justify-between w-full'>
          <div className='flex'>
            <StarIcon className='w-3 h-3 text-yellow-500 fill-current' />
            <span className='text-xs text-gray-500 font-light'>
              {partner.rating}
            </span>
          </div>
          <span className='text-xs text-gray-500 font-light'>
            {partner.reviews} reviews
          </span>
        </div>
      </div>

      </CardFooter>


    


    </Card>
  )
}

export default PartnerCard
