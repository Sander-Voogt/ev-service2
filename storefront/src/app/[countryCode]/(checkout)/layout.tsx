import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-gray-50 relative small:min-h-screen">
      <div className="h-16 sm:h-20 bg-white border-b border-gray-200 shadow-sm">
        <nav className="flex h-full items-center content-container justify-between px-4 sm:px-6 lg:px-8">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi text-gray-600 flex items-center gap-x-2 uppercase flex-1 basis-0 hover:text-gray-900 transition-colors"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block txt-compact-plus">
              Terug naar winkelwagen
            </span>
            <span className="mt-px block small:hidden txt-compact-plus">
              Terug
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity duration-300"
            data-testid="store-link"
          >
              <Image
                src="https://user.fm/files/v2-440e0bb07a929e996c6a98fbc0257f71/RIC-HOLLAND.svg"
                alt="Ric Holland"
                width={200}
                height={60}
                className="object-contain"
                priority
              />
          
          </LocalizedClientLink>
          <div className="flex-1 basis-0 flex justify-end">
            <div className="flex items-center gap-x-2 text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="hidden sm:block text-xs font-medium uppercase tracking-wide">
                Beveiligd afrekenen
              </span>
            </div>
          </div>
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
      <div className="py-4 w-full flex items-center justify-center"></div>
    </div>
  )
}
