"use client"

import { StoreProduct } from "@medusajs/types"
import { sendGTMEvent } from "@next/third-parties/google"
import { useEffect } from "react"

export default function ProductViewEvent(product: StoreProduct) {
  useEffect(() => {
    sendGTMEvent({
      event: "view_item",
      value: {
        currency: "EUR",
        value: 10.0,
        items: [
          {
            item_name: product.title,
          },
        ],
      },
    })
  }, [product.id])
  
  return <></>
}
