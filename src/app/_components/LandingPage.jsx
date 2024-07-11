"use client"
import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PartnerCard from "./PartnerCard"
import Image from "next/image"
import { signIn } from "next-auth/react"
import axios from "axios"

const LandingPage = () => {
  const [query, setQuery] = useState("")
  const [debounceTimeout, setDebounceTimeout] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [relatedBusinesses, setRelatedBusinesses] = useState([])
  const [discover, setDiscover] = useState(false)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY

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
              "id,displayName,formattedAddress,googleMapsUri,iconBackgroundColor,nationalPhoneNumber,rating,userRatingCount,websiteUri,attributions,location,types",
          },
        }
      )
      console.log("Business details received:", response.data)
      return response.data
    } catch (error) {
      console.error("Error fetching business details:", error)
    }
  }

  const fetchRelatedBusinesses = async (latitude, longitude) => {
    try {
      console.log(
        "Fetching related businesses for coordinates:",
        latitude,
        longitude
      )
      let data = JSON.stringify({
        includedTypes: [],
        maxResultCount: 6,
        locationRestriction: {
          circle: {
            center: {
              latitude: latitude,
              longitude: longitude,
            },
            radius: 500,
          },
        },
      })
      const response = await axios.post(
        "https://places.googleapis.com/v1/places:searchNearby",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask":
              "places.displayName,places.formattedAddress,places.location,places.types,places.nationalPhoneNumber,places.rating,places.userRatingCount,places.websiteUri,places.photos",
          },
        }
      )
      console.log("Related businesses received:", response.data.places)
      setRelatedBusinesses(response.data.places)
    } catch (error) {
      console.error("Error fetching related businesses:", error)
    }
  }

  const handleOptionClick = async (suggestion) => {
    setQuery(suggestion.placePrediction.text.text)
    setSelectedOption(suggestion)
    setSuggestions([])

    const businessDetails = await fetchBusinessDetails(
      suggestion.placePrediction.placeId
    )
    if (businessDetails && businessDetails.location) {
      await fetchRelatedBusinesses(
        businessDetails.location.latitude,
        businessDetails.location.longitude
      )
    }
  }
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
              className='flex-grow mr-2 border-none text-black focus-visible:ring-transparent'
              placeholder='Third wave, HSR layout, 3rd main'
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setSelectedOption(null)
                setDiscover(false)
              }}
            />
            <Button disabled={!selectedOption}  onClick={() => setDiscover(true)}>Discover</Button>
          </div>
          <div className='flex flex-col mt-2 gap-1'>
            {(!selectedOption && query) &&
              suggestions?.map((suggestion) => (
                <div
                  key={suggestion.placePrediction.placeId}
                  className='bg-gray-900 rounded cursor-pointer hover:bg-gray-950 px-2 py-1 text-gray-400'
                  onClick={() => handleOptionClick(suggestion)}>
                  {suggestion.placePrediction.text.text}
                </div>
              ))}
          </div>
        </div>

        {discover && (
          <div className='grid max-w-6xl grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-2 mx-auto'>
            {relatedBusinesses.map((partner, index) => (
              <PartnerCard key={index} partner={partner} />
            ))}
          </div>
        )}

        {discover && (
          <div>
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
        )}
      </div>
      {/* Overlay to ensure text is readable */}
      <div className='absolute inset-0 bg-black opacity-50 z-0'></div>
    </div>
  )
}

export default LandingPage
