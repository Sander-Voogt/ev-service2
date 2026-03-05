"use client"

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-0 flex flex-col-reverse small:flex-col gap-y-8 py-8 small:py-0">
      {/* Mobile: Collapsible */}
      <div className="small:hidden">
        <Disclosure>
          {({ open }) => (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <DisclosureButton className="w-full flex items-center justify-between px-6 py-4">
                <span className="text-lg font-bold text-gray-900">
                  Besteloverzicht
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </DisclosureButton>
              <DisclosurePanel className="px-6 pb-6">
                <CartTotals totals={cart} />
                <ItemsPreviewTemplate cart={cart} />
              </DisclosurePanel>
            </div>
          )}
        </Disclosure>
      </div>

      {/* Desktop: Always visible */}
      <div className="hidden small:block bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Besteloverzicht
        </h2>
        <CartTotals totals={cart} />
        <ItemsPreviewTemplate cart={cart} />
        <div className="my-6">
          {/* <DiscountCode cart={cart} /> */}
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
