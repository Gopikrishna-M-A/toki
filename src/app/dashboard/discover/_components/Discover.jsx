'use client'
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DiscoverCard from './DiscoverCard';
const partnersData = [
    {
      id: 1,
      name: "WeWork",
      category: "Co-working",
      description: "Work from hot desks, lounges, phone booths and more. Book meeting rooms and private ",
      rating: 4.7,
      reviews: 252,
      image: "/images/discover/1.png"
    },
    {
      id: 2,
      name: "Bombay Designer Boutique",
      category: "Boutique",
      description: "Top and well known Ladies Tailoring Services in Koramangala, Bangalore and also known ",
      rating: 4.8,
      reviews: 149,
      image: "/images/discover/2.png"
    },
    {
      id: 3,
      name: "ferns N petals",
      category: "Florist",
      description: "Fresh Flowers & Perfect Gifts for all Occasions. Gift Ideas for your Beloved.",
      rating: 4.6,
      reviews: 576,
      image: "/images/discover/3.png"
    },
    {
      id: 4,
      name: "Shades Creative Gallery",
      category: "Art gallery",
      description: "ART GALLERY ART Gifts, FINE ART Paintings, Art prints, Artifacts and Home Decor product ",
      rating: 4.8,
      reviews: 149,
      image: "/images/discover/4.png"
    },
    {
      id: 5,
      name: "Cult Fitness Centre",
      category: "Gym/Fitness center",
      description: "\"Walk-in to a state-of-the-art fitness centre where fitness = fun. From Dance fitness, Boxing",
      rating: 4.8,
      reviews: 149,
      image: "/images/discover/5.png"
    },
    {
      id: 6,
      name: "Drapers",
      category: "Co-living",
      description: "\"Coworking + Coliving + Community + Events & Activities + Networking ",
      rating: 4.8,
      reviews: 149,
      image: "/images/discover/6.png"
    },
    {
      id: 2,
      name: "Bombay Designer Boutique",
      category: "Boutique",
      description: "Top and well known Ladies Tailoring Services in Koramangala, Bangalore and also known ",
      rating: 4.8,
      reviews: 149,
      image: "/images/discover/2.png"
    },
    {
      id: 3,
      name: "ferns N petals",
      category: "Florist",
      description: "Fresh Flowers & Perfect Gifts for all Occasions. Gift Ideas for your Beloved.",
      rating: 4.6,
      reviews: 576,
      image: "/images/discover/3.png"
    },
    {
      id: 4,
      name: "Shades Creative Gallery",
      category: "Art gallery",
      description: "ART GALLERY ART Gifts, FINE ART Paintings, Art prints, Artifacts and Home Decor product ",
      rating: 4.8,
      reviews: 149,
      image: "/images/discover/4.png"
    },
    {
      id: 5,
      name: "Cult Fitness Centre",
      category: "Gym/Fitness center",
      description: "\"Walk-in to a state-of-the-art fitness centre where fitness = fun. From Dance fitness, Boxing",
      rating: 4.8,
      reviews: 149,
      image: "/images/discover/5.png"
    },
    {
      id: 6,
      name: "Drapers",
      category: "Co-living",
      description: "\"Coworking + Coliving + Community + Events & Activities + Networking ",
      rating: 4.8,
      reviews: 149,
      image: "/images/discover/6.png"
    }
  ];


const DiscoverPartners = ({ businesses }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8; // Assuming 8 pages as shown in the image

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-4 bg-white rounded-md h-full overflow-y-scroll pb-10">
      <div className="flex justify-center md:justify-between items-center mb-4">
        <h1 className="text-lg font-light">Discover partners</h1>
        <div className="md:flex items-center space-x-4 hidden">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="p-1 rounded-full border border-gray-300 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="p-1 rounded-full border border-gray-300 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {businesses.map((partner,index) => (
          <DiscoverCard key={index} partner={partner}/>
        ))}
      </div>
    </div>
  );
};

export default DiscoverPartners;