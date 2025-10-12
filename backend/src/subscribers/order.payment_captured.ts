import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"
import { IOrderModuleService } from "@medusajs/framework/types"
import MontaFulfillmentProviderService from "modules/monta-fulfilment/service"

export default async function orderPaidHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const orderModuleService: IOrderModuleService = container.resolve(Modules.ORDER)
  const montaService = container.resolve<MontaFulfillmentProviderService>("monta-fulfillment")

  const order = await orderModuleService.retrieveOrder(data.id, {
    relations: ["items", "shipping_address", "shipping_methods", "transactions"],
  })

  const isPaid = order?.transactions?.some(
    (t) => t.status === "captured" || t.status === "succeeded"
  )

  if (isPaid) {
    const result = await montaService.sendOrder(order)
    console.log(`✅ Order ${order.id} verzonden naar Monta`, result.data)
  } else {
    console.log(`ℹ️ Order ${order.id} is nog niet betaald`)
  }
}

export const config: SubscriberConfig = {
  event: ["order.payment_captured"],
}
