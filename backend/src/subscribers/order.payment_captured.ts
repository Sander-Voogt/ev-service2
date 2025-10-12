import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"
import { IOrderModuleService } from "@medusajs/framework/types"
import MontaFulfillmentProviderService from "modules/monta-fulfilment/service"

export default async function orderPaidHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const query = container.resolve("query")

  // Step 1: Retrieve the payment and its payment_collection
  const { data: payments } = await query.graph({
    entity: "payment",
    fields: [
      "id",
      "payment_collection.id",
      "payment_collection.order.id",
      "payment_collection.order.items.*",
      "payment_collection.order.shipping_address.*",
      "payment_collection.order.shipping_methods.*",
      "payment_collection.order.transactions.*",
    ],
    filters: { id: data.id },
  })

  const payment = payments?.[0]
  const order = payment?.payment_collection?.order

  if (!order) {
    console.log(`❌ No order found for payment ${data.id}`)
    return
  }

  // Step 2: Check if the order is paid
  const isPaid = order?.transactions?.some(
    (t) => t.status === "captured" || t.status === "succeeded"
  )

  if (isPaid) {
    const montaService = container.resolve<MontaFulfillmentProviderService>("monta-fulfillment")
    const result = await montaService.sendOrder(order)
    console.log(`✅ Order ${order.id} verzonden naar Monta`, result.data)
  } else {
    console.log(`ℹ️ Order ${order.id} is nog niet betaald`)
  }
}

export const config: SubscriberConfig = {
  event: ["order.payment_captured"],
}
