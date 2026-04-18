import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import { HttpTypes } from "@medusajs/types"
import { AddCartReference } from "@modules/checkout/templates/checkout-summary/reference"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50/30">
      {/* Premium animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative py-12 sm:py-16">
        <div className="content-container" data-testid="cart-container">
          {/* Premium header */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-6 py-3 rounded-full shadow-lg mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="font-bold">Uw Winkelwagen</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Premium Shopping Experience
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {cart?.items?.length ? `${cart.items.length} ${cart.items.length === 1 ? 'artikel' : 'artikelen'} geselecteerd` : 'Uw winkelwagen is nog leeg'}
            </p>
          </div>

          {cart?.items?.length ? (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-8">
              <div className="flex flex-col gap-y-6">
                {!customer && (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-[2rem] p-6 border-2 border-green-200 shadow-lg">
                    <SignInPrompt />
                  </div>
                )}
                <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-green-100 hover:shadow-3xl transition-all duration-500">
                  <ItemsTemplate cart={cart} />
                </div>
              </div>

              <div className="relative">
                <div className="flex flex-col gap-y-6 sticky top-24 lg:top-28">
                  {cart && cart.region && (
                    <div className="bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-6 sm:p-8 border border-green-200 hover:shadow-3xl transition-all duration-500">
                      {/* Premium summary header */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h2 className="text-2xl font-black text-gray-900">Besteloverzicht</h2>
                      </div>
                      <Summary cart={cart as any} />
                    </div>
                  )}
                  <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-6 sm:p-8 border border-green-100 hover:shadow-3xl transition-all duration-500">
                    <AddCartReference />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <EmptyCartMessage />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartTemplate
