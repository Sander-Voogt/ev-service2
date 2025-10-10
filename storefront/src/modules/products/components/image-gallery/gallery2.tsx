'use client'
import React, { useCallback, useEffect, useState } from 'react'

import useEmblaCarousel from 'embla-carousel-react'
// import { usePrevNextButtons, PrevButton, NextButton } from './EmblaCarouselArrowButtons'
// import { useDotButton, DotButton } from './EmblaCarouselDotButton'
import { HttpTypes } from '@medusajs/types'
import './embla.css'
import Image from 'next/image'
import { Thumb } from './Thumb'

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery2 = ({ images }: ImageGalleryProps) => {

  console.log(images)

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel()
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()

    emblaMainApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {images.map((index, key) => (
            <div className="embla__slide" key={key}>
              <div className="embla__slide__number"><Image quality={50} width={600} height={600} alt='' src={index.url}/></div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {images.map((index, key) => (
              <Thumb
                key={key}
                onClick={() => onThumbClick(key)}
                selected={key === selectedIndex}
                index={index}
              />
            ))} 
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageGallery2
