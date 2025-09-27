"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const ProductImageGallery = ({ images }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [prevActiveImageIndex, setPrevActiveImageIndex] = useState(0); // 💡 New state for previous index

  // 💡 Use a ref to store the direction so it persists across renders for the animation
  const slideDirection = useRef('none'); 

  // Update prevActiveImageIndex and determine slide direction
  useEffect(() => {
    if (activeImageIndex > prevActiveImageIndex) {
      slideDirection.current = 'left'; // New image comes from the right
    } else if (activeImageIndex < prevActiveImageIndex) {
      slideDirection.current = 'right'; // New image comes from the left
    } else {
      slideDirection.current = 'none'; // Initial load or same image
    }
    setPrevActiveImageIndex(activeImageIndex);
  }, [activeImageIndex, prevActiveImageIndex]); // Only re-run when index changes

  const activeImage = images[activeImageIndex];

  const handleThumbnailClick = (index) => {
    // Only update if it's a different image
    if (index !== activeImageIndex) {
      setActiveImageIndex(index);
    }
  };

  // Determine the animation class based on direction
  const getAnimationClass = () => {
    if (slideDirection.current === 'left') {
      return 'animate-slideInFromRight';
    } else if (slideDirection.current === 'right') {
      return 'animate-slideInFromLeft';
    }
    return ''; // No animation on initial load or if same image clicked
  };

  return (
    <div className="w-full">
      {/* Main Image Display */}
      <div className="relative bg-gray-50 flex items-center justify-center overflow-hidden rounded-lg">
        {!!activeImage.url && (
          <div
            // 💡 Crucial: Use activeImage.id as the key to trigger re-render and animation
            key={activeImage.id}
            className={`relative w-full h-full flex items-center justify-center 
                        transition-all duration-500 ease-in-out transform
                        ${getAnimationClass()} // 💡 Apply dynamic animation class here
                       `}
          >
            <Image
              src={activeImage.url}
              priority
              className="max-w-full max-h-full object-contain 
                         transition-opacity duration-300 ease-in-out hover:scale-105 transform"
              alt={`Product image ${activeImageIndex + 1}`}
              width={600}
              height={750}
            />
          </div>
        )}
      </div>

      {/* Enhanced Thumbnail Row with Animations */}
      {images.length > 1 && (
        <div className="flex gap-2 pt-4 ">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => handleThumbnailClick(index)} // 💡 Use the new handler
              className={`
                w-14 h-14 border-2 rounded overflow-hidden flex-shrink-0
                transition-all duration-300 ease-in-out transform
                hover:scale-110 hover:shadow-lg hover:z-10
                active:scale-95 active:shadow-sm
                ${index === activeImageIndex
                  ? 'border-green-500 shadow-lg scale-105 ring-2 ring-green-200'
                  : 'border-gray-200 hover:border-gray-400 hover:shadow-md'
                }
              `}
            >
              {image.url && (
              <Image
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover transition-all duration-200 ease-in-out hover:brightness-110"
              />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;