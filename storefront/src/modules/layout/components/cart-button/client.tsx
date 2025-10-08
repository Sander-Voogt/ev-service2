'use client'

import { use } from 'react'
import CartButtonServer from '.'

export default function CartButton() {
  // `use` werkt in Client Components voor Server Components
  const cartButton = use(CartButtonServer())
  
  return cartButton
}
