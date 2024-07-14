'use client'
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DiscoverCard from './DiscoverCard';

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