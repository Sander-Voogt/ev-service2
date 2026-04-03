'use client'
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { IconCart, IconSearch } from "@modules/common/components/reusable-nav-elements"
import CartButton from "@modules/layout/components/cart-button"
import { Suspense } from "react"
import MainNavBar from "./Mainnavbar"
import CartButtonServer from "@modules/layout/components/cart-button"

export default function NavSub() {
  return (
    <div className="hidden small:flex items-center gap-x-6 h-full">
      <LocalizedClientLink
        className="flex items-center gap-1 hover:text-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 rounded px-1"
        href="/search"
        scroll={false}
        data-testid="nav-search-link"
        title="Zoeken"
      >
        <IconSearch />
        <span className="hidden md:inline">Zoeken</span>
      </LocalizedClientLink>
    </div>
  )
}
