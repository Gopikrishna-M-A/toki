"use client"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Calendar as CalendarIcon, RotateCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"

const CreatePerk = ({ business }) => {
  const router = useRouter()
  const [dealModes, setDealModes] = useState({
    sms: false,
    email: false,
    website: false,
  })
  const [newCustomerRestriction, setNewCustomerRestriction] = useState("")
  const [date, setDate] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [instructions, setInstructions] = useState("")
  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)

  const handleDealModeChange = (mode) => {
    setDealModes((prev) => ({ ...prev, [mode]: !prev[mode] }))
  }

  const generatePerk = async () => {
    setLoading(true)
    const data = {
      businessId: business._id,
      title,
      description,
      validUntil: date,
      // specialInstructions: instructions,
      // noteForPartner: note,
      // dealModes,
      // newCustomerRestriction,
    }

    try {
      const res = await axios.post("/api/perks", data)
      if (res.status === 200) {
        router.push("/dashboard/manage-perks")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='w-full h-full flex gap-7 flex-col'>
      <div>
        <div className='flex justify-between items-center'>
          <Link href='/dashboard/manage-perks'>
            <Button variant='ghost'>
              <ChevronLeft className='mr-2 h-4 w-4' /> Manage Perks | Create new
              token
            </Button>
          </Link>
        </div>
      </div>

      <div className='bg-white rounded-lg py-10 px-5 pr-20 h-full flex flex-col gap-14'>
        <div className='flex gap-10 justify-between items-start max-w-xl'>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label
              className='text-gray-400 font-light mb-2 text-sm'
              htmlFor='title'>
              Deal title
            </Label>
            <Input
              type='text'
              id='title'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label
              className='text-gray-400 font-light mb-2 text-sm'
              htmlFor='email'>
              Deal Validity
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}>
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          {/* <div className=''>
            <Label
              className='text-gray-400 font-light mb-2 text-sm'
              htmlFor='email'>
              Deal modes
            </Label>
            <div className='flex gap-3'>
              {Object.entries(dealModes).map(([mode, isActive]) => (
                <Button
                  key={mode}
                  variant={isActive ? "default" : "outline"}
                  onClick={() => handleDealModeChange(mode)}
                  className='capitalize rounded-full px-5 py-1 font-sm font-light'>
                  {mode}
                </Button>
              ))}
            </div>
          </div> */}
        </div>
        <div className='flex justify-between gap-5 max-w-xl'>
          <div className='grid w-full gap-1.5'>
            <Label
              className='text-gray-400 font-light mb-2 text-sm'
              htmlFor='description'>
              Description
            </Label>
            <Textarea
              placeholder='Type your description here.'
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* <div className='grid w-full gap-1.5'>
            <Label
              className='text-gray-400 font-light mb-2 text-sm'
              htmlFor='instructions'>
              Special instructions
            </Label>
            <Textarea
              placeholder='Type your instructions here.'
              id='instructions'
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
          <div className='grid w-full gap-1.5'>
            <Label
              className='text-gray-400 font-light mb-2 text-sm'
              htmlFor='note'>
              Note for partner
            </Label>
            <Textarea
              placeholder='Type your note here.'
              id='note'
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div> */}
        </div>
        {/* <div>
          <RadioGroup
            defaultValue='comfortable'
            value={newCustomerRestriction}
            onValueChange={setNewCustomerRestriction}>
            <Label className='text-gray-400 font-light text-sm'>
              New Customer Restriction
            </Label>
            <div className='flex items-center space-x-2 mt-4'>
              <RadioGroupItem value='existing' id='r1' />
              <Label className='font-light' htmlFor='r1'>
                Existing customers can qualify for this deal.
              </Label>
            </div>
            <div className='flex items-center space-x-2 mt-4'>
              <RadioGroupItem value='new' id='r2' />
              <Label className='font-light' htmlFor='r2'>
                Only new customers can qualify for this deal.
              </Label>
            </div>
          </RadioGroup>
        </div> */}
        <div className='flex justify-end'>
          {loading ? (
            <Button disabled>
              <RotateCw className='mr-2 h-4 w-4 animate-spin' />
              Generating ...
            </Button>
          ) : (
            <Button onClick={generatePerk}>Generate</Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreatePerk
