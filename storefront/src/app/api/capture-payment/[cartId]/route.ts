import { sdk } from "@lib/config"
import { placeOrder } from "@lib/data/cart"
import { getCartId, getAuthHeaders } from "@lib/data/cookies"
import { NextRequest, NextResponse } from "next/server"

type Params = Promise<{ cartId: string }>

async function retrieveCart(cartId?: string) {
  const id = cartId || (await getCartId())
  if (!id) return null

  const authHeaders = await getAuthHeaders()

  return sdk.store.cart
    .retrieve(id, {}, { next: { tags: ["cart"] }, ...authHeaders })
    .then(({ cart }) => cart)
    .catch(() => null)
}

async function waitForFinalPaymentState(
  cartId: string,
  paymentIntent: string,
  retries = 6,
  delay = 400
) {
  for (let i = 0; i < retries; i++) {
    const cart = await retrieveCart(cartId)

    const session =
      cart?.payment_collection?.payment_sessions?.find(
        (p) => p.data?.id === paymentIntent
      )

    if (
      session &&
      ["authorized", "captured", "completed"].includes(session.status)
    ) {
      return { cart, session }
    }

    await new Promise((r) => setTimeout(r, delay))
  }

  return null
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || ""

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const redirectOrigin = BASE_URL || req.nextUrl.origin
  const { cartId } = await params
  const { searchParams } = req.nextUrl

  const paymentIntent = searchParams.get("payment_intent")
  const clientSecret = searchParams.get("payment_intent_client_secret")
  const redirectStatus = searchParams.get("redirect_status")
  const countryCode = searchParams.get("country_code")

  if (!paymentIntent || !clientSecret) {
    return NextResponse.redirect(
      `${redirectOrigin}/${countryCode}/checkout?step=payment&error=missing_params`
    )
  }

  /**
   * Stripe redirect MUST be succeeded
   */
  if (redirectStatus !== "succeeded") {
    return NextResponse.redirect(
      `${redirectOrigin}/${countryCode}/checkout?step=payment&error=payment_failed`
    )
  }

  /**
   * Wait for webhook → Medusa to finalize payment session
   */
  const result = await waitForFinalPaymentState(cartId, paymentIntent)

  if (!result) {
    return NextResponse.redirect(
      `${redirectOrigin}/${countryCode}/checkout?step=payment&error=payment_pending`
    )
  }

  const { cart, session } = result

  /**
   * Extra safety: verify client secret
   */
  if (session.data?.client_secret !== clientSecret) {
    return NextResponse.redirect(
      `${redirectOrigin}/${countryCode}/checkout?step=payment&error=invalid_session`
    )
  }

  /**
   * Prevent duplicate orders
   */
  if (cart.completed_at || cart.order) {
    return NextResponse.redirect(
      `${redirectOrigin}/${countryCode}/order/${cart.order?.id}/confirmed`
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
