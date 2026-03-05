import { Metadata } from "next"

import OrderOverview from "@modules/account/components/order-overview"
import { notFound } from "next/navigation"
import { listOrders } from "@lib/data/orders"

export const metadata: Metadata = {
  title: "Bestellingen",
  description: "Overzicht van je bestellingen.",
}

export default async function Orders() {
  const orders = await listOrders()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-neutral-900">Bestellingen</h1>
        <p className="text-gray-600 text-sm mt-1">
          Bekijk je eerdere bestellingen en hun status.
        </p>
      </div>
      <div>
        <OrderOverview orders={orders} />
      </div>
    </div>
  )
}
