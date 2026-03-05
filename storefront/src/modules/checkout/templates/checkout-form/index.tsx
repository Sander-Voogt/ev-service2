import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"
import CheckoutProgress from "@modules/checkout/components/checkout-progress"

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return null
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  if (!shippingMethods || !paymentMethods) {
    return null
  }

  return (
    <div className="w-full grid grid-cols-1 gap-y-3 sm:gap-y-4">
      <CheckoutProgress />

      <div className="space-y-3 sm:space-y-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-7">
          <Addresses cart={cart} customer={customer} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-7">
          <Shipping cart={cart} availableShippingMethods={shippingMethods} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-7">
          <Payment cart={cart} availablePaymentMethods={paymentMethods} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-7">
          <Review cart={cart} />
        </div>
      </div>
    </div>
  )
}
