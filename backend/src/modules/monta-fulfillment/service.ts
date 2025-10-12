import {
  AbstractFulfillmentProviderService,
} from "@medusajs/framework/utils"
import {
  Logger,
  FulfillmentItemDTO,
  FulfillmentOrderDTO,
  CreateFulfillmentResult,
  FulfillmentDTO,
  FulfillmentOption,
  CalculateShippingOptionPriceDTO
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
      baseURL: "https://api-v6.monta.nl",
      headers: {
        Authorization: 'Basic ' + new Buffer('vgtonlineEVSERVICE:##R7H6WWWY)Z').toString('base64'),
        "Content-Type": "application/json",
      },
    })
  }

  async getFulfillmentOptions(): Promise<FulfillmentOption[]> {
    return [
    {
      id: "monta_standard",
      name: "Monta Standard Shipping",
      data: {},
      provider_id: "monta-fulfillment"
    },
    {
      id: "monta_pro",
      name: "Monta Pro Shipping",
      data: {},
      provider_id: "monta-fulfillment"
    }
  ]
  }

  async calculatePrice(
    optionData: CalculateShippingOptionPriceDTO["optionData"],
    data: CalculateShippingOptionPriceDTO["data"],
    context: CalculateShippingOptionPriceDTO["context"]
  ) {
    return { calculated_amount: 0, is_calculated_price_tax_inclusive: true }
  }

  async validateOption(data: Record<string, unknown>): Promise<boolean> {
    return true
  }

  async validateFulfillmentData(
    optionData: Record<string, unknown>,
    data: Record<string, unknown>,
    context: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    return { ...data, validatedAt: new Date().toISOString() }
  }

  async createFulfillment(
    data: Record<string, unknown>,
    items: Partial<Omit<FulfillmentItemDTO, "fulfillment">>[],
    order: Partial<FulfillmentOrderDTO> | undefined,
    fulfillment: Partial<Omit<FulfillmentDTO, "provider_id" | "data" | "items">>
  ): Promise<CreateFulfillmentResult> {
    const payload = {
      order_id: order?.id,
      reference: order?.display_id ?? order?.id,
      customer: {
        name: `${order?.shipping_address?.first_name ?? ""} ${order?.shipping_address?.last_name ?? ""}`,
        email: order?.email ?? "",
      },
      address: {
        street: order?.shipping_address?.address_1,
        postal_code: order?.shipping_address?.postal_code,
        city: order?.shipping_address?.city,
        country: order?.shipping_address?.country_code,
      },
      items: items.map((i) => ({
        sku:
          order?.items?.find((oi) => oi.id === i.line_item_id)?.title ?? "Unknown SKU",
        quantity: i.quantity ?? 1,
      })),
    }

    const response = await this.client.post("/orders", payload)

    return {
      data: {
        monta_order_id: response.data?.id,
        monta_reference: response.data?.reference,
      },
      labels: [
        {
          tracking_number: response.data?.tracking?.tracking_number ?? "",
          tracking_url: response.data?.tracking?.tracking_url ?? "",
          label_url: response.data?.tracking?.label_url ?? "",
        },
      ],
    }
  }

  async createReturnFulfillment(
    fulfillment: Record<string, unknown>
  ): Promise<CreateFulfillmentResult> {
    const response = await this.client.post("/returns", fulfillment)
    return { data: response.data, labels: [] }
  }

  async cancelFulfillment(data: Record<string, unknown>): Promise<any> {
    const { monta_order_id } = data as { monta_order_id: string }
    await this.client.post(`/orders/${monta_order_id}/cancel`)
  }

  async sendOrder(order: any) {
    const payload = {
      order_id: order.id,
      reference: order.display_id,
      customer: {
        name: `${order.shipping_address?.first_name ?? ""} ${order.shipping_address?.last_name ?? ""}`,
        email: order.shipping_address?.email ?? "",
      },
      items: order.items.map((i: any) => ({
        sku: i.title ?? "Unknown SKU",
        quantity: i.quantity,
      })),
    }

    return await this.client.post("/orders", payload)
  }
}

export default MontaFulfillmentProviderService
