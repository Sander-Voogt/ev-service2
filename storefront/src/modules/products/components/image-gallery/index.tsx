"use client"

import { HttpTypes } from "@medusajs/types"

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "@medusajs/icons"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  const handlePrev = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const handleNext = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const activeImage = images[activeImageIndex]

  return (
    <div className="w-full">
      {/* Main Image Display */}
      <div className="relative bg-gray-50 flex items-center justify-center">
        {!!activeImage.url && (
          <div
            key={activeImage.id}
            className="relative w-full h-full flex items-center justify-center"
          >
            <Image
              src={activeImage.url}
              priority
              className="max-w-full max-h-full object-contain"
              alt={`Product image ${activeImageIndex + 1}`}
              width={600}
              height={750}
            />
          </div>
        )}
      </div>

      {/* Simple Thumbnail Row */}
      {images.length > 1 && (
        <div className="flex gap-2 pt-4 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setActiveImageIndex(index)}
              className={`w-16 h-16 border-2 rounded overflow-hidden flex-shrink-0 ${
              index === activeImageIndex
                ? 'border-green-500'
                : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {image.url && (
              <Image
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery