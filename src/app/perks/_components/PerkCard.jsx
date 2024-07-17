import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Loader2 } from "lucide-react"
import convertDate from "@/lib/dateConverter"
import axios from "axios"
import confetti from "canvas-confetti"
import { signIn, useSession } from "next-auth/react"

const PerkCard = ({ perk, redeems }) => {
  const validUntil = new Date(perk.validUntil)
  const [userRedeemedPerks, setUserRedeemedPerks] = useState(redeems)
  const [loading, setLoading] = useState(null)
  const { data: session } = useSession()

  const handleRedeem = async () => {
    if(session?.user){
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
    }else{
        signIn()
    }
   
  }

  return (
    <div className='relative w-80 h-96 bg-white rounded-lg overflow-hidden'>
      <div className='absolute top-1/2 -left-4 w-8 h-8 bg-gray-100 rounded-full'></div>
      <div className='absolute top-1/2 -right-4 w-8 h-8 bg-gray-100 rounded-full'></div>

      <div
        className='h-1/2 bg-cover bg-center relative'
        style={{
          backgroundImage: `url(${
            perk.businessId.images[0] || "/placeholder-bg.jpg"
          })`,
        }}>
        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent'></div>
        <div className='w-full h-full flex items-center justify-center bg-black bg-opacity-40'>
          <h1 className='text-3xl font-bold text-center text-white'>
            {perk.title}
          </h1>
        </div>
      </div>

      <div className='p-4 space-y-4'>
        <p className='text-sm text-gray-600 text-center'>{perk.description}</p>
        <div className='flex items-center space-x-2'>
          <img
            src={perk.businessId.logo || "/placeholder-logo.png"}
            alt='Business Logo'
            className='w-8 h-8 rounded-full'
          />
          <p className='text-sm font-semibold'>
            Valid until: {convertDate(validUntil)}
          </p>
        </div>
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
    </div>
  )
}

export default PerkCard
