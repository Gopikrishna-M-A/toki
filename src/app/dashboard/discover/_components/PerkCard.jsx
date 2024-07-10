import React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Link from "next/link"
import convertDate from "@/lib/dateConverter"

const PerkCard = ({ perk }) => {
  console.log(perk);
  return (
    <Link href='#'>
      <Card className='overflow-hidden'>
        <CardHeader className='p-4'>
          <div className='flex justify-between items-center'>
              <h2 className='text-base font-semibold'>{perk?.businessId?.name}</h2>
              <span className='text-xs text-blue-600 bg-blue-100 font-medium px-2 rounded-full'>{perk?.businessId?.type}</span>
          </div>
        </CardHeader>
        <CardContent className='p-4 pt-0 flex flex-col justify-between'>
        <p className='text-gray-800'>{perk.title}</p>
        <p className='text-xs text-gray-800 font-light'>{perk.description}</p>
        </CardContent>
        <CardFooter className='px-4'>
        <div className="flex gap-2">
          <p className='text-xs text-gray-400 font-light'>Valid till</p>
          <p className='text-xs text-gray-800 font-light'>{convertDate(perk.validUntil)}</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default PerkCard
