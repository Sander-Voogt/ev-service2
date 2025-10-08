import { sdk } from "@lib/config"
import { placeOrder } from "@lib/data/cart"
import { getCartId, getAuthHeaders } from "@lib/data/cookies"
import { NextRequest, NextResponse } from "next/server"

type Params = Promise<{ cartId: string }>

async function retrieveCart(cartId?: string) {
  const id = cartId || await getCartId()

  if (!id) return null

  const authHeaders = await getAuthHeaders() // ook async!

  return sdk.store.cart
    .retrieve(id, {}, { next: { tags: ["cart"] }, ...authHeaders })
    .then(({ cart }) => cart)
    .catch(() => null)
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { cartId } = await params
  const { origin, searchParams } = req.nextUrl

  const paymentIntent = searchParams.get("payment_intent")
  const paymentIntentClientSecret = searchParams.get(
    "payment_intent_client_secret"
  )
  const redirectStatus = searchParams.get("redirect_status") || ""
  const countryCode = searchParams.get("country_code")

  const cart = await retrieveCart(cartId)
  console.log(redirectStatus, cart, cartId)

  if (!cart) {
    return NextResponse.redirect(`${origin}/${countryCode}`)
  }

  const paymentSession = cart.payment_collection?.payment_sessions?.find(
    (payment) => payment.data.id === paymentIntent
  )


  if (
    !paymentSession ||
    paymentSession.data.client_secret !== paymentIntentClientSecret ||
    !["pending", "succeeded"].includes(redirectStatus) ||
    !["pending", "authorized"].includes(paymentSession.status)
  ) {
    return NextResponse.redirect(
      `${origin}/${countryCode}/checkout?step=payment&error=payment_failed`
    )
  }

  const order = await placeOrder(cartId)

  return NextResponse.redirect(
    `${origin}/${countryCode}/order/${order.id}/confirmed`
  )
}