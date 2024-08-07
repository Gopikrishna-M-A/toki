"use client"
import { Button } from "@/components/ui/button"
import PerkCard from "../../discover/_components/PerkCard"
import { ChevronLeft, ChevronRight, Plus, StarIcon } from "lucide-react"
import React, { useState } from "react"
import Link from "next/link"

const ManagePerk = ({ perks }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 8 // Assuming 8 pages as shown in the image

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <div className='w-full h-full flex gap-7 flex-col bg-white md:bg-gray-100'>
      <div>
        <div className='flex justify-between items-center'>
         <Link href='/dashboard/discover'>
         <Button variant='ghost'>
            <ChevronLeft className='mr-2 h-4 w-4' /> Manage Perks
          </Button>
          </Link>
          <Link className="hidden md:block" href='/dashboard/manage-perks/createperks'>
          <Button variant='outline'>
            Create new perk
          <Plus className='ml-2 h-4 w-4' />
          </Button></Link>
        </div>
      </div>

      <div className='w-full md:h-full gap-4'>
        <div className='bg-white rounded-lg  pt-0 md:py-10 px-5 '>
          <div className='flex justify-center md:justify-between'>
            <h1 className='text-lg font-light '>Perks</h1>
            <div className='md:flex items-center space-x-4 hidden '>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-5">
            {
                perks.map((perk,index) => (
                    <PerkCard key={index} perk={perk} />
                ))
            }
          </div>
        </div>
       
      </div>
      <Link className=" mx-auto md:hidden" href='/dashboard/manage-perks/createperks'>
          <Button variant='outline'>
            Create new perk
          <Plus className='ml-2 h-4 w-4' />
          </Button>
      </Link>

    </div>
  )
}

export default ManagePerk
