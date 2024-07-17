"use client"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"


import PerkCard from "./PerkCard"

const PerksPage = ({ perks, redeems }) => {
    const [searchTerm, setSearchTerm] = useState("")
   
  const filteredPerks = perks.filter(
    (perk) =>
      perk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      perk.description.toLowerCase().includes(searchTerm.toLowerCase())
  )



  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>Available Perks</h1>

      <div className='flex gap-4 mb-6'>
        <Input
          placeholder='Search perks...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='max-w-sm'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-fit md:w-full mx-auto'>
        {filteredPerks.map((perk, index) => (
            <PerkCard key={index} perk={perk} redeems={redeems}/>
        ))}
      </div>
    </div>
  )
}

export default PerksPage