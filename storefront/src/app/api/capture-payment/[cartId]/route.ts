import { sdk } from "@lib/config"
import { placeOrder } from "@lib/data/cart"
import { getCartId, getAuthHeaders } from "@lib/data/cookies"
import { NextRequest, NextResponse } from "next/server"

type Params = Promise<{ cartId: string }>

async function retrieveCart(cartId?: string) {
  const id = cartId || await getCartId()
  if (!id) return null

  const authHeaders = await getAuthHeaders()

  return sdk.store.cart
    .retrieve(id, {}, { next: { tags: ["cart"] }, ...authHeaders })
    .then(({ cart }) => cart)
    .catch(() => null)
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || ""

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const redirectOrigin = BASE_URL || req.nextUrl.origin
  const { cartId } = await params
  const { searchParams } = req.nextUrl

  const paymentIntent = searchParams.get("payment_intent")
  const paymentIntentClientSecret = searchParams.get("payment_intent_client_secret")
  const redirectStatus = searchParams.get("redirect_status")
  const countryCode = searchParams.get("country_code")

  if (!paymentIntent || !paymentIntentClientSecret) {
    return NextResponse.redirect(
      `${redirectOrigin}/${countryCode}/checkout?step=payment&error=missing_params`
    )
  }

  const cart = await retrieveCart(cartId)

  if (!cart) {
    return NextResponse.redirect(`${redirectOrigin}/${countryCode}`)
  }

  const paymentSession = cart.payment_collection?.payment_sessions?.find(
    (p) => p.data?.id === paymentIntent
  )

  console.log("Stripe redirect:", {
    redirectStatus,
    paymentSessionStatus: paymentSession?.status,
  })

  /**
   * Acceptable final states:
   * Stripe redirect: succeeded
   * Medusa session: authorized | captured | completed
   */
  const validRedirect = redirectStatus === "succeeded"
  const validSession =
    paymentSession &&
    ["authorized", "captured", "completed"].includes(paymentSession.status)

  if (!validRedirect || !validSession) {
    return NextResponse.redirect(
      `${redirectOrigin}/${countryCode}/checkout?step=payment&error=payment_failed`
    )
  }

  /**
   * Prevent duplicate orders
   */
  if (cart.completed_at || cart.order) {
    return NextResponse.redirect(
      `${redirectOrigin}/${countryCode}/order/${cart.order?.id || ""}/confirmed`
    )
  }

  try {
    const order = await placeOrder(cartId)

    return NextResponse.redirect(
      `${redirectOrigin}/${countryCode}/order/${order.id}/confirmed`
    )
  } catch (err) {
    console.error("Order placement failed:", err)

    return NextResponse.redirect(
      `${redirectOrigin}/${countryCode}/checkout?step=review&error=order_failed`
    )
  }
}
