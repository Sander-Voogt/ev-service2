'use client'
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { IconCart } from "@modules/common/components/reusable-nav-elements"
import CartButton from "@modules/layout/components/cart-button"
import { Suspense } from "react"
import MainNavBar from "./Mainnavbar"
import CartButtonServer from "@modules/layout/components/cart-button"

export default function NavSub() {
  return (
    <div className="hidden small:flex items-center gap-x-6 h-full">
      <LocalizedClientLink
        className="hover:text-ui-fg-base"
        href="/search"
        scroll={false}
        data-testid="nav-search-link"
      >
        Zoeken
      </LocalizedClientLink>
    </div>
  )
}
