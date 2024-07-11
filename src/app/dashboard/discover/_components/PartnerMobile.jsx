"use client"
import { Button } from "@/components/ui/button"
import PerkCard from "./PerkCard"
import { ChevronLeft, ChevronRight, StarIcon } from "lucide-react"
import React, { useState } from "react"
import StarRating from "./StarRating"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const PartnerMobile = ({ business, perks }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [menu, setMenu] = useState("About")
  const totalPages = 8 // Assuming 8 pages as shown in the image
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }
  const mapUri = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${business.placeId}`
  return (
    <div className='w-full h-full flex md:hidden gap-2 flex-col relative bg-white'>
        <div className='absolute top-6 left-4'>
          <Button variant='ghost' size='icon'>
            <ChevronLeft className='mr-2 h-4 w-4' />
          </Button>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center mt-4">
            <div >
            <Avatar className="w-20 h-20">
            <AvatarImage src={business.logo} alt={business.name} />
            <AvatarFallback className='font-bold text-3xl text-gray-400'>{business.name.charAt(0)}</AvatarFallback>
          </Avatar>
            </div>
            <div className="font-semibold">{business.name}</div>
            <StarRating rating={business.rating} />
        </div>
      <Menubar defaultValue='About' className='w-fit mx-auto mt-4'>
        <MenubarMenu>
          <MenubarTrigger onClick={() => setMenu("About")}>
            About
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger onClick={() => setMenu("Perks")}>
            Perks
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>

      {menu == "About" && (
        <div className='flex flex-col w-full  gap-4'>
          <div className='bg-white rounded-lg py-5 px-5 flex flex-col gap-5'>
          <div className='flex flex-col gap-2'>
              <div className='text-sm text-gray-400'>company description</div>
              <div className='text-sm text-gray-600'>
                {business.description}
              </div>
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
           

            <div className='flex flex-col gap-2 mt-4'>
              <div className='text-sm text-gray-400'>Location</div>
                <div className='w-full h-36 bg-gray-200 rounded-lg overflow-hidden'>
                  <iframe
                    src={mapUri}
                    width='100%'
                    height='100%'
                    style={{ border: 0 }}
                    allowFullScreen></iframe>
                </div>
            </div>
          </div>
        </div>
      )}
      {menu == "Perks" && (
        <div className='flex flex-col w-full gap-4'>
          <div className='bg-white rounded-lg py-5 px-5 '>
            <div className='grid grid-cols-1 gap-2'>
              {perks.map((perk, index) => (
                <PerkCard key={index} perk={perk} />
              ))}
            </div>
          </div>
        </div>
      )}
      <Button className='max-w-sm w-full mx-auto'>Lets Partner</Button>
    </div>
  )
}

export default PartnerMobile
