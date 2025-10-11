import Image from 'next/image'
import React from 'react'
import clsx from 'clsx'
import { HttpTypes } from '@medusajs/types'

type ThumbProps = {
  index: HttpTypes.StoreProductImage
  selected: boolean
  onClick: () => void
}

export const Thumb = ({ index, selected, onClick }: ThumbProps) => (
  <button
    onClick={onClick}
    className={clsx(
      'relative w-20 h-20 border-2 rounded-md overflow-hidden transition-all',
      selected ? 'border-black' : 'border-transparent hover:border-gray-300'
    )}
  >
    <Image
      src={index.url}
      alt=""
      fill
      className="object-contain"
      sizes="80px"
    />
  </button>
)
