"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const banners = [
  {
    id: 1,
    image: "/banner1.jpg",
    title: "Summer Sale",
    description: "Up to 20% off on selected models",
  },
  {
    id: 2,
    image: "/banner2.jpg",
    title: "New Arrivals",
    description: "Check out our latest models",
  },
]

export default function Banner() {
  const [currentBanner, setCurrentBanner] = useState(0)

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <div className="relative h-[400px] w-full">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentBanner ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${banner.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-4">{banner.title}</h2>
              <p className="text-xl">{banner.description}</p>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={prevBanner}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextBanner}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}

