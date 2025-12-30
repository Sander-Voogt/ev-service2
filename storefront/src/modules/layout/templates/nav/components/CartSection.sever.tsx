import { Suspense } from "react"
import CartButton from "@modules/layout/components/cart-button"
import { IconCart } from "@modules/common/components/reusable-nav-elements"
import CartFallback from "./CartSection.client"

export default async function CartSection() {
  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-lg border border-green-200 bg-white hover:shadow transition-shadow">
      <div className="relative">
        <IconCart />
      </div>
      <div className="flex flex-col ml-1">
        <span className="text-xs font-semibold text-green-900">Winkelwagen</span>
        <span className="text-xs text-green-default font-bold">
          <Suspense fallback={<CartFallback />}>
            <CartButton />
          </Suspense>
        </span>
      </div>
    </div>
  )
}
