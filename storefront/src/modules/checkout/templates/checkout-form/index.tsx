import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"
import CheckoutProgress from "@modules/checkout/components/checkout-progress"

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return null
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  if (!shippingMethods || !paymentMethods) {
    return null
  }

  return (
    <div className="w-full grid grid-cols-1 gap-y-6">
      {/* Premium progress indicator */}
      <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl p-6 border border-green-100">
        <CheckoutProgress />
      </div>

      <div className="space-y-6">
        {/* Premium address section */}
        <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-green-100 hover:shadow-3xl transition-all duration-500">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-8 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-black text-white">Bezorgadres</h2>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <Addresses cart={cart} customer={customer} />
          </div>
        </div>

        {/* Premium shipping section */}
        <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-green-100 hover:shadow-3xl transition-all duration-500">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-8 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4-4m-4 4l4-4" />
                </svg>
              </div>
              <h2 className="text-xl font-black text-white">Bezorgmethode</h2>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <Shipping cart={cart} availableShippingMethods={shippingMethods} />
          </div>
        </div>

        {/* Premium payment section */}
        <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-green-100 hover:shadow-3xl transition-all duration-500">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-8 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h2 className="text-xl font-black text-white">Betaalmethode</h2>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <Payment cart={cart} availablePaymentMethods={paymentMethods} />
          </div>
        </div>

        {/* Premium review section */}
        <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-green-100 hover:shadow-3xl transition-all duration-500">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-8 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-black text-white">Controleer Bestelling</h2>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <Review cart={cart} />
          </div>
        </div>
      </div>
    </div>
  )
}
