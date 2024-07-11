"use client"
import { Button } from "@/components/ui/button"
import PerkCard from "./PerkCard"
import { ChevronLeft, ChevronRight, StarIcon } from "lucide-react"
import React, { useState } from "react"
import StarRating from "./StarRating"

const Partner = ({ business, perks }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 8 // Assuming 8 pages as shown in the image
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }
  const mapUri = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${business.placeId}`;
  return (
    <div className='w-full h-full flex gap-7 flex-col'>
      <div>
        <div className='flex justify-between items-center'>
          <Button variant='ghost'>
            <ChevronLeft className='mr-2 h-4 w-4' /> {business.name}
          </Button>
          <Button>Lets Partner</Button>
        </div>
      </div>
      <div className='grid grid-cols-5 w-full h-full gap-4'>
        <div className='bg-white col-span-2 rounded-lg py-10 px-5 flex flex-col gap-5'>
          <div className='text-lg font-light text-gray-800'>About</div>
          <div className='flex gap-2 items-center'>
            <StarRating rating={business.rating}/>
          </div>
          <div className='flex gap-10'>
            <div className='flex flex-col items-center'>
              <span className='text-sm text-gray-600'>partnered with</span>
              <div className='text-4xl font-bold'>09</div>
            </div>
            <div className='flex flex-col items-center'>
              <span className='text-sm text-gray-600'>new customers</span>
              <div className='text-4xl font-bold'>239</div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='text-sm text-gray-400'>company description</div>
            <div className='text-sm text-gray-600'>
             {business.description}
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <div className='text-sm text-gray-400'>Location</div>
            <div className='w-80 h-32 bg-gray-200 rounded-lg'>
            <div className='w-80 h-32  rounded-lg overflow-hidden'>
        <iframe
          src={mapUri}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
        ></iframe>
      </div>
            </div>
          </div>
        </div>

        <div className='bg-white col-span-3 rounded-lg py-10 px-5 '>
          <div className='flex justify-between'>
            <h1 className='text-lg font-light'>Perks</h1>
            <div className='flex items-center space-x-4'>
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className='p-1 rounded-full border border-gray-300 disabled:opacity-50'>
                <ChevronLeft className='w-5 h-5' />
              </button>
              <span className='text-sm'>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className='p-1 rounded-full border border-gray-300 disabled:opacity-50'>
                <ChevronRight className='w-5 h-5' />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-5">
            {
                perks.map((perk,index) => (
                    <PerkCard key={index} perk={perk}/>
                ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Partner
