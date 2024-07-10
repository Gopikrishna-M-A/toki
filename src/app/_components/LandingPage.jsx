"use client"
import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PartnerCard from "./PartnerCard"
import Image from "next/image"
import { signIn } from "next-auth/react"

const partnersData = [
  {
    id: 1,
    name: "WeWork",
    category: "Co-working",
    description:
      "Work from hot desks, lounges, phone booths and more. Book meeting rooms and private ",
    rating: 4.7,
    reviews: 252,
    image: "/images/discover/1.png",
  },
  {
    id: 2,
    name: "Bombay Designer Boutique",
    category: "Boutique",
    description:
      "Top and well known Ladies Tailoring Services in Koramangala, Bangalore and also known ",
    rating: 4.8,
    reviews: 149,
    image: "/images/discover/2.png",
  },
  {
    id: 3,
    name: "ferns N petals",
    category: "Florist",
    description:
      "Fresh Flowers & Perfect Gifts for all Occasions. Gift Ideas for your Beloved.",
    rating: 4.6,
    reviews: 576,
    image: "/images/discover/3.png",
  },
  {
    id: 4,
    name: "Shades Creative Gallery",
    category: "Art gallery",
    description:
      "ART GALLERY ART Gifts, FINE ART Paintings, Art prints, Artifacts and Home Decor product ",
    rating: 4.8,
    reviews: 149,
    image: "/images/discover/4.png",
  },
  {
    id: 5,
    name: "Cult Fitness Centre",
    category: "Gym/Fitness center",
    description:
      '"Walk-in to a state-of-the-art fitness centre where fitness = fun. From Dance fitness, Boxing',
    rating: 4.8,
    reviews: 149,
    image: "/images/discover/5.png",
  },
  {
    id: 6,
    name: "Drapers",
    category: "Co-living",
    description:
      '"Coworking + Coliving + Community + Events & Activities + Networking ',
    rating: 4.8,
    reviews: 149,
    image: "/images/discover/6.png",
  },
]

const LandingPage = () => {
  return (
    <div
      className='min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 bg-contain bg-center bg-no-repeat'
      style={{
        backgroundImage: "url('/images/home/logovector.png')",
        backgroundAttachment: "fixed",
      }}>
      <div className='w-full z-10 relative'>
        <div className='flex justify-center items-center gap-4 mb-8'>
          <Image
            src='/images/home/toki.png'
            width={43}
            height={43}
            alt='logo'
          />
          <h1 className='text-4xl font-bold'>TOKI</h1>
        </div>

        <div className='mb-8 max-w-4xl mx-auto'>
          <h2 className='text-xl font-thin mb-4 text-center'>
            Let's find your potential partners
          </h2>
          <div className='flex bg-white p-2 rounded'>
            <Input
              className='flex-grow mr-2 border-none text-black'
              placeholder='Third wave, HSR layout, 3rd main'
            />
            <Button>Discover</Button>
          </div>
        </div>

        <div className='flex gap-2 justify-center'>
          {partnersData.map((partner, index) => (
            <PartnerCard key={index} partner={partner} />
          ))}
        </div>

        <p className='text-center mb-4 mt-16 font-light'>
          40 + more to collaborate
        </p>

        <div className='flex justify-center'>
          <Button
            onClick={signIn}
            variant='secondary'
            size='lg'
            className='px-16'>
            Sign up to partner
          </Button>
        </div>
      </div>
      {/* Overlay to ensure text is readable */}
      <div className='absolute inset-0 bg-black opacity-50 z-0'></div>
    </div>
  )
}

export default LandingPage
