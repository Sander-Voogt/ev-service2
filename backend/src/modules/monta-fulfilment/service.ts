import {
  AbstractFulfillmentProviderService,
} from "@medusajs/framework/utils"
import {
  Logger,
  CalculateShippingOptionPriceDTO,
  CreateFulfillmentResult,
  FulfillmentDTO,
  FulfillmentItemDTO,
  FulfillmentOrderDTO,
  FulfillmentOption,
} from "@medusajs/framework/types"
import axios from "axios"

type InjectedDependencies = { logger: Logger }

type MontaOptions = {
  apiKey: string
  baseUrl?: string
}

export class MontaFulfillmentProviderService extends AbstractFulfillmentProviderService {
  static identifier = "monta-fulfillment"

  protected logger_: Logger
  protected options_: MontaOptions
  protected client: any

  constructor({ logger }: InjectedDependencies, options: MontaOptions) {
    super()
    this.logger_ = logger
    this.options_ = options

    this.client = axios.create({
      baseURL: options.baseUrl || "https://api-v6.monta.nl",
      headers: {
        Authorization: `Bearer ${options.apiKey}`,
        "Content-Type": "application/json",
      },
    })
  }

  // ---------------------------------------------------------
  // Get fulfillment options (visible in Medusa Admin)
  // ---------------------------------------------------------
  async getFulfillmentOptions(): Promise<FulfillmentOption[]> {
    return [
      {
        id: "monta_standard",
        name: "Monta Standard Shipping",
      },
    ]
  }

  // ---------------------------------------------------------
  // Calculate shipping price (optional, stub for now)
  // ---------------------------------------------------------
  async calculatePrice(
    optionData: CalculateShippingOptionPriceDTO["optionData"],
    data: CalculateShippingOptionPriceDTO["data"],
    context: CalculateShippingOptionPriceDTO["context"]
  ) {
    return {
      calculated_amount: 0,
      is_calculated_price_tax_inclusive: true,
    }
  }

  // ---------------------------------------------------------
  // Validate option (called when admin creates shipping option)
  // ---------------------------------------------------------
  async validateOption(data: Record<string, unknown>): Promise<boolean> {
    return true
  }

  // ---------------------------------------------------------
  // Validate fulfillment data (cart checkout)
  // ---------------------------------------------------------
  async validateFulfillmentData(
    optionData: Record<string, unknown>,
    data: Record<string, unknown>,
    context: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    return {
      ...data,
      validatedAt: new Date().toISOString(),
    }
  }

  // ---------------------------------------------------------
  // Create fulfillment in Monta
  // ---------------------------------------------------------
  async createFulfillment(
    data: Record<string, unknown>,
    items: Partial<Omit<FulfillmentItemDTO, "fulfillment">>[],
    order: Partial<FulfillmentOrderDTO> | undefined,
    fulfillment: Partial<Omit<FulfillmentDTO, "provider_id" | "data" | "items">>
  ): Promise<CreateFulfillmentResult> {
    try {
      const payload = {
        order_id: order?.id,
        reference: order?.display_id ?? order?.id,
        customer: {
          name: `${order?.shipping_address?.first_name ?? ""} ${order?.shipping_address?.last_name ?? ""}`,
          email: order?.customer?.email,
          phone: order?.shipping_address?.phone,
        },
        address: {
          street: order?.shipping_address?.address_1,
          postal_code: order?.shipping_address?.postal_code,
          city: order?.shipping_address?.city,
          country: order?.shipping_address?.country_code,
        },
        items: items.map((i) => ({
          sku:
            (order?.items?.find((oi) => oi.id === i.item_id)?.variant?.sku) ??
            "UNKNOWN",
          quantity: i.quantity ?? 1,
          title: (i as any).title ?? "",
        })),
      }

      const response = await this.client.post("/orders", payload)

      const tracking = response.data?.tracking ?? {}

      return {
        data: {
          monta_order_id: response.data?.id,
          monta_reference: response.data?.reference,
        },
        labels: [
          {
            tracking_number: tracking.tracking_number ?? "",
            tracking_url: tracking.tracking_url ?? "",
            label_url: tracking.label_url ?? "",
          },
        ],
      }
    } catch (error: any) {
      this.logger_.error("❌ Monta createFulfillment failed", error)
      throw error
    }
  }

  // ---------------------------------------------------------
  // Create return fulfillment (stub)
  // ---------------------------------------------------------
  async createReturnFulfillment(
    fulfillment: Record<string, unknown>
  ): Promise<CreateFulfillmentResult> {
    const response = await this.client.post("/returns", fulfillment)

    return {
      data: response.data,
      labels: [],
    }
  }

  // ---------------------------------------------------------
  // Cancel fulfillment
  // ---------------------------------------------------------
  async cancelFulfillment(data: Record<string, unknown>): Promise<any> {
    const { monta_order_id } = data as { monta_order_id: string }
    await this.client.post(`/orders/${monta_order_id}/cancel`)
  }

  // ---------------------------------------------------------
  // Helper: send order manually from subscriber
  // ---------------------------------------------------------
  async sendOrder(order: any) {
    const payload = {
      order_id: order.id,
      reference: order.display_id,
      customer: {
        name: `${order.shipping_address?.first_name ?? ""} ${order.shipping_address?.last_name ?? ""}`,
        email: order.customer?.email,
      },
      items: order.items.map((i: any) => ({
        sku: i.variant?.sku ?? "UNKNOWN",
        quantity: i.quantity,
        title: i.title,
      })),
    }

    const response = await this.client.post("/orders", payload)
    return response.data
  }
}

export default MontaFulfillmentProviderService
