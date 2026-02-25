import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { sdk } from "@lib/config"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const cartId = cookieStore.get("_medusa_cart_id")?.value

    if (!cartId) {
      return NextResponse.json({ cart: null }, { status: 200 })
    }

    const { cart } = await sdk.store.cart.retrieve(
      cartId
    )

    return NextResponse.json({ cart }, { status: 200 })
  } catch (err) {
    console.error("❌ Cart retrieval failed:", err)
    return NextResponse.json({ cart: null }, { status: 500 })
  }
}
