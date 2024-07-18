"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import PerkCard from "./PerkCard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"

const PerksPage = ({ perks, redeems, business }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const { data: session } = useSession()
  const user = session?.user

  const filteredPerks = perks.filter(
    (perk) =>
      perk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      perk.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSignout = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <div className='h-full relative'>
      <header className='container h-20 w-full fixed top-0 left-0 right-0 flex justify-between md:justify-end backdrop-blur-sm z-10'>
        {user && (
          <div className='flex flex-col gap-1 justify-center items-center md:absolute md:inset-0'>
            <Avatar>
              <AvatarImage src={business?.logo} alt='logo' />
              <AvatarFallback>BL</AvatarFallback>
            </Avatar>
            <div className='text-xs text-gray-400 '>{business?.name}</div>
          </div>
        )}
        <div className='flex gap-2 items-center z-20'>
          {user && (
            <div className='flex items-center w-ful gap-2'>
              <Avatar>
                <AvatarImage src={user?.image} alt='user' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className='text-xs font-medium hidden md:block'>
                  {user?.name}
                </p>
                <p className='text-xs text-gray-500 hidden md:block'>
                  {user?.email}
                </p>
              </div>
            </div>
          )}

          {user ? (
            <Button onClick={handleSignout} variant='outline' size='icon'>
              <LogOut className='h-4 w-4' />
            </Button>
          ) : (
            <Button onClick={signIn}>Login</Button>
          )}
        </div>
      </header>

      <main className='md:container pb-32 pt-24 min-h-screen'>
        <Card className='h-full shadow-none border-none md:border md:shadow-sm'>
          <CardContent>
            <div className='flex gap-2 py-5 items-center'>
              <div className='border-b w-full'></div>
              <div className='text-2xl font-medium text-gray-300 text-nowrap'>
                {business?.name || null} member perks just for you
              </div>
              <div className='border-b w-full'></div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-fit md:w-full mx-auto'>
              {filteredPerks.map((perk, index) => (
                <PerkCard key={index} perk={perk} redeems={redeems} />
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className='container h-24 w-full absolute bottom-0 left-0 right-0 text-gray-400 flex justify-center items-center gap-2'>
        <div className='text-sm'>Powered by</div>
        <Image src='/images/logo-gray.png' width={20} height={20} alt='logo' />
        <div className='tracking-[.35em] font-semibold'>TOKI</div>
      </footer>
    </div>
  )
}

export default PerksPage

/* <h1 className='text-3xl font-bold mb-6'>Available Perks</h1> */

/* <div className='flex gap-4 mb-6'>
        <Input
          placeholder='Search perks...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='max-w-sm'
        />
      </div> */
