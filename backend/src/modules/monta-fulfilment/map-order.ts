import { FulfillmentItemDTO, FulfillmentOrderDTO } from "@medusajs/framework/types"
// of import Order type uit Medusa core als je meer gegevens nodig hebt

export function mapOrderToMontaPayload(
  order: Partial<FulfillmentOrderDTO>,
  items: Partial<Omit<FulfillmentItemDTO, "fulfillment">>[]
): any {
  // Maak hier je payload op basis van Monta's API structuur
  // Bijvoorbeeld (vereenvoudigd voorbeeld):
  return {
    order_reference: order.id,
    items: items.map((i) => ({
      sku: i.variant_id,
      quantity: i.quantity,
    })),
    // + klantgegevens en verzendadres, als order object die velden bevat
    shipping: {
      address: {
        street: order.shipping_address?.address_1,
        city: order.shipping_address?.city,
        postal_code: order.shipping_address?.postal_code,
        country: order.shipping_address?.country_code,
      },
    },
  }
}
