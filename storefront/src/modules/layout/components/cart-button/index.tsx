"use client"

import { useEffect, useState } from "react"
import CartDropdown from "../cart-dropdown"
import { enrichLineItems } from "@lib/data/cart"
import { retrieveCartClient } from "@lib/data/cartclient"
import { onCartUpdated } from "@lib/events"

export default function CartButton() {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCart = async () => {
      const cartData = await retrieveCartClient()
      if (cartData?.items?.length) {
        const enrichedItems = await enrichLineItems(cartData.items, cartData.region_id)
        cartData.items = enrichedItems
      }
      setCart(cartData)
      setLoading(false)
    }
    fetchCart()

    // luister op updates
    const unsubscribe = onCartUpdated(fetchCart)
    return unsubscribe
  }, [])

  if (loading) return <div>Winkelwagen</div>

  return <CartDropdown cart={cart} />
}
