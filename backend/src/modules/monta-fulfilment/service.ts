import { FulfillmentItemDTO, FulfillmentOrderDTO, CreateFulfillmentResult } from "@medusajs/framework/types"
import {
  AbstractFulfillmentProviderService,
  MedusaError,
  Order,
} from "@medusajs/framework/utils"
import axios, { AxiosInstance } from "axios"
import { mapOrderToMontaPayload } from "./map-order"


type InjectedDependencies = {
  logger: any
  // je kunt andere dependencies toevoegen als je die nodig hebt
}

type MontaOptions = {
  apiKey: string
  baseUrl?: string
}

export default class MontaFulfillmentProviderService extends AbstractFulfillmentProviderService {
  static identifier = "monta"  // unieke ID van jouw provider

  protected logger_: InjectedDependencies["logger"]
  protected options_: MontaOptions
  protected client: AxiosInstance

  constructor(deps: InjectedDependencies, options: MontaOptions) {
    super()
    this.logger_ = deps.logger
    this.options_ = options

    if (!options.apiKey) {
      throw new Error("Monta API key is required")
    }

    this.client = axios.create({
      baseURL: options.baseUrl ?? "https://api-v6.monta.nl",
      headers: {
        Authorization: 'Bearer' + new Buffer('vgtonlineEVSERVICE:##R7H6WWWY)Z').toString('base64'),
        "Content-Type": "application/json",
      },
      timeout: 10000,
    })
  }

  /**
   * Wordt aangeroepen wanneer een fulfillment gemaakt wordt in Medusa.
   * Je moet hier de actie naar Monta doen (bijv. order aanmaken/label aanvragen etc.)
   */
  async createFulfillment(
    data: Record<string, unknown>,
    items: Partial<Omit<FulfillmentItemDTO, "fulfillment">>[],
    order: Partial<FulfillmentOrderDTO> | undefined,
    fulfillment: Partial<Omit<import("@medusajs/framework/types").FulfillmentDTO, "provider_id" | "data" | "items">>
  ): Promise<CreateFulfillmentResult> {
    // data: de “data” property van de shipping method / provider
    // items: de items die moeten worden fulfilled
    // order: beperkte order data
    // fulfillment: gedeeltelijke fulfilment info

    // Hier stuur je naar Monta:
    let externalData: any
    try {
      const montaPayload = mapOrderToMontaPayload(order as Order, items)
      const resp = await this.client.post("/orders", montaPayload)
      if (!(resp.status >= 200 && resp.status < 300)) {
        throw new MedusaError(MedusaError.Types.UNEXPECTED_STATE, `Monta API responded with status ${resp.status}`)
      }
      externalData = resp.data
    } catch (err: any) {
      this.logger_.error("Error in Monta createFulfillment:", err)
      throw new MedusaError(MedusaError.Types.UNEXPECTED_STATE, `Monta createFulfillment failed: ${err.message}`)
    }

    // Return object: data wordt opgeslagen in fulfillment.data in Medusa
    return {
      data: {
        ...externalData,
      },
        labels: [], // <-- verplicht veld, ook als er geen labels zijn
    }
  }

  /**
   * Optionele implementatie: annuleren van een fulfilment bij Monta
   */
  async cancelFulfillment(data: Record<string, unknown>): Promise<void> {
    // Als Monta een annulering ondersteunt, maak hier de API-call
    const external_id = (data as any).external_id
    if (!external_id) {
      // geen ID om op te annuleren
      return
    }
    try {
      await this.client.delete(`/orders/${external_id}`)
    } catch (err: any) {
      this.logger_.warn("Failed to cancel fulfillment in Monta:", err)
      // je kunt falen of gewoon loggen
    }
  }

//   /**
//    * Optioneel: haal documenten op (zoals labels, etc.)
//    */
//   async getFulfillmentDocuments(data: any): Promise<unknown[]> {
//     // indien Monta documenten aanbiedt: PDF-labels etc.
//     // Voor nu: leeg array
//     return []
//   }

  /**
   * Biedt de opties / services die Monta ondersteunt voor fulfilment
   */
  async getFulfillmentOptions(): Promise<
    import("@medusajs/framework/types").FulfillmentOption[]
  > {
    // Dit kan je dynamisch opvragen bij Monta of statisch definiëren
    // Bijvoorbeeld:
    return [
      {
        id: "standard",  // uniek ID
        name: "Monta standaard levering",
        service_code: "MontaStandard",
        price: 0,
      },
      {
        id: "express",
        name: "Monta express",
        service_code: "MontaExpress",
        price: 0,
      },
    ]
  }

  /**
   * Valideer custom data bij het creëren van een shipment / fulfillment
   */
  async validateFulfillmentData(
    optionData: any,
    data: any,
    context: any
  ): Promise<any> {
    // Je kunt hier de data aanvullen met extra velden die je later nodig hebt
    // Bijvoorbeeld een externe ID of token dat Monta nodig heeft
    return {
      ...data,
      monta_option: optionData,
    }
  }

  // Andere methoden kun je indien nodig implementeren:
  // - createReturnFulfillment
  // - getShipmentDocuments
  // - getReturnDocuments
  // - retrieveDocuments
}
