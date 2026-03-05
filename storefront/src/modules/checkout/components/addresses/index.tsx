"use client"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Text, useToggleState } from "@medusajs/ui"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-x-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Verzendadres
          {!isOpen && cart?.shipping_address && (
            <CheckCircleSolid className="text-green-600" />
          )}
        </h2>
        {!isOpen && cart?.shipping_address && (
          <button
            onClick={handleEdit}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-x-1"
            data-testid="edit-address-button"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Bewerken
          </button>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div>
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 pb-4 pt-6 flex items-center gap-x-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Factuuradres
                </h2>

                <BillingAddress cart={cart} />
              </div>
            )}
            <SubmitButton
              className="mt-6 w-full bg-gray-900 text-white hover:bg-gray-800 rounded-lg py-3 font-medium uppercase tracking-wide transition-colors"
              data-testid="submit-address-button"
            >
              Verder naar verzendmethode
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          {cart && cart.shipping_address ? (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  className="flex flex-col"
                  data-testid="shipping-address-summary"
                >
                  <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Verzendadres
                  </Text>
                  <Text className="text-sm text-gray-900">
                    {cart.shipping_address.first_name}{" "}
                    {cart.shipping_address.last_name}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {cart.shipping_address.address_1}{" "}
                    {cart.shipping_address.address_2}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {cart.shipping_address.postal_code},{" "}
                    {cart.shipping_address.city}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {cart.shipping_address.country_code?.toUpperCase()}
                  </Text>
                </div>

                <div
                  className="flex flex-col"
                  data-testid="shipping-contact-summary"
                >
                  <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Contact
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {cart.shipping_address.phone}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {cart.email}
                  </Text>
                </div>

                <div
                  className="flex flex-col"
                  data-testid="billing-address-summary"
                >
                  <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Factuuradres
                  </Text>

                  {sameAsBilling ? (
                    <Text className="text-sm text-gray-600">
                      Zelfde als verzendadres
                    </Text>
                  ) : (
                    <>
                      <Text className="text-sm text-gray-900">
                        {cart.billing_address?.first_name}{" "}
                        {cart.billing_address?.last_name}
                      </Text>
                      <Text className="text-sm text-gray-600">
                        {cart.billing_address?.address_1}{" "}
                        {cart.billing_address?.address_2}
                      </Text>
                      <Text className="text-sm text-gray-600">
                        {cart.billing_address?.postal_code},{" "}
                        {cart.billing_address?.city}
                      </Text>
                      <Text className="text-sm text-gray-600">
                        {cart.billing_address?.country_code?.toUpperCase()}
                      </Text>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-4">
              <Spinner />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Addresses
