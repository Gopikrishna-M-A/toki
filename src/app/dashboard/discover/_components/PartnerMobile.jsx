"use client"
import { Button } from "@/components/ui/button"
import PerkCard from "./PerkCard"
import { ChevronLeft, ChevronRight, StarIcon } from "lucide-react"
import React, { useEffect, useState } from "react"
import StarRating from "./StarRating"
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useSession } from "next-auth/react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import axios from "axios"

const PartnerMobile = ({ business, perks, status }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [menu, setMenu] = useState("About")
  const { data: session } = useSession()
  const [buttonState, setButtonState] = useState({
    text: "Send Partner Request",
    disabled: false,
  })
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
  const mapUri = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${business.placeId}`

  useEffect(() => {
    updateButtonState()
  }, [])

  const updateButtonState = async () => {
    try {
      switch (status) {
        case "PENDING":
          setButtonState({ text: "Request Pending", disabled: true })
          break
        case "ACCEPTED":
          setButtonState({ text: "Already Partners", disabled: true })
          break
        case "REJECTED":
          setButtonState({ text: "Request Again", disabled: false })
          break
        case null:
          setButtonState({ text: "Lets Partner", disabled: false })
          break
        default:
          console.log("Unexpected status:", status)
          setButtonState({ text: "Lets Partner", disabled: false })
      }
    } catch (error) {
      console.error("Error updating button state:", error)
      setButtonState({ text: "Error", disabled: true })
    }
  }

  const handleNotification = async () => {
    try {
      const res = await axios.post('/api/notifications', {
        senderBusinessId: session?.user?.businessId,
        receiverBusinessId: business._id,
        type: 'partner_request',
        message: `I would like to partner with your business, ${business.name}`
      })
      setButtonState({ text: 'Request Pending', disabled: true });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-full h-full flex md:hidden gap-2 flex-col relative bg-white'>
      <div className='absolute top-6 left-4'>
        <Link href='/dashboard/discover'>
          <Button variant='ghost' size='icon'>
            <ChevronLeft className='mr-2 h-4 w-4' />
          </Button>
        </Link>
      </div>
      <div className='flex flex-col gap-2 justify-center items-center mt-4'>
        <div>
          <Avatar className='w-20 h-20'>
            <AvatarImage src={business.logo} alt={business.name} />
            <AvatarFallback className='font-bold text-3xl text-gray-400'>
              {business.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className='font-semibold'>{business.name}</div>
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
   
      <Drawer>
        <DrawerTrigger asChild>
        <Button
            className='max-w-sm w-full mx-auto'
            disabled={buttonState.disabled}
            onClick={handleNotification}>
            {buttonState.text}
          </Button>
        </DrawerTrigger>
        <DrawerContent className='p-7'>
          <DrawerHeader></DrawerHeader>

          <div className='flex justify-center h-32 mb-10'>
            <Image
              src='/images/partnership2.png'
              alt='Partnership Hands'
              width={200}
              height={200}
              className='object-contain'
            />
          </div>
          <div className='text-center text-xl font-medium text-gray-600 px-10 pb-5'>
             Hooray!
          </div>
          <div className='text-center font-light text-gray-600 px-10 pb-5'>
            Your coupons have been shared and linked to your members portal.
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default PartnerMobile
