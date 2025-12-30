"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function CartFallback() {
  return (
    <LocalizedClientLink
      href="/cart"
      className="hover:text-ui-fg-base flex gap-2"
    >
      Winkelwagen (0)
    </LocalizedClientLink>
  )
}
