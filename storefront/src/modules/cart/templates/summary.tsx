"use client"

import Button from "@modules/common/components/button"
import CartTotals from "@modules/common/components/cart-totals"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { Truck, ShieldCheck, Lock, ArrowRight } from "lucide-react"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-y-4">
      <CartTotals totals={cart} />

      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
        className="block w-full"
      >
        <Button variant="primary" size="lg" fullWidth>
          Afrekenen
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </LocalizedClientLink>

      <ul className="grid grid-cols-1 gap-2.5 pt-4 border-t border-border-soft">
        {[
          { icon: Truck, label: "Voor 22:00 besteld, morgen geleverd" },
          { icon: ShieldCheck, label: "2 jaar garantie" },
          { icon: Lock, label: "Beveiligde betaling met SSL" },
        ].map((it) => (
          <li
            key={it.label}
            className="flex items-center gap-2.5 text-[12.5px] text-text-muted"
          >
            <it.icon className="w-4 h-4 text-jade flex-shrink-0" strokeWidth={1.75} />
            <span>{it.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Summary
