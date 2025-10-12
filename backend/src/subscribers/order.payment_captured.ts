import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"
import { IOrderModuleService } from "@medusajs/framework/types"
import MontaFulfillmentProviderService from "modules/monta-fulfilment/service"

export default async function orderPaidHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const orderModuleService: IOrderModuleService = container.resolve(Modules.ORDER)
  const montaFulfillmentService =
    container.resolve<MontaFulfillmentProviderService>("monta-fulfillment")

  const order = await orderModuleService.retrieveOrder(data.id, {
    relations: ["items", "shipping_address", "shipping_methods", "customer", "payments", "items.variant"],
  })

  const isPaid = order?.payments?.some(
    (p) => p.status === "captured" || p.status === "succeeded"
  )

  if (isPaid) {
    const result = await montaFulfillmentService.sendOrder(order)
    console.log(`✅ Order ${order.id} verzonden naar Monta`, result)
  } else {
    console.log(`ℹ️ Order ${order.id} is niet betaald, wordt niet verzonden`)
  }
}

export const config: SubscriberConfig = {
  event: ["order.payment_captured"],
}
