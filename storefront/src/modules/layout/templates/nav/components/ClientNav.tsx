"use client"

import { Suspense } from "react"
import CartButton from "@modules/layout/components/cart-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { IconCart } from "@modules/common/components/reusable-nav-elements"
import MainNavBar from "./Mainnavbar"

export default function ClientNav({ regions }) {
  return (
    <header className="bg-white sticky top-0 inset-x-0 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between py-5 px-4 gap-4 md:gap-8">
        <MainNavBar />
        <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
          <div className="hidden small:flex items-center gap-x-6 h-full">
            <LocalizedClientLink href="/search">Zoeken</LocalizedClientLink>
          </div>

          <div className="flex items-center gap-2 px-2 py-1 rounded-lg border border-green-200 bg-white hover:shadow transition-shadow">
            <div className="relative">
              <IconCart />
            </div>
            <div className="flex flex-col ml-1">
              <span className="text-xs font-semibold text-green-900">
                Winkelwagen
              </span>
              <span className="text-xs text-green-default font-bold">
                <Suspense fallback={<LocalizedClientLink href="/cart">Winkelwagen (0)</LocalizedClientLink>}>
                  <CartButton />
                </Suspense>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
