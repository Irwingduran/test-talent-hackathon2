"use client"

import { useState } from "react"

import { Button } from "../../../components/ui/button"

export default function OnboardingScreen() {
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = 2

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    } else {
      // Navigate to main app when onboarding is complete
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top section with teal background */}
      <div className="bg-[#4ecca6] pt-32 pb-16 px-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 max-w-xs mx-auto">
          Welcome To The Multi-Client Panel
        </h1>
      </div>

      {/* Curved white section */}
      <div className="relative flex-1 bg-white">
        {/* Curved top edge */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-[#4ecca6]">
          <div className="absolute top-0 left-0 right-0 h-16 bg-white rounded-t-[50%] transform translate-y-[-8px]"></div>
        </div>

        <div className="flex flex-col items-center justify-between h-full pt-16 pb-12 px-6">
          {/* Illustration */}
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="bg-[#e8f8e8] rounded-full p-12 w-64 h-64 flex items-center justify-center">
              <img 
                src="/hand-with-coins.png" 
                alt="Hand with coins illustration" 
                width={200} 
                height={200}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="w-full max-w-xs">
            <Button 
              onClick={nextPage}
              className="w-full py-6 text-xl font-medium bg-white text-gray-800 hover:bg-gray-50 shadow-none"
            >
              Next
            </Button>

            {/* Pagination dots */}
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <div 
                  key={index}
                  className={`rounded-full w-3 h-3 ${
                    index === currentPage 
                      ? "bg-[#4ecca6]" 
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
