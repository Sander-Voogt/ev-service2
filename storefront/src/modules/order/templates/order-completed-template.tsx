import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import { HttpTypes } from "@medusajs/types"
import { Check, Mail, ShieldCheck, Truck } from "lucide-react"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const trustBadges = [
    { icon: Check, label: "Bestelling bevestigd" },
    { icon: Mail, label: "E-mail verzonden" },
    { icon: ShieldCheck, label: "Beveiligde betaling" },
    { icon: Truck, label: "Snelle bezorging" },
  ]

  return (
    <div className="bg-page-soft min-h-[80vh]">
      <div className="content-container py-8 sm:py-12 max-w-[840px]">
        {/* Success header */}
        <div className="surface-card p-6 sm:p-8 text-center mb-5">
          <div className="w-14 h-14 mx-auto rounded-full bg-jade/10 text-jade flex items-center justify-center mb-4">
            <Check className="w-7 h-7" strokeWidth={2.25} />
          </div>
          <h1 className="display-md text-text-base">Bedankt voor je bestelling</h1>
          <p className="lede mt-2 max-w-[480px] mx-auto">
            We hebben je bestelling ontvangen en sturen zo snel mogelijk een
            bevestiging per e-mail.
          </p>

          <ul className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-[560px] mx-auto">
            {trustBadges.map((b) => (
              <li
                key={b.label}
                className="surface-panel px-2.5 py-3 text-center"
              >
                <span className="inline-flex w-7 h-7 rounded-md bg-white border border-border-soft text-jade items-center justify-center mb-1.5">
                  <b.icon className="w-3.5 h-3.5" strokeWidth={2} />
                </span>
                <p className="text-[11.5px] text-text-muted font-medium leading-tight">
                  {b.label}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Order content */}
        <div
          className="flex flex-col gap-5"
          data-testid="order-complete-container"
        >
          <div className="surface-card p-5 sm:p-6">
            <span className="eyebrow">Bestelling</span>
            <h2 className="display-sm mt-1.5 mb-4 text-text-base">
              Bestelgegevens
            </h2>
            <OrderDetails order={order} />
          </div>

          <div className="surface-card p-5 sm:p-6">
            <span className="eyebrow">Producten</span>
            <h2 className="display-sm mt-1.5 mb-4 text-text-base">Overzicht</h2>
            <Items items={order.items} />
          </div>

          <div className="surface-card p-5 sm:p-6">
            <CartTotals totals={order} />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="surface-card p-5 sm:p-6">
              <span className="eyebrow">Bezorging</span>
              <h3 className="display-sm mt-1.5 mb-4 text-text-base">
                Verzendgegevens
              </h3>
              <ShippingDetails order={order} />
            </div>
            <div className="surface-card p-5 sm:p-6">
              <span className="eyebrow">Betaling</span>
              <h3 className="display-sm mt-1.5 mb-4 text-text-base">
                Betaalwijze
              </h3>
              <PaymentDetails order={order} />
            </div>
          </div>

          <div className="surface-panel p-5 sm:p-6">
            <Help />
          </div>
        </div>
      </div>
    </div>
  )
}
