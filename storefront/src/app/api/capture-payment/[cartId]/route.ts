import { NextRequest, NextResponse } from "next/server"
import { sdk } from "@lib/config"
import { placeOrder, placeOrderManual } from "@lib/data/cart"
import { getAuthHeaders } from "@lib/data/cookies"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || ""

// Helpers – zorg dat ze async zijn en cookies awaiten!
async function retrieveOrderByCartId(cartId: string) {
  const authHeaders = await getAuthHeaders()
  try {
    const { orders } = await sdk.store.order.list(
      { cart_id: cartId },
      { fields: "id" },
    )
    return orders?.[0] || null
  } catch (err) {
    console.error("Order lookup failed:", err)
    return null
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ cartId: string }> }
) {
  const redirectOrigin = BASE_URL || req.nextUrl.origin
  const { cartId } = await params
  const { searchParams } = req.nextUrl

  const paymentIntent = searchParams.get("payment_intent")
  const clientSecret = searchParams.get("payment_intent_client_secret")
  const redirectStatus = searchParams.get("redirect_status")?.trim() || ""
  const countryCode = searchParams.get("country_code") || "nl"

  // Basis validatie
  if (!cartId || !paymentIntent || !clientSecret) {
    return NextResponse.redirect(
      `${redirectOrigin}/${countryCode}/checkout?step=payment&error=missing_params`
    )
  }

  if (["succeeded", "processing"].includes(redirectStatus)) {
    try {
      const confirmationUrl = await placeOrderManual(cartId)

      if (confirmationUrl) {
        // Stuur client-side redirect (maar omdat dit een route handler is, gebruik server redirect)
        return NextResponse.redirect(
          `${redirectOrigin}${confirmationUrl}`,
          303
        )
      }
    } catch (err: any) {
      console.error("placeOrderManual error:", err.message)

      // Bij "no cart" → korte wait en fallback
      if (err.message.includes("No existing cart found")) {
        await new Promise(r => setTimeout(r, 6000))

        // Nog een poging (of direct naar processing)
        try {
          const confirmationUrl = await placeOrderManual(cartId)
          if (confirmationUrl) {
            return NextResponse.redirect(`${redirectOrigin}${confirmationUrl}`, 303)
          }
        } catch (err) {
          console.error("placeOrderManual error:", err)
          // Fallback redirect of error response
          return NextResponse.redirect(
            `${redirectOrigin}/${countryCode}/checkout?step=payment&message=order_pending`,
            303
          )
        }

      }

      return NextResponse.redirect(
        `${redirectOrigin}/${countryCode}/checkout?step=payment&message=order_pending`,
        303
      )
    }
  }
}