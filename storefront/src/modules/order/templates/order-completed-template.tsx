import { Heading } from "@medusajs/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50/30 relative overflow-hidden">
      {/* Premium celebration background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-300/10 rounded-full blur-3xl animate-pulse delay-500" />

        {/* Confetti effect */}
        <div className="absolute top-0 left-1/4 w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100" style={{ animationDuration: '2s' }} />
        <div className="absolute top-20 right-1/4 w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-300" style={{ animationDuration: '2.5s' }} />
        <div className="absolute top-40 left-1/3 w-2 h-2 bg-green-600 rounded-full animate-bounce delay-500" style={{ animationDuration: '1.8s' }} />
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-emerald-600 rounded-full animate-bounce delay-200" style={{ animationDuration: '2.2s' }} />
      </div>

      <div className="relative z-10 py-12 sm:py-16">
        <div className="content-container">
          {/* Premium success celebration */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-white via-green-50/50 to-emerald-50/50 backdrop-blur-xl rounded-[3rem] shadow-3xl p-12 border-2 border-green-200 text-center relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
              </div>

              {/* Success icon with animation */}
              <div className="relative z-10 mb-8">
                <div className="w-32 h-32 mx-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                    <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {/* Ringing effect */}
                  <div className="absolute inset-0 border-4 border-green-300 rounded-full animate-ping opacity-20"></div>
                  <div className="absolute inset-0 border-4 border-green-400 rounded-full animate-pulse opacity-40"></div>
                </div>
              </div>

              <Heading
                level="h1"
                className="relative z-10 text-5xl sm:text-6xl font-black mb-4 bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent"
              >
                Bestelling Afgerond!
              </Heading>

              <p className="relative z-10 text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Bedankt voor uw bestelling! U ontvangt een bevestiging per email met alle details.
              </p>

              {/* Premium trust badges */}
              <div className="relative z-10 grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-100">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-gray-700 text-center">Bestelling Bevestigd</p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-100">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-gray-700 text-center">Email Verzonden</p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-100">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-gray-700 text-center">Beveiligde Betaling</p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-100">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-gray-700 text-center">2 Jaar Garantie</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order details in premium card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-3xl p-8 sm:p-12 border border-green-100">
              <div className="flex flex-col gap-8" data-testid="order-complete-container">
                {/* Order details section */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">Order Details</h2>
                  </div>
                  <OrderDetails order={order} />
                </div>

                {/* Items overview */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <Heading level="h2" className="text-2xl font-black text-gray-900">
                      Overzicht
                    </Heading>
                  </div>
                  <Items items={order.items} />
                </div>

                {/* Totals */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                  <CartTotals totals={order} />
                </div>

                {/* Shipping and Payment */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4-4m-4 4l4-4" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-black text-gray-900">Bezorging</h3>
                    </div>
                    <ShippingDetails order={order} />
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-black text-gray-900">Betaling</h3>
                    </div>
                    <PaymentDetails order={order} />
                  </div>
                </div>

                {/* Help section */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                  <Help />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
