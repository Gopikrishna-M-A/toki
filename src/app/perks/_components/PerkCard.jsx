import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Loader2, StarIcon } from "lucide-react"
import convertDate from "@/lib/dateConverter"
import axios from "axios"
import confetti from "canvas-confetti"
import { signIn, useSession } from "next-auth/react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"

const PerkCard = ({ perk, redeems }) => {
  const validUntil = new Date(perk.validUntil)
  const [userRedeemedPerks, setUserRedeemedPerks] = useState(redeems)
  const [loading, setLoading] = useState(null)
  const { data: session } = useSession()

  const handleRedeem = async () => {
    if (session?.user) {
      setLoading(true)
      const end = Date.now() + 3 * 1000 // 3 seconds
      const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"]
      const frame = () => {
        if (Date.now() > end) return

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        })
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        })

        requestAnimationFrame(frame)
      }
      frame()

      try {
        await axios
          .post("/api/redeem", {
            perkId: perk._id,
            businessId: perk.businessId,
          })
          .then((response) => {
            setUserRedeemedPerks((prev) => [...prev, perk._id])
          })
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    } else {
      signIn()
    }
  }

  return (
    <Card className='max-w-xs overflow-hidden h-full flex flex-col justify-between'>
      <Image
        src={perk.businessId.images[0]}
        alt={perk.businessId.name}
        width={400}
        height={200}
        className='w-full h-28 md:h-40 object-cover rounded-lg'
      />
      <CardHeader className='p-4'>
        <div className='flex justify-between items-center flex-wrap'>
          <h2 className='text-base font-semibold'>{perk.businessId.name}</h2>
          <span className='text-xs hidden md:block text-blue-600 bg-blue-100 font-medium px-2 rounded-full'>
            {perk.businessId.types[0]}
          </span>
        </div>
      </CardHeader>
      <CardContent className='p-4 pt-0'>
        <p className='text-sm text-gray-700 mb-2 font-medium line-clamp-2'>
          {perk.title}
        </p>
        <p className='text-sm text-gray-700 mb-2 font-light line-clamp-2'>
          {perk.description}
        </p>
        <p className='flex gap-2 items-center'>
          <span className='text-xs text-gray-300'>Validity till</span>
          <span className='text-xs'>{convertDate(validUntil)}</span>
        </p>
      </CardContent>
      <CardFooter className='px-4 py-2'>
        <div className='w-full flex justify-between flex-wrap gap-2'>
          <Button variant='outline'>Know more</Button>
          {loading ? (
            <Button disabled>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Redeeming...
            </Button>
          ) : (
            <Button
              disabled={userRedeemedPerks.includes(perk._id)}
              onClick={handleRedeem}>
              Redeem Now
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

export default PerkCard
