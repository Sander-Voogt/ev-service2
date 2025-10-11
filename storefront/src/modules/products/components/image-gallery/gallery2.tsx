'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { Thumb } from './Thumb'
import { HttpTypes } from '@medusajs/types'
import './embla.css'

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery2 = ({ images }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel()
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  if (!images?.length) return null

  return (
    <div className="embla flex flex-col gap-4">
      {/* MAIN CAROUSEL */}
      <div className="embla__viewport overflow-hidden" ref={emblaMainRef}>
        <div className="embla__container">
          {images.map((img, key) => (
            <div
              className="embla__slide flex items-center justify-center"
              key={key}
            >
              <div className="relative aspect-square w-full bg-gray-50 rounded-2xl overflow-hidden">
                <Image
                  src={img.url}
                  alt={`Image ${key + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 600px"
                  quality={80}
                  priority={key === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* THUMBNAILS */}
      <div className="embla-thumbs mt-2">
        <div className="embla-thumbs__viewport overflow-hidden" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container flex gap-3">
            {images.map((img, key) => (
              <Thumb
                key={key}
                onClick={() => onThumbClick(key)}
                selected={key === selectedIndex}
                index={img}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageGallery2
