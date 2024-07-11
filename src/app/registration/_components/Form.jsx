"use client"
import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Label } from "@radix-ui/react-label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Image as ImageIcon, RotateCw } from "lucide-react"
import { message, Upload } from 'antd';

const Form = () => {
  const router = useRouter()
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [query, setQuery] = useState("")
  const [debounceTimeout, setDebounceTimeout] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [description,setDescription] = useState('')
  const [discover, setDiscover] = useState(false)
  const [business, setBusiness] = useState(null)
  const { Dragger } = Upload;
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        console.log(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        console.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList)
  useEffect(() => {
    getData()
  }, [query])

  const getData = () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout)
    }

    const timeout = setTimeout(() => fetchSuggestions(), 300)
    setDebounceTimeout(timeout)
  }

  const fetchSuggestions = async () => {
    try {
      console.log("Fetching suggestions for query:", query)
      const response = await axios.post(
        "https://places.googleapis.com/v1/places:autocomplete",
        { input: query },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
          },
        }
      )
      console.log("Suggestions received:", response.data.suggestions)
      setSuggestions(response.data.suggestions)
    } catch (error) {
      console.error("Error fetching suggestions:", error)
    }
  }

  const handleOptionClick = async (suggestion) => {
    setQuery(suggestion.placePrediction.text.text)
    setSelectedOption(suggestion)
    setSuggestions([])

    const businessDetails = await fetchBusinessDetails(
      suggestion.placePrediction.placeId
    )
    setBusiness(businessDetails)
  }

  const fetchBusinessDetails = async (placeId) => {
    try {
      console.log("Fetching business details for placeId:", placeId)
      const response = await axios.get(
        `https://places.googleapis.com/v1/places/${placeId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask":
              "id,displayName,formattedAddress,iconBackgroundColor,nationalPhoneNumber,rating,userRatingCount,websiteUri,attributions,location,types",
          },
        }
      )
      console.log("Business details received:", response.data)
      return response.data
    } catch (error) {
      console.error("Error fetching business details:", error)
    }
  }


  const onSubmit = async (e) => {
    // setLoading(true)

    const formData = new FormData()
    fileList.map((file) => {
      formData.append("file", file.originFileObj)
    })
    const res = await axios.post("/api/aws", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    const data = {
        name:business?.displayName?.text,
        types:business?.types,
        address:business?.formattedAddress,
        latitude: business?.location?.latitude,
        longitude: business?.location?.longitude,
        phone: business?.nationalPhoneNumber,
        placeId:business?.id,
        website:business?.websiteUri,
        rating: business?.rating,
        reviewCount:business?.userRatingCount,
        iconBg:business?.iconBackgroundColor,
        images:res.data,
        description
    }
    console.log("data",data)

    try {
      await axios.post("/api/businesses", data).then((res)=>{
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

        <div className='max-w-4xl w-full bg-white rounded-lg mx-auto shadow-lg px-5 py-10 flex flex-col gap-5'>
          <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor='name'>Is this your business?</Label>
            <Input
            // focus-visible:ring-transparent
              className='flex-grow mr-2 text-black '
              placeholder='Search or enter'
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setSelectedOption(null)
                setDiscover(false)
              }}
            />
                    <div className='flex flex-col mt-2 gap-1'>
            {(!selectedOption && query) &&
              suggestions?.map((suggestion) => (
                <div
                  key={suggestion.placePrediction.placeId}
                  className='bg-gray-100 rounded cursor-pointer hover:bg-gray-50 px-2 py-1 text-gray-500'
                  onClick={() => handleOptionClick(suggestion)}>
                  {suggestion.placePrediction.text.text}
                </div>
              ))}
          </div>
          </div>
  

          <div className='grid w-full gap-1.5'>
            <Label htmlFor='description'>What do you do?</Label>
            <Textarea
              placeholder='Describe your business'
              id='description'
              name='description'
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />
          </div>

          <div className='grid w-full items-center gap-1.5'>
          <Dragger 
          fileList={fileList}
          onChange={handleChange}
          multiple={true}

          >
            <p className="ant-upload-drag-icon">
            <ImageIcon className="mx-auto w-16 h-16 " />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from uploading company data or other
              banned files.
            </p>
          </Dragger>
          </div>

          {loading ? (
            <Button disabled>
              <RotateCw className='mr-2 h-4 w-4 animate-spin' />
              Please wait
            </Button>
          ) : (
            <Button onClick={onSubmit} type='submit' className='mt-4'>
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Form
