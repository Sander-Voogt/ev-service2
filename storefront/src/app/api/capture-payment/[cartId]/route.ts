import { NextRequest, NextResponse } from "next/server"
import { sdk } from "@lib/config"
import { placeOrder } from "@lib/data/cart"
import { getAuthHeaders } from "@lib/data/cookies"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || ""

// Helpers – zorg dat ze async zijn en cookies awaiten!
async function retrieveOrderByCartId(cartId: string) {
  const authHeaders = await getAuthHeaders()
  try {
    const { orders } = await sdk.store.order.list(
      { cart_id: cartId },
      { fields: "id" },
      authHeaders
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

  // === Hoofdlogica gebaseerd op redirect_status ===
  if (redirectStatus === "succeeded") {
    // Optioneel: check eerst of order al bestaat
    const existingOrder = await retrieveOrderByCartId(cartId)
    if (existingOrder) {
      return NextResponse.redirect(
        `${redirectOrigin}/${countryCode}/order/confirmed/${existingOrder.id}`
      )
    }

    // Geen try/catch meer → laat placeOrder() de redirect zelf afhandelen
    await placeOrder()

    // Als code hier komt (wat niet zou moeten bij succes), fallback
    return NextResponse.redirect(
      `${redirectOrigin}/${countryCode}/checkout?step=payment&message=unexpected`
    )
  }

  // === Alle andere gevallen ===
  if (redirectStatus && !["succeeded", "processing"].includes(redirectStatus)) {
    // Expliciete fail van Stripe (failed, canceled, etc.)
    return NextResponse.redirect(
      `${redirectOrigin}/${countryCode}/checkout?step=payment&error=payment_${redirectStatus}`
    )
  }

  // redirect_status leeg of onbekend → waarschijnlijk geen redirect-betaalmethode
  // → ga door met placeOrder of pending
  try {
    await placeOrder()
    return NextResponse.redirect(`${redirectOrigin}/${countryCode}`)
  } catch {
    return NextResponse.redirect(
      `${redirectOrigin}/${countryCode}/checkout?step=payment&message=processing_still_pending`
    )
  }
}