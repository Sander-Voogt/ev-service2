"use client"

import { StoreProduct } from "@medusajs/types"
import { sendGTMEvent } from "@next/third-parties/google"

export default function ProductViewEvent(product: StoreProduct) {
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
  return <></>
}
