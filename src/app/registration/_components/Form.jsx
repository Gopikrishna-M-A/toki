"use client"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Label } from "@radix-ui/react-label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import axios from "axios"
import { RotateCw } from "lucide-react"

const Form = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    contactInfo: {
      phone: "",
      email: "",
    },
    logoUrl: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }))
  }

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      contactInfo: {
        ...prevState.contactInfo,
        [name]: value,
      },
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post("/api/businesses", formData).then((res)=>{
        router.push('/dashboard')
      })
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div
      className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 bg-contain bg-center bg-no-repeat'
      style={{
        backgroundImage: "url('/images/home/logovector.png')",
        backgroundAttachment: "fixed",
      }}>
      <div className='w-full z-10 relative'>
        <div className='flex justify-center items-center gap-4 mb-8'>
          <Image
            src='/images/home/vector-black.png'
            width={43}
            height={43}
            alt='logo'
          />
          <h1 className='text-4xl font-bold'>TOKI</h1>
        </div>

        <form
          onSubmit={onSubmit}
          className='max-w-4xl w-full bg-white rounded-lg mx-auto shadow-lg px-5 py-10 flex flex-col gap-5'>
          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='name'>Business Name</Label>
            <Input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              placeholder='Enter business name'
              required
            />
          </div>

          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='type'>Business Type</Label>
            <Input
              type='text'
              id='type'
              name='type'
              value={formData.type}
              onChange={handleInputChange}
              placeholder='e.g., Cafe, Restaurant, Retail'
              required
            />
          </div>

          <div className='grid w-full gap-1.5'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              placeholder='Describe your business'
              id='description'
              name='description'
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className='grid w-full gap-1.5'>
            <Label>Address</Label>
            <Textarea
              type='text'
              placeholder='Street'
              name='street'
              value={formData.address.street}
              onChange={handleAddressChange}
            />
            <div className='flex gap-2'>
              <Input
                type='text'
                placeholder='City'
                name='city'
                value={formData.address.city}
                onChange={handleAddressChange}
              />
              <Input
                type='text'
                placeholder='State'
                name='state'
                value={formData.address.state}
                onChange={handleAddressChange}
              />
            </div>
            <div className='flex gap-2'>
              <Input
                type='text'
                placeholder='Zip Code'
                name='zipCode'
                value={formData.address.zipCode}
                onChange={handleAddressChange}
              />
              <Input
                type='text'
                placeholder='Country'
                name='country'
                value={formData.address.country}
                onChange={handleAddressChange}
              />
            </div>
          </div>

          <div className='grid w-full gap-1.5'>
            <Label>Contact Information</Label>
            <Input
              type='tel'
              placeholder='Phone Number'
              name='phone'
              value={formData.contactInfo.phone}
              onChange={handleContactInfoChange}
            />
            <Input
              type='email'
              placeholder='Business Email'
              name='email'
              value={formData.contactInfo.email}
              onChange={handleContactInfoChange}
            />
          </div>

          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='logoUrl'>Logo URL</Label>
            <Input
              type='url'
              id='logoUrl'
              name='logoUrl'
              value={formData.logoUrl}
              onChange={handleInputChange}
              placeholder='https://example.com/logo.png'
            />
          </div>

          {loading ? (
            <Button disabled>
              <RotateCw className='mr-2 h-4 w-4 animate-spin' />
              Please wait
            </Button>
          ) : (
            <Button type='submit' className='mt-4'>
              Continue
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}

export default Form
