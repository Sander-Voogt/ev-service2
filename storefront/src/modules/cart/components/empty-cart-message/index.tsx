import { Heading, Text } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-20 px-4 flex flex-col justify-center items-center max-w-2xl mx-auto" data-testid="empty-cart-message">
      {/* Premium empty cart card */}
      <div className="bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 backdrop-blur-xl rounded-[3rem] shadow-3xl p-12 border-2 border-green-200 text-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Premium icon */}
        <div className="relative z-10 mb-8">
          <div className="w-32 h-32 mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            {/* Floating animation */}
            <div className="absolute inset-0 border-4 border-green-200 rounded-full animate-ping opacity-20"></div>
          </div>
        </div>

        {/* Premium heading */}
        <div className="relative z-10 space-y-4">
          <Heading
            level="h1"
            className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
          >
            Winkelwagen
          </Heading>

          <Text className="text-xl text-gray-600 max-w-lg mx-auto leading-relaxed">
            Uw winkelwagen is nog leeg. Ontdek ons premium assortiment aan laadkabels en laadpalen voor uw elektrische auto.
          </Text>

          {/* Premium CTA button */}
          <div className="pt-6">
            <LocalizedClientLink
              href="/store"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:text-white font-black rounded-2xl px-8 py-5 text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border-0"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="white" style={{ stroke: 'white' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span className="text-white">Ontdek Onze Producten</span>
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="white" style={{ stroke: 'white' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </LocalizedClientLink>
          </div>

          {/* Premium suggestions */}
          <div className="pt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-gray-700">Laadkabels</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-gray-700">Laadpalen</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-gray-700">Accessoires</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmptyCartMessage
