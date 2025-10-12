import {
  SubscriberArgs,
  SubscriberConfig,
} from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"
import { IOrderModuleService } from "@medusajs/framework/types"

export default async function orderPaidHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const orderModuleService: IOrderModuleService = container.resolve(Modules.ORDER)
  const montaFulfilmentService = container.resolve("montaFulfilmentService")

  try {
    // Haal order op met benodigde relaties
    const order = await orderModuleService.retrieveOrder(data.id, {
      relations: ["items", "shipping_address", "shipping_methods", "customer", "variants"],
    })

    // Controleer of order betaald is
    if (order.payment_status === "captured" || order.payment_status === "paid") {
      const result = await montaFulfilmentService.sendOrder(order)
      console.log(`✅ Order ${order.id} verzonden naar Monta:`, result)
    } else {
      console.log(
        `ℹ️ Order ${order.id} heeft status '${order.payment_status}', dus wordt niet verzonden naar Monta`
      )
    }
  } catch (err) {
    console.error(`❌ Fout bij verzenden van order ${data.id} naar Monta:`, err)
  }
}

/**
 * Subscriber configuratie voor Medusa 2
 * - Luistert naar payment_captured event
 * - Kan eventueel uitgebreid worden met andere events (bv. order.completed)
 */
export const config: SubscriberConfig = {
  event: ["order.payment_captured"],
}
