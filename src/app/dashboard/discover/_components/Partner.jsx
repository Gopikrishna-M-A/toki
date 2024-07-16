"use client"
import { Button } from "@/components/ui/button"
import PerkCard from "./PerkCard"
import { ChevronLeft, ChevronRight, StarIcon } from "lucide-react"
import React, { useEffect, useState } from "react"
import StarRating from "./StarRating"
import Link from "next/link"
import axios from "axios"
import { useSession } from "next-auth/react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"

const Partner = ({ business, perks, status }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data: session } = useSession()
  const [buttonState, setButtonState] = useState({
    text: "Send Partner Request",
    disabled: false,
  })
  const totalPages = 8
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
  const mapUri = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${business.placeId}`
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

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
    // try {
    //   const res = await axios.post('/api/notifications', {
    //     senderBusinessId: session?.user?.businessId,
    //     receiverBusinessId: business._id,
    //     type: 'partner_request',
    //     message: `I would like to partner with your business, ${business.name}`
    //   })
    //   setButtonState({ text: 'Request Pending', disabled: true });
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <div className='w-full h-full hidden md:flex gap-7 flex-col'>
      <div>
        <div className='flex justify-between items-center'>
          <Link href='/dashboard/discover'>
            <Button variant='ghost'>
              <ChevronLeft className='mr-2 h-4 w-4' /> {business.name}
            </Button>
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                disabled={buttonState.disabled}
                onClick={handleNotification}>
                {buttonState.text}
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-md p-0 py-5 bg-[#F7EBEB]'>
              <DialogHeader>
                <DialogTitle className='text-center text-xl font-medium text-indigo-900'>
                  Hooray!
                </DialogTitle>
              </DialogHeader>
              <div className="flex justify-center relative h-60 -mt-10 -z-10">
                <Image
                  src='/images/partnership.png'
                  alt='Partnership Hands'
                  layout="fill"
                  className='w-auto h-auto left-0 right-0'
                />
              </div>
              <div className='text-center text-xl -mt-14 text-indigo-900 mb-4'>
                You have made a new partner
              </div>
              <div className='text-center text-sm -mt-6 font-light text-gray-600 px-5'>
                Your coupons have been shared and linked to your member portal
                for your customers to redeem.
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className='grid grid-cols-5 w-full h-full gap-4'>
        <div className='bg-white col-span-2 rounded-lg py-10 px-5 flex flex-col gap-5'>
          <div className='text-lg font-light text-gray-800'>About</div>
          <div className='flex gap-2 items-center'>
            <StarRating rating={business.rating} />
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
            <div className='text-sm text-gray-600'>{business.description}</div>
          </div>

          <div className='flex flex-col gap-2'>
            <div className='text-sm text-gray-400'>Location</div>
            <div className='w-80 h-32 bg-gray-200 rounded-lg'>
              <div className='w-80 h-32  rounded-lg overflow-hidden'>
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
          <div className='grid grid-cols-2 gap-2 mt-5'>
            {perks.map((perk, index) => (
              <PerkCard key={index} perk={perk} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Partner
