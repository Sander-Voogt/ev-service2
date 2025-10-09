import { sdk } from "@lib/config"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cartId = req.cookies["_medusa_cart_id"]
    if (!cartId) return res.status(200).json({ cart: null })

    const { cart } = await sdk.store.cart.retrieve(cartId)
    return res.status(200).json({ cart })
  } catch (err) {
    console.error("Cart retrieval failed", err)
    return res.status(500).json({ cart: null })
  }
}
