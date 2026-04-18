import { Metadata } from "next"
import { notFound } from "next/navigation"

import Wrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { enrichLineItems, retrieveCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { getCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Checkout",
}

const fetchCart = async () => {
  const cart = await retrieveCart()
  if (!cart) {
    return notFound()
  }

  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id!)
    cart.items = enrichedItems as HttpTypes.StoreCartLineItem[]
  }

  return cart
}

export default async function Checkout() {
  const cart = await fetchCart()
  const customer = await getCustomer()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50/30">
      {/* Premium animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative py-12 sm:py-16">
        {/* Premium header */}
        <div className="content-container mb-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-6 py-3 rounded-full shadow-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <span className="font-bold">Secure Checkout</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Completeer Uw Bestelling
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Veilig en snel afrekenen met meerdere betaalopties
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 small:grid-cols-[1fr_440px] content-container gap-x-8 gap-y-8">
          <Wrapper cart={cart}>
            <CheckoutForm cart={cart} customer={customer} />
          </Wrapper>
          <CheckoutSummary cart={cart} />
        </div>
      </div>
    </div>
  )
}
