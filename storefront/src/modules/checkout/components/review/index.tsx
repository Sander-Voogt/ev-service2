"use client"

import { clx } from "@medusajs/ui"
import { convertToLocale } from "@lib/util/money"
import { paymentInfoMap } from "@lib/constants"

import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard)

  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (s: any) => s.status === "pending"
  )

  console.log("activeSession", activeSession)
  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6">
        <h2
          className={clx(
            "text-xl font-bold text-gray-900 flex items-center gap-x-2",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Overzicht
        </h2>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 divide-y divide-gray-200">
            {/* Shipping address */}
            {cart.shipping_address && (
              <div className="pb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Verzendadres</span>
                <p className="text-sm text-gray-900 mt-1">
                  {cart.shipping_address.first_name} {cart.shipping_address.last_name}
                </p>
                <p className="text-sm text-gray-600">
                  {cart.shipping_address.address_1},{" "}
                  {cart.shipping_address.postal_code} {cart.shipping_address.city}
                </p>
              </div>
            )}

            {/* Shipping method */}
            {cart.shipping_methods?.length > 0 && (
              <div className="py-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Verzendmethode</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-gray-900">
                    {cart.shipping_methods.at(-1)?.name}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {convertToLocale({
                      amount: cart.shipping_methods.at(-1)?.amount ?? 0,
                      currency_code: cart.currency_code,
                    })}
                  </span>
                </div>
              </div>
            )}

            {/* Payment method */}
            {activeSession && (
              <div className="pt-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Betaalmethode</span>
                <p className="text-sm text-gray-900 mt-1">
                  {paymentInfoMap[activeSession.provider_id]?.title || activeSession.provider_id}
                </p>
              </div>
            )}
          </div>

          <div className="w-full mb-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <svg className="w-4 h-4 text-blue-500 inline-block mr-1.5 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Bij het plaatsen van uw bestelling gaat u akkoord met onze{" "}
              <LocalizedClientLink
                href="/pagina/algemene-voorwaarden"
                className="text-blue-700 underline hover:text-blue-900 font-medium"
              >
                algemene voorwaarden
              </LocalizedClientLink>
              .
            </p>
          </div>
          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </>
      )}
    </div>
  )
}

export default Review
