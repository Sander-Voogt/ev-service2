"use client"

import { Heading } from "@medusajs/ui"

import Button from "@modules/common/components/button"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { AddCartReference } from "@modules/checkout/templates/checkout-summary/reference"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-y-6">
      {/* Premium totals display */}
      <CartTotals totals={cart} />

      {/* Premium checkout button */}
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
        className="block w-full"
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white font-black rounded-2xl py-6 text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border-0"
          >
            <span className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              Afrekenen
            </span>
          </Button>
        </div>
      </LocalizedClientLink>

      {/* Premium trust badges */}
      <div className="grid grid-cols-3 gap-3 pt-4">
        <div className="text-center">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-gray-700">Gratis Verzending</p>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
          </div>
          <p className="text-xs font-semibold text-gray-700">2 Jaar Garantie</p>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
            </svg>
          </div>
          <p className="text-xs font-semibold text-gray-700">Beveiligd Betalen</p>
        </div>
      </div>

      <Divider />
    </div>
  )
}

export default Summary
