"use client"

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react"

import Divider from "@modules/common/components/divider"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import { AddCartReference } from "./reference"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-24 lg:top-28 flex flex-col-reverse small:flex-col gap-y-6 py-0 small:py-0">
      {/* Mobile: Collapsible */}
      <div className="small:hidden">
        <Disclosure>
          {({ open }) => (
            <div className="bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-green-200">
              <DisclosureButton className="w-full flex items-center justify-between px-6 py-5 bg-gradient-to-r from-green-600 to-emerald-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-xl font-black text-white">
                    Besteloverzicht
                  </span>
                </div>
                <svg
                  className={`w-6 h-6 text-white transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </DisclosureButton>
              <DisclosurePanel className="px-6 pb-6 bg-white/50">
                <CartTotals totals={cart} />
                <ItemsPreviewTemplate items={cart?.items} />
              </DisclosurePanel>
            </div>
          )}
        </Disclosure>
      </div>

      {/* Desktop: Always visible */}
      <div className="hidden small:block bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-8 border border-green-200 hover:shadow-3xl transition-all duration-500">
        {/* Premium header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900">Besteloverzicht</h2>
            <p className="text-sm text-gray-600 mt-1">Controleer uw bestelling</p>
          </div>
        </div>

        {/* Premium reference display */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 mb-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="font-semibold text-gray-700">Klantreferentie</span>
            </div>
            <span className="font-black text-green-700" data-testid="cart-subtotal">
              {cart?.metadata?.reference || "-"}
            </span>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-green-200 to-transparent my-6" />
        <CartTotals totals={cart} />
        <ItemsPreviewTemplate items={cart?.items} />

        {/* Premium trust badges */}
        <div className="mt-6 pt-6 border-t border-green-200">
          <div className="grid grid-cols-3 gap-3">
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
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <p className="text-xs font-semibold text-gray-700">Beveiligd</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <p className="text-xs font-semibold text-gray-700">2 Jaar Garantie</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
